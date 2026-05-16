import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'
import OpenAI from 'openai'

const ai = new Hono()

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

// Generate project with AI
ai.post('/generate-project', authMiddleware, async (c) => {
  try {
    if (!openai) {
      return c.json({
        success: false,
        error: 'OpenAI API key not configured',
      }, 503)
    }

    const body = await c.req.json()
    const { description, requirements, deadline, budget, teamSize, industry } = body
    const user = c.get('user')

    // Log AI interaction
    const interaction = await prisma.aiInteraction.create({
      data: {
        userId: user.id,
        type: 'PROJECT_GENERATION',
        input: description,
        status: 'PROCESSING',
      },
    })

    // Generate project structure using OpenAI
    const prompt = `Based on the following project description, generate a detailed project structure with phases, tasks, and milestones.

Description: ${description}
Requirements: ${requirements?.join(', ') || 'None specified'}
Deadline: ${deadline || 'Not specified'}
Budget: ${budget ? budget + ' MGA' : 'Not specified'}
Team Size: ${teamSize || 'Not specified'}
Industry: ${industry || 'General'}

Return a JSON object with the following structure:
{
  "projectName": "string",
  "description": "string",
  "phases": [
    { "name": "string", "description": "string", "order": number, "durationWeeks": number }
  ],
  "tasks": [
    { "title": "string", "description": "string", "phaseIndex": number, "estimateHours": number, "priority": "CRITICAL|HIGH|MEDIUM|LOW", "type": "TASK|FEATURE|MEETING|TESTING" }
  ],
  "milestones": [
    { "name": "string", "description": "string", "phaseIndex": number }
  ],
  "estimatedBudget": number,
  "estimatedDuration": number,
  "confidence": number
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert project manager specializing in creating detailed project plans for software development and business projects.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const responseText = completion.choices[0]?.message?.content || '{}'
    const generatedData = JSON.parse(responseText)

    // Update interaction with output
    await prisma.aiInteraction.update({
      where: { id: interaction.id },
      data: {
        output: responseText,
        status: 'COMPLETED',
        confidence: generatedData.confidence || 0.8,
        tokensUsed: completion.usage?.total_tokens || 0,
      },
    })

    return c.json({
      success: true,
      data: generatedData,
      interactionId: interaction.id,
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return c.json({
      success: false,
      error: 'Failed to generate project structure',
    }, 500)
  }
})

// Process voice command
ai.post('/voice-command', authMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const { command, context } = body
    const user = c.get('user')

    // Log AI interaction
    const interaction = await prisma.aiInteraction.create({
      data: {
        userId: user.id,
        type: 'VOICE_COMMAND',
        input: command,
        context: JSON.stringify(context),
        status: 'PROCESSING',
      },
    })

    // Simple command parsing (in production, use more sophisticated NLP)
    const result = parseVoiceCommand(command, context)

    await prisma.aiInteraction.update({
      where: { id: interaction.id },
      data: {
        output: JSON.stringify(result),
        status: 'COMPLETED',
      },
    })

    return c.json({
      success: true,
      data: result,
      interactionId: interaction.id,
    })
  } catch (error) {
    console.error('Voice command error:', error)
    return c.json({
      success: false,
      error: 'Failed to process voice command',
    }, 500)
  }
})

// Get AI suggestions for a project
ai.get('/suggestions/:projectId', authMiddleware, async (c) => {
  try {
    const { projectId } = c.req.param()
    const user = c.get('user')

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: true,
        milestones: true,
        evaluations: true,
      },
    })

    if (!project) {
      return c.json({ success: false, error: 'Project not found' }, 404)
    }

    // Generate suggestions based on project data
    const suggestions = generateProjectSuggestions(project)

    return c.json({
      success: true,
      data: suggestions,
    })
  } catch (error) {
    console.error('Suggestions error:', error)
    return c.json({
      success: false,
      error: 'Failed to generate suggestions',
    }, 500)
  }
})

// Helper function to parse voice commands
function parseVoiceCommand(command: string, context: any) {
  const lowerCommand = command.toLowerCase()

  // Task creation commands
  if (lowerCommand.includes('créer') || lowerCommand.includes('create')) {
    if (lowerCommand.includes('tâche') || lowerCommand.includes('task')) {
      return {
        action: 'create_task',
        parsed: {
          title: extractTaskTitle(command),
          assignee: extractAssignee(command),
          dueDate: extractDueDate(command),
        },
      }
    }
  }

  // Project navigation commands
  if (lowerCommand.includes('afficher') || lowerCommand.includes('show')) {
    if (lowerCommand.includes('projet') || lowerCommand.includes('project')) {
      return { action: 'navigate_to_project' }
    }
    if (lowerCommand.includes('tâches') || lowerCommand.includes('tasks')) {
      return { action: 'navigate_to_tasks' }
    }
  }

  // Default response
  return {
    action: 'unknown',
    message: 'Commande non reconnue. Veuillez réessayer.',
  }
}

function extractTaskTitle(command: string): string {
  // Simple extraction - in production use NLP
  const match = command.match(/(?:créer|create)\s+(?:une?\s+)?tâche\s+(?:pour\s+)?(.+?)(?:\s+pour|\s+due|$)/i)
  return match ? match[1].trim() : 'Nouvelle tâche'
}

function extractAssignee(command: string): string | null {
  const match = command.match(/pour\s+([a-zA-ZÀ-ÿ]+)/i)
  return match ? match[1] : null
}

function extractDueDate(command: string): string | null {
  if (command.includes('demain') || command.includes('tomorrow')) return 'tomorrow'
  if (command.includes('vendredi') || command.includes('friday')) return 'friday'
  if (command.includes('lundi') || command.includes('monday')) return 'monday'
  return null
}

function generateProjectSuggestions(project: any) {
  const suggestions = []

  // Check for overdue tasks
  const overdueTasks = project.tasks.filter((t: any) => 
    t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED'
  )
  if (overdueTasks.length > 0) {
    suggestions.push({
      type: 'warning',
      title: 'Tâches en retard',
      message: `${overdueTasks.length} tâche(s) sont en retard`,
      action: 'view_overdue_tasks',
    })
  }

  // Check project health
  if (project.completionPercent < 50 && project.healthScore && project.healthScore < 70) {
    suggestions.push({
      type: 'info',
      title: 'Projet en difficulté',
      message: 'Le projet semble prendre du retard. Considérez ajouter des ressources.',
      action: 'review_project_plan',
    })
  }

  // Upcoming milestones
  const upcomingMilestones = project.milestones.filter((m: any) =>
    new Date(m.dueDate) > new Date() && new Date(m.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  )
  if (upcomingMilestones.length > 0) {
    suggestions.push({
      type: 'reminder',
      title: 'Jalons à venir',
      message: `${upcomingMilestones.length} jalon(s) dans les 7 prochains jours`,
      action: 'view_milestones',
    })
  }

  return suggestions
}

export { ai as aiRoutes }