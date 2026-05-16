import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const templates = new Hono()

// Get all templates
templates.get('/', authMiddleware, async (c) => {
  try {
    const { industry, type, search } = c.req.query()
    const user = c.get('user')
    
    const templates = await prisma.projectTemplate.findMany({
      where: {
        OR: [
          { isPublic: true },
          { companyId: user.companyId },
          { createdBy: user.id },
        ],
        ...(industry && { industry }),
        ...(type && { type: type as any }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        company: { select: { id: true, name: true } },
      },
      orderBy: { usageCount: 'desc' },
    })

    return c.json({ success: true, data: templates })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch templates' }, 500)
  }
})

// Get template by ID
templates.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const template = await prisma.projectTemplate.findUnique({
      where: { id },
      include: {
        company: true,
      },
    })

    if (!template) return c.json({ success: false, error: 'Template not found' }, 404)
    return c.json({ success: true, data: template })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch template' }, 500)
  }
})

// Create template from project
templates.post('/from-project', authMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const { projectId, name, description, industry, isPublic } = body
    const user = c.get('user')

    // Get project data
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        phases: true,
        tasks: true,
        milestones: true,
      },
    })

    if (!project) return c.json({ success: false, error: 'Project not found' }, 404)

    // Create template structure
    const template = await prisma.projectTemplate.create({
      data: {
        name,
        description,
        industry,
        type: project.type,
        structure: JSON.stringify({
          phases: project.phases.map(p => ({ name: p.name, description: p.description, order: p.order })),
        }),
        defaultTasks: JSON.stringify(
          project.tasks.map(t => ({
            title: t.title,
            description: t.description,
            estimateHours: t.estimateHours,
            priority: t.priority,
            type: t.type,
          }))
        ),
        defaultPhases: JSON.stringify(
          project.phases.map(p => ({
            name: p.name,
            description: p.description,
            order: p.order,
          }))
        ),
        defaultMilestones: JSON.stringify(
          project.milestones.map(m => ({
            name: m.name,
            description: m.description,
          }))
        ),
        isPublic: isPublic || false,
        companyId: user.companyId,
        createdBy: user.id,
      },
    })

    return c.json({ success: true, data: template, message: 'Template created successfully' }, 201)
  } catch (error) {
    console.error('Create template error:', error)
    return c.json({ success: false, error: 'Failed to create template' }, 500)
  }
})

// Use template to create project
templates.post('/:id/use', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    const { projectName, overrides } = body
    const user = c.get('user')

    const template = await prisma.projectTemplate.findUnique({
      where: { id },
    })

    if (!template) return c.json({ success: false, error: 'Template not found' }, 404)

    // Create project from template
    const project = await prisma.project.create({
      data: {
        name: projectName || `${template.name} - Copy`,
        description: template.description,
        type: template.type,
        companyId: user.companyId || user.id,
        status: 'PLANNING',
        priority: 'MEDIUM',
        currency: 'MGA',
        templateId: id,
        aiGenerated: false,
        code: `PROJ-${new Date().getFullYear()}-${String(await prisma.project.count() + 1).padStart(3, '0')}`,
      },
    })

    // Update template usage count
    await prisma.projectTemplate.update({
      where: { id },
      data: { usageCount: { increment: 1 } },
    })

    return c.json({ success: true, data: project, message: 'Project created from template' }, 201)
  } catch (error) {
    console.error('Use template error:', error)
    return c.json({ success: false, error: 'Failed to create project from template' }, 500)
  }
})

// Delete template
templates.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.projectTemplate.delete({ where: { id } })
    return c.json({ success: true, message: 'Template deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete template' }, 500)
  }
})

export { templates as templateRoutes }