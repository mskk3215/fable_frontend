export type Insect = {
  insectName: string;
};
export type UseAllInsects = {
  insects: Insect[];
  insectOptions: string[];
  setInsectOptions: (insectOptions: string[]) => void;
  queryWord: string;
  setQueryWord: (queryWord: string) => void;
};
