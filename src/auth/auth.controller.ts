import { Body, Controller, Get, HttpCode, HttpStatus, Post, Response, Request } from "@nestjs/common";
import { Public } from "../common/utils/public-decorator";
import { ValidationPipe } from "../common/utils/validation.pipe";
import LoginDtoIn from "./dto/in/login";
import { AuthService } from "./auth.service";
import RegisterDtoIn from "./dto/in/register";
import LogoutDtoIn from "./dto/in/logout";
import RefreshDtoIn from "./dto/in/refresh";

const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @Public()
  async login(@Body(new ValidationPipe()) loginDto: LoginDtoIn, @Response() response) {
    const { loginDtoOut, refreshToken } = await this.authService.login(loginDto);
    response.cookie("refreshToken", refreshToken, {
      maxAge: MAX_AGE,
      sameSite: "strict",
      httpOnly: true,
    });
    response.send(loginDtoOut);
  }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  @Public()
  async register(@Body(new ValidationPipe()) registerDto: RegisterDtoIn, @Response() response) {
    const { registerDtoOut, refreshToken } = await this.authService.register(registerDto);
    response.cookie("refreshToken", refreshToken, {
      maxAge: MAX_AGE,
      sameSite: "strict",
      httpOnly: true,
    });
    response.send(registerDtoOut);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("logout")
  async logout(@Request() request, @Body(new ValidationPipe()) logoutDto: LogoutDtoIn, @Response() response) {
    const { refreshToken } = request.cookies;
    if (!logoutDto.refreshToken) {
      logoutDto.refreshToken = refreshToken;
    }
    await this.authService.logout(logoutDto);
    response.clearCookie("refreshToken");
    response.send();
  }

  @HttpCode(HttpStatus.OK)
  @Get("refresh")
  @Public()
  async refresh(@Request() request, @Body(new ValidationPipe()) refreshDto: RefreshDtoIn, @Response() response) {
    const { refreshToken } = request.cookies;
    if (!refreshDto.refreshToken) {
      refreshDto.refreshToken = refreshToken;
    }
    const { refreshDtoOut, refreshToken: newRT } = await this.authService.refresh(refreshDto);
    response.cookie("refreshToken", newRT, {
      maxAge: MAX_AGE,
      sameSite: "strict",
      httpOnly: true,
    });
    response.send(refreshDtoOut);
  }
}
