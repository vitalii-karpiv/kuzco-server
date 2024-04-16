import { Module } from "@nestjs/common";
import { KuzcoController } from "./kuzco.controller";
import { KuzcoService } from "./kuzco.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Kuzco, KuzcoSchema } from "./model/kuzco";

@Module({
  imports: [MongooseModule.forFeature([{ name: Kuzco.name, schema: KuzcoSchema }])],
  controllers: [KuzcoController],
  providers: [KuzcoService],
  exports: [KuzcoService],
})
export class KuzcoModule {}
