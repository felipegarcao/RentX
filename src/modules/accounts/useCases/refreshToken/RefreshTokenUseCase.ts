import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";

import { IUserTokensRepository } from "@modules/accounts/Repositories/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}


interface ITokenResponse {
  token: string;
  new_refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(
      refresh_token,
      auth.secret_refresh_token
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      new_refresh_token,
      token: newToken,
    }
  }
}

export { RefreshTokenUseCase };
