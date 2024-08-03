import axios from "axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class MonobankService {
  private readonly BASE_URI = "https://api.monobank.ua/";
  private readonly $api = axios.create({
    baseURL: this.BASE_URI,
  });
  private readonly UC_MAP = {
    PERSONAL_STATEMENT: "personal/statement",
  };

  constructor(private config: ConfigService) {
    this.$api.interceptors.request.use((config) => {
      config.headers["X-Token"] = this.config.get<string>("TOKEN");
      return config;
    });
  }

  async fetchExpenses(from: number, to: number) {
    const personalStatementDtoOut = await this.$api.get(
      `${this.UC_MAP.PERSONAL_STATEMENT}/${this.config.get<string>("ACCOUNT")}/${from}/${to}`,
      {},
    );
    return personalStatementDtoOut.data.filter((payment: any) => payment.amount < 0);
  }
}
