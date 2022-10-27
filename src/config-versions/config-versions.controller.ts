import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';
import { Mixed } from 'mongoose';
import { ConfigDto } from 'src/config/config.dto';
import { ConfigVersionsDocument } from './config-versions.schema';
import { ConfigVersionsService } from './config-versions.service';
import * as mapper from "src/utils/mapper"

@Controller('config')
export class ConfigVersionsController {
    constructor(private configVersionsService: ConfigVersionsService) {}

    @Get()
    async find(@Query('service') service: string, @Query('v') version: number): Promise<Mixed> 
    {
        if (!service) {
            throw new BadRequestException('Service not specified');
        }
        if (version) {
            return mapper.toConfigData(await this.configVersionsService.findOneByVersion(service, version));
        }

        return mapper.toConfigData(await this.configVersionsService.findLastServiceConfig(service));
    }

    @Put()
    async update(@Body() configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        return await this.configVersionsService.update(configDto);
    }

    @Post()
    async create(@Body() configDto: ConfigDto): Promise<ConfigVersionsDocument> {
        if (!configDto.service) {
            throw new BadRequestException('Service not specified');
        }
        if (!configDto.data) {
            throw new BadRequestException('Data not specified');
        }

        return await this.configVersionsService.create(configDto);
    }

    @Delete()
    async delete(@Query('service') service: string): Promise<ConfigVersionsDocument> {
        return await this.configVersionsService.delete(service);
    }
}
