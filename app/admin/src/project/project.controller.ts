import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindProjectDto } from './dto/find-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
    const creatorId = req.user.id;
    return this.projectService.create(createProjectDto, creatorId);
  }

  @Get()
  async findMany(@Query() dto: FindProjectDto, @Request() req: any) {
    const creatorId = req.user.id;
    return this.projectService.findMany(dto, creatorId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  /**
   * @see https://stackoverflow.com/questions/28459418/use-of-put-vs-patch-methods-in-rest-api-real-life-scenarios
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
