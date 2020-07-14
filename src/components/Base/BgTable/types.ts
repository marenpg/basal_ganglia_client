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
  rows: TableRow[];
  onClick?: (id: string) => (event: any) => void;
}

export interface BgCollapseTableProps extends StyleProps {
  orderBy: string;
  order?: "desc" | "asc";
  handleSortRequest: any;
  headers: { text: string; val?: string }[];
  rows: TableRow[] | CollapseTableRow[];
  onClick?: (id: string) => (event: any) => void;
}

export interface TableRow {
  link?: string;
  title?: string;
  id: string;
  cells: { text: string }[];
}

export interface CollapseTableRow {
  link?: string;
  id: string;
  cells: { text: string }[];
  subHeaders?: { text: string; val?: string }[];
  subRows?: TableRow[];
}

export interface CollapseRowProps extends StyleProps {
  row: CollapseTableRow;
  headers: { text: string; val?: string }[];
}

export interface RegularRowProps extends StyleProps {
  row: TableRow;
  headers: { text: string; val?: string }[];
  onClick?: (id: string) => (event: any) => void;
}
