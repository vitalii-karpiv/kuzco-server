import { BadRequestException, Injectable } from "@nestjs/common";
import { SupplierCreateDtoIn } from "./dto/in/supplier-create";
import { SupplierCreateDtoOut } from "./dto/out/supplier-create";
import { InjectModel } from "@nestjs/mongoose";
import { Supplier } from "./model/supplier";
import { Model } from "mongoose";
import { SupplierGetDtoOut } from "./dto/out/supplier-get";
import { SupplierUpdateDtoIn } from "./dto/in/supplier-update";
import { SupplierListDtoIn } from "./dto/in/supplier-list";
import { SupplierListDtoOut } from "./dto/out/supplier-list";
import { PageInfo } from "../common/domain/page-info";

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private supplierModel: Model<Supplier>) {}

  async create(supplierCreateDtoIn: SupplierCreateDtoIn): Promise<SupplierCreateDtoOut> {
    // Write supplier to the database
    const supplier = new this.supplierModel(supplierCreateDtoIn);
    return supplier.save();
  }

  async get(id: string): Promise<SupplierGetDtoOut> {
    // Get supplier from database
    return await this.supplierModel.findOne({ _id: id }).exec();
  }

  async update(supplierUpdateDtoIn: SupplierUpdateDtoIn): Promise<SupplierGetDtoOut> {
    const supplier = await this.supplierModel
      .findOneAndUpdate({ _id: supplierUpdateDtoIn.id }, { ...supplierUpdateDtoIn })
      .exec();
    if (!supplier) {
      throw new BadRequestException({
        statusCode: 404,
        message: "Supplier does not exist.",
        paramMap: {
          id: supplierUpdateDtoIn.id,
        },
      });
    }
    // Get supplier from database
    return await this.supplierModel.findOne({ _id: supplierUpdateDtoIn.id }).exec();
  }

  async list(supplierListDtoIn: SupplierListDtoIn): Promise<SupplierListDtoOut> {
    // List supplier from database
    const itemList = await this.supplierModel.find({}).exec();
    const dtoOut = new SupplierListDtoOut();
    dtoOut.itemList = itemList;
    dtoOut.pageInfo = new PageInfo(); // TODO: set proper pageInfo
    return dtoOut;
  }

  async delete(id: string): Promise<void> {
    // Delete supplier from database
    await this.supplierModel.deleteOne({ _id: id }).exec();
  }
}
