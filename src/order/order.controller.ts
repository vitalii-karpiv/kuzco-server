import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { OrderService } from "./order.service";
import { OrderCreateDtoIn } from "./dto/in/order-create";
import { OrderCreateDtoOut } from "./dto/out/order-create";
import { OrderGetDtoOut } from "./dto/out/order-get";
import { OrderUpdateDtoOut } from "./dto/out/order-update";
import { OrderUpdateDtoIn } from "./dto/in/order-update";
import { OrderListDtoIn } from "./dto/in/order-list";
import { OrderListDtoOut } from "./dto/out/order-list";
import { OrderSetStateDtoIn } from "./dto/in/order-set-state";
import { OrderSetStateDtoOut } from "./dto/out/order-set-state";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) orderCreateDtoIn: OrderCreateDtoIn): Promise<OrderCreateDtoOut> {
    return this.orderService.create(orderCreateDtoIn);
  }

  @Post("setState")
  setState(@Body(new ValidationPipe()) orderSetStateDtoIn: OrderSetStateDtoIn): Promise<OrderSetStateDtoOut> {
    return this.orderService.setState(orderSetStateDtoIn);
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<OrderGetDtoOut> {
    return this.orderService.get(id);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: string): Promise<void> {
    return this.orderService.delete(id);
  }

  @Patch()
  update(@Body(new ValidationPipe()) orderUpdateDtoIn: OrderUpdateDtoIn): Promise<OrderUpdateDtoOut> {
    return this.orderService.update(orderUpdateDtoIn);
  }

  @Get()
  list(@Body(new ValidationPipe()) orderListDtoIn: OrderListDtoIn): Promise<OrderListDtoOut> {
    return this.orderService.list(orderListDtoIn);
  }
}
