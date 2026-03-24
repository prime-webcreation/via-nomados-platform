import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

class PassengerDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;
}

export class CreateBookingDto {
  @IsString()
  userId!: string;

  @IsIn(["flight", "hotel"])
  itemType!: "flight" | "hotel";

  @IsString()
  itemId!: string;

  @IsNumber()
  totalPrice!: number;

  @IsString()
  currency!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  passengerDetails!: PassengerDto[];

  @IsOptional()
  @IsString()
  paymentReference?: string;
}
