export type Insect = {
  insectId: number;
  insectName: string;
  insectImage: string;
};
export type UseAllInsects = {
  insects: Insect[];
  insectOptions: string[];
  setInsectOptions: (insectOptions: string[]) => void;
  queryWord: string;
  setQueryWord: (queryWord: string) => void;
};
