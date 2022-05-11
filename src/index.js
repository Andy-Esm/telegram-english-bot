require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const commandsList = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(
  async (ctx) =>
    await ctx.reply(
      `Привет ${ctx.message.from.first_name} Добро пожаловать в телеграм канал по английскому языку! Введите /help, что бы увидеть список доступных команд`
    )
);
bot.help((ctx) => ctx.reply(commandsList.commands));
bot.hears("Hi", (ctx) => ctx.reply("Hi there"));

//Обработка команды и вывод кнопок
bot.command("links", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Полезные ссылки</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Времена", "btn_times"),
          Markup.button.callback("Идиомы", "btn_idioms"),
          Markup.button.callback("Что-то", "btn_something"),
        ],
        [Markup.button.callback("Неправильные глаголы", "btn_verbs")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

//Обработка кнопок и действий по их нажатию
bot.action("btn_times", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<a href='https://engblog.ru/table-of-tenses'>Таблица времен английского языка</a>",
      { disable_web_page_preview: true }
    );
  } catch (e) {
    console.error(e);
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
