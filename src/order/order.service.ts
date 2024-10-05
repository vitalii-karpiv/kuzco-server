import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./model/order";
import { OrderCreateDtoIn } from "./dto/in/order-create";
import { OrderUpdateDtoIn } from "./dto/in/order-update";
import { OrderListDtoIn } from "./dto/in/order-list";
import { OrderListDtoOut } from "./dto/out/order-list";
import { OrderSetStateDtoIn } from "./dto/in/order-set-state";
import { UserService } from "../user/user.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly userService: UserService,
  ) {}

  async create(orderCreateDtoIn: OrderCreateDtoIn) {
    const user = await this.getUser(orderCreateDtoIn.userId);
    const order = new this.orderModel({
      ...orderCreateDtoIn,
      stateHistory: [{ state: orderCreateDtoIn.state, timestamp: new Date(), initiator: user }],
    });
    // TODO: create laptops
    return order.save();
  }

  async setState({ id, state, userId }: OrderSetStateDtoIn) {
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
    const user = await this.getUser(userId);
    order.stateHistory.push({ state: state, timestamp: new Date(), initiator: user });
    order.state = state;
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

  async list({ state }: OrderListDtoIn) {
    const filter: any = {};
    if (state) {
      filter.state = state;
    }
    const itemList = await this.orderModel.find(filter).exec();
    const dtoOut = new OrderListDtoOut();
    dtoOut.itemList = itemList;
    return dtoOut;
  }

  async delete(id: string) {
    await this.orderModel.deleteOne({ _id: id }).exec();
  }

  private async getUser(id: string) {
    const user = await this.userService.get(id);
    return `${user.name} ${user.surname}`;
  }
}
