import { inject, injectable } from "tsyringe";
import { v4 as uuidV4} from 'uuid'

import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/Repositories/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";





@injectable()
class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(email: string){
    const user = await this.usersRepository.findByEmail(email);

    if (!user){
      throw new AppError("Users does not exists!")
    }

    const token = uuidV4();

    // vai ser expirado em 3 horas
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })


  }
}


export {SendForgotPasswordMailUseCase}