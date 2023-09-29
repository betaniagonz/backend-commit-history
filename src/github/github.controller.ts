import { Controller, Get, HttpStatus, Logger, Param, Req, Res } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubRequestRepoDto } from './dto/github-request-repo.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  private readonly logger = new Logger('GithubService');
  username = {
    user: 'betaniagonz'
  }
  constructor(private _githubService: GithubService){}

  @Get('getUserInfo')
  @ApiOperation({ summary: 'get user information' })
  userInfo(@Res() res){
    this.logger.warn('getUserInfo');
    this._githubService.getUserInfo(this.username).subscribe({
      next: (response) => res.status(HttpStatus.OK).json(response.data),
      error: (e) => res.status(HttpStatus.BAD_REQUEST).json(e),
    })
  }

  @Get('getUserRepos')
  @ApiOperation({ summary: 'get list of repos of a user' })
  userInfoRepos(@Res() res){
    this.logger.warn('getUserRepos');
    this._githubService.getUserRepos(this.username).subscribe({
      next: (response) => res.status(HttpStatus.OK).json(response.data),
      error: (e) => res.status(HttpStatus.BAD_REQUEST).json(e),
    })
  }

  @Get('getRepo/:reponame')
  @ApiOperation({ summary: 'get information about a repository' })
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
  @ApiOperation({ summary: 'get all commits from a repository' })
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
  @ApiOperation({ summary: 'check api status' })
  healt(){
    return 'Im alive, but at what cost!!!'
  }
}
