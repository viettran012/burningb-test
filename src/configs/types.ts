export interface IProductParams {
  limit: number;
  skip: number;
  q: string;
}

export interface IProduct {
  title: string;
  thumbnail: string;
  rating: number;
  brand: string;
  price: number;
}
