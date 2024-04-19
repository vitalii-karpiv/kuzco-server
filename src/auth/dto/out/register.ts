export default class RegisterDtoOut {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  accessToken: string;
}
