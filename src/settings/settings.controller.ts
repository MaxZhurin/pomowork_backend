import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  saveSettings(@Req() request, @Body() settings) {
    return this.settingsService.saveSettings(request.user.id, settings);
  }

  @Get()
  getSettings(@Req() request) {
    return this.settingsService.getSettings(request.user.id);
  }
}
