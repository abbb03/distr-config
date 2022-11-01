import { ConfigVersions, ConfigVersionsDocument } from "src/config-versions/config-versions.schema";
import { configStub } from "test/config/config.stub";

export const configVersionsStub = (): ConfigVersions => {
    let cv = new ConfigVersions();
    cv.configs = [configStub()];
    cv.service = 'Test';
    return cv;
}