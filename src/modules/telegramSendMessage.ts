const TelegramBot = require("node-telegram-bot-api");
export function telegram(_message:string){
    const token = "410535929:AAH4ZeUVjSXvEwgdqw3stNMMJjGIwR2rSnM";
    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, {polling: true});
    let botChatId = 356415536;
    bot.sendMessage(botChatId, _message);
}