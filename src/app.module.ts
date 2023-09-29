import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,GithubModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
