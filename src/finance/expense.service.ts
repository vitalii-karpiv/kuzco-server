import { BadRequestException, Injectable } from "@nestjs/common";
import { ExpenseCreateDtoIn } from "./dto/in/expense-create";
import { Expense } from "./model/expense";
import { InjectModel } from "@nestjs/mongoose";
import { Kuzco } from "../kuzco/model/kuzco";
import { Model } from "mongoose";
import { KuzcoService } from "../kuzco/kuzco.service";
import { OrderService } from "../order/order.service";
import { TagService } from "../tag/tag.service";
import { ExpenseSetParentDtoIn } from "./dto/in/expense-set-parent";
import { ExpenseUpdateDtoIn } from "./dto/in/expense-update";
import e from "express";
import { ExpenseListDtoIn } from "./dto/in/expense-list";
import { PageInfo } from "../common/domain/page-info";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    private readonly kuzcoService: KuzcoService,
    private readonly orderService: OrderService,
    private readonly tagService: TagService,
  ) {}

  async create(expenseCreateDtoIn: ExpenseCreateDtoIn) {
    const expense = new Expense();
    if (expenseCreateDtoIn.orderId) {
      const order = await this.orderService.get(expenseCreateDtoIn.orderId);
      if (!order) {
        throw new BadRequestException({
          statusCode: 404,
          message: "Order not found by given identifier.",
          paramMap: {
            orderId: expenseCreateDtoIn.orderId,
          },
        });
      }
      expense.orderId = expenseCreateDtoIn.orderId;
    }
    // Verify tag
    const expenseTypeTag = await this.tagService.get(expenseCreateDtoIn.type);
    expense.type = expenseTypeTag.name;
    expense.time = expenseCreateDtoIn.time;
    expense.amount = expenseCreateDtoIn.amount;
    return new this.expenseModel(expense).save();
  }

  async setParent({ id, parentId }: ExpenseSetParentDtoIn) {
    const expense = await this.expenseModel.findOne({ _id: id }).exec();
    if (!expense) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Expense not found.",
        paramMap: {
          id,
        },
      });
    }
    const order = await this.orderService.get(parentId);
    if (!order) {
      const kuzcoMain = await this.kuzcoService.get();
      if (kuzcoMain.id !== parentId) {
        throw new BadRequestException({
          statusCode: 404,
          message: "Order not found.",
          paramMap: {
            parentId,
          },
        });
      }
    }
    await this.expenseModel.updateOne({ _id: id }, { orderId: parentId }).exec();
    return this.expenseModel.findOne({ _id: id }).exec();
  }

  async update(expenseUpdateDtoIn: ExpenseUpdateDtoIn) {
    const expense = await this.expenseModel.findOne({ _id: expenseUpdateDtoIn.id }).exec();
    if (!expense) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Expense not found.",
        paramMap: {
          id: expenseUpdateDtoIn.id,
        },
      });
    }
    if (expenseUpdateDtoIn.type) {
      const expenseTypeTag = await this.tagService.get(expenseUpdateDtoIn.type);
      expenseUpdateDtoIn.type = expenseTypeTag.name;
    }
    await this.expenseModel.updateOne({ _id: expenseUpdateDtoIn.id }, { ...expenseUpdateDtoIn });
    return this.expenseModel.findOne({ _id: expenseUpdateDtoIn.id }).exec();
  }

  async list({ orderId, timeFrom, timeTo }: ExpenseListDtoIn) {
    const filter: any = {};
    if (orderId) {
      filter.orderId = orderId;
    }
    if (timeFrom) {
      filter.time = { $gte: timeFrom };
    }
    if (timeTo) {
      filter.time = { $lte: timeTo };
    }
    const itemList = await this.expenseModel.find(filter).exec();
    return {
      itemList,
      pageInfo: new PageInfo(),
    };
  }

  async delete(id: string) {
    await this.expenseModel.findByIdAndDelete(id);
  }
}
