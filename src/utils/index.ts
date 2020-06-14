import { GenericTreeNode } from "./types";

export const getElementsMatchingFilter = (
  filter: string,
  filterProperty: string,
  elements: any[]
) => {
  return elements.filter(
    (element) =>
      element[filterProperty].toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );
};

export const getNodesMatchingNameFilter = (
  filter: string,
  elements: GenericTreeNode[]
) => {
  return elements.filter(
    (element) => element.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );
};

export const sortElements = <T>(
  elements: any,
  order: string,
  orderBy: string
): T => {
  if (order === "asc") {
    return elements.sort((a: any, b: any) =>
      a[orderBy] > b[orderBy] ? 1 : a[orderBy] < b[orderBy] ? -1 : 0
    );
  }

  return elements.sort((a: any, b: any) =>
    a[orderBy] < b[orderBy] ? 1 : a[orderBy] > b[orderBy] ? -1 : 0
  );
};
