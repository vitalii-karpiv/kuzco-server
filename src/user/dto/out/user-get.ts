export class UserGetDtoOut {
  constructor(id: string, email: string, name: string, surname: string, phone: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
  }

  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
}
