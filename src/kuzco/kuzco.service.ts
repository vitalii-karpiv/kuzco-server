import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Kuzco } from "./model/kuzco";
import { KuzcoInitDtoIn } from "./dto/in/kuzco-init";
import { KuzcoInitDtoOut } from "./dto/out/kuzco-init";
import { KuzcoGetDtoOut } from "./dto/out/kuzco-get";
import { KuzcoUpdateDtoIn } from "./dto/in/kuzco-update";
import { KuzcoUpdateDtoOut } from "./dto/out/kuzco-update";

@Injectable()
export class KuzcoService {
  constructor(@InjectModel(Kuzco.name) private kuzcoModel: Model<Kuzco>) {}

  async init(kuzcoInitDtoIn: KuzcoInitDtoIn): Promise<KuzcoInitDtoOut> {
    let kuzco = await this.kuzcoModel.findOne().exec();
    if (kuzco) {
      throw new BadRequestException({
        message: "Kuzco main instance already initialized",
        paramMap: {
          kuzcoState: kuzco.state,
        },
      });
    }
    kuzco = new this.kuzcoModel(kuzcoInitDtoIn);
    return kuzco.save();
  }

  async update(kuzcoUpdateDtoIn: KuzcoUpdateDtoIn): Promise<KuzcoUpdateDtoOut> {
    await this.kuzcoModel.findOneAndUpdate({}, { ...kuzcoUpdateDtoIn }).exec();
    return await this.kuzcoModel.findOne().exec();
  }

  async get(): Promise<KuzcoGetDtoOut> {
    return await this.kuzcoModel.findOne().exec();
  }
}
