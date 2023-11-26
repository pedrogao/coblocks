import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProjectApikeyService } from './project-apikey.service';
import { CreateProjectApikeyDto } from './dto/create-project-apikey.dto';
import { UpdateProjectApikeyDto } from './dto/update-project-apikey.dto';
import { FindManyDto } from './dto/find-many.dto';

@Controller('project-api-keys')
export class ProjectApikeyController {
  constructor(private readonly projectApikeyService: ProjectApikeyService) {}

  @Post()
  create(@Body() createProjectApikeyDto: CreateProjectApikeyDto, @Req() req: any) {
    const creatorId = req.user.id;
    return this.projectApikeyService.create(createProjectApikeyDto, creatorId);
  }

  @Get()
  findMany(@Query() query: FindManyDto) {
    return this.projectApikeyService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectApikeyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectApikeyDto: UpdateProjectApikeyDto) {
    return this.projectApikeyService.update(id, updateProjectApikeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectApikeyService.remove(id);
  }
}
