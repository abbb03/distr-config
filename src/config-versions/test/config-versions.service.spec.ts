import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigVersions, ConfigVersionsDocument } from '../config-versions.schema';
import { ConfigService } from '../../config/config.service';
import { configVersionsStub } from './stubs/config-versions.stub';
import { ConfigVersionsService } from '../config-versions.service';
import { configDtoStub } from '../../config/test/stubs/config.dto.stub';
import { ConfigVersionsModel } from '../__mocks__/config-versions.schema';

jest.mock('../../config/config.service');
jest.mock('../config-versions.schema');

describe('UsersRepository', () => {
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
            const cv = configVersionsStub();
            let configVersion;

            beforeEach(async () => {
                configVersion = await configVersionsService.create(configDtoStub());
            });

            test('should call a configVersion findOne function', async () => {
                expect(mockConfigVersionsModel.findOne).toBeCalledWith({service: configDtoStub().service});
            });

            test('shoul call a configVersion create function', async () => {
                expect(mockConfigVersionsModel.create).toBeCalledWith({service: configDtoStub().service});
            })

            test('should create a configVersion doc', async () => {
                const res = await configVersionsService.create(configDtoStub());
                expect(res).toStrictEqual(configVersionsStub());
            });
        });
    });
});
