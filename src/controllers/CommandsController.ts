import { Whatsapp, Message } from "venom-bot";
import { LevelXP } from "../functions/LevelXP";
import { UsersService } from "../services/UsersService";
import { checkCommandNumber, getNumber, getStringClient } from "../regex";
import messages from "../../messages/message.json";

class CommandsController {
  async removeParticipant(message: Message, whatsapp: Whatsapp) {
    if (String(message.body).toLowerCase() !== "#remove") return;
    const number_phone = getStringClient(message.sender.id, "@");
    const usersService = new UsersService();

    const userExists = await usersService.findUser(number_phone);

    if (!userExists) {
      await whatsapp.reply(message.chatId, messages.perfil.message, message.id);
      return;
    }

    if (!userExists.admin_group) {
      await whatsapp.reply(
        message.chatId,
        messages.commands.removeParticipant.userNotAdmin,
        message.id
      );
      return;
    }

    if (message.quotedMsgObj === null) return;

    await whatsapp.sendImageAsStickerGif(
      message.chatId,
      messages.commands.removeParticipant.linkFromGifBan
    );

    const levelXP = new LevelXP();

    setTimeout(async () => {
      await whatsapp.removeParticipant(
        message.chatId,
        message.quotedMsgObj.author
      );

      await whatsapp.reply(
        message.chatId,
        messages.commands.removeParticipant.successBan,
        message.id
      );

      const user = await levelXP.earnedXPToRemove(
        number_phone,
        userExists.xp,
        userExists.level
      );

      if (userExists.level === user?.level) {
        await whatsapp.reply(
          message.chatId,
          `*🎆Parabéns ${userExists.name} você ganhou 250xp🎆*\n\n*♨XP:* ${user?.xp}\n\n*⚔Nível:* ${user?.level}\n\n𝔻𝕖𝕧𝔹𝕠𝕥™ 🤖🦾`,
          message.id
        );
      } else {
        await whatsapp.reply(
          message.chatId,
          `*🎆Parabéns ${userExists.name} você subiu de Nível🎆*\n\n*♨XP:* ${user?.xp}\n\n*⚔Nível:* ${user?.level}\n\n𝔻𝕖𝕧𝔹𝕠𝕥™ 🤖🦾`,
          message.id
        );
      }
    }, 2500);
  }

  async addParticipant(message: Message, whatsapp: Whatsapp) {
    if (!checkCommandNumber.test(message.body)) return;
    const number_phone = getStringClient(message.sender.id, "@");
    const usersService = new UsersService();

    const userExists = await usersService.findUser(number_phone);

    if (!userExists) {
      await whatsapp.reply(message.chatId, messages.perfil.message, message.id);
      return;
    }

    if (!userExists.admin_group) {
      await whatsapp.reply(
        message.chatId,
        messages.commands.removeParticipant.userNotAdmin,
        message.id
      );
      return;
    }
    const number_phoneAdded = getNumber(message.body);

    const bool = await whatsapp.addParticipant(
      message.chatId,
      `${number_phoneAdded}@c.us`
    );

    console.log(bool);

    await whatsapp.reply(
      message.chatId,
      `${messages.commands.addParticipant.addedNewParticipant} ${userExists.name}\n\n𝔻𝕖𝕧𝔹𝕠𝕥™ 🤖🦾`,
      message.id
    );
  }

  async promoteParticipant(message: Message, whatsapp: Whatsapp) {
    if (String(message.body).toLowerCase() !== "#promote") return;
    const number_phone = getStringClient(message.sender.id, "@");
    const usersService = new UsersService();

    const userExists = await usersService.findUser(number_phone);

    if (!userExists) {
      await whatsapp.reply(message.chatId, messages.perfil.message, message.id);
      return;
    }

    if (!userExists.admin_group) {
      await whatsapp.reply(
        message.chatId,
        messages.commands.removeParticipant.userNotAdmin,
        message.id
      );
      return;
    }

    if (message.quotedMsgObj === null) return;

    const number_phoneAdded = getStringClient(message.quotedMsgObj.author, "@");

    const userExistsADM = await usersService.findUser(number_phoneAdded);

    if (!userExistsADM) {
      await whatsapp.reply(
        message.chatId,
        messages.commands.promoteParticipant.userNotExist,
        message.id
      );
      return;
    }

    if (userExistsADM?.admin_group) return;

    await whatsapp.promoteParticipant(
      message.chatId,
      message.quotedMsgObj.author
    );

    await usersService.updateUserADM(number_phoneAdded, true);

    await whatsapp.reply(
      message.chatId,
      `${messages.commands.promoteParticipant.addedADM} ${messages.commands.promoteParticipant.whoNewADM} ${userExistsADM.name} ${messages.commands.promoteParticipant.whoADD} ${userExists.name} \n\n𝔻𝕖𝕧𝔹𝕠𝕥™ 🤖🦾`,
      message.id
    );
  }

  async demoteParticipant(message: Message, whatsapp: Whatsapp) {
    if (String(message.body).toLowerCase() !== "#demote") return;
    const number_phone = getStringClient(message.sender.id, "@");
    const usersService = new UsersService();

    const userExists = await usersService.findUser(number_phone);

    if (!userExists) {
      await whatsapp.reply(message.chatId, messages.perfil.message, message.id);
      return;
    }

    if (!userExists.admin_group) {
      await whatsapp.reply(
        message.chatId,
        messages.commands.removeParticipant.userNotAdmin,
        message.id
      );
      return;
    }

    if (message.quotedMsgObj === null) return;

    const number_phoneAdded = getStringClient(message.quotedMsgObj.author, "@");

    const userExistsADM = await usersService.findUser(number_phoneAdded);

    if (!userExistsADM) {
      await whatsapp.reply(
        message.chatId,
        messages.commands.promoteParticipant.userNotExist,
        message.id
      );
      return;
    }

    if (!userExistsADM?.admin_group) return;

    await whatsapp.demoteParticipant(
      message.chatId,
      message.quotedMsgObj.author
    );

    await usersService.updateUserADM(number_phoneAdded, false);

    await whatsapp.reply(
      message.chatId,
      `${messages.commands.demoteParticipant.removed} ${messages.commands.demoteParticipant.whoRemoved} ${userExistsADM.name} ${messages.commands.demoteParticipant.whoRemove} ${userExists.name} \n\n𝔻𝕖𝕧𝔹𝕠𝕥™ 🤖🦾`,
      message.id
    );
  }
}

export { CommandsController };
