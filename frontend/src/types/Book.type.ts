export interface Book {
  id?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  active?: boolean;
}
