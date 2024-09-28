// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// require('dotenv').config(); // Load environment variables from .env file
// REACT_APP_SUPABASE_URL = 'https://leqcjcrpckeldwbpgmig.supabase.co'

// REACT_APP_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcWNqY3JwY2tlbGR3YnBnbWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1MTgzNzYsImV4cCI6MjA0MzA5NDM3Nn0.pfy7raUIbrMlDkvPhI7mgEVUrSgtXSAwA3hg0osXuls'
// Use the correct environment variable names
const supabaseUrl = 'https://leqcjcrpckeldwbpgmig.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcWNqY3JwY2tlbGR3YnBnbWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1MTgzNzYsImV4cCI6MjA0MzA5NDM3Nn0.pfy7raUIbrMlDkvPhI7mgEVUrSgtXSAwA3hg0osXuls'
console.log(supabaseUrl)
export const supabase = createClient(supabaseUrl, supabaseKey);

