import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureService } from './features.service';
import { Feature } from './entities/features.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
