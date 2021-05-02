import { create, Whatsapp } from "venom-bot";

function main(whats: Whatsapp) {
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
    }
    if (String(message.body).toUpperCase() === "#REGISTER") {
      await whats.reply(
        message.from,
        `        ╭─̇─̇─̇──̇─̇─̇──̇─̇─̇──❒͡₍⸙ᰰ۪۪᭢
         ┇ ${message.sender.pushname},
         | Você ainda não está cadastrado no banco de dados!!
         | Para cadastrar digite:
         | #name <name> | <idade> | <linguagem>
         | Ex: #name Wene | 19 | typescript
         ╰─────────────❁ཻུ۪۪⸙͎`,
        message.id
      );
    }
    if(String(message.body))
  });
}

(async () => {
  const venom = await create({ session: "whatsapp" });
  main(venom);
})();
