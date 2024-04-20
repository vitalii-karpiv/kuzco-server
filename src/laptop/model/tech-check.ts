import { IsBoolean } from "class-validator";

export class TechCheck {
  constructor() {
    this.keyboard = false;
    this.camera = false;
    this.micro = false;
    this.sound = false;
    this.display = false;
    this.battery = false;
    this.ports = false;
  }

  @IsBoolean()
  keyboard: boolean;
  @IsBoolean()
  camera: boolean;
  @IsBoolean()
  micro: boolean;
  @IsBoolean()
  sound: boolean;
  @IsBoolean()
  display: boolean;
  @IsBoolean()
  battery: boolean;
  @IsBoolean()
  ports: boolean;
}
