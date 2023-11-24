import { SortTuple, extractSortTuples } from '@coblocks/common';
import { FindRoomDto } from './find-room.dto';

export class FindManyDto {
  limit: number;

  page: number;

  offset: number;

  s: string;

  sort: SortTuple[];

  public static fromFindRoomDto(query: FindRoomDto): FindManyDto {
    return {
      limit: query.limit,
      page: query.page,
      offset: query.offset,
      s: query.s,
      sort: extractSortTuples(query.sort),
    };
  }
}
