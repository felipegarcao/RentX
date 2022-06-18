import { UsersRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  // Responsável por instanciar tudo que precisamos
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider: new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to users", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "765238",
      email: "jemubded@leftuivu.wf",
      name: "Raymond Cook",
      password: "98136890ey2198ghdu9gh8901y8034789tdg",
    });

    await sendForgotPasswordMailUseCase.execute("jemubded@leftuivu.wf");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if suer does not exists!", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("huwahujog@ug.pm")
    ).rejects.toEqual(new AppError("Users does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "783217",
      email: "woanzo@pazsam.aq",
      name: "Celia Clark",
      password: "781959",
    });

    await sendForgotPasswordMailUseCase.execute("woanzo@pazsam.aq");

    expect(generateTokenMail).toBeCalled();
  });
});
