import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const users = new Hono()

// Get all users (admin only)
users.get('/', authMiddleware, async (c) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        language: true,
        isActive: true,
        createdAt: true,
      },
    })

    return c.json({ success: true, data: users })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch users' }, 500)
  }
})

// Get user by ID
users.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const user = await prisma.user.findUnique({
      where: { id },
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
        createdAt: true,
      },
    })

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }

    return c.json({ success: true, data: user })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch user' }, 500)
  }
})

// Update user
users.put('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    const { firstName, lastName, phone, avatar, timezone } = body

    const user = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, phone, avatar, timezone },
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
        updatedAt: true,
      },
    })

    return c.json({ success: true, data: user, message: 'User updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update user' }, 500)
  }
})

// Delete user (admin only)
users.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.user.delete({ where: { id } })
    return c.json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete user' }, 500)
  }
})

export { users as userRoutes }