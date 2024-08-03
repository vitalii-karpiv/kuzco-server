import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "../../user/user.service";
import { Investment } from "../model/investment";
import { InvestmentCreateDtoIn } from "../dto/in/investment-create";
import { InvestmentUpdateDtoIn } from "../dto/in/investment-update";
import { InvestmentListDtoIn } from "../dto/in/investment-list";

@Injectable()
export class InvestmentService {
  constructor(
    @InjectModel(Investment.name) private investmentModel: Model<Investment>,
    private readonly userService: UserService,
  ) {}

  async create(investmentCreateDtoIn: InvestmentCreateDtoIn) {
    await this.userService.get(investmentCreateDtoIn.userId);
    return new this.investmentModel({ ...investmentCreateDtoIn }).save();
  }

  async update(investmentUpdateDtoIn: InvestmentUpdateDtoIn) {
    const investment = await this.investmentModel.findById(investmentUpdateDtoIn.id).exec();
    if (!investment) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Investment not found.",
        paramMap: {
          id: investmentUpdateDtoIn.id,
        },
      });
    }
    if (investmentUpdateDtoIn.userId) {
      await this.userService.get(investmentUpdateDtoIn.userId);
    }
    await this.investmentModel.findByIdAndUpdate(investmentUpdateDtoIn.id, { ...investmentUpdateDtoIn }).exec();
    return await this.investmentModel.findById(investmentUpdateDtoIn.id).exec();
  }

  async list({ dateFrom, dateTo, userId }: InvestmentListDtoIn) {
    const filter: any = {};
    if (userId) {
      filter.userId = userId;
    }
    if (dateFrom) {
      // TODO: bug here, we need to be able filter with both from and to
      filter.date = { $gte: dateFrom };
    }
    if (dateTo) {
      filter.date = { $lte: dateTo };
    }
    const itemList = await this.investmentModel.find(filter).exec();
    return {
      itemList,
    };
  }

  async delete(id: string) {
    await this.investmentModel.findByIdAndDelete(id).exec();
  }
}
