import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pbvqmzqdbeosfwdceupw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBidnFtenFkYmVvc2Z3ZGNldXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MDQ1MDMsImV4cCI6MjAwNzE4MDUwM30.Z7XgqfXaJyjhUODTb1yY8U2sIX4utGIMtJ-DjFzdGH0";

export default createClient(supabaseUrl, supabaseAnonKey);