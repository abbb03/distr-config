import { ConfigVersions } from "../../config-versions.schema";
import { configStub } from "../../../config/stubs/config.stub";

export const configVersionsStub = (): ConfigVersions => {
    const cv = new ConfigVersions();
    cv.configs = [configStub()];
    cv.service = 'Test';
    return cv;
}
