require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api');
const commands = require("./commands");
const buttons = require("./buttons");
const sequelize = require('./database/db');
const UserModel = require('./database/models');
const texts = require('./utils/texts');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramApi(token, {polling: true})


const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync();
    } catch (e) {
        console.log('Подключение к бд ошибка', e)
    }

    bot.setMyCommands([
        {command: commands.start.command, description: commands.start.description},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            switch (text) {
                case commands.start.command:
                    const user = await UserModel.findOne({chatId})
                    console.log(chatId)
                    if (!user) {
                        await UserModel.create({chatId, name: msg.chat.first_name ?? msg.chat.username})
                    }
                    return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`, buttons.initOptionsButton)

                case buttons.buttons_command.initOptionsButton.create.text:
                    return bot.sendMessage(chatId, 'Выберите документ')

                case buttons.buttons_command.initOptionsButton.top_up.text:
                    return bot.sendMessage(chatId, 'Оплата')

                case buttons.buttons_command.initOptionsButton.help.text:
                    return bot.sendMessage(chatId, 'Помощь')

                case buttons.buttons_command.initOptionsButton.profile.text:
                    const userProfile = await UserModel.findOne({chatId})
                    return bot.sendMessage(chatId, texts.help(userProfile), {parse_mode: 'HTML'});

                default:
                    return bot.sendMessage(chatId, 'Я тебя не понимаю');
            }
        } catch (e) {
            bot.sendMessage(chatId, 'У бота произошла ошибка :(');
        }


    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        switch (msg.data) {
            case 'top_up':
                return
            case '':
                return bot.sendMessage(chatId, `Позже здесь будет фото ${data}`)
            case 'create_document':
                return bot.sendMessage(chatId, 'dsadas', buttons.newDocumentButton)
            case 'passport':
                return bot.sendMessage(chatId, 'privet', buttons.newDocumentButton)
            default:
                return
        }
    })
}

start();



