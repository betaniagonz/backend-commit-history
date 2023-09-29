import { Controller, Get, HttpStatus, Logger, Param, Req, Res } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubRequestRepoDto } from './dto/github-request-repo.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  private readonly logger = new Logger('GithubService');
  username = {
    user: 'betaniagonz'
  }
  constructor(private _githubService: GithubService){}

  @Get('getUserInfo')
  userInfo(@Res() res){
    this.logger.warn('getUserInfo');
    this._githubService.getUserInfo(this.username).subscribe({
      next: (response) => res.status(HttpStatus.OK).json(response.data),
      error: (e) => res.status(HttpStatus.BAD_REQUEST).json(e),
    })
  }

  @Get('getUserRepos')
  userInfoRepos(@Res() res){
    this.logger.warn('getUserRepos');
    this._githubService.getUserRepos(this.username).subscribe({
      next: (response) => res.status(HttpStatus.OK).json(response.data),
      error: (e) => res.status(HttpStatus.BAD_REQUEST).json(e),
    })
  }

  @Get('getRepo/:reponame')
  userRepos(@Res() res, @Param('reponame') reponame: string){
    this.logger.warn('getRepo');
    var values: GithubRequestRepoDto = {
      user: this.username.user,
      reponame: reponame
    };
    this._githubService.getRepo(values).subscribe({
      next: (response) => res.status(HttpStatus.OK).json(response.data),
      error: (e) => res.status(HttpStatus.BAD_REQUEST).json(e),
    })
  }

  @Get('getRepoCommits/:reponame')
  userRepoCommits(@Res() res, @Param('reponame') reponame: string){
    this.logger.warn('getRepoCommits');
    var values: GithubRequestRepoDto = {
      user: this.username.user,
      reponame: reponame
    };
    this._githubService.getRepoCommits(values).subscribe({
      next: (response) => res.status(HttpStatus.OK).json(response.data),
      error: (e) => res.status(HttpStatus.BAD_REQUEST).json(e),
    })
  }
}

@ApiTags('Healt')
@Controller('')
export class Healt {
  @Get('')
  healt(){
    return 'Im alive, but at what cost!!!'
  }
}
