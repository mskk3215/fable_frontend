export type GeoJSONFeature = {
  type: string;
  properties: {
    name: string;
    N03_001: string;
    N03_003: string | null;
    N03_004: string | null;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export type GeoJSONFeatureCollection = {
  features: GeoJSONFeature[];
};

export type PrefectureCoordinates = {
  [key: string]: number[];
};

export type Ranking = {
  userName: string;
  collectionRate: number;
};

