import { StyleProps } from "./BgTable.jss";

export interface SortableTableHeaderProps {
  val: string;
  text: string;
}

export interface BgLinkTableCellProps {
  title: string;
  ariaLabel: string;
  href: string;
}

export interface BgSortableTableCellProps {
  val: string;
  orderBy: string;
  order?: "desc" | "asc";
  handleSortRequest: any;
}

export interface BgLinkTableProps extends StyleProps {
  orderBy: string;
  order?: "desc" | "asc";
  handleSortRequest: any;
  headers: { text: string; val?: string }[];
  rows: { id: string; link?: string; cells: { text: string }[] }[];
  onClick?: (id: string) => (event: any) => void;
}

export interface BgCollapseTableProps extends StyleProps {
  orderBy: string;
  order?: "desc" | "asc";
  handleSortRequest: any;
  headers: { text: string; val?: string }[];
  rows: TableRow[];
  onClick?: (id: string) => (event: any) => void;
}

export interface TableRow {
  link?: string;
  id: string;
  cells: { text: string }[];
  subHeaders?: { text: string; val?: string }[];
  subRows?: TableRow[];
}

export interface CollapseRowProps extends StyleProps {
  row: TableRow;
}
