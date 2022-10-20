import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Config } from "./config.schema";
import { ConfigService } from "./config.service";
import * as mapper from "src/mapper/mapper"

@Controller("configs")
export class ConfigController {
    constructor(private configService: ConfigService) {}

    @Get()
    async findAll(): Promise<Config[]> {
        return await this.configService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params): Promise<any> {
        return mapper.toConfigData(await this.configService.findOne(params.id));
    }

    @Post()
    async create(@Body() body): Promise<Config> {
        return await this.configService.create(body);
    }
}