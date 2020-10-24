const TelegramBot = require('node-telegram-bot-api');
const Config = require('./config.json');
const Fs = require('fs')


console.log(
  "   _,\n" +
  "  <\\ `.\n" +
  "    `. `~'^----.._            _\n" +
  "     `. ,    _,  `.`-.       ' )\n" +
  "     , ),'-~'(   / ` .`-.___,-'\n" +
  "    ( /;      `'\\,    `\n" +
  "    _/'       _//       `.    littlecheetah\n" +
  "   ' \"       ' \"       ' `\n"
);


if (Config.bottoken.length === 0) {
  console.log("");
  console.log("");
  console.log("no bottoken found in config.json!");
  console.log("");
  console.log("");
  return;
}

const bot = new TelegramBot(Config.bottoken, {
  polling: true
});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (!msg.sticker) {
    bot.sendMessage(msg.chat.id, "i only know stickers!", {
      reply_to_message_id: msg.chat.message_id
    });

    return;
  }

  if (msg.sticker.is_animated) {
    bot.sendMessage(msg.chat.id, "no animated stickers D:", {
      reply_to_message_id: msg.chat.message_id
    });

    return;
  }

  console.log(`${msg.chat.username}\tsticker: ${msg.sticker.emoji} in ${msg.sticker.set_name}`);
  try{
    let localFile = await bot.downloadFile(msg.sticker.file_id, Config.tmpfolder)
    await bot.sendDocument(msg.chat.id, localFile, {
      reply_to_message_id: msg.chat.message_id
    });
    await Fs.unlinkSync(localFile);
  }catch(_){
    console.log(`error:`);
    console.log(_);
  }
});
