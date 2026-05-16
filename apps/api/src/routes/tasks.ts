import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const tasks = new Hono()

// Get all tasks
tasks.get('/', authMiddleware, async (c) => {
  try {
    const { projectId, status, priority, assigneeId, search } = c.req.query()
    
    const tasks = await prisma.task.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(status && { status: status as any }),
        ...(priority && { priority: priority as any }),
        ...(assigneeId && { assignees: { some: { id: assigneeId } } }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        project: { select: { id: true, name: true } },
        phase: { select: { id: true, name: true } },
        assignees: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        creator: { select: { id: true, firstName: true, lastName: true } },
        subtasks: { select: { id: true, title: true, completionPercent: true } },
      },
      orderBy: { order: 'asc' },
    })

    return c.json({ success: true, data: tasks })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch tasks' }, 500)
  }
})

// Get task by ID
tasks.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        phase: true,
        assignees: true,
        creator: true,
        subtasks: true,
        comments: { include: { user: true } },
        attachments: true,
        grades: true,
        timeEntries: true,
      },
    })

    if (!task) return c.json({ success: false, error: 'Task not found' }, 404)
    return c.json({ success: true, data: task })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch task' }, 500)
  }
})

// Create task
tasks.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const user = c.get('user')
    
    const task = await prisma.task.create({
      data: {
        ...body,
        creatorId: user.id,
        assignees: body.assigneeIds ? { connect: body.assigneeIds.map((id: string) => ({ id })) } : undefined,
      },
    })

    return c.json({ success: true, data: task, message: 'Task created successfully' }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create task' }, 500)
  }
})

// Update task
tasks.put('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    
    const task = await prisma.task.update({
      where: { id },
      data: body,
    })

    return c.json({ success: true, data: task, message: 'Task updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update task' }, 500)
  }
})

// Delete task
tasks.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.task.delete({ where: { id } })
    return c.json({ success: true, message: 'Task deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete task' }, 500)
  }
})

// Add comment to task
tasks.post('/:id/comments', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const { content } = await c.req.json()
    const user = c.get('user')
    
    const comment = await prisma.taskComment.create({
      data: { taskId: id, userId: user.id, content },
    })

    return c.json({ success: true, data: comment, message: 'Comment added successfully' }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to add comment' }, 500)
  }
})

export { tasks as taskRoutes }