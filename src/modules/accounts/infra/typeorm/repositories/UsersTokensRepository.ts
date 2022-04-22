import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokens } from "@modules/accounts/Repositories/IUserTokens";
import { UserTokens } from "../entities/UserTokens";
import { Repository, getRepository } from "typeorm";

class UsersTokensRepository implements IUserTokens {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const token = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(token);

    return token;
  }
}

export { UsersTokensRepository };
