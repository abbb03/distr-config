import { ConfigVersions } from "../../config-versions.schema";
import { configStub } from "../../../config/test/stubs/config.stub";

export const configVersionsStub = (): ConfigVersions => {
    const cv = new ConfigVersions();
    cv.configs = [configStub()];
    cv.service = 'Test';
    cv.currentVersion = 1;
    return cv;
}
