export type ArrayRow = string[];
export type ArrayTable = ArrayRow[];

export type ObjectRow = { [key: string]: string };
export type ObjectTable = ObjectRow[];

export interface Column {
    key: string;
    name?: string;
}
export type Columns = Column[];
