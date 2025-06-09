export const discount = new Map([['1877cdf9-5b7f-47ac-8725-f6da3d002259', 10]]);

export type CatalogProduct = {
  id: string;
  name: string;
  price: number;
  imageUrls: Array<string>;
  urlSlug: string;
  discount: number;
};
