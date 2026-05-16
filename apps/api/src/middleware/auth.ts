import { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'
import { prisma } from '@madaproject/db'

export interface AuthUser {
  id: string
  email: string
  role: string
  companyId?: string
}

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'madaproject-secret-key-change-in-production'

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        success: false,
        error: 'Authentication required',
      }, 401)
    }

    const token = authHeader.substring(7)
    
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    
    // Verify user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        companyMemberships: {
          where: { isActive: true },
          select: { companyId: true, role: true },
        },
      },
    })

    if (!user || !user.isActive) {
      return c.json({
        success: false,
        error: 'User not found or inactive',
      }, 401)
    }

    // Set user in context
    c.set('user', {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyMemberships[0]?.companyId,
      companyRole: user.companyMemberships[0]?.role,
    })

    await next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return c.json({
        success: false,
        error: 'Invalid token',
      }, 401)
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return c.json({
        success: false,
        error: 'Token expired',
      }, 401)
    }

    return c.json({
      success: false,
      error: 'Authentication failed',
    }, 500)
  }
}

export const requireRole = (...roles: string[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get('user')
    
    if (!user) {
      return c.json({
        success: false,
        error: 'Authentication required',
      }, 401)
    }

    if (!roles.includes(user.role)) {
      return c.json({
        success: false,
        error: 'Insufficient permissions',
      }, 403)
    }

    await next()
  }
}

export const optionalAuth = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization')
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
        },
      })

      if (user && user.isActive) {
        c.set('user', {
          id: user.id,
          email: user.email,
          role: user.role,
        })
      }
    }
  } catch (error) {
    // Silently fail for optional auth
  }

  await next()
}

export const generateToken = (user: { id: string; email: string; role: string }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}