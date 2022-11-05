import { millisToHours } from '../../utils/timeСonversion';
import { configVersionsStub } from './stubs/config-versions.stub';

describe('configVersions schema', () => {
    test('should update expire time when updateExpireTime function called', async () => {
        const configVersions = configVersionsStub();
        configVersions.updateExpireTime();
        const isUpdated = millisToHours(configVersions.expireDate.getTime() - new Date().getTime()) > 23;
        expect(isUpdated).toBe(true);
    });

    test('should increment version', async () => {
        const configVersions = configVersionsStub();
        configVersions.incVersion();
        expect(configVersions.currentVersion).toBe(2);
    });
});