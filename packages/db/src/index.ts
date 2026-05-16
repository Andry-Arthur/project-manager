import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export * from '@prisma/client'

// Helper functions
export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export async function disconnectDB() {
  await prisma.$disconnect()
  console.log('📱 Database disconnected')
}

// Transaction helper
export function runInTransaction<T>(fn: (tx: Omit<PrismaClient, '$connect' | '$disconnect'>) => Promise<T>) {
  return prisma.$transaction(fn)
}