import { ConfigVersions } from '../../config-versions.schema';
import { configStub } from '../../../config/test/stubs/config.stub';
import { hoursToMillis } from '../../../utils/timeСonversion';

export const configVersionsStub = (date?: Date): ConfigVersions => {
    const cv = new ConfigVersions();
    cv.configs = [configStub()];
    cv.service = 'Test';
    cv.currentVersion = 1;
    if (!date) {
        cv.expireDate = new Date(2022, 2, 2);
        return cv;
    }
    cv.expireDate = new Date(date.getTime() + hoursToMillis(24));
    return cv;
}
