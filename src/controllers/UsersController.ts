import { Message, ParticipantEvent, Whatsapp } from "venom-bot";
import dayjs from "dayjs";
import messages from "../../messages/message.json";
import { UsersService } from "../services/UsersService";
import tokens from "../../tokens/tokens.json";
import { checkCommandName, getData, getStringClient } from "../regex/index";

class UsersController {
  async invite(event: ParticipantEvent, whatsapp: Whatsapp) {
    if (String(event.action) !== "invite") return;

    await whatsapp.sendImageAsStickerGif(
      tokens.group2,
      messages.invite.linkGif
    );

    await whatsapp.sendMentioned(
      tokens.group2,
      `*Bem vindo*, @${getStringClient(event.who, "@")} ${
        messages.invite.message1
      }`,
      [getStringClient(event.who, "@")]
    );

    await whatsapp.sendText(tokens.group2, messages.invite.message2);
  }

  async register(message: Message, whatsapp: Whatsapp) {
    const usersService = new UsersService();

    if (String(message.body) === "#register") {
      const number_phone = getStringClient(message.sender.id, "@");

      const userExists = await usersService.findUser(number_phone);

      if (userExists) {
        await whatsapp.reply(
          message.chatId,
          `*${userExists.name}* ${messages.register.message3}`,
          message.id
        );

        return;
      }

      await whatsapp.reply(
        message.chatId,
        `*${
          message.sender.pushname !== undefined
            ? message.sender.pushname
            : "⚠*Sem nome*⚠"
        }* ${messages.register.message2}`,
        message.id
      );
      return;
    }

    if (checkCommandName.test(message.body)) {
      const number_phone = getStringClient(message.sender.id, "@");

      const userExists = await usersService.findUser(number_phone);

      if (userExists) {
        await whatsapp.reply(
          message.chatId,
          `*${userExists.name}* ${messages.register.message3}`,
          message.id
        );

        return;
      }

      const adminsList = await whatsapp.getGroupAdmins(message.chatId);
      let isAdmin: boolean = false;

      adminsList.forEach((adm: any) => {
        if (adm.user === number_phone) {
          isAdmin = true;
        }
      });

      const data = getData(message.body);

      const user = await usersService.create({
        name: data[1],
        age: parseInt(data[2], 10),
        number_phone,
        language: data[3],
        admin_group: isAdmin,
        active: true,
        commands: 1,
        level: 10,
        office: "instrutor",
        xp: 250,
      });

      await whatsapp.reply(
        message.chatId,
        `*${user.name}* ${messages.register.message4}`,
        message.id
      );
    }
  }

  async perfil(message: Message, whatsapp: Whatsapp) {
    if (String(message.body).toLowerCase() !== "#perfil") return;

    const number_phone = getStringClient(message.sender.id, "@");
    const usersService = new UsersService();

    const userExists = await usersService.findUser(number_phone);

    if (!userExists) {
      await whatsapp.reply(
        message.chatId,
        `*${
          message.sender.pushname !== undefined
            ? message.sender.pushname
            : "⚠*Sem nome*⚠"
        }* ${messages.perfil.message}`,
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
      `\t\t   *🛑 Dados do Perfil 🛑*\n\n*😁Nome:* ${
        userExists.name
      }\n\n*⏳Idade:* ${userExists.age} anos\n\n*🌐Linguagem Favorita:* \`\`\`${
        userExists.language
      }\`\`\`\n\n*📱Whatsapp:* ${userExists.number_phone}\n\n*🥇Admin:* ${
        userExists.admin_group ? "Sim" : "Não"
      }\n\n*🎯Cargo do grupo:* ${userExists.office}\n\n*♻Ativo:* ${
        userExists.active ? "Sim" : "Não"
      }\n\n*⚔Nível:* ${userExists.level}\n\n*♨XP:* ${
        userExists.xp
      }\n\n*🗄Limite Restante de Comandos:* ${
        userExists.admin_group ? "♾️" : `${userExists.commands}/20`
      }\n\n*📅Data de criação: ${dayjs(userExists.created_at).format(
        "DD/MM/YYYY HH:mm:ss"
      )}*\n\n*⌨️Comandos digite:* #menu\n\n${
        userExists.admin_group ? messages.perfil.messageAdmin : ""
      }𝔻𝕖𝕧𝔹𝕠𝕥™ 🤖🦾`
    );
  }
}

export { UsersController };
