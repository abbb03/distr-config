import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as utils from "src/utils/toMillis";
import { Config, ConfigSchema } from "../config/config.schema";

export type ConfigVersionsDocument = ConfigVersions & Document;

@Schema()
export class ConfigVersions {
    @Prop({ type: String, unique : true, required: true })
    service: string;

    @Prop({ type: [ConfigSchema], required: true})
    configs: Config[];

    @Prop({ type: Number, required: true, default: 1 })
    private _currentVersion: number;

    @Prop({type: Date, required: true, default: new Date()})
    expireDate: Date;

    public updateExpireTime() {
        const expireTime: number = new Date().getTime() + utils.hoursToMillis(24);
        this.expireDate.setTime(expireTime);
    }

    public incVersion() {
        this._currentVersion++;
    }

    public get currentVersion(): number{
        return this._currentVersion;
    }
}

export const ConfigVersionsSchema = SchemaFactory.createForClass(ConfigVersions);

ConfigVersionsSchema.loadClass(ConfigVersions);