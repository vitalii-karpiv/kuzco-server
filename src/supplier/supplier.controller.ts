import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { SupplierCreateDtoIn } from "./dto/in/supplier-create";
import { SupplierCreateDtoOut } from "./dto/out/supplier-create";
import { SupplierGetDtoOut } from "./dto/out/supplier-get";
import { SupplierUpdateDtoIn } from "./dto/in/supplier-update";
import { SupplierUpdateDtoOut } from "./dto/out/supplier-update";
import { SupplierListDtoIn } from "./dto/in/supplier-list";
import { SupplierListDtoOut } from "./dto/out/supplier-list";

@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) supplierCreateDtoIn: SupplierCreateDtoIn): Promise<SupplierCreateDtoOut> {
    return this.supplierService.create(supplierCreateDtoIn);
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<SupplierGetDtoOut> {
    return this.supplierService.get(id);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: string): Promise<void> {
    return this.supplierService.delete(id);
  }

  @Patch()
  update(@Body(new ValidationPipe()) supplierUpdateDtoIn: SupplierUpdateDtoIn): Promise<SupplierUpdateDtoOut> {
    return this.supplierService.update(supplierUpdateDtoIn);
  }

  @Get()
  list(@Body(new ValidationPipe()) listUserInDto: SupplierListDtoIn): Promise<SupplierListDtoOut> {
    return this.supplierService.list(listUserInDto);
  }
}
