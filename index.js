const TelegramApi = require('node-telegram-bot-api');


const token = '5541306598:AAHl3WVUhlU3kw_QEYAo832Dwzs-9RFPrL0';

const bot = new TelegramApi(token, { polling: true });
const commands = require('./const/Commands');
const {gameOptions, againOptions} = require('./options/options')
const chats = {};



const generateRndNumber = async (chatId) => {

    await bot.sendMessage(chatId, `Бот загадывает число от 0 до 5, угадайте его!`);
    const rndNumber = Math.floor(Math.random() * 5);
    chats[chatId] = rndNumber;

    await bot.sendMessage(chatId, `Игра началась!`, gameOptions);



}

const start = () => {
    bot.setMyCommands(commands)


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;


        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/p/progambling_stickers/progambling_stickers_006.webp');
            return bot.sendMessage(chatId, `Welcom to my chat`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Youre name: ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (msg.text === '/game') {
            generateRndNumber(chatId);

        }



        return bot.sendMessage(chatId, 'I dont understand youre message');


    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
            return generateRndNumber(chatId);
            
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Вы угадали! Загаданное число было ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Вы не угадали. Загаданное число было ${chats[chatId]}`, againOptions)

        }


        
    })


}

start();


