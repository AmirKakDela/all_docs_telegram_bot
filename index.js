const TelegramApi = require('node-telegram-bot-api');
const token = '5316952774:AAGZuBjf80e2QwJ5-ZbdD75NgFEuZfoIg4E';

const bot = new TelegramApi(token, {polling: true})

const commands = {
    start: {
        command: '/start',
        text: 'Начать работу с ботом',
        description: 'Начало работы с ботом'
    },
    typesOfDocuments: {
        command: '/all_documents',
        text: 'Получить список всех документов',
        description: 'Получить список всех документов'
    },
}

const getOptionsButton = {
    replay_markup: JSON.stringify({
        inline_keyboard: [
            [{text: commands.typesOfDocuments.text, callback_data: 'typesOffDocuments'}]
        ]
    })
}

const allOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:
            [
                [{text: 'Паспорт', callback_data: 'Паспорт'}],
                [{text: 'Водительское удостверение', callback_data: 'Водительское удостверение'}],
            ]
    })
}


bot.setMyCommands([
    {command: commands.start.command, description: commands.start.description},
    {command: commands.typesOfDocuments.command, description: commands.typesOfDocuments.description}
])

bot.on('message', msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === commands.start.command) {
        bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`)
        return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/032/87c/03287c53-b637-4f94-b606-a898ccd91501/192/13.webp')
    }

    if (text === commands.typesOfDocuments.command) {
        return bot.sendMessage(chatId, 'ВСЕ ДОКУМЕНТЫ', allOptions)
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю');
})

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    return bot.sendMessage(chatId, `Позже здесь будет фото ${data}`)
})

