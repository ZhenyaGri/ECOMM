export type BaseProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export type headingProps = {
  tag: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  content: string;
};

export type ImgProps = {
  className: string;
  src: string;
  alt: string;
  style?: React.CSSProperties;
};

export type LinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: '_blank';
};

export type textProps = {
  className?: string;
  content: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrls: Array<string>;
  urlSlug?: string;
  discount?: number;
};

export type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

export type UsePaginationReturn = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  setTotalItems: (total: number) => void;
};

export type AddToCartProps = {
  handleAddToCart: () => Promise<void>;
  isAddedToCart: boolean;
  isLoading: boolean;
};
