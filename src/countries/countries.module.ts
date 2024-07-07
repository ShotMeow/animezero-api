import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { CountriesResolver } from './resolver/countries.resolver';
import { CountriesService } from './service/countries.service';
import { CountriesRepository } from './repository/countries.repository';

@Module({
  imports: [PrismaModule],
  providers: [CountriesRepository, CountriesResolver, CountriesService],
})
export class CountriesModule {}
