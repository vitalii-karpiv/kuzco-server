import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./model/order.model";
import { OrderCreateDtoIn } from "./dto/in/order-create";
import { OrderUpdateDtoIn } from "./dto/in/order-update";
import { OrderListDtoIn } from "./dto/in/order-list";
import { OrderListDtoOut } from "./dto/out/order-list";
import { OrderSetStateDtoIn } from "./dto/in/order-set-state";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(orderCreateDtoIn: OrderCreateDtoIn) {
    // TODO: use real initiator
    const order = new this.orderModel({
      ...orderCreateDtoIn,
      stateHistory: [{ state: orderCreateDtoIn.state, timestamp: new Date(), initiator: "1-1" }],
    });
    return order.save();
  }

  async setState({ id, state }: OrderSetStateDtoIn) {
    const order = await this.orderModel.findOne({ _id: id }).exec();
    if (!order) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Order does not exist.",
        paramMap: {
          id: id,
        },
      });
    }
    order.stateHistory.push({ state: state, timestamp: new Date(), initiator: "1-1" });
    await this.orderModel.findOneAndUpdate({ _id: id }, order);
    return await this.orderModel.findOne({ _id: id }).exec();
  }

  async get(id: string) {
    return await this.orderModel.findOne({ _id: id }).exec();
  }

  async update(orderUpdateDtoIn: OrderUpdateDtoIn) {
    const order = await this.orderModel.findOneAndUpdate({ _id: orderUpdateDtoIn.id }, { ...orderUpdateDtoIn }).exec();
    if (!order) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Order does not exist.",
        paramMap: {
          id: orderUpdateDtoIn.id,
        },
      });
    }
    return await this.orderModel.findOne({ _id: orderUpdateDtoIn.id }).exec();
  }

  async list(orderListDtoIn: OrderListDtoIn) {
    const itemList = await this.orderModel.find({}).exec();
    const dtoOut = new OrderListDtoOut();
    dtoOut.itemList = itemList;
    return dtoOut;
  }

  async delete(id: string) {
    await this.orderModel.deleteOne({ _id: id }).exec();
  }
}
