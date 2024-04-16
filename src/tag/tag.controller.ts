import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ValidationPipe } from "../common/utils/validation.pipe";
import { TagService } from "./tag.service";
import { TagCreateDtoIn } from "./dto/in/tag-create";
import { TagCreateDtoOut } from "./dto/out/tag-create";
import { TagListDtoIn } from "./dto/in/tag-list";
import { TagListDtoOut } from "./dto/out/tag-list";

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) tagCreateDtoIn: TagCreateDtoIn): Promise<TagCreateDtoOut> {
    return this.tagService.create(tagCreateDtoIn);
  }

  @Get()
  list(@Body(new ValidationPipe()) tagListDtoIn: TagListDtoIn): Promise<TagListDtoOut> {
    return this.tagService.list(tagListDtoIn);
  }
}
