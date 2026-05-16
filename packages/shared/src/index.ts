// Shared types and utilities for MadaProject

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Pagination params
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

// Project types
export interface ProjectFilters {
  status?: string[]
  priority?: string[]
  type?: string[]
  startDate?: Date
  endDate?: Date
  companyId?: string
  search?: string
}

export interface TaskFilters {
  status?: string[]
  priority?: string[]
  type?: string[]
  assigneeId?: string
  projectId?: string
  phaseId?: string
  dueDate?: Date
  search?: string
}

// Grading types
export interface GradingCriteria {
  quality: { weight: number; maxScore: number }
  timeline: { weight: number; maxScore: number }
  budget: { weight: number; maxScore: number }
  communication: { weight: number; maxScore: number }
  innovation?: { weight: number; maxScore: number }
  riskManagement?: { weight: number; maxScore: number }
}

export interface GradingScore {
  criteria: string
  score: number
  weight: number
  comment?: string
}

// AI types
export interface AIProjectGenerationRequest {
  description: string
  requirements?: string[]
  deadline?: Date
  budget?: number
  teamSize?: number
  industry?: string
}

export interface AIProjectGenerationResponse {
  projectName: string
  description: string
  phases: Array<{
    name: string
    description: string
    order: number
    startDate: Date
    endDate: Date
  }>
  tasks: Array<{
    title: string
    description: string
    phaseId: string
    estimateHours: number
    priority: string
    type: string
  }>
  milestones: Array<{
    name: string
    description: string
    dueDate: Date
  }>
  estimatedBudget: number
  estimatedDuration: number
  confidence: number
}

// Notification types
export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  voice: boolean
  taskAssigned: boolean
  taskDue: boolean
  taskOverdue: boolean
  projectUpdate: boolean
  mention: boolean
  evaluationDue: boolean
}

// Localization types
export interface Translation {
  key: string
  fr: string
  mg: string
  en: string
}

export const SUPPORTED_LANGUAGES = ['FRENCH', 'MALAGASY', 'ENGLISH'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

// Malagasy translations for common terms
export const malagasyTranslations: Record<string, Translation> = {
  project: {
    key: 'project',
    fr: 'Projet',
    mg: 'Tetik\'asa',
    en: 'Project',
  },
  task: {
    key: 'task',
    fr: 'Tâche',
    mg: 'Asa',
    en: 'Task',
  },
  milestone: {
    key: 'milestone',
    fr: 'Jalon',
    mg: 'Tohana',
    en: 'Milestone',
  },
  deadline: {
    key: 'deadline',
    fr: 'Date limite',
    mg: 'Daty farany',
    en: 'Deadline',
  },
  completed: {
    key: 'completed',
    fr: 'Terminé',
    mg: 'Vita',
    en: 'Completed',
  },
  in_progress: {
    key: 'in_progress',
    fr: 'En cours',
    mg: 'Mandeha',
    en: 'In Progress',
  },
  pending: {
    key: 'pending',
    fr: 'En attente',
    mg: 'Miandry',
    en: 'Pending',
  },
}

// Utility functions
export function formatDate(date: Date | string, locale: SupportedLanguage = 'FRENCH'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const localeMap: Record<SupportedLanguage, string> = {
    FRENCH: 'fr-FR',
    MALAGASY: 'fr-FR', // Malagasy uses French date format
    ENGLISH: 'en-US',
  }
  return dateObj.toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatCurrency(amount: number, currency: string = 'MGA'): string {
  const localeMap: Record<string, string> = {
    MGA: 'fr-MG',
    USD: 'en-US',
    EUR: 'fr-FR',
  }
  return new Intl.NumberFormat(localeMap[currency] || 'fr-FR', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function getGradeFromScore(score: number): string {
  if (score >= 97) return 'A+'
  if (score >= 93) return 'A'
  if (score >= 90) return 'A-'
  if (score >= 87) return 'B+'
  if (score >= 83) return 'B'
  if (score >= 80) return 'B-'
  if (score >= 77) return 'C+'
  if (score >= 73) return 'C'
  if (score >= 70) return 'C-'
  if (score >= 67) return 'D+'
  if (score >= 63) return 'D'
  if (score >= 60) return 'D-'
  return 'F'
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Re-export Supabase utilities
export * from './supabase'
