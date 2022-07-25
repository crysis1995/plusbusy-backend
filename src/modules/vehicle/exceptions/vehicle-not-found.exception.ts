import {NotFoundException} from "@nestjs/common";

export class VehicleNotFoundException extends NotFoundException{
    constructor(vehicleId:number) {
        super(`Cannot found vehicle with ID: ${vehicleId}`);

    }

}