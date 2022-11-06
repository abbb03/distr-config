import { Test, TestingModule } from '@nestjs/testing';
import { ConfigVersionsService } from '../config-versions.service';
import { ConfigVersionsController } from '../config-versions.controller';
import { configStub } from '../../config/test/stubs/config.stub';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { configDtoStub } from '../../config/test/stubs/config.dto.stub';
import { configVersionsStub } from './stubs/config-versions.stub';

jest.mock('../config-versions.service');

describe('ConfigVersionsController', () => {
    let configVersionsController: ConfigVersionsController;
    let mockConfigVersionsService: ConfigVersionsService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [ConfigVersionsController],
            providers: [
                ConfigVersionsService
            ],
        }).compile();

        configVersionsController = moduleRef.get<ConfigVersionsController>(ConfigVersionsController);
        mockConfigVersionsService = moduleRef.get<ConfigVersionsService>(ConfigVersionsService);
        jest.clearAllMocks();
    });

    test('should be defined', () => {
        expect(configVersionsController).toBeDefined();
        expect(mockConfigVersionsService).toBeDefined();
    });

    describe('find', () => {
        describe('when find is called', () => {
            let config: object;

            test('then it should call findLastServiceConfig function of ConfigVersions service if version is undefined', async () => {
                config = await configVersionsController.find(configVersionsStub().service, undefined);
                expect(mockConfigVersionsService.findLastServiceConfig).toBeCalledWith(configDtoStub().service);
            });

            test('then it should return a config of the latest version if version is undefined', async () => {
                config = await configVersionsController.find(configVersionsStub().service, undefined);
                expect(config).toStrictEqual(configStub().data);
            });

            test('then it should call findOneByVersion function of ConfigVersions service', async () => {
                config = await configVersionsController.find(configVersionsStub().service, configVersionsStub().currentVersion);
                expect(mockConfigVersionsService.findOneByVersion).toBeCalledWith(configVersionsStub().service, configVersionsStub().currentVersion);
            });

            test('then it should return a config of the specified version', async () => {
                config = await configVersionsController.find(configVersionsStub().service, configVersionsStub().currentVersion);
                expect(config).toStrictEqual(configStub().data);
            });

            test('then it should throw bad request exception if arguments is undefined', async () => {
                expect(configVersionsController.find(undefined, undefined)).rejects.toThrow(BadRequestException);
            });
        });
    });

    describe('update', () => {
        describe('when update is called', () => {
            let expected: string = 'Config for service ' + configDtoStub().service + ' updated'
            let result: string;

            test('then it should return a config', async () => {
                result = await configVersionsController.update(configDtoStub());
                expect(result).toStrictEqual(expected);
            })

            test('then it should throw internal server error exception if query is undefined', async () => {
                let wrongConfigDto = configDtoStub('Fail');
                expect(configVersionsController.update(wrongConfigDto)).rejects.toThrow(InternalServerErrorException);
            });
        })
    });

    describe('create', () => {
        describe('when create is called', () => {
            let expected: string = 'Config for service ' + configDtoStub().service + ' created'
            let result: string;

            beforeEach(async () => {
                result = await configVersionsController.create(configDtoStub());
            })

            test('then it should call create function of ConfigVersions service', async () => {
                expect(mockConfigVersionsService.create).toBeCalledWith(configDtoStub());
            });

            test('then it should return a config', async () => {
                expect(result).toStrictEqual(expected);
            });

            test('then it should throw bad request exception if service is undefined', async () => {
                let wrongConfigDto = configDtoStub();
                wrongConfigDto.service = undefined;
                expect(configVersionsController.create(wrongConfigDto)).rejects.toThrow(BadRequestException);
            });

            test('then it should throw bad request exception if data is undefined', async () => {
                let wrongConfigDto = configDtoStub();
                wrongConfigDto.data = undefined;
                expect(configVersionsController.create(wrongConfigDto)).rejects.toThrow(BadRequestException);
            });

            test('then it should throw internal server error exception if query is undefined', async () => {
                let wrongConfigDto = configDtoStub('Fail');
                expect(configVersionsController.create(wrongConfigDto)).rejects.toThrow(InternalServerErrorException);
            });
        })
    });

    describe('delete', () => {
        describe('when delete is called', () => {
            let expected: string = 'Config for service ' + configDtoStub().service + ' deleted'
            let result: string;

            test('then it should return a deleted config', async () => {
                result = await configVersionsController.delete('Test');
                expect(result).toStrictEqual(expected);
            })

            test('then it should throw internal server error exception if query is undefined', async () => {
                expect(configVersionsController.delete('Fail')).rejects.toThrow(InternalServerErrorException);
            });
        })
    });
})
