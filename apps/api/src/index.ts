import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { errorHandler } from 'hono/error-handler'
import helmet from 'hono/helmet'
import { env } from 'hono/adapter'
import { connectDB, disconnectDB } from '@madaproject/db'

import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/users'
import { companyRoutes } from './routes/companies'
import { projectRoutes } from './routes/projects'
import { taskRoutes } from './routes/tasks'
import { noteRoutes } from './routes/notes'
import { evaluationRoutes } from './routes/evaluations'
import { aiRoutes } from './routes/ai'
import { notificationRoutes } from './routes/notifications'
import { templateRoutes } from './routes/templates'

const app = new Hono()

// Environment variables
const { PORT = 3001, NODE_ENV = 'development' } = env(app)

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}))
app.use('*', helmet())

// Error handling
app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({
    success: false,
    error: err.message,
    status: err.status || 500,
  }, err.status || 500)
})

// Health check
app.get('/health', (c) => {
  return c.json({
    success: true,
    message: 'MadaProject API is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  })
})

// API Routes
const api = new Hono().basePath('/api/v1')

// Public routes
api.route('/auth', authRoutes)

// Protected routes (middleware will be added)
api.route('/users', userRoutes)
api.route('/companies', companyRoutes)
api.route('/projects', projectRoutes)
api.route('/tasks', taskRoutes)
api.route('/notes', noteRoutes)
api.route('/evaluations', evaluationRoutes)
api.route('/ai', aiRoutes)
api.route('/notifications', notificationRoutes)
api.route('/templates', templateRoutes)

// Mount API routes
app.route('/', api)

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Route not found',
    path: c.req.path,
  }, 404)
})

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB()
    console.log('✅ Database connected')

    serve(
      {
        fetch: app.fetch,
        port: Number(PORT),
      },
      (info) => {
        console.log(`🚀 MadaProject API server started on port ${info.port}`)
        console.log(`📖 API Documentation: http://localhost:${info.port}/api/v1`)
        console.log(`💚 Health check: http://localhost:${info.port}/health`)
      }
    )
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await disconnectDB()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await disconnectDB()
  process.exit(0)
})

startServer()

export default app