import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TagService } from "../tag/tag.service";
import { UserService } from "../user/user.service";
import { Sale } from "./model/sale";
import { SaleCreateDtoIn } from "./dto/in/sale-create";
import { SaleState } from "../common/enum/sale-state";
import { LaptopState } from "../common/enum/laptop-state";
import { SaleSetStateDtoIn } from "./dto/in/sale-set-state";
import { SaleUpdateDtoIn } from "./dto/in/sale-update";
import { SaleListDtoIn } from "./dto/in/sale-list";
import { PageInfo } from "../common/domain/page-info";

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}

  async create(saleCreateDtoIn: SaleCreateDtoIn) {
    const sale = { ...saleCreateDtoIn, state: SaleState.NEW, date: new Date(), stateHistory: [] } as Sale;
    const user = await this.getUser(saleCreateDtoIn.userId);
    const sourceTag = await this.verifyTag(saleCreateDtoIn.source);
    sale.source = sourceTag.name;
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

  private async verifyTag(id: string) {
    return await this.tagService.get(id);
  }
}
