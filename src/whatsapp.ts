import { Whatsapp } from "venom-bot";
import { group } from "../tokens/tokens.json";
import { Invite } from "./interfaces/invite";

async function main(whatsapp: Whatsapp) {
  whatsapp.onMessage(async (message) => {
    console.log(message.chatId);
  });
  whatsapp.onParticipantsChanged(group, async (event) => {
    console.log(event);
    await Invite(event, whatsapp);
  });
}

export { main };
