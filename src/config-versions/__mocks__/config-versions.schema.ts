import { configDtoStub } from "../../config/test/stubs/config.dto.stub";
import { configVersionsStub } from "../test/stubs/config-versions.stub";
import { configStub } from "../../config/test/stubs/config.stub"
import { Config } from "../../config/config.schema";
import { hoursToMillis } from "../../utils/toMillis";

type filterQuery = { service: string };

export class ConfigVersions {
    service: string;
    configs: Config[];
    currentVersion: number;
    expireDate: Date;
    updateExpireTime() {
        const newTime = new Date().getTime() + hoursToMillis(24);
        this.expireDate = new Date(newTime);
        return this.expireDate;
    };
    markModified() {
        return true;
    };
    save() {
        return configVersionsStub();
    };
}

export const ConfigVersionsModel = {
    findOne: jest.fn((filter: filterQuery) => {
        if (filter.service === configDtoStub().service) {
            return undefined;
        }
    
        return configVersionsStub();
    }),
    create: jest.fn((filter: filterQuery) => {
        return configVersionsStub();
    }),
}
