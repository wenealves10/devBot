import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersRepository {
  name: string;
  age: number;
  number_phone: string;
  language: string;
  admin_group?: boolean;
  level?: number;
  xp?: number;
  active?: boolean;
  office?: string;
  commands?: number;
}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({
    name,
    age,
    language,
    number_phone,
    active,
    admin_group,
    commands,
    level,
    office,
    xp,
  }: IUsersRepository) {
    const userExists = await this.usersRepository.findOne({
      number_phone,
    });
    if (userExists) {
      return userExists;
    }
    const user = this.usersRepository.create({
      name,
      age,
      number_phone,
      language,
      active,
      admin_group,
      commands,
      level,
      office,
      xp,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async findUser(number_phone: string) {
    const userExists = await this.usersRepository.findOne({
      number_phone,
    });

    return userExists;
  }

  async updateUserCommands(number_phone: string, commands: number) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ commands })
      .where("number_phone = :number_phone", {
        number_phone,
      })
      .execute();
  }

  async updateUserLevel(number_phone: string, level: number) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ level })
      .where("number_phone = :number_phone", {
        number_phone,
      })
      .execute();
  }

  async updateUserXP(number_phone: string, xp: number) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ xp })
      .where("number_phone = :number_phone", {
        number_phone,
      })
      .execute();
  }

  async updateUserOffice(number_phone: string, office: string) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ office })
      .where("number_phone = :number_phone", {
        number_phone,
      })
      .execute();
  }

  async updateUserADM(number_phone: string, admin_group: boolean) {
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ admin_group })
      .where("number_phone = :number_phone", {
        number_phone,
      })
      .execute();
  }
}

export { UsersService };
