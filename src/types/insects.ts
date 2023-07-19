export type Insect = {
  name: string;
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
