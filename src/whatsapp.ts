import { Whatsapp } from "venom-bot";
import { group2 } from "../tokens/tokens.json";
import { UsersController } from "./controllers/UsersController";
import { CommandsController } from "./controllers/CommandsController";

const usersController = new UsersController();
const commandsController = new CommandsController();

async function main(whatsapp: Whatsapp) {
  whatsapp.onAddedToGroup(async (chatEvent) => {
    await whatsapp.leaveGroup(String(chatEvent.id));
  });

  whatsapp.onParticipantsChanged(group2, async (event) => {
    await usersController.invite(event, whatsapp);
  });

  whatsapp.onAnyMessage(async (message) => {
    if (!message.isGroupMsg) {
      await whatsapp.blockContact(message.chatId);
      return;
    }

    await usersController.register(message, whatsapp);
    await usersController.perfil(message, whatsapp);
    await commandsController.removeParticipant(message, whatsapp);
    await commandsController.addParticipant(message, whatsapp);
    await commandsController.promoteParticipant(message, whatsapp);
    await commandsController.demoteParticipant(message, whatsapp);
    await commandsController.generateLink(message, whatsapp);
  });
}

export { main };
