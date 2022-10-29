'use strict';

const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

bot.setMyCommands([
    { command: '/subjects', description: 'Визвати список предметів' },
]);

bot.on('message', msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
        return bot.sendMessage(chatId, 'Вітаємо в LinkStudyBot, тут ти зможеш знаходити посилання на конференції. Для подальшої робити введи /subjects. ');
    };
    if (text === '/subjects') {
        return bot.sendMessage(chatId, 'Список предметів:', subjects);
    };
});

const subjects = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'МатАн', callback_data: 'mathan' }, { text: 'ЛААГ', callback_data: 'laag' }, { text: 'КДМ', callback_data: "kdm" }],
            [{ text: 'Інгліш', callback_data: 'english' }, { text: 'ЕБ ЦЗ', callback_data: 'eb cz' }, { text: 'ОЗСЖ', callback_data: 'ozszh' }],
            [{ text: 'ІНіТ', callback_data: 'init' }, { text: 'ОП', callback_data: 'op' }, { text: 'АСД', callback_data: 'asd' }],
        ]
    })
};

bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (msg.data === 'mathan') {
        return bot.sendMessage(
            chatId,
            `Предмет:  *Математичний аналіз*\n\nПосилання:  https://us04web.zoom.us/j/8067850314\n\nПароль:  C2qR3w`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'laag') {
        return bot.sendMessage(chatId,
            `Предмет:  *Лінійна алгебра та аналітична геометрія*\n\n*Лекції*\n\nПосилання:  https://us02web.zoom.us/j/4911162386?pwd=OU43Q0thZEk1bFhvcFBRUm13VXlZZz09\n\n*Практики*\n\nПосилання:  https://us04web.zoom.us/j/77829671661?pwd=kQ7WH6KOhmv65QC29D4RYAYDcADYYK.1`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'kdm') {
        return bot.sendMessage(chatId,
            `Предмет: *Комп'ютерна дискретна математика*\n\n*Лекції*\n\nПосилання:  https://bbb.comsys.kpi.ua/b/ana-cge-rpx\n\n*Практики*\n\nПосилання:  https://us02web.zoom.us/j/83133164418?pwd=cHZQYnRXdnNObC8zdTZZMXlITEQzdz09`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'english') {
        return bot.sendMessage(chatId,
            `Предмет: *Іноземна мова*\n\nПосилання: https://us04web.zoom.us/j/73136429775?pwd=rGTo1XvelpLc8ov9d1Jm7y3rgmMtPL.1`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'eb cz') {
        return bot.sendMessage(chatId,
            `Предмет: *Екологічна безпека та цивільний захист*\n\nПосилання: https://us02web.zoom.us/j/83522087694?pwd=Tys3QVJWUm8yd0FrZU1GYjFBMi8wdz09`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'ozszh') {
        return bot.sendMessage(chatId,
            `Предмет: *Основи здоровго способу життя*\n\nПосилання: https://us02web.zoom.us/j/4387354937?pwd=R3R3NkpWU09GY3kvanZBeEcrQWZoUT09`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'init') {
        return bot.sendMessage(chatId,
            `Предмет: *Історія науки і техніки*\n\nПосилання: https://meet.google.com/rkh-wzhn-ueg`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'op') {
        return bot.sendMessage(chatId, `Предмет: *Основи програмування*\n\nПосилання: https://meet.google.com/ewv-mnbk-dmt`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
    if (msg.data === 'asd') {
        return bot.sendMessage(chatId,
            `Предмет: *Алгоритми і структури данних\n\nЛекції*\n\nПосилання:  https://bbb.comsys.kpi.ua/b/ana-fxo-y2d-ykw\n\n*Практики*\n\nПосилання:  https://us02web.zoom.us/j/81273958388?pwd=SWN6QmtzK3ZtSllrdk50bUtSYmpVUT09 \n\nПароль:  101010`,
            { parse_mode: 'Markdown', disable_web_page_preview: true }
        );
    };
});


/*bot.onText(/^\/start$/,
    function (msg) {
        const start = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [{ text: 'Визвати список предметів' }],
                ]
            }
        };
        return bot.sendMessage(msg.chat.id, 'Вітаємо в LinkStudyBot, тут ти зможеш знаходити посилання на конференції. Для подальшої робити натисни "Відкрити список предметів".', start)
    });

bot.onText(/Відкрити список предметів/,
    function (msg) {
        const subjects = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [{ text: 'МатАн' }, { text: 'ЛААГ' }, { text: 'КДМ' }],
                    [{ text: 'Інгліш' }, { text: 'ЕБ ЦЗ' }, { text: 'ОЗСЖ' }],
                    [{ text: 'ІНіТ' }, { text: 'ОП' }, { text: 'АСД' }],
                ]
            }
        };
        return bot.sendMessage(msg.chat.id, 'Список предметів:', subjects)
    });

bot.on('message', msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const subjectsAgain = {
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [
                [{ text: 'Відкрити список предметів знову' }],
            ]
        },
        parse_mode: 'Markdown',
        disable_web_page_preview: true,

    };
    if (text === 'МатАн') {
        return bot.sendMessage(chatId, `*Предмет:  Математичний аналіз*\n\nПосилання:  https://us04web.zoom.us/j/8067850314\n\nПароль:  C2qR3w`, subjectsAgain);
    };
    if (text === 'ЛААГ') {
        return bot.sendMessage(chatId, `*Предмет:  Лінійна алгебра та аналітична геометрія*\n\n*Лекції*\n\nПосилання:  https://us02web.zoom.us/j/4911162386?pwd=OU43Q0thZEk1bFhvcFBRUm13VXlZZz09\n\n*Практики*\n\nПосилання:  https://us04web.zoom.us/j/77829671661?pwd=kQ7WH6KOhmv65QC29D4RYAYDcADYYK.1`, subjectsAgain);
    };
    if (text === 'КДМ') {
        return bot.sendMessage(chatId, `*Предмет:  Комп'ютерна дискретна математика*\n\n*Лекції*\n\nПосилання:  https://bbb.comsys.kpi.ua/b/ana-cge-rpx\n\n*Практики*\n\nПосилання:  https://us02web.zoom.us/j/83133164418?pwd=cHZQYnRXdnNObC8zdTZZMXlITEQzdz09`, subjectsAgain);
    };
    if (text === 'Інгліш') {
        return bot.sendMessage(chatId, `*Предмет:  Іноземна мова*\n\nПосилання: https://us04web.zoom.us/j/73136429775?pwd=rGTo1XvelpLc8ov9d1Jm7y3rgmMtPL.1`, subjectsAgain);
    };
    if (text === 'ЕБ ЦЗ') {
        return bot.sendMessage(chatId, `*Предмет:  Екологічна безпека та цивільний захист*\n\nПосилання: https://us02web.zoom.us/j/83522087694?pwd=Tys3QVJWUm8yd0FrZU1GYjFBMi8wdz09`, subjectsAgain);
    };
    if (text === 'ОЗСЖ') {
        return bot.sendMessage(chatId, `*Предмет:  Основи здоровго способу життя*\n\nПосилання: https://us02web.zoom.us/j/4387354937?pwd=R3R3NkpWU09GY3kvanZBeEcrQWZoUT09`, subjectsAgain);
    };
    if (text === 'ІНіТ') {
        return bot.sendMessage(chatId, `*Предмет:  Історія науки і техніки*\n\nПосилання: https://meet.google.com/rkh-wzhn-ueg`, subjectsAgain);
    };
    if (text === 'ОП') {
        return bot.sendMessage(chatId, `*Предмет:  Основи програмування*\n\nПосилання: https://meet.google.com/ewv-mnbk-dmt`, subjectsAgain);
    };
    if (text === 'АСД') {
        return bot.sendMessage(chatId, `*Предмет:  Алгоритми і структури данних*\n\n*Лекції*\n\nПосилання:  https://bbb.comsys.kpi.ua/b/ana-fxo-y2d-ykw\n\n*Практики*\n\nПосилання:  https://us02web.zoom.us/j/81273958388?pwd=SWN6QmtzK3ZtSllrdk50bUtSYmpVUT09 \n\nПароль:  101010`, subjectsAgain);
    };
});
*/