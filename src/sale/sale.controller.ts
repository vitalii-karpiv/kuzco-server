import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { SaleService } from "./sale.service";
import { SaleCreateDtoIn } from "./dto/in/sale-create";
import { SaleCreateDtoOut } from "./dto/out/sale-create";
import { SaleSetStateDtoIn } from "./dto/in/sale-set-state";
import { SaleSetStateDtoOut } from "./dto/out/sale-set-state";
import { SaleUpdateDtoIn } from "./dto/in/sale-update";
import { SaleUpdateDtoOut } from "./dto/out/sale-update";
import { SaleListDtoIn } from "./dto/in/sale-list";
import { SaleListDtoOut } from "./dto/out/sale-list";
import { SaleGetDtoOut } from "./dto/out/sale-get";

@Controller("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) saleCreateDtoIn: SaleCreateDtoIn): Promise<SaleCreateDtoOut> {
    return this.saleService.create(saleCreateDtoIn);
  }

  @Post("setState")
  setState(@Body(new ValidationPipe()) saleSetStateDtoIn: SaleSetStateDtoIn): Promise<SaleSetStateDtoOut> {
    return this.saleService.setState(saleSetStateDtoIn);
  }

  @Patch()
  update(@Body(new ValidationPipe()) saleUpdateDtoIn: SaleUpdateDtoIn): Promise<SaleUpdateDtoOut> {
    return this.saleService.update(saleUpdateDtoIn);
  }

  @Get()
  list(@Body(new ValidationPipe()) saleListDtoIn: SaleListDtoIn): Promise<SaleListDtoOut> {
    return this.saleService.list(saleListDtoIn);
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<SaleGetDtoOut> {
    return this.saleService.get(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<void> {
    return this.saleService.delete(id);
  }
}
