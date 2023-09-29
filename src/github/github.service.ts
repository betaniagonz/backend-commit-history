import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { GithubRequestUserDto } from './dto/github-request-user.dto';
import { GithubResponseUserDto } from './dto/github-response-user.dto';
import { GithubRequestRepoDto } from './dto/github-request-repo.dto.js';
import { GithubResponseRepoDto } from './dto/github-response-repo.dto.js';
import { GithubResponseRepoCommitsDto } from './dto/github-response-repo-commits.dto.js';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GitHubResponseReposDto } from './dto/github-response-repos.dto';

@Injectable()
export class GithubService {
  private readonly logger = new Logger('GithubService');
  constructor(private httpService: HttpService){}
  apiSettings = {
    apiUrl:"https://api.github.com",
    token:"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"
  }

  getUserInfo(user: GithubRequestUserDto):Observable<AxiosResponse<GithubResponseUserDto>>{
    try {
      const apiurl = this.apiSettings.apiUrl + '/users/' + user.user;
      const headerRequest = { 'OAUth' : this.apiSettings.token, 'X-GitHub-Api-Version': '2022-11-28' }
      return this.httpService.get<GithubResponseUserDto>(apiurl,{headers: headerRequest})
      .pipe(map(response => {
        console.log(response);
        return response;
      }))
    } catch (error) {
      this.logger.error(error);
      const data = error.response;
      return data;
    }
  }

  getUserRepos(user: GithubRequestUserDto):Observable<AxiosResponse<GitHubResponseReposDto>>{
    try {
      const apiurl = this.apiSettings.apiUrl + '/users/' + user.user+'/repos';
      const headerRequest = { 'OAUth' : this.apiSettings.token, 'X-GitHub-Api-Version': '2022-11-28' }
      return this.httpService.get<GitHubResponseReposDto>(apiurl,{headers: headerRequest})
      .pipe(map(response => {
        console.log(response);
        return response;
      }))
    } catch (error) {
      this.logger.error(error);
      const data = error.response;
      return data;
    }
  }

  getRepo(request: GithubRequestRepoDto):Observable<AxiosResponse<GithubResponseRepoDto>>{
    console.log(request.user, request.reponame)
    try {
      const apiUrl = this.apiSettings.apiUrl + '/repos/' + request.user + '/' + request.reponame;
      const headerRequest = { 'OAUth' : this.apiSettings.token, 'X-GitHub-Api-Version': '2022-11-28' };
      return this.httpService.get<GithubResponseRepoDto>(apiUrl,{headers: headerRequest})
      .pipe(map(response => {
        console.log(response);
        return response;
      }))
    } catch (error) {
      this.logger.error(error);
      const data = error.response;
      return data;
    }
  }
  getRepoCommits(request: GithubRequestRepoDto):Observable<AxiosResponse<GithubResponseRepoCommitsDto>>{
    try {
      const apiUrl = this.apiSettings.apiUrl + '/repos/' + request.user + '/' + request.reponame + '/commits';
      const headerRequest = { 'OAUth' : this.apiSettings.token, 'X-GitHub-Api-Version': '2022-11-28' };
      return this.httpService.get<GithubResponseRepoCommitsDto>(apiUrl,{headers: headerRequest})
      .pipe(map(response => {
        console.log(response);
        return response;
      }))
    } catch (error) {
      this.logger.error(error);
      const data = error.response;
      return data;
    }
  }
}
