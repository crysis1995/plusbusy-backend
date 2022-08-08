import { CreateDriverDto } from '../dtos/create-driver.dto';

export class DriverCreatedEvent {
    static Name: string = 'driver.created';
    private EmittedAt: Date;
    constructor(public Id: number, public driverData: CreateDriverDto) {
        this.EmittedAt = new Date();
    }
}
