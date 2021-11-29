import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/accounts/Repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  // Verificação para ver se o token esta vindo preenchido
  if (!authToken) {
    throw new Error("Token Missing");
  }
  // Caso esteja....
  const [, token] = authToken.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "9b0df268bcda8034bf93db3bb012e27b"
    ) as IPayload;
      
    const usersRepository = new UserRepository();
    const user = usersRepository.findById(user_id);

    if (!user){
      throw new Error('User does not exist!')
    }

    next();
  } catch (e) {
    throw new Error("Invalid Token");
  }
}
