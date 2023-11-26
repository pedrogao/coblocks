import { camelToSnake } from '@coblocks/common';

export function convertQuery(query: object): any {
  if (query.hasOwnProperty('$and')) {
    return {
      AND: query['$and'].map((condition: any) => convertQuery(condition)),
    };
  }

  // 转换其他操作符（如 $eq）
  const newQuery: any = {};
  for (const key in query) {
    const newKey = camelToSnake(key);
    if (query[key].hasOwnProperty('$eq')) {
      newQuery[newKey] = { equals: query[key]['$eq'] };
    }
    if (query[key].hasOwnProperty('$ne')) {
      newQuery[newKey] = { not: query[key]['$ne'] };
    }
    if (query[key].hasOwnProperty('$gt')) {
      newQuery[newKey] = { gt: query[key]['$gt'] };
    }
    if (query[key].hasOwnProperty('$gte')) {
      newQuery[newKey] = { gte: query[key]['$gte'] };
    }
    if (query[key].hasOwnProperty('$lt')) {
      newQuery[newKey] = { lt: query[key]['$lt'] };
    }
    if (query[key].hasOwnProperty('$lte')) {
      newQuery[newKey] = { lte: query[key]['$lte'] };
    }
    if (query[key].hasOwnProperty('$in')) {
      newQuery[newKey] = { in: query[key]['$in'] };
    }
    if (query[key].hasOwnProperty('$nin')) {
      newQuery[newKey] = { notIn: query[key]['$nin'] };
    }
    if (query[key].hasOwnProperty('$like')) {
      newQuery[newKey] = { contains: query[key]['$like'] };
    }
    if (query[key].hasOwnProperty('$nlike')) {
      newQuery[newKey] = { notContains: query[key]['$nlike'] };
    }
  }
  return newQuery;
}
