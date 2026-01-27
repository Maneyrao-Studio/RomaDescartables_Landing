import { createClient, SupabaseClient } from '@supabase/supabase-js'

function getSupabaseEnvironment() {
  const supabaseUrl = process.env.NEXT_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceKey
  }
}

let supabaseInstance: SupabaseClient | null = null
let supabaseAdminInstance: SupabaseClient | null = null

export const getSupabaseClient = (useAdmin = false): SupabaseClient => {
  const { supabaseUrl, supabaseAnonKey, supabaseServiceKey } = getSupabaseEnvironment()

  if (useAdmin) {
    if (!supabaseAdminInstance) {
      supabaseAdminInstance = createClient(
        supabaseUrl,
        supabaseServiceKey || supabaseAnonKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )
    }
    return supabaseAdminInstance
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export const supabase = getSupabaseClient()
export const supabaseAdmin = getSupabaseClient(true)