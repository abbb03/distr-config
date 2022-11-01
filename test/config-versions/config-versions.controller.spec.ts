import { Test } from "@nestjs/testing";
import { ConfigVersionsController } from "src/config-versions/config-versions.controller";
import { ConfigVersions } from "src/config-versions/config-versions.schema";
import { ConfigVersionsService } from "src/config-versions/config-versions.service";

// class СonfigVersionsServiceMock {
//     findLastServiceConfig(service: string): Promise<ConfigVersions> {
//       return {
//         service: 'TestService',
//         configs
//       };
//     }
// }

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
    })

    describe('find', () => {
        it('should return a config of the latest version', async () => {
            const result = {
                version: 5,
                data: {
                    name: 'Test',
                    isTest: true,
                    testArr: [
                        'Test1',
                        'Test2'
                    ]
                }
            };

            expect(await configVersionsController.find('Test', undefined)).toBe(result);
        });
    });
})