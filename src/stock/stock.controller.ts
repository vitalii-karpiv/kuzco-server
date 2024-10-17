import { Body, Controller, Delete, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { StockService } from "./stock.service";
import { StockCreateDtoIn } from "./dto/in/stock-create";
import { StockUpdateDtoIn } from "./dto/in/stock-update";
import { StockListDtoIn } from "./dto/in/stock-list";
import { StockCreateDtoOut } from "./dto/out/stock-create";
import { StockUpdateDtoOut } from "./dto/out/stock-update";
import { StockListDtoOut } from "./dto/out/stock-list";

@Controller("stock")
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) stockCreateDtoIn: StockCreateDtoIn): Promise<StockCreateDtoOut> {
    return this.stockService.create(stockCreateDtoIn);
  }

  @Patch()
  @HttpCode(200)
  update(@Body(new ValidationPipe()) stockUpdateDtoIn: StockUpdateDtoIn): Promise<StockUpdateDtoOut> {
    return this.stockService.update(stockUpdateDtoIn);
  }

  @Post("list")
  @HttpCode(200)
  get(@Body(new ValidationPipe()) stockListDtoIn: StockListDtoIn): Promise<StockListDtoOut> {
    return this.stockService.list(stockListDtoIn);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: string): Promise<void> {
    return this.stockService.delete(id);
  }
}
