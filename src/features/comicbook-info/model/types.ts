
export interface Comicbook {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface ComicbookDetails extends Comicbook {
  description: string;
  characters: Character[];
  dates: {
    type: string;
    date: string;
  }[];
  pageCount: number;
  prices: {
    type: string;
    price: number;
  }[];
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

