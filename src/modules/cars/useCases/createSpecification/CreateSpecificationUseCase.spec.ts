import { AppError } from "../../../../errors/AppError";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Specification", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory
    );
  });

  it("should be able to create a new specification", async () => {
    const specification = {
      name: "Specification Test",
      description: "Specification description Test",
    };
    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    const specificationCreated = await specificationRepositoryInMemory.findByName(specification.name);
      
    console.log(specificationCreated);

    expect(specificationCreated).toHaveProperty("name");
  });

  it("should not be able to create new specification with name exists", async () => {
    expect(async () => {
      const specification = {
        name: "Specification Test",
        description: "Specification description Test",
      };

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });

    }).rejects.toBeInstanceOf(AppError)
  });
});
