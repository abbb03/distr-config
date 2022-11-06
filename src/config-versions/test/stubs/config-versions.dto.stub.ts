import { configStub } from '../../../config/test/stubs/config.stub';
import { ConfigVersionsDto } from '../../../config-versions/config-versions.dto';

export const configVersionsDtoStub = (): ConfigVersionsDto => {
    const cv = new ConfigVersionsDto();
    cv.data = configStub().data;
    cv.service = 'Test';
    return cv;
}
