import { Driver } from "../entities/driver.entity";
import * as EmailValidator from "email-validator";
import { ThrowException } from "../../../shared/shared.exception";
import { DriverEmailNotValidException } from "../exceptions/driver-email-not-valid.exception";
import { DriverNameTooLongException } from "../exceptions/driver-name-too-long.exception";
import { DriverNameTooShortException } from "../exceptions/driver-name-too-short.exception";
import { DriverSurnameTooLongException } from "../exceptions/driver-surname-too-long.exception";
import { DriverPhoneNumberTooShortException } from "../exceptions/driver-phone-number-too-short.exception";
import { DriverPhoneNumberTooLongException } from "../exceptions/driver-phone-number-too-long.exception";
import { DriverSurnameTooShortException } from "../exceptions/driver-surname-too-short.exception";
import { z } from "nestjs-zod/z";

export class GeneralDriverValidator {
    static DRIVER_NAME_MAX_LENGTH = 50;
    static DRIVER_NAME_MIN_LENGTH = 2;
    static DRIVER_SURNAME_MAX_LENGTH = 50;
    static DRIVER_SURNAME_MIN_LENGTH = 2;
    static DRIVER_PHONE_NUMBER_MIN_LENGTH = 9;
    static DRIVER_PHONE_NUMBER_MAX_LENGTH = 12;

    static Name = z.string().min(this.DRIVER_NAME_MIN_LENGTH).max(this.DRIVER_NAME_MAX_LENGTH)

    @ThrowException(DriverNameTooLongException)
    static validateNameMaxLength(name: Driver['Name']) {
        return name.length < this.DRIVER_NAME_MAX_LENGTH;
    }

    @ThrowException(DriverNameTooShortException)
    static validateNameMinLength(name: Driver['Name']) {
        return name.length > this.DRIVER_NAME_MIN_LENGTH;
    }

    @ThrowException(DriverSurnameTooLongException)
    static validateSurnameMaxLength(surname: Driver['Surname']) {
        return surname.length < this.DRIVER_SURNAME_MAX_LENGTH;
    }
    @ThrowException(DriverSurnameTooShortException)
    static validateSurnameMinLength(surname: Driver['Surname']) {
        return surname.length > this.DRIVER_SURNAME_MIN_LENGTH;
    }

    @ThrowException(DriverEmailNotValidException)
    static validateEmail(email: Driver['Email']) {
        return EmailValidator.validate(email);
    }

    @ThrowException(DriverPhoneNumberTooShortException)
    static validatePhoneNumberMinLength(phoneNumber: Driver['Phone']) {
        return phoneNumber.length > this.DRIVER_PHONE_NUMBER_MIN_LENGTH;
    }
    @ThrowException(DriverPhoneNumberTooLongException)
    static validatePhoneNumberMaxLength(phoneNumber: Driver['Phone']) {
        return phoneNumber.length < this.DRIVER_PHONE_NUMBER_MAX_LENGTH;
    }
}
