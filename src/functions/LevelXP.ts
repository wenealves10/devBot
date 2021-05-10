import { UsersService } from "../services/UsersService";

class LevelXP {
  async earnedXPToRemove(number_phone: string, xp: number, level: number) {
    const usersService = new UsersService();
    let xpUp = xp;
    let levelUp = level;
    if (xpUp === 1000) {
      xpUp = 0;
      levelUp += 1;
      await usersService.updateUserLevel(number_phone, levelUp);
    } else {
      xpUp += 250;
    }

    await usersService.updateUserXP(number_phone, xpUp);
    const user = await usersService.findUser(number_phone);

    return user;
  }
}

export { LevelXP };
