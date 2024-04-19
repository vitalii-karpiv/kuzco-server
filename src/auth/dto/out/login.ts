export default class LoginDtoOut {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  accessToken: string;
}
