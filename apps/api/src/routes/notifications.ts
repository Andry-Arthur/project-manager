import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const notifications = new Hono()

// Get all notifications for current user
notifications.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { page = '1', limit = '50', isRead, type } = c.req.query()
    
    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        ...(isRead !== undefined && { isRead: isRead === 'true' }),
        ...(type && { type: type as any }),
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    })

    const total = await prisma.notification.count({
      where: {
        userId: user.id,
        ...(isRead !== undefined && { isRead: isRead === 'true' }),
        ...(type && { type: type as any }),
      },
    })

    return c.json({
      success: true,
      data: notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch notifications' }, 500)
  }
})

// Get unread count
notifications.get('/unread/count', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const count = await prisma.notification.count({
      where: {
        userId: user.id,
        isRead: false,
      },
    })

    return c.json({ success: true, data: { count } })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch unread count' }, 500)
  }
})

// Mark notification as read
notifications.put('/:id/read', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const user = c.get('user')

    const notification = await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    return c.json({ success: true, data: notification, message: 'Notification marked as read' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to mark notification as read' }, 500)
  }
})

// Mark all notifications as read
notifications.put('/read-all', authMiddleware, async (c) => {
  try {
    const user = c.get('user')

    await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    return c.json({ success: true, message: 'All notifications marked as read' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to mark notifications as read' }, 500)
  }
})

// Delete notification
notifications.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.notification.delete({ where: { id } })
    return c.json({ success: true, message: 'Notification deleted' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete notification' }, 500)
  }
})

export { notifications as notificationRoutes }