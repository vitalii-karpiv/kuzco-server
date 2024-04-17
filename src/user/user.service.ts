import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./model/user";
import { UserCreateDtoIn } from "./dto/in/user-create";
import { UserUpdateDtoIn } from "./dto/in/user-update";
import * as bcrypt from "bcrypt";
import { UserCreateDtoOut } from "./dto/out/user-create";
import { UserGetDtoOut } from "./dto/out/user-get";
import { UserUpdateDtoOut } from "./dto/out/user-update";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userCreateDtoIn: UserCreateDtoIn) {
    const password = await bcrypt.hash(userCreateDtoIn.password, 10);

    const user = new this.userModel({ ...userCreateDtoIn, password });
    await user.save();
    return new UserCreateDtoOut(user.id, user.email, user.name, user.surname, user.phone);
  }

  async get(id: string) {
    // Get supplier from database
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new BadRequestException({
        statusCode: 404,
        message: "User does not exist.",
        paramMap: {
          id,
        },
      });
    }
    return new UserGetDtoOut(user.id, user.email, user.name, user.surname, user.phone);
  }

  async update(userUpdateDtoIn: UserUpdateDtoIn) {
    let user = await this.userModel.findOneAndUpdate({ _id: userUpdateDtoIn.id }, { ...userUpdateDtoIn }).exec();
    if (!user) {
      throw new BadRequestException({
        statusCode: 404,
        message: "User does not exist.",
        paramMap: {
          id: userUpdateDtoIn.id,
        },
      });
    }

    user = await this.userModel.findOne({ _id: userUpdateDtoIn.id }).exec();
    return new UserUpdateDtoOut(user.id, user.email, user.name, user.surname, user.phone);
  }

  async delete(id: string) {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
