import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { LaptopService } from "./laptop.service";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { LaptopCreateDtoIn } from "./dto/in/laptop-create";
import { LaptopCreateDtoOut } from "./dto/out/laptop-create";
import { LaptopSetStateDtoIn } from "./dto/in/laptop-set-state";
import { LaptopSetStateDtoOut } from "./dto/out/laptop-set-state";
import { LaptopUpdateDtoIn } from "./dto/in/laptop-update";
import { LaptopUpdateDtoOut } from "./dto/out/laptop-update";
import { LaptopListDtoIn } from "./dto/in/laptop-list";
import { LaptopListDtoOut } from "./dto/out/laptop-list";
import { LaptopGetDtoOut } from "./dto/out/laptop-get";
import { LaptopGetDescription } from "./dto/out/laptop-get-description";

@Controller("laptop")
export class LaptopController {
  constructor(private readonly laptopService: LaptopService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) laptopCreateDtoIn: LaptopCreateDtoIn): Promise<LaptopCreateDtoOut> {
    return this.laptopService.create(laptopCreateDtoIn);
  }

  @Post("setState")
  setState(@Body(new ValidationPipe()) laptopSetStateDtoIn: LaptopSetStateDtoIn): Promise<LaptopSetStateDtoOut> {
    return this.laptopService.setState(laptopSetStateDtoIn);
  }

  @Patch()
  update(@Body(new ValidationPipe()) laptopUpdateDtoIn: LaptopUpdateDtoIn): Promise<LaptopUpdateDtoOut> {
    return this.laptopService.update(laptopUpdateDtoIn);
  }

  @Post("list")
  @HttpCode(200)
  list(@Body(new ValidationPipe()) laptopListDtoIn: LaptopListDtoIn): Promise<LaptopListDtoOut> {
    return this.laptopService.list(laptopListDtoIn);
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<LaptopGetDtoOut> {
    return this.laptopService.get(id);
  }

  @Get("description/:id")
  getDescription(@Param("id") id: string): Promise<LaptopGetDescription> {
    return this.laptopService.getDescription(id);
  }
}
