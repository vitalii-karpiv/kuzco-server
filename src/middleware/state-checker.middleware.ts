import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { KuzcoService } from "../kuzco/kuzco.service";
import { KuzcoState } from "../common/enum/kuzco-state";
import { Kuzco } from "../kuzco/model/kuzco";

@Injectable()
export class StateCheckerMiddleware implements NestMiddleware {
  constructor(private readonly kuzcoService: KuzcoService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const kuzco = await this.kuzcoService.get();
    if (kuzco.state !== KuzcoState.active && !this.#isReadAllowed(kuzco, req)) {
      throw new BadRequestException({
        message: "Main instance is not in proper state.",
        paramMap: {
          kuzcoState: kuzco.state,
        },
      });
    }
    next();
  }

  #isReadAllowed(kuzco: Kuzco, req: Request): boolean {
    return kuzco.state === KuzcoState.readonly && req.method === "GET";
  }
}
