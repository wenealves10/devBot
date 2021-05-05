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
}

export { UsersService };
