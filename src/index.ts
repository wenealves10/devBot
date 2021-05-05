import { create } from "venom-bot";
import { main } from "./whatsapp";
import "./database";

(async () => {
  const venom = await create({ session: "whatsapp" });
  main(venom);
})();
