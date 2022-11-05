import { configVersionsStub } from '../test/stubs/config-versions.stub';
import { Config } from '../../config/config.schema';

type filterQuery = { service: string };

export class ConfigVersions {
    service: string;
    configs: Config[];
    currentVersion: number;
    expireDate: Date;
    updateExpireTime() {
        return this.expireDate;
    };
    markModified() {
        return true;
    };
    save() {
        return configVersionsStub();
    };
    incVersion() {
        return this.currentVersion; 
    }
};

export const ConfigVersionsModel = {
    create: jest.fn((filter: filterQuery) => {
        return configVersionsStub();
    }),

    delete: jest.fn((service: string) => {
        if (service !== configVersionsStub().service) {
            return undefined;
        }

        return configVersionsStub();
    }),

    findOne: jest.fn((filter: filterQuery) => {
        if (filter.service === 'Doesn\'t exists') {
            return undefined;
        }
        if (filter.service === 'IsUsed') {
            return configVersionsStub(new Date());
        }
    
        return configVersionsStub();
    }),

    findOneAndDelete: jest.fn((filter: filterQuery) => {
        return configVersionsStub();
    }),

    findOneAndUpdate: jest.fn((filter: filterQuery) => {
        return configVersionsStub();
    }),
};
