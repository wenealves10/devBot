import { create } from "venom-bot";
import { main } from "./whatsapp";

(async () => {
  const venom = await create({ session: "whatsapp" });
  main(venom);
})();
