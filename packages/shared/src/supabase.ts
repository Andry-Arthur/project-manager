/**
 * MadaProject Supabase Client
 * Provides database, auth, and storage integration with Supabase
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Supabase configuration types
export interface SupabaseConfig {
  url: string
  anonKey: string
  serviceKey?: string
}

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          avatar: string | null
          role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER'
          language: 'FRENCH' | 'MALAGASY' | 'ENGLISH'
          timezone: string
          is_active: boolean
          email_verified: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          first_name: string
          last_name: string
          phone?: string | null
          avatar?: string | null
          role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER'
          language?: 'FRENCH' | 'MALAGASY' | 'ENGLISH'
          timezone?: string
          is_active?: boolean
          email_verified?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          avatar?: string | null
          role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER'
          language?: 'FRENCH' | 'MALAGASY' | 'ENGLISH'
          timezone?: string
          is_active?: boolean
          email_verified?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          slug: string
          logo: string | null
          industry: string | null
          size: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE'
          address: string | null
          city: string | null
          region: string | null
          country: string
          phone: string | null
          email: string | null
          website: string | null
          tax_id: string | null
          currency: string
          is_active: boolean
          subscription_plan: string
          subscription_ends: string | null
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo?: string | null
          industry?: string | null
          size?: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE'
          address?: string | null
          city?: string | null
          region?: string | null
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          tax_id?: string | null
          currency?: string
          is_active?: boolean
          subscription_plan?: string
          subscription_ends?: string | null
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo?: string | null
          industry?: string | null
          size?: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE'
          address?: string | null
          city?: string | null
          region?: string | null
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          tax_id?: string | null
          currency?: string
          is_active?: boolean
          subscription_plan?: string
          subscription_ends?: string | null
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          code: string | null
          company_id: string
          status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED' | 'ARCHIVED'
          priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
          type: 'TRADITIONAL' | 'AGILE' | 'KANBAN' | 'SCRUM' | 'WATERFALL'
          budget: number | null
          currency: string
          start_date: string | null
          end_date: string | null
          actual_start_date: string | null
          actual_end_date: string | null
          completion_percent: number
          health_score: number | null
          risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          is_template: boolean
          template_id: string | null
          color: string | null
          icon: string | null
          tags: string | null
          settings: string | null
          ai_generated: boolean
          ai_prompt: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          code?: string | null
          company_id: string
          status?: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED' | 'ARCHIVED'
          priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
          type?: 'TRADITIONAL' | 'AGILE' | 'KANBAN' | 'SCRUM' | 'WATERFALL'
          budget?: number | null
          currency?: string
          start_date?: string | null
          end_date?: string | null
          actual_start_date?: string | null
          actual_end_date?: string | null
          completion_percent?: number
          health_score?: number | null
          risk_level?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          is_template?: boolean
          template_id?: string | null
          color?: string | null
          icon?: string | null
          tags?: string | null
          settings?: string | null
          ai_generated?: boolean
          ai_prompt?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          code?: string | null
          company_id?: string
          status?: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED' | 'ARCHIVED'
          priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
          type?: 'TRADITIONAL' | 'AGILE' | 'KANBAN' | 'SCRUM' | 'WATERFALL'
          budget?: number | null
          currency?: string
          start_date?: string | null
          end_date?: string | null
          actual_start_date?: string | null
          actual_end_date?: string | null
          completion_percent?: number
          health_score?: number | null
          risk_level?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
          is_template?: boolean
          template_id?: string | null
          color?: string | null
          icon?: string | null
          tags?: string | null
          settings?: string | null
          ai_generated?: boolean
          ai_prompt?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          phase_id: string | null
          parent_id: string | null
          title: string
          description: string | null
          status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED'
          priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
          type: 'TASK' | 'SUBTASK' | 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'MEETING' | 'REVIEW' | 'TESTING'
          estimate_hours: number | null
          actual_hours: number | null
          billable_hours: number | null
          hourly_rate: number | null
          budget: number | null
          start_date: string | null
          end_date: string | null
          due_date: string | null
          completed_date: string | null
          completion_percent: number
          score: number | null
          grade: 'A_PLUS' | 'A' | 'A_MINUS' | 'B_PLUS' | 'B' | 'B_MINUS' | 'C_PLUS' | 'C' | 'C_MINUS' | 'D' | 'F' | null
          grading_criteria: string | null
          recurrence: string | null
          color: string | null
          icon: string | null
          tags: string | null
          attachments: number
          comments: number
          subtasks: number
          subtasks_completed: number
          dependencies: string | null
          predecessors: string | null
          order: number
          is_critical: boolean
          is_milestone: boolean
          ai_generated: boolean
          ai_suggestions: string | null
          creator_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          phase_id?: string | null
          parent_id?: string | null
          title: string
          description?: string | null
          status?: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED'
          priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
          type?: 'TASK' | 'SUBTASK' | 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'MEETING' | 'REVIEW' | 'TESTING'
          estimate_hours?: number | null
          actual_hours?: number | null
          billable_hours?: number | null
          hourly_rate?: number | null
          budget?: number | null
          start_date?: string | null
          end_date?: string | null
          due_date?: string | null
          completed_date?: string | null
          completion_percent?: number
          score?: number | null
          grade?: 'A_PLUS' | 'A' | 'A_MINUS' | 'B_PLUS' | 'B' | 'B_MINUS' | 'C_PLUS' | 'C' | 'C_MINUS' | 'D' | 'F' | null
          grading_criteria?: string | null
          recurrence?: string | null
          color?: string | null
          icon?: string | null
          tags?: string | null
          attachments?: number
          comments?: number
          subtasks?: number
          subtasks_completed?: number
          dependencies?: string | null
          predecessors?: string | null
          order?: number
          is_critical?: boolean
          is_milestone?: boolean
          ai_generated?: boolean
          ai_suggestions?: string | null
          creator_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          phase_id?: string | null
          parent_id?: string | null
          title?: string
          description?: string | null
          status?: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED'
          priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
          type?: 'TASK' | 'SUBTASK' | 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'MEETING' | 'REVIEW' | 'TESTING'
          estimate_hours?: number | null
          actual_hours?: number | null
          billable_hours?: number | null
          hourly_rate?: number | null
          budget?: number | null
          start_date?: string | null
          end_date?: string | null
          due_date?: string | null
          completed_date?: string | null
          completion_percent?: number
          score?: number | null
          grade?: 'A_PLUS' | 'A' | 'A_MINUS' | 'B_PLUS' | 'B' | 'B_MINUS' | 'C_PLUS' | 'C' | 'C_MINUS' | 'D' | 'F' | null
          grading_criteria?: string | null
          recurrence?: string | null
          color?: string | null
          icon?: string | null
          tags?: string | null
          attachments?: number
          comments?: number
          subtasks?: number
          subtasks_completed?: number
          dependencies?: string | null
          predecessors?: string | null
          order?: number
          is_critical?: boolean
          is_milestone?: boolean
          ai_generated?: boolean
          ai_suggestions?: string | null
          creator_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Singleton Supabase client instances
let supabaseClient: SupabaseClient<Database> | null = null
let supabaseAdmin: SupabaseClient<Database> | null = null

/**
 * Get Supabase configuration from environment variables
 */
export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.SUPABASE_URL
  const anonKey = process.env.SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_KEY

  if (!url || !anonKey) {
    throw new Error(
      'Supabase configuration missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.'
    )
  }

  return {
    url,
    anonKey,
    serviceKey
  }
}

/**
 * Create a Supabase client for anonymous/public access
 * Use this for client-side operations with user authentication
 */
export function createSupabaseClient(accessToken?: string): SupabaseClient<Database> {
  const config = getSupabaseConfig()

  return createClient<Database>(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
    }
  })
}

/**
 * Get the singleton Supabase client instance
 * Creates a new instance if one doesn't exist
 */
export function getSupabaseClient(accessToken?: string): SupabaseClient<Database> {
  if (!supabaseClient || accessToken) {
    supabaseClient = createSupabaseClient(accessToken)
  }
  return supabaseClient
}

/**
 * Create a Supabase admin client using service role key
 * Use this for server-side operations with elevated privileges
 * WARNING: Never expose the service role key to clients!
 */
export function createSupabaseAdminClient(): SupabaseClient<Database> {
  const config = getSupabaseConfig()

  if (!config.serviceKey) {
    throw new Error('SUPABASE_SERVICE_KEY is required for admin operations')
  }

  return createClient<Database>(config.url, config.serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

/**
 * Get the singleton Supabase admin client instance
 */
export function getSupabaseAdminClient(): SupabaseClient<Database> {
  if (!supabaseAdmin) {
    supabaseAdmin = createSupabaseAdminClient()
  }
  return supabaseAdmin
}

/**
 * Storage bucket helpers for Supabase Storage
 */
export const StorageBuckets = {
  ATTACHMENTS: 'project-attachments',
  AVATARS: 'user-avatars',
  COMPANY_LOGOS: 'company-logos',
  DOCUMENTS: 'project-documents',
  EXPORTS: 'project-exports'
} as const

/**
 * Get storage bucket URL for a file
 */
export function getStorageUrl(bucket: string, path: string): string {
  const config = getSupabaseConfig()
  return `${config.url}/storage/v1/object/public/${bucket}/${path}`
}

/**
 * Helper to upload a file to Supabase Storage
 */
export async function uploadToStorage(
  bucket: string,
  path: string,
  file: Buffer | Blob,
  options?: { contentType?: string; upsert?: boolean }
): Promise<{ url: string; path: string }> {
  const client = getSupabaseAdminClient()
  
  const { data, error } = await client.storage
    .from(bucket)
    .upload(path, file, {
      contentType: options?.contentType,
      upsert: options?.upsert ?? false
    })

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`)
  }

  return {
    url: getStorageUrl(bucket, path),
    path: data.path
  }
}

/**
 * Helper to delete a file from Supabase Storage
 */
export async function deleteFromStorage(bucket: string, path: string): Promise<void> {
  const client = getSupabaseAdminClient()
  
  const { error } = await client.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`)
  }
}

// Export types
export type { SupabaseClient }