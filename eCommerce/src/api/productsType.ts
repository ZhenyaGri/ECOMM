export type ProductPagedQueryResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
};

export type Product = {
  id: string;
  version: number;
  key?: string;
  productType: ProductTypeReference;
  masterData: ProductCatalogData;
  reviewRatingStatistics?: ReviewRatingStatistics;
  priceMode?: ProductPriceModeEnum;
  createdAt: string; // DateTime
  lastModifiedAt: string; // DateTime
  warnings?: WarningObject[];
};

interface ProductTypeReference {
  id: string;
  typeId: 'product-type';
  obj?: ProductType;
}

interface ProductType {
  id: string;
  version: number;
  key?: string; // MinLength: 2, MaxLength: 256, Pattern: ^[A-Za-z0-9_-]+$
  name: string;
  description: string;
  attributes: AttributeDefinition[];
  createdAt: string; // DateTime
  lastModifiedAt: string; // DateTime
}

interface AttributeDefinition {
  type: string;
  name: string; // MinLength: 2, MaxLength: 256, Pattern: ^[A-Za-z0-9_-]+$
  label: LocalizedString;
  isRequired: boolean;
  attributeConstraint: AttributeConstraintEnum;
  inputTip?: LocalizedString;
  inputHint?: TextInputHint;
  isSearchable: boolean;
}

enum AttributeConstraintEnum {
  None = 'None',
  Unique = 'Unique',
  CombinationUnique = 'CombinationUnique',
  SameForAll = 'SameForAll',
}

enum TextInputHint {
  SingleLine = 'SingleLine',
  MultiLine = 'MultiLine',
}

interface ProductCatalogData {
  published: boolean;
  current: ProductData;
  staged: ProductData;
  hasStagedChanges: boolean;
}

interface ReviewRatingStatistics {
  averageRating: number;
  highestRating: number;
  lowestRating: number;
  count: number;
  ratingsDistribution: Record<number, number>;
}

type ProductPriceModeEnum = 'Embedded' | 'Standalone';

interface WarningObject {
  code: string;
  message: string;
}

interface CategoryReference {
  id: string;
  typeId: 'category';
  obj?: Category;
}

interface ProductData {
  name: LocalizedString;
  description?: LocalizedString;
  slug: LocalizedString;
  categories: CategoryReference[];
  categoryOrderHints?: CategoryOrderHints;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  searchKeywords?: SearchKeywords;
}

interface LocalizedString {
  [locale: string]: string;
}

interface CategoryReference {
  id: string;
  typeId: 'category';
  obj?: Category;
}

interface ProductVariant {
  id: number;
  key?: string;
  sku?: string;
  prices?: Price[];
  attributes?: ProductAttribute[];
  price?: Price; // Только при выборе цены
  images?: Image[];
  assets?: Asset[];
  availability?: ProductVariantAvailability;
  isMatchingVariant?: boolean; // Только для поиска
  scopedPrice?: ScopedPrice; // Только для поиска
  scopedPriceDiscounted?: boolean; // Только для поиска
}

interface Price {
  id: string;
  key?: string;
  value: TypedMoney;
  country?: string; // CountryCode (формат: ^[A-Z]{2}$)
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string; // DateTime
  validUntil?: string; // DateTime
  discounted?: DiscountedPrice;
  tiers?: PriceTier[];
  custom?: CustomFields;
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

interface PriceTier {
  minimumQuantity: number;
  value: TypedMoney;
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
  name: 'Material'; // Обратите внимание на заглавную M, если в API именно так
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

interface ProductVariantAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  channels?: Record<string, ProductVariantChannelAvailability>;
}

interface ProductVariantChannelAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
}

interface ScopedPrice {
  id: string;
  value: TypedMoney;
  currentValue: TypedMoney;
  country?: string;
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
}

interface SearchKeyword {
  text: string;
  suggestTokenizer?: SuggestTokenizer;
}

interface SuggestTokenizer {
  type: 'whitespace' | 'custom' | string;
  inputs?: string[];
}

// Референсы
interface CustomerGroupReference {
  id: string;
  typeId: 'customer-group';
}

interface ChannelReference {
  id: string;
  typeId: 'channel';
}

interface ProductDiscountReference {
  id: string;
  typeId: 'product-discount';
}

interface CustomFields {
  type: TypeReference;
  fields: unknown;
}

interface TypeReference {
  id: string;
  typeId: 'type';
}

interface Category {
  id: string;
  version: number;
  key?: string; // MinLength: 2, MaxLength: 256, Pattern: ^[A-Za-z0-9_-]+$
  externalId?: string;
  name: LocalizedString;
  slug: LocalizedString; // Pattern: ^[A-Za-z0-9_-]{2,256}+$
  description?: LocalizedString;
  ancestors: CategoryReference[];
  parent?: CategoryReference;
  orderHint?: string; // Decimal between 0 and 1
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  assets?: Asset[];
  custom?: CustomFields;
  createdAt: string; // DateTime
  lastModifiedAt: string; // DateTime
}

interface CategoryReference {
  id: string;
  typeId: 'category';
  obj?: Category; // Expanded reference
}

export type ProductProjectionPagedQueryResponse = {
  limit: number;
  count: number;
  total?: number;
  offset: number;
  results: ProductProjection[];
};

export type ProductProjection = {
  id: string;
  version: number;
  key?: string;
  productType: ProductTypeReference;
  name: LocalizedString;
  description?: LocalizedString;
  slug: LocalizedString;
  categories: CategoryReference[];
  categoryOrderHints?: CategoryOrderHints;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  searchKeywords?: SearchKeywords;
  hasStagedChanges: boolean;
  published: boolean;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  taxCategory?: TaxCategoryReference;
  state?: StateReference;
  reviewRatingStatistics?: ReviewRatingStatistics;
  priceMode: ProductPriceModeEnum;
  createdAt: string; // DateTime
  lastModifiedAt: string; // DateTime
};

interface ProductTypeReference {
  id: string;
  typeId: 'product-type';
  obj?: ProductType;
}

interface CategoryReference {
  id: string;
  typeId: 'category';
  obj?: Category;
}

interface CategoryOrderHints {
  [categoryId: string]: string;
}

interface SearchKeywords {
  [locale: string]: SearchKeyword[];
}

interface SearchKeyword {
  text: string;
  suggestTokenizer?: SuggestTokenizer;
}

interface ProductVariant {
  id: number;
  key?: string;
  sku?: string;
  prices?: Price[];
  price?: Price;
  attributes?: ProductAttribute[];
  images?: Image[];
  assets?: Asset[];
  availability?: ProductVariantAvailability;
  isMatchingVariant?: boolean;
  scopedPrice?: ScopedPrice;
  scopedPriceDiscounted?: boolean;
}

interface Price {
  id: string;
  key?: string;
  value: TypedMoney;
  country?: string; // CountryCode
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string; // DateTime
  validUntil?: string; // DateTime
  discounted?: DiscountedPrice;
  tiers?: PriceTier[];
  custom?: CustomFields;
}

interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

interface PriceTier {
  minimumQuantity: number;
  value: TypedMoney;
}

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

interface ProductVariantAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  channels?: Record<string, ProductVariantChannelAvailability>;
}

interface ProductVariantChannelAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
}

interface ScopedPrice {
  id: string;
  value: TypedMoney;
  currentValue: TypedMoney;
  country?: string;
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
}

interface TaxCategoryReference {
  id: string;
  typeId: 'tax-category';
}

interface StateReference {
  id: string;
  typeId: 'state';
}

interface ReviewRatingStatistics {
  averageRating: number;
  highestRating: number;
  lowestRating: number;
  count: number;
  ratingsDistribution: Record<number, number>;
}

interface TypeReference {
  id: string;
  typeId: 'type';
}

// Референсы
interface CustomerGroupReference {
  id: string;
  typeId: 'customer-group';
}

interface ChannelReference {
  id: string;
  typeId: 'channel';
}

interface ProductDiscountReference {
  id: string;
  typeId: 'product-discount';
}

export type PublishedProductsParams = {
  limit?: number; // Number of products (default 20)
  offset?: number; // for pagination
  sort?: string[]; // example, sort: ['name.en asc']
  where?: string[]; // example, where: ['masterVariant(attributes(name="color" and value="grey"))']
  priceCurrency?: string;
  expand?: string[];
  withTotal?: boolean;
};
