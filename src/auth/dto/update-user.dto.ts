import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './auth.dto';

export class UpdateUserDto extends PartialType(LoginDto) {}