import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { UserService } from "./user.service";
import { UserCreateDtoIn } from "./dto/in/user-create";
import { UserCreateDtoOut } from "./dto/out/user-create";
import { UserGetDtoOut } from "./dto/out/user-get";
import { UserUpdateDtoIn } from "./dto/in/user-update";
import { UserUpdateDtoOut } from "./dto/out/user-update";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) userCreateDtoIn: UserCreateDtoIn): Promise<UserCreateDtoOut> {
    return this.userService.create(userCreateDtoIn);
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<UserGetDtoOut> {
    return this.userService.get(id);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Patch()
  update(@Body(new ValidationPipe()) userUpdateDtoIn: UserUpdateDtoIn): Promise<UserUpdateDtoOut> {
    return this.userService.update(userUpdateDtoIn);
  }
}
