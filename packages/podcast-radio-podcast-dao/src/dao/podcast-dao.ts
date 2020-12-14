import { IGetPodcastById, IGetPodcastByTitle, IGetPodcastByAuthor, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { DynamoDB } from 'aws-sdk';
import { getQuery as getPodcastById } from '../queries/podcast/get-by-id';
import { getQuery as getPodcastByTitle } from '../queries/podcast/get-by-title';
import { getQuery as getPodcastByAuthor } from '../queries/podcast/get-by-author';

export class PodcastDao implements IGetPodcastById, IGetPodcastByTitle, IGetPodcastByAuthor {
  private queryRunner: IQueryRunner<Promise<Podcast[]>, DynamoDB.DocumentClient.QueryInput>;

  constructor(queryRunner: IQueryRunner<Promise<Podcast[]>, DynamoDB.DocumentClient.QueryInput>) {
    this.queryRunner = queryRunner
  }

  async getById(id: string): Promise<Podcast> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getPodcastById(id);
    return this.queryRunner.run(params)
      .then(episodes => {
        if (episodes) return episodes[0];
      });
  }

  async getByTitle(title: string): Promise<Podcast[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getPodcastByTitle(title);
    return this.queryRunner.run(params);
  }

  async getByAuthor(author: string): Promise<Podcast[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getPodcastByAuthor(author);
    return this.queryRunner.run(params);  
  }
}