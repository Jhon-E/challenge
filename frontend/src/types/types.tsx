export type UserAuth = {
  id: number;
  userName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
};

export type Order = {
  id: number,
  id_user: number,
  userName: string,
  date: Date,
  total: number,
  products: Product[]
}

export type User = {
  id: number;
  userName: string;
  lastName: string;
  email: string;
  role: string;
};

export type Product = {
  id_pro: number;
  id_seller: number;
  product_name: string;
  seller_username: string;
  price: number;
  estate: string;
  stock: number;
};
