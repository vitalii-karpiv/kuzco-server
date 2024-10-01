import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Laptop } from "./model/laptop";
import { LaptopCreateDtoIn } from "./dto/in/laptop-create";
import { LaptopState } from "../common/enum/laptop-state";
import { TechCheck } from "./model/tech-check";
import { Characteristics } from "./model/characteristics";
import { LaptopSetStateDtoIn } from "./dto/in/laptop-set-state";
import { UserService } from "../user/user.service";
import { TagService } from "../tag/tag.service";
import { LaptopUpdateDtoIn } from "./dto/in/laptop-update";
import { LaptopListDtoIn } from "./dto/in/laptop-list";
import { PageInfo } from "../common/domain/page-info";

@Injectable()
export class LaptopService {
  constructor(
    @InjectModel(Laptop.name) private laptopModel: Model<Laptop>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}

  async create(laptopCreateDtoIn: LaptopCreateDtoIn) {
    const laptop = new Laptop();
    laptop.orderId = laptopCreateDtoIn.orderId;
    const brand = await this.verifyTag(laptopCreateDtoIn.brand);
    const model = await this.verifyTag(laptopCreateDtoIn.model);
    const submodel = await this.verifyTag(laptopCreateDtoIn.submodel);
    const user = await this.getUser(laptopCreateDtoIn.userId);
    laptop.brand = brand.name;
    laptop.model = model.name;
    laptop.submodel = submodel.name;
    laptop.orderId = laptopCreateDtoIn.orderId;
    laptop.code = "test"; // TODO: generate code
    laptop.state = LaptopState.NEW;
    laptop.stateHistory = [{ state: LaptopState.NEW, timestamp: new Date(), initiator: user }];
    laptop.techCheck = new TechCheck();
    laptop.characteristics = new Characteristics();
    laptop.marketplaces = [];

    return new this.laptopModel(laptop).save();
  }

  async setState({ id, state, userId }: LaptopSetStateDtoIn) {
    const laptop = await this.laptopModel.findOne({ _id: id }).exec();
    if (!laptop) {
      throw new BadRequestException({
        stateCode: 404,
        message: "Laptop by given id is not found",
        paramMap: {
          id,
        },
      });
    }
    const user = await this.getUser(userId);
    laptop.state = state;
    laptop.stateHistory.push({ state, timestamp: new Date(), initiator: user });
    await this.laptopModel.findOneAndUpdate({ _id: id }, laptop).exec();
    return await this.laptopModel.findOne({ _id: id }).exec();
  }

  async update(laptopUpdateDtoIn: LaptopUpdateDtoIn) {
    // TODO: toBuy, bought and complectation should be tags
    if (laptopUpdateDtoIn.techCheck && Object.keys(laptopUpdateDtoIn.techCheck).length < 7) {
      throw new BadRequestException({
        statusCode: 400,
        message: "Technical check should be fulfilled.",
        paramMap: {
          techCheck: laptopUpdateDtoIn.techCheck,
        },
      });
    }
    const laptop = await this.laptopModel.findOne({ _id: laptopUpdateDtoIn.id }).exec();
    if (!laptop) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Laptop not found by given id.",
        paramMap: {
          id: laptopUpdateDtoIn.id,
        },
      });
    }
    await this.laptopModel.findOneAndUpdate({ _id: laptopUpdateDtoIn.id }, { ...laptopUpdateDtoIn }).exec();
    return await this.laptopModel.findOne({ _id: laptopUpdateDtoIn.id }).exec();
  }

  async list({ state, orderId }: LaptopListDtoIn) {
    const filter: any = {};
    if (state) {
      filter.state = state;
    }
    if (orderId) {
      filter.orderId = orderId;
    }
    const itemList = await this.laptopModel.find(filter).exec();
    return {
      itemList,
      pageInfo: new PageInfo(),
    };
  }

  async get(id: string) {
    const laptop = await this.laptopModel.findOne({ _id: id }).exec();
    if (!laptop) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Laptop not found.",
        paramMap: {
          id,
        },
      });
    }
    return laptop;
  }

  private async verifyTag(id: string) {
    // TODO: add check on parent
    const tag = await this.tagService.get(id);
    if (!tag) {
      throw new BadRequestException({
        stateCode: 404,
        message: "Tag not found",
        paramMap: {
          id,
        },
      });
    }
    return tag;
  }

  private async getUser(id: string) {
    const user = await this.userService.get(id);
    return `${user.name} ${user.surname}`;
  }
}
