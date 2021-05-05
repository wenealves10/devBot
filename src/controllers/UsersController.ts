import { Message, ParticipantEvent, Whatsapp } from "venom-bot";
import messages from "../../messages/message.json";
import { UsersService } from "../services/UsersService";
import tokens from "../../tokens/tokens.json";

class UsersController {
  async invite(event: ParticipantEvent, whatsapp: Whatsapp) {
    if (String(event.action) !== "invite") return;
    await whatsapp.sendImageAsStickerGif(
      tokens.group2,
      messages.invite.linkGif
    );
    await whatsapp.sendMentioned(
      tokens.group2,
      `*Bem vindo*, @${String(event.who).split("@")[0]} ${
        messages.invite.message1
      }`,
      [String(event.who).split("@")[0]]
    );
    await whatsapp.sendText(tokens.group2, messages.invite.message2);
  }

  async register(message: Message, whatsapp: Whatsapp) {
    const usersService = new UsersService();
    if (String(message.body) === "#register") {
      const number_phone = String(message.sender.id).split("@")[0];
      const userExists = await usersService.findUser(number_phone);
      if (userExists) {
        await whatsapp.reply(
          message.from,
          `*${message.sender.pushname}* ${messages.register.message3}`,
          message.id
        );

        return;
      }

      await whatsapp.reply(
        message.from,
        `*${message.sender.pushname}* ${messages.register.message2}`,
        message.id
      );
      return;
    }

    if (
      String(message.body)
        .toLowerCase()
        .match(/(^#name)(\s+\w+)(\s+\d{2})(\s+\w+\s*)$/gi)
    ) {
      const number_phone = String(message.sender.id).split("@")[0];
      console.log(number_phone);
      const userExists = await usersService.findUser(number_phone);

      const adminsList = await whatsapp.getGroupAdmins(message.chatId);
      let isAdmin: boolean = false;

      adminsList.forEach((adm) => {
        if (adm.user === number_phone) {
          isAdmin = true;
        }
      });

      console.log(isAdmin);

      if (userExists) {
        await whatsapp.reply(
          message.from,
          `*${message.sender.pushname}* já foi *cadastrado* para ver digite: #perfil`,
          message.id
        );

        return;
      }

      const data = String(message.body.match(/[0-9]+|[A-Z][a-z]*/gis)).split(
        ","
      );

      await usersService.create({
        name: data[1],
        age: parseInt(data[2], 10),
        number_phone,
        language: data[3],
        admin_group: isAdmin,
        active: true,
        commands: 1,
        level: 10,
        office: "instrutor",
        xp: 100,
      });

      await whatsapp.reply(
        message.from,
        `*${message.sender.pushname}* ${messages.register.message3}`,
        message.id
      );
    }
  }

  async perfil(message: Message, whatsapp: Whatsapp) {
    if (String(message.body).toLowerCase() !== "#perfil") return;

    const number_phone = String(message.sender.id).split("@")[0];
    const usersService = new UsersService();

    const userExists = await usersService.findUser(number_phone);

    if (!userExists) {
      await whatsapp.reply(
        message.from,
        `*${message.sender.pushname}* ${messages.perfil.message}`,
        message.id
      );
      return;
    }

    const url = await whatsapp.getProfilePicFromServer(message.sender.id);
    const picturePerfil = url !== undefined ? url : messages.perfil.linkPicture;
    await whatsapp.sendImage(
      message.chatId,
      picturePerfil,
      "perfil",
      `\t\t *🛑 Dados do Perfil 🛑*\n\n*Nome:* ${userExists.name}\n*Idade:* ${
        userExists.age
      } anos\n*Linguagem Favorita:* ${userExists.language}\n*Whatsapp:* ${
        userExists.number_phone
      }\n*Admin:* ${
        userExists.admin_group ? "Sim" : "Não"
      }\n*Cargo do grupo:* ${userExists.office}\n*Ativo:* ${
        userExists.active ? "Sim" : "Não"
      }\n*Nível:* ${userExists.level}\n*XP:* ${
        userExists.xp
      }\n*Total de comandos:* ${userExists.commands}`
    );
  }
}

export { UsersController };
