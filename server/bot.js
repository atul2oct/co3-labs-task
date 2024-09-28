// t.me/TapMe_atul_bot
const TelegramBot = require('node-telegram-bot-api');

// Import Supabase client
const supabase = require('./config/database'); 

// Replace with your BotFather token
const token = "7765796238:AAHgmX8pEFidNqsRl5cvF8N00rklJcrCuro";

// Create a bot that uses polling to fetch new updates
const bot = new TelegramBot(token, {polling:true});


// Handle the '/start' command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the TapMe Bot! Click the button below to open the app:', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Open TapMe',
                    web_app: { url: 'https://co3-labs-task.vercel.app/' }
                }
            ]]
        }
    });
});

// Handle other text messages
bot.on('message',(msg)=>{
    console.log("Recieved MSG",msg.text);
})

console.log('Bot is up and running...');
// Export the bot instance to be used in index.js
module.exports = bot;