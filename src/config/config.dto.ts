import { Prop } from "@nestjs/mongoose";
import mongoose, { Mixed } from "mongoose";

export class ConfigDto {
    @Prop({ type: String, required: true, dropDups: true })
    service: string;
    
    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    data: Mixed;
}
