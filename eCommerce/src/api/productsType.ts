export type ProductProjectionPagedQueryResponse = {
  limit: number;
  count: number;
  total: number;
  offset: number;
  results: ProductProjection[];
};

export type ProductProjection = {
  id: string;
  productId?: string;
  version: number;
  key?: string;
  productType: ProductTypeReference;
  name: LocalizedString;
  description?: LocalizedString;
  slug: LocalizedString;
  categories: CategoryReference[];
  searchKeywords?: SearchKeywords;
  hasStagedChanges: boolean;
  published: boolean;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  taxCategory?: TaxCategoryReference;
  priceMode: ProductPriceModeEnum;
  createdAt: string; // DateTime
  lastModifiedAt: string; // DateTime
};

export type PublishedProductsParams = {
  limit?: number; // Number of products (default 20)
  offset?: number; // for pagination
  sort?: string[]; // example, sort: ['name.en asc']
  where?: string[]; // example, where: ['masterVariant(attributes(name="color" and value="grey"))']
  priceCurrency?: string;
  expand?: string[];
  withTotal?: boolean;
};

interface ProductTypeReference {
  id: string;
  typeId: 'product-type';
}

type ProductPriceModeEnum = 'Embedded' | 'Standalone';

interface CategoryReference {
  id: string;
  typeId: 'category';
}

interface LocalizedString {
  [locale: string]: string;
}

export interface ProductVariant {
  id: number;
  key?: string;
  sku?: string;
  description?: string;
  prices?: Price[];
  attributes?: ProductAttribute[];
  price?: Price;
  images?: Image[];
  assets?: Asset[];
  isMatchingVariant?: boolean;
  scopedPriceDiscounted?: boolean;
}

interface TypedMoney {
  type: 'centPrecision' | 'highPrecision' | string;
  currencyCode: string;
  centAmount: number;
  fractionDigits?: number; // Для highPrecision
  preciseAmount?: number; // Для highPrecision
}

interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

interface Attribute {
  name: string;
  value: unknown;
}

interface ColorAttribute extends Attribute {
  name: 'color';
  value: string;
}

interface MaterialAttribute extends Attribute {
  name: 'material';
  value: string;
}

interface NewAttribute extends Attribute {
  name: 'new';
  value: boolean;
}

interface DimensionsAttribute extends Attribute {
  name: 'dimensions';
  value: string;
}

type ProductAttribute =
  | ColorAttribute
  | MaterialAttribute
  | NewAttribute
  | DimensionsAttribute;

interface Image {
  url: string;
  dimensions?: {
    w: number;
    h: number;
  };
  label?: string;
}

interface Asset {
  id: string;
  sources: AssetSource[];
  name: LocalizedString;
  description?: LocalizedString;
  tags?: string[];
  custom?: CustomFields;
}

interface AssetSource {
  uri: string;
  key?: string;
  dimensions?: {
    w: number;
    h: number;
  };
  contentType?: string;
}

interface SearchKeyword {
  text: string;
  suggestTokenizer?: SuggestTokenizer;
}

interface SuggestTokenizer {
  type: 'whitespace' | 'custom' | string;
  inputs?: string[];
}

interface CustomFields {
  type: TypeReference;
  fields: unknown;
}

interface TypeReference {
  id: string;
  typeId: 'type';
}

interface SearchKeywords {
  [locale: string]: SearchKeyword[];
}

interface SearchKeyword {
  text: string;
  suggestTokenizer?: SuggestTokenizer;
}

interface Price {
  id: string;
  key?: string;
  value: TypedMoney;
  country?: string;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
}

interface Image {
  url: string;
  dimensions?: {
    w: number;
    h: number;
  };
  label?: string;
}

interface TaxCategoryReference {
  id: string;
  typeId: 'tax-category';
}

interface ProductDiscountReference {
  id: string;
  typeId: 'product-discount';
}
