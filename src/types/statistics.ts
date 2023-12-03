export type GeoJSONFeature = {
  type: string;
  properties: {
    name: string;
    N03_001: string;
    N03_003: string | null;
    N03_004: string | null;
    N03_010: number[] | null;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export type GeoJSONFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

export type PrefectureCoordinates = {
  [key: string]: number[];
};

export type Ranking = {
  userId: number;
  userName: string;
  collectionRate: number;
};

export type InsectAndParks = {
  insectName: string;
  sex: string;
  biologicalFamily: string;
  parkName: string;
};

export type TableData = {
  id: number;
  insectName: string;
  insectSex: string;
  biologicalFamily: string;
  parkName: string;
};

export type Order = "asc" | "desc";

export type HeadCell = {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
  width: string;
};
