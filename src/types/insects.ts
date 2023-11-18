export type Insect = {
  insectName: string;
  availableSexes: string[];
};
export type InsectOption = {
  label: string;
  value: string;
};
export type UseAllInsects = {
  insects: Insect[];
  insectOptions: InsectOption[];
};
