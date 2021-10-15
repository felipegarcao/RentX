import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import {SpecificationRepository} from '../../repositories/implementations/SpecificationRepository'
import { CreateSpecificationController } from "./CreateSpecificationController";


const specificationsRepository = new SpecificationRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export {createSpecificationController}