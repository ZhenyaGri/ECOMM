import {
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '../../api/productsType';
import { CatalogProduct } from './constants';

export const formatProducts = (
  response: ProductProjectionPagedQueryResponse,
  setTotalItems?: (total: number) => void
): CatalogProduct[] => {
  if (setTotalItems) {
    setTotalItems(response.total || 0);
  }
  return response.results.map((product: ProductProjection) => {
    let discount = 0;
    const priceVariant = product.masterVariant || product.variants?.[0];
    const priceValue = priceVariant?.prices?.[0]?.value;
    if (priceVariant.prices?.[0]?.discounted?.value.centAmount) {
      discount = priceVariant.prices?.[0]?.discounted?.value.centAmount / 100;
    }
    const price = priceValue?.centAmount ? priceValue.centAmount / 100 : 0;

    const imageVariant = product.masterVariant || product.variants?.[0];
    const imageUrls: Array<string> = [];
    if (imageVariant?.images) {
      imageVariant?.images.forEach((image) => imageUrls.push(image.url));
    }
    const urlSlug = product.slug.en || product.id;

    return {
      id: product.id,
      name: product.name?.en || 'Unnamed Product',
      price,
      imageUrls,
      urlSlug,
      discount,
    };
  });
};
