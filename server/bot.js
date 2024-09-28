// t.me/TapMe_atul_bot
const TelegramBot = require('node-telegram-bot-api');

// Import Supabase client
const supabase = require('./config/database'); 

// Replace with your BotFather token
const token = "7765796238:AAHgmX8pEFidNqsRl5cvF8N00rklJcrCuro";

// Create a bot that uses polling to fetch new updates
const bot = new TelegramBot(token, {polling:true});

async function fetchUser(id) {
  try {
    
      const { data: user, error } = await supabase
      .from('User')
      .select()
      console.log("1------------")
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
async function fetchUser2() {
  try {
    
      const { data: user, error } = await supabase
      .from('users')
      .select()
      console.log("2------------")
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




// Handle the '/start' command
bot.onText(/\/start/, async (msg) => {
  const telegramId = msg.chat.id;
  console.log('inside bot')
  fetchUser(telegramId);
  fetchUser2();

  // try {
  //     // Check if the user exists in Supabase
  //     // Fetch user info from Supabase
  //     const { data: user, error } = await supabase
  //     .from('User')
  //     .select('*')
  //     .eq('telegramId', telegramId)
  //     .single(); // Use single to fetch a single user

  //     console.log('Fetched user:', user); // Log the fetched user for debugging

  //     if (error && error.code !== 'PGRST116') { // 'PGRST116' indicates no rows found
  //         console.error('Error fetching user:', error);
  //         bot.sendMessage(telegramId, 'An unexpected error occurred. Please try again later.');
  //         return;
  //     }

  //     // If no user found, create a new user with 0 coins
  //     if (!user || error) {
  //       const { data: newUser, error: insertError } = await supabase
  //             .from('User')
  //             .insert([{ telegramId, coins: 0 }]);

  //         if (insertError) {
  //           console.error('Error inserting new user:', insertError);
  //           bot.sendMessage(telegramId, 'There was an error creating your account. Please try again later.');
  //           return;
  //         }

  //       // Send welcome message with initial coin balance
  //       bot.sendMessage(telegramId, `Welcome! Your current coin balance is ${newUser.coins}.`);
  //     } else {
  //         // If user exists, show the current coin balance
  //         const initialBalance = user.coins;
  //         bot.sendMessage(telegramId, `Welcome back! Your current coin balance is ${initialBalance}.`);
  //     }
  // } catch (error) {
  //     console.log('Error handling /start command:', error);
  //     bot.sendMessage(telegramId, 'Sorry, something went wrong. Please try again later.');
  // }
});

// Handle other text messages
bot.on('message',(msg)=>{
    console.log("Recieved MSG",msg.text);
})

console.log('Bot is up and running...');
// Export the bot instance to be used in index.js
module.exports = bot;