import { Injectable } from "@nestjs/common";
import { SupplierCreateDtoIn } from "./dto/in/supplier-create";
import { SupplierCreateDtoOut } from "./dto/out/supplier-create";

@Injectable()
export class SupplierService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {} // private readonly userRepository: Repository<User>, // @InjectRepository(User)

  async create(supplierCreateDtoIn: SupplierCreateDtoIn) {
    return new SupplierCreateDtoOut();
  }
}
