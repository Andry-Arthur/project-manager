/**
 * Supabase Authentication Middleware for MadaProject API
 * Handles JWT verification using Supabase auth
 */

import { Context, Next } from 'hono'
import { getSupabaseAdminClient } from '@madaproject/shared'
import { prisma } from '@madaproject/db'

export interface AuthUser {
  id: string
  email: string
  role: string
  companyId?: string
  companyRole?: string
}

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser
  }
}

/**
 * Extract Bearer token from Authorization header
 */
function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

/**
 * Verify JWT token with Supabase and get user data
 */
async function verifySupabaseToken(token: string): Promise<AuthUser | null> {
  try {
    const supabase = getSupabaseAdminClient()
    
    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      console.error('Supabase auth error:', error)
      return null
    }

    // Get user data from our database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: {
        companyMemberships: {
          where: { isActive: true },
          include: { company: true }
        }
      }
    })

    if (!dbUser) {
      console.error('User not found in database:', user.email)
      return null
    }

    // Get primary company role (if any)
    const primaryMembership = dbUser.companyMemberships[0]
    
    return {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
      companyId: primaryMembership?.companyId,
      companyRole: primaryMembership?.role
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

/**
 * Supabase authentication middleware
 * Verifies JWT token and loads user data
 */
export async function supabaseAuthMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization')
  const token = extractBearerToken(authHeader)

  if (!token) {
    return c.json(
      { success: false, error: 'Authentication required' },
      401
    )
  }

  const user = await verifySupabaseToken(token)

  if (!user) {
    return c.json(
      { success: false, error: 'Invalid or expired token' },
      401
    )
  }

  // Set user in context
  c.set('user', user)
  
  await next()
}

/**
 * Optional authentication middleware
 * Loads user if token is present, but doesn't require it
 */
export async function optionalSupabaseAuth(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization')
  const token = extractBearerToken(authHeader)

  if (token) {
    const user = await verifySupabaseToken(token)
    if (user) {
      c.set('user', user)
    }
  }

  await next()
}

/**
 * Role-based authorization middleware
 * Checks if user has required role
 */
export function requireRole(...roles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user')

    if (!user) {
      return c.json(
        { success: false, error: 'Authentication required' },
        401
      )
    }

    if (!roles.includes(user.role)) {
      return c.json(
        { success: false, error: 'Insufficient permissions' },
        403
      )
    }

    await next()
  }
}

/**
 * Company membership authorization middleware
 * Checks if user is member of specified company
 */
export function requireCompanyMembership() {
  return async (c: Context, next: Next) => {
    const user = c.get('user')

    if (!user) {
      return c.json(
        { success: false, error: 'Authentication required' },
        401
      )
    }

    if (!user.companyId) {
      return c.json(
        { success: false, error: 'Company membership required' },
        403
      )
    }

    await next()
  }
}

/**
 * Check if user has permission for a specific resource
 */
export async function checkResourcePermission(
  c: Context,
  resourceType: string,
  resourceId: string,
  action: 'read' | 'write' | 'delete'
): Promise<boolean> {
  const user = c.get('user')

  if (!user) return false

  // Super admins can do anything
  if (user.role === 'SUPER_ADMIN') return true

  // Admins can do anything within their scope
  if (user.role === 'ADMIN') return true

  // For company-specific resources, check company membership
  if (resourceType === 'project' || resourceType === 'task' || resourceType === 'note') {
    const resource = await prisma[resourceType].findUnique({
      where: { id: resourceId },
      select: { companyId: true }
    })

    if (!resource) return false

    const membership = await prisma.companyMember.findFirst({
      where: {
        userId: user.id,
        companyId: resource.companyId,
        isActive: true
      }
    })

    if (!membership) return false

    // Check role-based permissions
    if (action === 'read') return true
    
    if (action === 'write') {
      return ['OWNER', 'ADMIN', 'MANAGER'].includes(membership.role)
    }

    if (action === 'delete') {
      return ['OWNER', 'ADMIN'].includes(membership.role)
    }
  }

  return false
}

/**
 * Sign up a new user with Supabase and create database record
 */
export async function signUpUser(data: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  language?: string
}) {
  const supabase = getSupabaseAdminClient()

  // Create user in Supabase auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: false,
    user_metadata: {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      language: data.language || 'FRENCH'
    }
  })

  if (authError) {
    throw new Error(authError.message)
  }

  // Create user in our database
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: data.password, // In production, this would be hashed
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      language: data.language || 'FRENCH',
      role: 'USER'
    }
  })

  return user
}

/**
 * Sign in user with Supabase
 */
export async function signInUser(email: string, password: string) {
  const supabase = getSupabaseAdminClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw new Error(error.message)
  }

  // Update last login in our database
  await prisma.user.update({
    where: { email },
    data: { lastLogin: new Date() }
  })

  return data
}

/**
 * Sign out user from Supabase
 */
export async function signOutUser(accessToken: string) {
  const supabase = getSupabaseAdminClient()

  await supabase.auth.signOut({
    scope: 'local',
    token: accessToken
  })
}