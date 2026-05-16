import { Hono } from 'hono'
import { prisma } from '@madaproject/db'
import { authMiddleware } from '../middleware/auth'

const notes = new Hono()

// Get all notes
notes.get('/', authMiddleware, async (c) => {
  try {
    const { projectId, type, search } = c.req.query()
    const user = c.get('user')
    
    const notes = await prisma.note.findMany({
      where: {
        OR: [
          { userId: user.id },
          { isPublic: true },
          ...(projectId ? [{ projectId }] : []),
        ],
        ...(type && { type: type as any }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        project: { select: { id: true, name: true } },
      },
      orderBy: { isPinned: 'desc' },
    })

    return c.json({ success: true, data: notes })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch notes' }, 500)
  }
})

// Get note by ID
notes.get('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        user: true,
        project: true,
        versions: { orderBy: { version: 'desc' }, take: 10 },
      },
    })

    if (!note) return c.json({ success: false, error: 'Note not found' }, 404)
    return c.json({ success: true, data: note })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch note' }, 500)
  }
})

// Create note
notes.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const user = c.get('user')
    
    const note = await prisma.note.create({
      data: {
        ...body,
        userId: user.id,
      },
    })

    // Create initial version
    await prisma.noteVersion.create({
      data: {
        noteId: note.id,
        content: body.content,
        version: 1,
        changeType: 'created',
        changedBy: user.id,
      },
    })

    return c.json({ success: true, data: note, message: 'Note created successfully' }, 201)
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create note' }, 500)
  }
})

// Update note
notes.put('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    const user = c.get('user')
    
    // Get current note for versioning
    const currentNote = await prisma.note.findUnique({ where: { id } })
    
    const note = await prisma.note.update({
      where: { id },
      data: body,
    })

    // Create new version if content changed
    if (body.content && body.content !== currentNote?.content) {
      await prisma.noteVersion.create({
        data: {
          noteId: id,
          content: body.content,
          version: (currentNote?.version || 0) + 1,
          changeType: 'updated',
          changedBy: user.id,
        },
      })
    }

    return c.json({ success: true, data: note, message: 'Note updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update note' }, 500)
  }
})

// Delete note
notes.delete('/:id', authMiddleware, async (c) => {
  try {
    const { id } = c.req.param()
    await prisma.note.delete({ where: { id } })
    return c.json({ success: true, message: 'Note deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete note' }, 500)
  }
})

export { notes as noteRoutes }