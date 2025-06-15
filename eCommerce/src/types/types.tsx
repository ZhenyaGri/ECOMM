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
};

export type textProps = {
  className?: string;
  content: string;
};

export type Product = {
  id?: string;
  name: string;
  price: number;
  imageUrls: Array<string>;
  urlSlug?: string;
  discount?: number;
};
