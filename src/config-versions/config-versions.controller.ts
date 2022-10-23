import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Mixed } from 'mongoose';
import { ConfigDto } from 'src/config/config.dto';
import { ConfigVersionsDocument } from './config-versions.schema';
import { ConfigVersionsService } from './config-versions.service';
import * as mapper from "src/mapper/mapper"

@Controller('config')
export class ConfigVersionsController {
    constructor(private configVersionsService: ConfigVersionsService) {}

    @Get()
    async findOneLast(@Query('service') service: string): Promise<Mixed> 
    {
        return mapper.toConfigData(await this.configVersionsService.findOneLast(service));
    }
    
    @Put()
    async updateOne(@Body() configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        return await this.configVersionsService.update(configDto);
    }

    @Post()
    async createOne(@Body() configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        return await this.configVersionsService.create(configDto);
    }
}
