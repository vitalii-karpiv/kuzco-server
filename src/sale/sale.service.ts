import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "../user/user.service";
import { Sale } from "./model/sale";
import { SaleCreateDtoIn } from "./dto/in/sale-create";
import { SaleState } from "../common/enum/sale-state";
import { LaptopState } from "../common/enum/laptop-state";
import { SaleSetStateDtoIn } from "./dto/in/sale-set-state";
import { SaleUpdateDtoIn } from "./dto/in/sale-update";
import { SaleListDtoIn } from "./dto/in/sale-list";
import { PageInfo } from "../common/domain/page-info";
import { LaptopService } from "../laptop/laptop.service";

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
    private readonly userService: UserService,
    private readonly laptopService: LaptopService,
  ) {}

  async create(saleCreateDtoIn: SaleCreateDtoIn) {
    await this.laptopService.get(saleCreateDtoIn.laptopId);
    await this.laptopService.setState({
      id: saleCreateDtoIn.laptopId,
      state: LaptopState.WAITING_FOR_DELIVERY,
      userId: saleCreateDtoIn.userId,
    });
    const sale = { ...saleCreateDtoIn, state: SaleState.NEW, date: new Date(), stateHistory: [] } as Sale;
    const user = await this.getUser(saleCreateDtoIn.userId);
    sale.stateHistory.push({ state: LaptopState.NEW, timestamp: new Date(), initiator: user });
    return new this.saleModel(sale).save();
  }

  async setState({ id, state, userId }: SaleSetStateDtoIn) {
    const sale = await this.saleModel.findOne({ _id: id }).exec();
    if (!sale) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Sale not found.",
        paramMap: {
          id,
        },
      });
    }
    const user = await this.getUser(userId);
    if (state === "delivering") {
      await this.updateLaptop(sale.laptopId, LaptopState.DELIVERING, userId);
    } else if (state === "done") {
      await this.updateLaptop(sale.laptopId, LaptopState.DONE, userId);
    } else if (state === "rejected") {
      await this.updateLaptop(sale.laptopId, LaptopState.SELLING, userId);
    }
    sale.state = state;
    sale.stateHistory.push({ state, timestamp: new Date(), initiator: user });
    await this.saleModel.findOneAndUpdate({ _id: id }, sale).exec();
    return await this.saleModel.findOne({ _id: id }).exec();
  }

  async update(saleUpdateDtoIn: SaleUpdateDtoIn) {
    const { id } = saleUpdateDtoIn;
    const sale = await this.saleModel.findOne({ _id: id }).exec();
    if (!sale) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Sale not found.",
        paramMap: {
          id,
        },
      });
    }
    await this.updateLaptop(saleUpdateDtoIn.laptopId, LaptopState.SELLING, saleUpdateDtoIn.userId);
    if (saleUpdateDtoIn.laptopId) {
      await this.laptopService.get(saleUpdateDtoIn.laptopId);
      await this.updateLaptop(saleUpdateDtoIn.laptopId, LaptopState.WAITING_FOR_DELIVERY, saleUpdateDtoIn.userId);
    }
    await this.saleModel.findOneAndUpdate({ _id: id }, { ...saleUpdateDtoIn }).exec();
    return await this.saleModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    await this.saleModel.deleteOne({ _id: id });
  }

  async get(id: string) {
    const sale = await this.saleModel.findOne({ _id: id }).exec();
    if (!sale) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Sale not found.",
        paramMap: {
          id,
        },
      });
    }
    return sale;
  }

  async list({ source, state }: SaleListDtoIn) {
    const filterMap: any = {};
    if (source) filterMap.source = source;
    if (state) filterMap.state = state;
    const itemList = await this.saleModel.find(filterMap).exec();
    return {
      itemList,
      pageInfo: new PageInfo(),
    };
  }

  private async getUser(id: string) {
    const user = await this.userService.get(id);
    return `${user.name} ${user.surname}`;
  }

  private async updateLaptop(id: string, state: LaptopState, userId: string) {
    await this.laptopService.setState({
      id,
      state,
      userId,
    });
  }
}
