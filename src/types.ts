export type CategorySlug = 'gaming' | 'office' | 'l-shaped' | 'study' | 'adjustable' | 'accessories';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
  ring?: string;
  images: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  bestSeller?: boolean;
  isNew?: boolean;
  shortSpecs: string[];
  materials: string[];
  sizes: string[];
  colors: ColorVariant[];
  description: string;
  features: string[];
  dimensions: { label: string; value: string }[];
  specs: ProductSpec[];
  relatedSlugs: string[];
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  productSlug?: string;
  avatarColor: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
