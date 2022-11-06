import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export const handleError = function(error, res, next) {
    switch (error.code) {
    case 11000:
        throw new BadRequestException('The config for this service already exists');
    default:
        throw new InternalServerErrorException();
    }
}
