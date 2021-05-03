import { ParticipantEvent, Whatsapp } from "venom-bot";
import tokens from "../../tokens/tokens.json";
import messages from "../../messages/message.json";

async function Invite(event: ParticipantEvent, whatsapp: Whatsapp) {
  if (String(event.action) === "invite") {
    await whatsapp.sendImageAsStickerGif(tokens.group, messages.invite.linkGif);
    await whatsapp.sendText(tokens.group, messages.invite.message1);
    await whatsapp.sendText(tokens.group, messages.invite.message2);
  }
}

export { Invite };
