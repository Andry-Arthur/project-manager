import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const companies = new Hono()

// Get all companies for current user
companies.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const companies = await prisma.company.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id, isActive: true } } },
        ],
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        industry: true,
        size: true,
        city: true,
        country: true,
        currency: true,
        ownerId: true,
        createdAt: true,
      },
    })
    return c.json({ success: true, data: companies })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch companies' }, 500)
  }
})

// Get company by ID
companies.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        members: {
          where: { isActive: true },
          include: {
            user: {
              select: { id: true, email: true, firstName: true, lastName: true, avatar: true },
            },
          },
        },
        projects: {
          where: { status: { in: ['ACTIVE', 'PLANNING'] } },
          take: 5,
        },
      },
    })
    if (!company) return c.json({ success: false, error: 'Company not found' }, 404)
    return c.json({ success: true, data: company })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch company' }, 500)
  }
})

// Create company
companies.post('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const company = await prisma.company.create({
      data: {
        ...body,
        ownerId: user.id,
      },
    })
    return c.json({ success: true, data: company, message: 'Company created successfully' }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create company' }, 500)
  }
})

export { companies as companyRoutes }