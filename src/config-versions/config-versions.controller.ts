import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';
import { ConfigDto } from '../config/config.dto';
import { ConfigVersions, ConfigVersionsDocument } from './config-versions.schema';
import { ConfigVersionsService } from './config-versions.service';
import * as mapper from "../utils/mapper";

@Controller('config')
export class ConfigVersionsController {
    constructor(private configVersionsService: ConfigVersionsService) {}

    @Get()
    async find(@Query('service') service: string, @Query('v') version: number): Promise<object> 
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
    async update(@Body() configDto: ConfigDto): Promise<ConfigVersions> {
        return await this.configVersionsService.update(configDto);
    }

    @Post()
    async create(@Body() configDto: ConfigDto): Promise<ConfigVersions> {
        if (!configDto.service) {
            throw new BadRequestException('Service not specified');
        }
        if (!configDto.data) {
            throw new BadRequestException('Data not specified');
        }

        return await this.configVersionsService.create(configDto);
    }

    @Delete()
    async delete(@Query('service') service: string): Promise<ConfigVersions> {
        return await this.configVersionsService.delete(service);
    }
}
