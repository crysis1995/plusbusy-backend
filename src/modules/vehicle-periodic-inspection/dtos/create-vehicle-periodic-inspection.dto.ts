import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { VehicleIdSchema } from '../schemas/vehicle-id.schema';
import { FromDateSchema } from '../schemas/from-date.schema';
import { ToDateSchema } from '../schemas/to-date.schema';
import { InspectionTypeSchema } from '../schemas/inspection-type.schema';
import { createZodDto } from 'nestjs-zod';
import { NoteSchema } from '../schemas/note.schema';
import dayjs from 'dayjs';

export const CreateVehiclePeriodicInspectionDtoSchema = z
    .object({
        VehicleId: VehicleIdSchema,
        FromDate: FromDateSchema,
        ToDate: ToDateSchema,
        InspectionType: InspectionTypeSchema,
        Note: NoteSchema.optional()
    })
    .refine((x) => dayjs(x.FromDate).isBefore(dayjs(x.ToDate)), {
        message: 'ToDate must be after FromDate'
    });

export class CreateVehiclePeriodicInspectionDto extends createZodDto(
    CreateVehiclePeriodicInspectionDtoSchema
) {}

export class CreateVehiclePeriodicInspectionDtoBuilder extends BuilderTemplate<CreateVehiclePeriodicInspectionDto> {
    constructor() {
        super(new CreateVehiclePeriodicInspectionDto());
    }

    setVehicleId(value: CreateVehiclePeriodicInspectionDto['VehicleId']) {
        this.value.VehicleId = value;
        return this;
    }
    setFromDate(value: CreateVehiclePeriodicInspectionDto['FromDate']) {
        this.value.FromDate = value;
        return this;
    }
    setToDate(value: CreateVehiclePeriodicInspectionDto['ToDate']) {
        this.value.ToDate = value;
        return this;
    }
    setInspectionType(value: CreateVehiclePeriodicInspectionDto['InspectionType']) {
        this.value.InspectionType = value;
        return this;
    }
}
