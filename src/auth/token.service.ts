import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RefreshToken } from "./model/refresh-token";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
  ) {}

  async generateTokens(userId: string, email: string) {
    const jwtPayload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("ACCESS_TOKEN_SECRET"),
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("REFRESH_TOKEN_SECRET"),
        expiresIn: "60d",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>("ACCESS_TOKEN_SECRET"),
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async validateRefreshToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>("REFRESH_TOKEN_SECRET"),
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    let tokenData: RefreshToken = await this.refreshTokenModel.findOne({ userId: userId }).exec();

    if (!tokenData) {
      tokenData = new RefreshToken();
      tokenData.userId = userId;
    }

    tokenData.token = refreshToken;
    const refreshTokenModel = new this.refreshTokenModel(tokenData);
    return await refreshTokenModel.save();
  }

  async removeToken(refreshToken: string) {
    await this.refreshTokenModel.deleteOne({ token: refreshToken }).exec();
  }

  async findToken(refreshToken: string) {
    return await this.refreshTokenModel.findOne({ token: refreshToken }).exec();
  }
}
