export type ProductState = {
  product: [] | null;
  loading: boolean;
  error: string | null;
  success?: boolean;
  productList: () => Promise<any>;
  addProduct: (data: any) => Promise<any>;
  deleteProduct: (id: number) => Promise<any>;
  updateProduct: ({ id, data }: any) => Promise<any>;
};