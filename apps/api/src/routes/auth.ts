import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs'
import { prisma } from '@madaproject/db'
import { generateToken, authMiddleware } from '../middleware/auth'

const auth = new Hono()

// Registration schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  language: z.enum(['FRENCH', 'MALAGASY', 'ENGLISH']).default('FRENCH'),
})

// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Register new user
auth.post('/register', zValidator('json', registerSchema), async (c) => {
  try {
    const { email, password, firstName, lastName, phone, language } = c.req.valid('json')

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return c.json({
        success: false,
        error: 'User with this email already exists',
      }, 409)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        language,
        role: 'USER',
        emailVerified: false,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        language: true,
        role: true,
        createdAt: true,
      },
    })

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return c.json({
      success: true,
      data: {
        user,
        token,
      },
      message: 'User registered successfully',
    }, 201)
  } catch (error) {
    console.error('Registration error:', error)
    return c.json({
      success: false,
      error: 'Failed to register user',
    }, 500)
  }
})

// Login
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  try {
    const { email, password } = c.req.valid('json')

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        companyMemberships: {
          where: { isActive: true },
          select: { companyId: true, role: true },
        },
      },
    })

    if (!user || !user.isActive) {
      return c.json({
        success: false,
        error: 'Invalid email or password',
      }, 401)
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return c.json({
        success: false,
        error: 'Invalid email or password',
      }, 401)
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return c.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({
      success: false,
      error: 'Failed to login',
    }, 500)
  }
})

// Get current user (protected route)
auth.get('/me', authMiddleware, async (c) => {
  try {
    const user = c.get('user')

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        language: true,
        timezone: true,
        emailVerified: true,
        createdAt: true,
        companyMemberships: {
          where: { isActive: true },
          include: {
            company: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
                currency: true,
              },
            },
          },
        },
        settings: true,
      },
    })

    if (!fullUser) {
      return c.json({
        success: false,
        error: 'User not found',
      }, 404)
    }

    return c.json({
      success: true,
      data: fullUser,
    })
  } catch (error) {
    console.error('Get user error:', error)
    return c.json({
      success: false,
      error: 'Failed to get user',
    }, 500)
  }
})

// Update password
auth.put('/password', authMiddleware, zValidator('json', z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
})), async (c) => {
  try {
    const user = c.get('user')
    const { currentPassword, newPassword } = c.req.valid('json')

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    })

    if (!fullUser) {
      return c.json({
        success: false,
        error: 'User not found',
      }, 404)
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, fullUser.password)

    if (!isValid) {
      return c.json({
        success: false,
        error: 'Current password is incorrect',
      }, 401)
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return c.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error) {
    console.error('Update password error:', error)
    return c.json({
      success: false,
      error: 'Failed to update password',
    }, 500)
  }
})

// Logout (client-side token removal, but we can log it)
auth.post('/logout', authMiddleware, async (c) => {
  // In a real app, you might invalidate the token or add it to a blacklist
  return c.json({
    success: true,
    message: 'Logged out successfully',
  })
})

export { auth as authRoutes }