import { Body, Controller, Get, HttpCode, Post, Put } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { KuzcoService } from "./kuzco.service";
import { KuzcoInitDtoOut } from "./dto/out/kuzco-init";
import { KuzcoInitDtoIn } from "./dto/in/kuzco-init";
import { KuzcoGetDtoOut } from "./dto/out/kuzco-get";
import { KuzcoUpdateDtoIn } from "./dto/in/kuzco-update";
import { KuzcoUpdateDtoOut } from "./dto/out/kuzco-update";

@Controller("kuzco")
export class KuzcoController {
  constructor(private readonly kuzcoService: KuzcoService) {}

  @Post()
  @HttpCode(201)
  init(@Body(new ValidationPipe()) kuzcoInitDtoIn: KuzcoInitDtoIn): Promise<KuzcoInitDtoOut> {
    return this.kuzcoService.init(kuzcoInitDtoIn);
  }

  @Put()
  update(@Body(new ValidationPipe()) kuzcoUpdateDtoIn: KuzcoUpdateDtoIn): Promise<KuzcoUpdateDtoOut> {
    return this.kuzcoService.update(kuzcoUpdateDtoIn);
  }

  @Get()
  get(): Promise<KuzcoGetDtoOut> {
    return this.kuzcoService.get();
  }
}
