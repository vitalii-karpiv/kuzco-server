import { Module } from "@nestjs/common";
import { LaptopController } from "./laptop.controller";
import { LaptopService } from "./laptop.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Laptop, LaptopSchema } from "./model/laptop";
import { TagModule } from "../tag/tag.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: Laptop.name, schema: LaptopSchema }]), TagModule],
  controllers: [LaptopController],
  providers: [LaptopService],
  exports: [LaptopService],
})
export class LaptopModule {}
