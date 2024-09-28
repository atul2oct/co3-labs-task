// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

require('dotenv').config(); // Load environment variables from .env file

// Use the correct environment variable names
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY; 
console.log(supabaseUrl)
export const supabase = createClient(supabaseUrl, supabaseKey);

