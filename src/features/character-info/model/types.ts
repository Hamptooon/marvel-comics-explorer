export interface Character {
    id: number;
    name: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }
  
export interface CharacterDetails extends Character {
    description: string;
    comics: {
      available: number;
      items: Array<{ name: string }>;
    };
    series: {
      available: number;
      items: Array<{ name: string }>;
    };
    stories: {
      available: number;
      items: Array<{ name: string }>;
    };
    events: {
      available: number;
      items: Array<{ name: string }>;
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