import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stock } from "./model/stock";
import { StockCreateDtoIn } from "./dto/in/stock-create";
import { StockUpdateDtoIn } from "./dto/in/stock-update";
import { StockListDtoIn } from "./dto/in/stock-list";
import { StateHistoryItem } from "../common/domain/state-history-item";
import { UserService } from "../user/user.service";
import { LaptopService } from "../laptop/laptop.service";
import { PageInfo } from "../common/domain/page-info";
import { StockState } from "../common/enum/stock-state";

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private readonly stockModel: Model<Stock>,
    private readonly userService: UserService,
    private readonly laptopService: LaptopService,
  ) {}

  async create(stockCreateDtoIn: StockCreateDtoIn) {
    // generate code
    const count = await this.stockModel.countDocuments({ type: stockCreateDtoIn.type }).exec();
    const stockCode = `${stockCreateDtoIn.type}-${count}`;
    // check state
    this.checkStateCorrectness(stockCreateDtoIn.laptopId, stockCreateDtoIn.state, stockCreateDtoIn);
    // update state history
    const user = await this.getUser(stockCreateDtoIn.userId);
    const stateHistoryItem = new StateHistoryItem();
    stateHistoryItem.state = stockCreateDtoIn.state;
    stateHistoryItem.timestamp = new Date();
    stateHistoryItem.initiator = user;
    const stateHistory = [stateHistoryItem];
    // save
    const stock = new this.stockModel({ ...stockCreateDtoIn, code: stockCode, stateHistory });
    return await stock.save();
  }

  async update(stockUpdateDtoIn: StockUpdateDtoIn) {
    delete stockUpdateDtoIn["code"];
    delete stockUpdateDtoIn["stateHistory"];
    // validate stock exists
    const stock = await this.stockModel.findOne({ _id: stockUpdateDtoIn.id });
    if (!stock) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Stock not found.",
        paramMap: {
          id: stockUpdateDtoIn.id,
        },
      });
    }
    if (stockUpdateDtoIn.laptopId) {
      // validate laptop exists
      await this.laptopService.get(stockUpdateDtoIn.laptopId);
    }
    if (stockUpdateDtoIn.price && stockUpdateDtoIn.price < 0) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Price cannot be negative.",
        paramMap: {
          price: stockUpdateDtoIn.price,
        },
      });
    }
    // update state history
    const stateHistory = stock.stateHistory;
    if (stockUpdateDtoIn.state && stateHistory[stateHistory.length - 1].state !== stockUpdateDtoIn.state) {
      this.checkStateCorrectness(stockUpdateDtoIn.laptopId, stockUpdateDtoIn.state, stockUpdateDtoIn);
      const user = await this.getUser(stockUpdateDtoIn.userId);
      const stateHistoryItem = new StateHistoryItem();
      stateHistoryItem.state = stockUpdateDtoIn.state;
      stateHistoryItem.timestamp = new Date();
      stateHistoryItem.initiator = user;
      stateHistory.push(stateHistoryItem);
    }
    // update stock
    await this.stockModel.findOneAndUpdate({ _id: stockUpdateDtoIn.id }, { ...stockUpdateDtoIn, stateHistory }).exec();
    return await this.stockModel.findOne({ _id: stockUpdateDtoIn.id }).exec();
  }

  async list({ laptopId, type }: StockListDtoIn) {
    const filterMap: any = {};
    if (laptopId) filterMap.laptopId = laptopId;
    if (type) filterMap.type = type;
    const itemList = await this.stockModel.find(filterMap).exec();
    return {
      itemList,
      pageInfo: new PageInfo(),
    };
  }

  async delete(id: string) {
    await this.stockModel.deleteOne({ _id: id });
  }

  private async getUser(id: string) {
    const user = await this.userService.get(id);
    return `${user.name} ${user.surname}`;
  }

  private checkStateCorrectness(laptopId: string, state: StockState, dtoIn: StockUpdateDtoIn | StockCreateDtoIn) {
    if (state === StockState.BOOKED && !laptopId) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Laptop cannot be booked without laptopId.",
        paramMap: {},
      });
    } else if (state === StockState.FREE && laptopId) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Laptop cannot be free with laptopId.",
        paramMap: {},
      });
    } else if (state === StockState.FREE) {
      dtoIn.laptopId = null;
    }
  }
}
