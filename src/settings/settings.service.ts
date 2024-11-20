import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../database/entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async create(userId: string) {
    const settings = new Settings();
    settings.userId = userId;
    return await this.settingsRepository.save(settings);
  }

  async getSettings(userId: string) {
    let settings = await this.settingsRepository.findOne({
      where: { userId },
    });

    if (!settings) {
      return {
        theme: 'LIGHT',
        autoStartBreaks: false,
        autoStartWorks: false,
        digitsFont: 'Mexcellent',
        workTime: 5,
        shortTime: 0.2,
        longTime: 0.4,
        longBreakInterval: 3,
        workColor: '#ffb8b8',
        shortColor: '#8381df',
        longColor: '#53c188',
      };
    }

    return settings;
  }

  async saveSettings(userId, settings) {
    await this.settingsRepository
      .createQueryBuilder()
      .update('settings')
      .set(settings)
      .where('userId = :userId', { userId })
      .execute();
  }
}
