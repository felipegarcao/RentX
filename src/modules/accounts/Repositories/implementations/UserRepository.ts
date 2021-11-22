import { User } from "../../entities/User";

import { IUsersRepository } from "../IUserRepository";

import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    username,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      username,
      driver_license,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
