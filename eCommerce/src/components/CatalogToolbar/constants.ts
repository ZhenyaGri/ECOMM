import { ProductProjectionPagedQueryResponse } from '../../api/productsType';

export type CatalogToolbarProps = {
  onProductsSorted: (products: ProductProjectionPagedQueryResponse) => void;
  onFacetFilter: (filters: string[]) => void;
};

export const colors = [
  'white',
  'black',
  'beige',
  'brown',
  'grey',
  'yellow',
  'green',
  'gold',
];

export const facets = ['category', 'color', 'new'];

export type CategoryID = {
  Seating: string;
  Lighting: string;
  Tables: string;
  Accessories: string;
};

export const categoryMap: CategoryID = {
  Seating: '7d195bf1-73b0-40ee-ab18-23094e7cbc57',
  Lighting: '39a1e282-8278-41fd-97d0-866c7b97b91c',
  Accessories: 'b4886472-0adb-4ade-b11c-24823d6f4b72',
  Tables: '4ee22fcb-1c9c-4df9-8cec-eba70e85c26c',
};
