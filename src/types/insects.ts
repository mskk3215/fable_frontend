export type Insect = {
  insectName: string;
  availableSexes: string[];
};
export type UseAllInsects = {
  insects: Insect[];
  insectOptions: string[];
  setInsectOptions: (insectOptions: string[]) => void;
  queryWord: string;
  setQueryWord: (queryWord: string) => void;
};
