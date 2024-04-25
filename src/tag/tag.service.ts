import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tag } from "./model/tag";
import { TagCreateDtoIn } from "./dto/in/tag-create";
import { TagListDtoIn } from "./dto/in/tag-list";

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async create(tagCreateDtoIn: TagCreateDtoIn) {
    if (tagCreateDtoIn.parentId) {
      const parent = await this.tagModel.findById(tagCreateDtoIn.parentId).exec();
      if (!parent) {
        throw new BadRequestException({
          statusCode: 404,
          message: "Parent does not exist.",
          paramMap: {
            id: tagCreateDtoIn.parentId,
          },
        });
      }
    }
    const supplier = new this.tagModel(tagCreateDtoIn);
    return supplier.save();
  }

  async list(tagListDtoIn: TagListDtoIn) {
    let itemList: Tag[];
    if (tagListDtoIn.parentId) {
      itemList = await this.tagModel.find({ parentId: tagListDtoIn.parentId }).exec();
    } else if (tagListDtoIn.type) {
      itemList = await this.tagModel.find({ type: tagListDtoIn.type }).exec();
    } else {
      itemList = await this.tagModel.find({}).exec();
    }
    return { itemList };
  }

  async get(id: string): Promise<Tag> {
    const tag = await this.tagModel.findOne({ _id: id });
    if (!tag) {
      throw new BadRequestException({
        stateCode: 404,
        message: "Tag not found.",
        paramMap: {
          id,
        },
      });
    }
    return tag;
  }
}
