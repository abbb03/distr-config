import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigVersions, ConfigVersionsDocument } from '../config-versions.schema';
import { ConfigService } from '../../config/config.service';
import { configVersionsStub } from './stubs/config-versions.stub';
import { ConfigVersionsService } from '../config-versions.service';
import { configDtoStub } from '../../config/test/stubs/config.dto.stub';
import { ConfigVersionsModel } from '../__mocks__/config-versions.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigDto } from '../../config/config.dto';
import { Config } from '../../config/config.schema';
import { configStub } from '../../config/test/stubs/config.stub';

jest.mock('../../config/config.service');
jest.mock('../config-versions.schema');

describe('ConfigVersionsService', () => {
    let mockConfigVersionsModel: Model<ConfigVersionsDocument>;
    let mockConfigService: ConfigService;
    let configVersionsService: ConfigVersionsService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            ConfigService,
            { 
                provide: getModelToken(ConfigVersions.name), 
                useValue: ConfigVersionsModel,
            },
            ConfigVersionsService
        ],
        }).compile();

        mockConfigVersionsModel = module.get<Model<ConfigVersionsDocument>>(getModelToken(ConfigVersions.name));
        mockConfigService = module.get<ConfigService>(ConfigService);
        configVersionsService = module.get<ConfigVersionsService>(ConfigVersionsService);
        jest.clearAllMocks();
    });

    test('should be defined', () => {
        expect(mockConfigVersionsModel).toBeDefined();
        expect(mockConfigService).toBeDefined();
        expect(configVersionsService).toBeDefined();
    });

    describe('create', () => {
        describe('when create is called', () => {
            let configVersions: ConfigVersions;
            let configDto: ConfigDto = configDtoStub('Doesn\'t exists');

            beforeEach(async () => {
                configVersions = await configVersionsService.create(configDto);
            });

            test('should call a configVersionModel findOne function', async () => {
                expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configDto.service});
            });

            test('should throw a BadRequestException if configVersions already exists', async () => {
                expect(configVersionsService.create(configDtoStub())).rejects.toThrow(BadRequestException);
            });

            test('should call a configService create function', async () => {
                expect(mockConfigService.create).toBeCalledWith(configDto);
            });

            test('should call a configVersionModel create function', async () => {
                expect(mockConfigVersionsModel.create).toBeCalledWith({service: configDto.service});
            });

            test('should return a configVersions', async () => {
                expect(configVersions).toEqual(configVersionsStub());
            });
        });
    });

    describe('delete', () => {
        describe('when delete is called', () => {
            let configVersions: ConfigVersions;

            beforeEach(async () => {
                configVersions = await configVersionsService.delete(configDtoStub().service);
            });

            test('should call a configVersionsModel findOne function', async () => {
                expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configDtoStub().service});
            });

            test('should return deleted configVersions', async () => {
                expect(configVersions).toEqual(configVersionsStub());
            });

            test('should throw a NotFoundException if configVersions doesn\'t exists', async () => {
                expect(configVersionsService.delete('Doesn\'t exists')).rejects.toThrow(NotFoundException);
            });

            test('should throw a BadRequestException if configVersions is used', async () => {
                expect(configVersionsService.delete('IsUsed')).rejects.toThrow(BadRequestException);
            });
        });
    });

    describe('update', () => {
        describe('when update is called', () => {
            let configVersions: ConfigVersions;

            beforeEach(async () => {
                configVersions = await configVersionsService.update(configDtoStub());
            });

            test('should call a configVersionsModel findOne function', async () => {
                expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configDtoStub().service});
            });

            test('should throw a NotFoundException if configVersions doesn\'t exists', async () => {
                expect(configVersionsService.update(configDtoStub('Doesn\'t exists'))).rejects.toThrow(NotFoundException);
            });

            test('should call a configService create function', async () => {
                expect(mockConfigService.create).toBeCalledWith(configDtoStub());
            });

            test('should return updated configVersions', async () => {
                expect(configVersions).toEqual(configVersionsStub());
            });
        })
    });

    describe('findLastServiceConfig', () => {
        describe('when findLastServiceConfig is called', () => {
            let config: Config;

            test('should call a findConfigVersionsDocument function', async () => {
                const spy = jest.spyOn(configVersionsService, 'findConfigVersionsDocument');
                config = await configVersionsService.findLastServiceConfig(configDtoStub().service);
                expect(spy).toBeCalled();
            });

            test('should return a config', async () => {
                config = await configVersionsService.findLastServiceConfig(configDtoStub().service);
                expect(config).toStrictEqual(configStub());
            });
        });
    });

    describe('findOneByVersion', () => {
        describe('when findOneByVersion is called', () => {
            let config: Config;

            test('should call a findAllServiceConfigs function', async () => {
                const spy = jest.spyOn(configVersionsService, 'findAllServiceConfigs');
                config = await configVersionsService.findOneByVersion(configVersionsStub().service, configVersionsStub().currentVersion);
                expect(spy).toBeCalled();
            });

            test('should throw a NotFoundException if the config version is not found', async () => {
                expect(configVersionsService.findOneByVersion(configVersionsStub().service, 2)).rejects.toThrow(NotFoundException);
            });

            test('should return a config', async () => {
                config = await configVersionsService.findOneByVersion(configVersionsStub().service, configVersionsStub().currentVersion);
                expect(config).toStrictEqual(configStub());
            });
        });
    });

    describe('findAllServiceConfigs', () => {
        describe('when findAllServiceConfigs is called', () => {
            let configs: Config[];

            test('should call a findAllServiceConfigs function', async () => {
                const spy = jest.spyOn(configVersionsService, 'findConfigVersionsDocument');
                configs = await configVersionsService.findAllServiceConfigs(configVersionsStub().service);
                expect(spy).toBeCalled();
            });

            test('should return an config array', async () => {
                configs = await configVersionsService.findAllServiceConfigs(configVersionsStub().service);
                expect(configVersionsStub().configs).toStrictEqual(configs);
            });
        });
    });

    describe('findConfigVersionsDocument', () => {
        describe('when findConfigVersionsDocument is called', () => {
            let configVersions: ConfigVersions;

            test('should call a configVersionsModel findOne function', async () => {
                configVersions = await configVersionsService.findConfigVersionsDocument(configVersionsStub().service);
                expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configVersionsStub().service});
            });

            test('should throw a NotFoundException if the config version is not found', async () => {
                expect(configVersionsService.findConfigVersionsDocument('Doesn\'t exists')).rejects.toThrow(NotFoundException);
            });

            test('should return a configVerisonDocument', async () => {
                configVersions = await configVersionsService.findConfigVersionsDocument(configVersionsStub().service);
                expect(configVersionsStub()).toEqual(configVersions);
            });
        });
    });
});
