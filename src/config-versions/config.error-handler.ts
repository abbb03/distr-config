import { BadRequestException } from "@nestjs/common";

export const handleE11000 = function(error, res, next) {
    if (error.code === 11000) {
        console.log(error);
        throw new BadRequestException('The config for this service already exists');
    }
}
