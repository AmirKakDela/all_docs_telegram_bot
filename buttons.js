const commands = require('./commands');

const optionsButton = {
    replay_markup: JSON.stringify({
        inline_keyboard: [
            [{text: commands.typesOfDocuments.text, callback_data: 'typesOffDocuments'}]
        ]
    })
}

const allOptionsButton = {
    reply_markup: JSON.stringify({
        inline_keyboard:
            [
                [{text: 'Паспорт', callback_data: 'Паспорт'}],
                [{text: 'Водительское удостверение', callback_data: 'Водительское удостверение'}],
            ]
    })
}

const buttons_command = {
    initOptionsButton: {
        profile: {
            text: 'Профиль'
        },
        top_up: {
            text: 'Оплата'
        },
        help: {
            text: 'Помощь'
        },
        create: {
            text: 'Создать'
        }
    }
}

const initOptionsButton = {
    reply_markup: JSON.stringify({
        keyboard:
            [
                [{text: buttons_command.initOptionsButton.create.text}],
                [{text: buttons_command.initOptionsButton.top_up.text}, {text: buttons_command.initOptionsButton.help.text}],
                [{text: buttons_command.initOptionsButton.profile.text}]
            ],
        resize_keyboard: true
    }),
}

const newDocumentButton = {
    reply_markup: JSON.stringify({
        remove_keyboard: true,
        inline_keyboard:
            [
                [{text: 'Паспорт', callback_data: 'passport'}],
            ]
    }),
}


module.exports.optionsButton = optionsButton;
module.exports.allOptionsButton = allOptionsButton;
module.exports.initOptionsButton = initOptionsButton;
module.exports.newDocumentButton = newDocumentButton;

module.exports.buttons_command = buttons_command;

