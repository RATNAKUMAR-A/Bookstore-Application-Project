import { FileHandle } from "./file-handle.model";

export interface Product {
  productId: number;
  bookName: string;
  authorName: string;
  bookDescription: string;
  bookDiscountedPrice: number;
  bookActualPrice: number;
  productImages: FileHandle[];
}
