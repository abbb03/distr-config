import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mixed } from "mongoose";

export class ConfigDto {
    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    data: Mixed;
}
