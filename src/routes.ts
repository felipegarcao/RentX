import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {

  CreateCourseService.execute({
    name: "NodeJs",
    duration: 100,
    educator: "Dani Leão"
  });

  return response.send();
}
