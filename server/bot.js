// t.me/TapMe_atul_bot
const TelegramBot = require('node-telegram-bot-api');
const User = require('./models/user');

// Replace with your BotFather token
const token = "7765796238:AAHgmX8pEFidNqsRl5cvF8N00rklJcrCuro";

// Create a bot that uses polling to fetch new updates
const bot = new TelegramBot(token, {polling:true});

// Handle the '/start' command
bot.onText(/\/start/, async (msg) => {
    const telegramId = msg.chat.id;
    const user = await User.findOne({ telegramId });
    const initialBalance = user ? user.coins : 0;
    bot.sendMessage(telegramId, `Welcome! Your current coin balance is ${initialBalance}`);
  });

// Handle other text messages
bot.on('message',(msg)=>{
    console.log("Recieved MSG",msg.text);
})

console.log('Bot is up and running...');