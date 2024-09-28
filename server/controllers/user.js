const supabase = require('../config/database'); // Import the Supabase client

// Example route to get user info from the database
exports.getUser = async (req, res) => {
    try {

        // Get telegramId from query params
        const telegramId = req.query.telegramId;
    
        if (!telegramId) {
          return res.status(400).json({ message: 'Telegram ID is required' });
        }

        // Fetch user data from Supabase
        let { data: user, error } = await supabase
          .from('User')
          .select('*')
          .eq('telegramId', telegramId)
          .single();

        if (error && error.code === 'PGRST116') { // User not found
            // Create a new user if not found
            const { data: newUser, insertError } = await supabase
              .from('User')
              .insert([{ telegramId, coins: 0 }])
              .single();

            if (insertError) {
                throw insertError;
            }

            user = newUser;
        }
    
        // Respond with user info
        res.status(200).json({
            success:true,
            telegramId: user.telegramId,
            coins: user.coins,
            message:"fetch coin successfully"

        });
      } catch (error) {
        console.error('Error fetching or creating user:', error);
        res.status(500).json({ 
            success:false,
            message: 'Server error' 
        });
        
      }
    };
    
    
    
    
    
    
    
    
    