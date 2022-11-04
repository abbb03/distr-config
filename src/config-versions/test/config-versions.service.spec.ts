import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigVersions, ConfigVersionsDocument } from '../config-versions.schema';
import { ConfigService } from '../../config/config.service';
import { configVersionsStub } from './stubs/config-versions.stub';
import { ConfigVersionsService } from '../config-versions.service';
import { configDtoStub } from '../../config/test/stubs/config.dto.stub';
import { ConfigVersionsModel } from '../__mocks__/config-versions.schema';
import { BadRequestException } from '@nestjs/common';

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
            let configVersion;
            let configDto = configDtoStub();
            configDto.service = 'Exists';

            beforeEach(async () => {
                configVersion = await configVersionsService.create(configDto);
            });

            test('should call a configVersionModel findOne function', async () => {
                expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configDto.service});
            });

            test('should throw a BadRequestException if configVersion already exists', async () => {
                expect(configVersionsService.create(configDtoStub())).rejects.toThrow(BadRequestException);
            });

            test('should call a configService create function', async () => {
                expect(mockConfigService.create).toBeCalledWith(configDto);
            });

            test('should call a configVersionModel create function', async () => {
                expect(mockConfigVersionsModel.create).toBeCalledWith({service: configDto.service});
            });

            test('should create a configVersion doc', async () => {
                expect(configVersion).toEqual(configVersionsStub());
            });
        });

        describe('delete', () => {
            describe('when delete is called', () => {
                let configVersion;

                beforeEach(async () => {
                    configVersion = await configVersionsService.delete(configDtoStub().service);
                });
    
                test('should call a configVersionModel findOne function', async () => {
                    expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configDtoStub().service});
                });
    
                test('should throw a BadRequestException if configVersion doesn\'t exists', async () => {
                    expect(configVersionsService.delete('Doesnt\'t exists')).rejects.toThrow(BadRequestException);
                });
            });
        }); 
    });
});
