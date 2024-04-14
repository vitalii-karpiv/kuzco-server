import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { SupplierCreateDtoIn } from "./dto/in/supplier-create";
import { SupplierCreateDtoOut } from "./dto/out/supplier-create";

@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) supplierCreateDtoIn: SupplierCreateDtoIn): Promise<SupplierCreateDtoOut> {
    return this.supplierService.create(supplierCreateDtoIn);
  }

  // @Get(":id")
  // get(@Param("id") id: number): Promise<SupplierGetDtoOut> {}

  // @Delete()
  // @HttpCode(204)
  // delete(@Body(new ValidationPipe()) deleteUserInDto: DeleteUserDtoIn): Promise<void> {
  //   return this.userService.delete(deleteUserInDto);
  // }
  //
  // @Patch()
  // update(@Body(new ValidationPipe()) updateUserDtoIn: UpdateUserDtoIn): Promise<UpdateUserDtoOut> {
  //   return this.userService.update(updateUserDtoIn);
  // }
  //
  // @Get()
  // list(@Body(new ValidationPipe()) listUserInDto: ListUserDtoIn): Promise<ListUserDtoOut> {
  //   return this.userService.list(listUserInDto);
  // }
}
