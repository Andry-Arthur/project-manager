import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const projects = new Hono()

// Get all projects
projects.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { search, status, priority } = c.req.query()
    
    const projects = await prisma.project.findMany({
      where: {
        company: {
          OR: [
            { ownerId: user.id },
            { members: { some: { userId: user.id, isActive: true } } },
          ],
        },
        isActive: true,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(status && { status: status as any }),
        ...(priority && { priority: priority as any }),
      },
      include: {
        company: { select: { name: true, slug: true } },
        tasks: { select: { id: true, status: true } },
        milestones: { select: { id: true, name: true, dueDate: true, status: true } },
        phases: { select: { id: true, name: true, completionPercent: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return c.json({ success: true, data: projects })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch projects' }, 500)
  }
})

// Get project by ID
projects.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        company: true,
        tasks: {
          include: {
            assignees: { select: { id: true, firstName: true, lastName: true, avatar: true } },
            phase: { select: { id: true, name: true } },
          },
        },
        phases: { include: { tasks: true } },
        milestones: true,
        evaluations: true,
        notes: true,
      },
    })

    if (!project) return c.json({ success: false, error: 'Project not found' }, 404)
    return c.json({ success: true, data: project })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch project' }, 500)
  }
})

// Create project
projects.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const user = c.get('user')
    
    const project = await prisma.project.create({
      data: {
        ...body,
        companyId: body.companyId || user.companyId,
        code: `PROJ-${new Date().getFullYear()}-${String(await prisma.project.count() + 1).padStart(3, '0')}`,
      },
    })

    return c.json({ success: true, data: project, message: 'Project created successfully' }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create project' }, 500)
  }
})

// Update project
projects.put('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    
    const project = await prisma.project.update({
      where: { id },
      data: body,
    })

    return c.json({ success: true, data: project, message: 'Project updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update project' }, 500)
  }
})

// Delete project
projects.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.project.delete({ where: { id } })
    return c.json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete project' }, 500)
  }
})

export { projects as projectRoutes }