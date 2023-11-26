import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectApikeyDto } from './create-project-apikey.dto';

export class UpdateProjectApikeyDto extends PartialType(CreateProjectApikeyDto) {}
