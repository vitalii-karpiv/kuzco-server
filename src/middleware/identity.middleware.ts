import { Injectable, NestMiddleware } from "@nestjs/common";
import { KuzcoService } from "../kuzco/kuzco.service";
import { NextFunction, Request, Response } from "express";
import { TokenService } from "../auth/token.service";
import { UserService } from "../user/user.service";

@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService, private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      next();
    }
    const user = await this.tokenService.validateAccessToken(token);
    req.body.userId = user.sub;
    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
