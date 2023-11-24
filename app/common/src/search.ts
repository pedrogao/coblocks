export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export interface SortTuple {
  field: string;
  order: "asc" | "desc";
}

export const extractSortTuples = (sort: string[]): SortTuple[] => {
  if (!sort || sort.length === 0) {
    return [];
  }
  return sort
    .filter((s) => {
      const [field, order] = s.split(",");
      return field && order;
    })
    .map((s) => {
      const [field, order] = s.split(",");
      return {
        field: camelToSnake(field),
        order: order.toLowerCase() as "asc" | "desc",
      };
    });
};

export interface FilterTuple {
  field: string;
  value: any;
  operator: "$eq" | "$ne" | "$gt" | "$lt" | "$gte" | "$lte";
}

/**
 * Extract filter tuples from string
 * @param s input filter string
 * @example '{"$and":[{"projectId":{"$eq":"ssss"}}]}'
 * @returns FilterTuple[]
 */
export const extractFilterTuples = (s: string): FilterTuple[] => {
  if (!s || s.trim() === "") {
    return [];
  }
  try {
    const filter = JSON.parse(s);
    if (filter.$and) {
      return filter.$and.map((f: any) => {
        const field = Object.keys(f)[0];
        const value = f[field];
        const operator = Object.keys(value)[0];
        return {
          field,
          value: value[operator],
          operator,
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
