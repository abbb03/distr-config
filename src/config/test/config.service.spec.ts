import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Config, ConfigDocument } from '../config.schema';
import { ConfigService } from '../config.service';
import { ConfigModel } from '../__mocks__/config.schema';
import { configDtoStub } from './stubs/config.dto.stub';
import { configStub } from './stubs/config.stub';

jest.mock('../config.schema');

describe('ConfigService', () => {
    let mockConfigModel: Model<ConfigDocument>;
    let configService: ConfigService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            ConfigService,
            { 
                provide: getModelToken(Config.name), 
                useValue: ConfigModel,
            },
        ],
        }).compile();

        mockConfigModel = module.get<Model<ConfigDocument>>(getModelToken(Config.name));
        configService = module.get<ConfigService>(ConfigService);
        jest.clearAllMocks();
    });

    describe('create', () => {
        describe('when create is called', () => {
            test('should call a configModel create function', async () => {
                let config: Config = await configService.create(configDtoStub());
                expect(mockConfigModel.create).toBeCalledWith({data: configDtoStub().data});
            });

            test('should call a configModel create function', async () => {
                let config: Config = await configService.create(configDtoStub());
                expect(config).toStrictEqual(configStub());
            });
        });
    });
});
