import { Test } from "@nestjs/testing";
import { ConfigVersionsController } from "../config-versions.controller";
import { ConfigVersionsService } from "../config-versions.service";
import { configStub } from "../../config/stubs/config.stub";
import { Config } from "src/config/config.schema";
import { configVersionsStub } from "./stubs/config-versions.stub";
import { BadRequestException } from "@nestjs/common";

jest.mock('../config-versions.service')

describe('ConfigVersionsController', () => {
    let configVersionsController: ConfigVersionsController;
    let configVersionsService: ConfigVersionsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ConfigVersionsController],
            providers: [
                ConfigVersionsService
            ],
        }).compile();

        configVersionsService = moduleRef.get<ConfigVersionsService>(ConfigVersionsService)
        configVersionsController = moduleRef.get<ConfigVersionsController>(ConfigVersionsController);
        jest.clearAllMocks()
    })

    describe('find', () => {
        describe('when find is called', () => {
            let config: object;

            test('should return a config of the latest version', async () => {
                config = await configVersionsController.find('Test', undefined);
                expect(config).toStrictEqual(configStub().data);
            })
            test('should return a config of the specified version', async () => {
                config = await configVersionsController.find('Test', 1);
                expect(config).toStrictEqual(configStub().data);
            })
            test('should throw exception', async () => {
                try {
                    await configVersionsController.find(undefined, undefined)
                } catch (error) {
                    expect(error.message).toBe('Service not specified');
                }
            })
        })
    });
})
