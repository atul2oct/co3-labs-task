
// server/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config()
// Replace with your Supabase project URL and Anon key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

async function fetchUser() {
    try {
        const { data: user, error } = await supabase
        .from('users')
        .select()
  
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
  
        console.log("user",user)
    } catch (err) {
        console.error('Fetch failed:', err);
        return null;
    }
  }

//   fetchUser();