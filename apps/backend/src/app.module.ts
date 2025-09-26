import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [ReviewsController, AuthController],
  providers: [],
})
export class AppModule {}