import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenService } from "./token.service";
import { UserModule } from "../user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { RefreshToken, RefreshTokenSchema } from "./model/refresh-token";

@Module({
  exports: [TokenService],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.register({ global: true }),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
  ],
})
export class AuthModule {}
