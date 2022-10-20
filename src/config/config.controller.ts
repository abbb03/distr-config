import { Body, Controller, Get, Post } from "@nestjs/common";
import { Config } from "./config.schema";
import { ConfigService } from "./config.service";

@Controller("configs")
export class ConfigController {
    constructor(private configService: ConfigService) {}

    @Get()
    async findAll(): Promise<Config[]> {
        return await this.configService.findAll();
    }

    @Get()
    async findOne(): Promise<Config[]> {
        return;
    }

    @Post()
    async create(@Body() body): Promise<Config> {
        return await this.configService.create(body);
    }
}