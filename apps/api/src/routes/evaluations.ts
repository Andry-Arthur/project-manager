import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const evaluations = new Hono()

// Get all evaluations
evaluations.get('/', authMiddleware, async (c) => {
  try {
    const { projectId, type, status } = c.req.query()
    const user = c.get('user')
    
    const evaluations = await prisma.evaluation.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(type && { type: type as any }),
        ...(status && { status: status as any }),
      },
      include: {
        project: { select: { id: true, name: true } },
        user: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return c.json({ success: true, data: evaluations })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch evaluations' }, 500)
  }
})

// Get evaluation by ID
evaluations.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const evaluation = await prisma.evaluation.findUnique({
      where: { id },
      include: {
        project: true,
        user: true,
      },
    })

    if (!evaluation) return c.json({ success: false, error: 'Evaluation not found' }, 404)
    return c.json({ success: true, data: evaluation })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch evaluation' }, 500)
  }
})

// Create evaluation
evaluations.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const user = c.get('user')
    
    // Calculate overall score from criteria and scores
    const criteria = JSON.parse(body.criteria)
    const scores = JSON.parse(body.scores)
    let totalWeight = 0
    let weightedSum = 0

    for (const [key, criterion] of Object.entries(criteria)) {
      const score = scores[key]?.score || 0
      const weight = criterion.weight || 1
      weightedSum += score * weight
      totalWeight += weight
    }

    const overallScore = totalWeight > 0 ? weightedSum / totalWeight : 0

    const evaluation = await prisma.evaluation.create({
      data: {
        ...body,
        userId: user.id,
        overallScore,
        grade: getGradeFromScore(overallScore),
      },
    })

    return c.json({ success: true, data: evaluation, message: 'Evaluation created successfully' }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create evaluation' }, 500)
  }
})

// Update evaluation
evaluations.put('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    
    // Recalculate score if criteria or scores changed
    if (body.criteria || body.scores) {
      const criteria = JSON.parse(body.criteria || '{}')
      const scores = JSON.parse(body.scores || '{}')
      let totalWeight = 0
      let weightedSum = 0

      for (const [key, criterion] of Object.entries(criteria)) {
        const score = scores[key]?.score || 0
        const weight = criterion.weight || 1
        weightedSum += score * weight
        totalWeight += weight
      }

      body.overallScore = totalWeight > 0 ? weightedSum / totalWeight : 0
      body.grade = getGradeFromScore(body.overallScore)
    }

    const evaluation = await prisma.evaluation.update({
      where: { id },
      data: body,
    })

    return c.json({ success: true, data: evaluation, message: 'Evaluation updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update evaluation' }, 500)
  }
})

// Delete evaluation
evaluations.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.evaluation.delete({ where: { id } })
    return c.json({ success: true, message: 'Evaluation deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete evaluation' }, 500)
  }
})

// Helper function to get grade from score
function getGradeFromScore(score: number): string {
  if (score >= 97) return 'A_PLUS'
  if (score >= 93) return 'A'
  if (score >= 90) return 'A_MINUS'
  if (score >= 87) return 'B_PLUS'
  if (score >= 83) return 'B'
  if (score >= 80) return 'B_MINUS'
  if (score >= 77) return 'C_PLUS'
  if (score >= 73) return 'C'
  if (score >= 70) return 'C_MINUS'
  if (score >= 67) return 'D_PLUS'
  if (score >= 63) return 'D'
  if (score >= 60) return 'D_MINUS'
  return 'F'
}

export { evaluations as evaluationRoutes }