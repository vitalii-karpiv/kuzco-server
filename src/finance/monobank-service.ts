import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class MonobankService {
  private readonly BASE_URI = "https://api.monobank.ua/";
  private readonly $api = axios.create({
    baseURL: this.BASE_URI,
  });
  private readonly UC_MAP = {
    PERSONAL_STATEMENT: "personal/statement",
  };

  constructor() {
    this.$api.interceptors.request.use((config) => {
      config.headers["X-Token"] = `token`;
      return config;
    });
  }

  async fetchMonoExpense() {
    return await this.$api.get(`${this.UC_MAP.PERSONAL_STATEMENT}/{account}/1714026533`, {});
  }
}
