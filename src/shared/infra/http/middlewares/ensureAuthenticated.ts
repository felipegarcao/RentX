import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";


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
    throw new AppError("Token Missing", 401);
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
      throw new AppError('User does not exist!', 401)
    }

    request.user = {
      id: user_id 
    }

    next();
  } catch (e) {
    throw new AppError("Invalid Token", 401);
  }
}