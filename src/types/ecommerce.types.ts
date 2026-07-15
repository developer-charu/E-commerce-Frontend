// Centralized TypeScript definitions for E-Commerce UI Architecture

export type UserRole = 'USER' | 'SALES' | 'ADMIN';

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  sku: string;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  tags: string[];
  isFeatured?: boolean;
}

export interface ProductFilterState {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brands: string[];
  minRating?: number;
  inStockOnly?: boolean;
  search?: string;
}

export type ProductSortOption =
  | 'featured'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'newest';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  allowedRoles: UserRole[];
  badge?: string | number;
  children?: NavigationItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  joinedDate: string;
}

