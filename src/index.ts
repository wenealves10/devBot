import { create, Whatsapp } from "venom-bot";
import fs from "fs";
import { resolve } from "path";

async function main(whats: Whatsapp) {
  whats.onParticipantsChanged("559988525464-1619830851@g.us", async (event) => {
    if (String(event.action) === "invite") {
      await whats.sendImageAsStickerGif(
        `559988525464-1619830851@g.us`,
        "https://media.giphy.com/media/sxkP02MRihq3uJDzW8/giphy.gif"
      );
      await whats.sendText(
        "559988525464-1619830851@g.us",
        "Bem vindo, novo amigo. Que você venha trazendo muita felicidade para compartilhar conosco! 😎🙏🏼"
      );
      await whats.sendText(
        `559988525464-1619830851@g.us`,
        "Olá, sou o assistente virtual da Community DevBot, meu nome é *DevBot🤖* \npara ter acesso aos meus comandos digite ex: #register"
      );
    }
  });
  whats.onAddedToGroup(async (chatId) => {
    await whats.leaveGroup(String(chatId.id));
  });
  whats.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      return;
    }

    if (String(message.body).toUpperCase() === "#HELLO") {
      await whats.reply(
        message.from,
        `Olá, sou o assistente virtual da Community DevBot, meu nome é *DevBot🤖* \npara ter acesso aos meus comandos digite ex: #register`,
        message.id
      );
      return;
    }

    if (String(message.body).toUpperCase() === "#REGISTER") {
      await whats.reply(
        message.from,
        `
╭─̇─̇─̇──̇─̇─̇──̇─̇─̇──❒͡₍⸙ᰰ۪۪᭢
┇ ${message.sender.pushname},
| *Você ainda não está no BD*!!
| *Para cadastrar digite:*
| #name <firstname> <age> <language>
| Ex: #name Wenes 19 typescript
╰─────────────❁ཻུ۪۪⸙͎`,
        message.id
      );
      return;
    }

    if (String(message.body).indexOf("#name") !== -1) {
      const data = String(message.body).split(" ");
      const number = String(message.from).split("-");
      await whats.reply(
        message.from,
        `Confirma seu dados ✅\n*Nome:* ${data[1]}\n*Idade:* ${data[2]}\n*Linguagem favorita*: ${data[3]}\n\n*Se está tudo certo digite* #regras`,
        message.id
      );

      fs.writeFileSync(
        resolve("temp", "date.json"),
        JSON.stringify(
          {
            name: data[1],
            age: data[2],
            language: data[3],
            number: number[0],
          },
          null,
          2
        )
      );
      return;
    }

    if (String(message.body).toUpperCase() === "#REGRAS") {
      const dateBuffer = String(fs.readFileSync(resolve("temp", "date.json")));
      const date = JSON.parse(dateBuffer);
      const number = String(message.from).split("-");
      console.log(number);
      if (date.number === number[0]) {
        await whats.reply(
          message.from,
          "*Parabéns você está cadastrado!*🎇✨👏",
          message.id
        );
        await whats.reply(
          message.from,
          `
        ╔ ══〘⚠𝗥𝗘𝗚𝗥𝗔𝗦⚠〙═══╗
        ║ Proibido conteúdo adulto
        ║ Proibido conteúdo agressivo
        ║ Proibido Desrespeitar os Membros
        ║ Proibido trava zap
        ║ Proibido enviar links de grupo
        ║ Proibido flood video/sticker/audio ( Max 4 pfv
        ║ Proibido gado
        ║ Proibido ofender o bot
        ║ Proibido invadir pv
        ║𝗤𝘂𝗮𝗹𝗾𝘂𝗲𝗿 𝗿𝗲𝗴𝗿𝗮 𝗾𝘂𝗲𝗯𝗿𝗮𝗱𝗮 = 𝗕𝗔𝗡
        `,
          message.id
        );
        fs.writeFileSync(
          resolve("temp", "date.json"),
          JSON.stringify({}, null, 2)
        );
        return;
      }
      await whats.reply(
        message.from,
        `
      ╔ ══〘⚠𝗥𝗘𝗚𝗥𝗔𝗦⚠〙═══╗
      ║ Proibido conteúdo adulto
      ║ Proibido conteúdo agressivo
      ║ Proibido Desrespeitar os Membros
      ║ Proibido trava zap
      ║ Proibido enviar links de grupo
      ║ Proibido flood video/sticker/audio ( Max 4 pfv
      ║ Proibido gado
      ║ Proibido ofender o bot
      ║ Proibido invadir pv
      ║𝗤𝘂𝗮𝗹𝗾𝘂𝗲𝗿 𝗿𝗲𝗴𝗿𝗮 𝗾𝘂𝗲𝗯𝗿𝗮𝗱𝗮 = 𝗕𝗔𝗡
      `,
        message.id
      );
    }
  });
}

(async () => {
  const venom = await create({ session: "whatsapp" });
  main(venom);
})();
