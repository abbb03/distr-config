import { Prop } from "@nestjs/mongoose";
import mongoose, { Mixed } from "mongoose";

export class ConfigDto {
    @Prop({ type: String, required: true })
    service: string;

    @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
    data: object;
}
