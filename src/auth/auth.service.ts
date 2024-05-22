import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { TokenService } from "./token.service";
import LoginDtoIn from "./dto/in/login";
import LoginDtoOut from "./dto/out/login";
import RegisterDtoIn from "./dto/in/register";
import RegisterDtoOut from "./dto/out/register";
import { UserCreateDtoIn } from "../user/dto/in/user-create";
import LogoutDtoIn from "./dto/in/logout";
import RefreshDtoIn from "./dto/in/refresh";
import RefreshDtoOut from "./dto/out/refresh";
import { User } from "../user/model/user";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login({ email, password }: LoginDtoIn) {
    // Retrieve user.
    const user: User = await this.userService.getByEmail(email);
    if (!user) {
      throw new BadRequestException({
        statusCode: 404,
        message: "User with given email does not exists.",
        paramMap: {
          email,
        },
      });
    }
    // Check if password correct.
    // const pass = await bcrypt.hash(password, 10);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }
    // Generate JWT
    const { accessToken, refreshToken } = await this.tokenService.generateTokens(user.id, email);
    // Save refreshToken
    await this.tokenService.saveToken(user.id, refreshToken);
    // Return dtoOut
    return {
      loginDtoOut: new LoginDtoOut(accessToken),
      refreshToken,
    };
  }

  async register({ email, password, phone, name, surname }: RegisterDtoIn) {
    // Check if user with given email does not already exists
    const duplicateUser = await this.userService.getByEmail(email);
    if (duplicateUser) {
      throw new BadRequestException({
        statusCode: 400,
        message: "User with given email already exists.",
        paramMap: {
          email,
        },
      });
    }
    // Create user
    const user = await this.userService.create(new UserCreateDtoIn(email, password, name, surname, phone));
    // Generate JWT
    const { accessToken, refreshToken } = await this.tokenService.generateTokens(user.id, email);
    // Save refresh token
    await this.tokenService.saveToken(user.id, refreshToken);
    // Return DtoOut
    return {
      registerDtoOut: new RegisterDtoOut(accessToken),
      refreshToken,
    };
  }

  async logout({ refreshToken }: LogoutDtoIn) {
    // Remove refresh from db
    await this.tokenService.removeToken(refreshToken);
  }

  async refresh({ refreshToken }: RefreshDtoIn) {
    // Validate refresh token
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const token = await this.tokenService.findToken(refreshToken);

    if (!userData || !token) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Refresh token does not exist.",
      });
    }

    const user = await this.userService.get(userData.sub);

    // Generate tokens
    const { accessToken, refreshToken: newRefreshToken } = await this.tokenService.generateTokens(user.id, user.email);
    // Store tokens
    await this.tokenService.saveToken(user.id, newRefreshToken);
    // Return dtoOut
    return {
      refreshDtoOut: new RefreshDtoOut(accessToken),
      refreshToken: newRefreshToken,
    };
  }
}
