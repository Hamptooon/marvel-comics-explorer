export interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
export interface Character {
    id: number;
    name: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }
  export interface MarvelApiResponse<T> {
    data: {
      results: T[];
      count: number;
      total: number;
      offset: number;
      limit: number;
    };
  }