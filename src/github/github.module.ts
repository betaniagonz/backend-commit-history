import { Module } from '@nestjs/common';
import { GithubController, Healt } from './github.controller';
import { GithubService } from './github.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [GithubController, Healt],
  providers: [GithubService]
})
export class GithubModule {}
