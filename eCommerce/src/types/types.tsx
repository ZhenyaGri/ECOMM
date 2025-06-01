export type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

export type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
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
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
};
