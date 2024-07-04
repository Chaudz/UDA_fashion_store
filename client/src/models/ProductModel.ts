type ProductInfo = {
  categoryId: string;
  parentCategoryId: string;
  productDesc: string;
  discountPercent: number;
  productName: string;
  _id: string;
};

type Attribute = {
  attributeName: string;
  attributeValue: string;
  productId: string;
  _id: string;
};

type ProductImage = {
  _id: string;
  imageUrl: string;
  productId: string;
};

type ProductDetail = {
  stockQuantity: number;
  price: number;
  productId: string;
  sizeId: string;
};

export type ProductModel = {
  product: ProductInfo;
  attributes: Attribute[];
  productImages: ProductImage[];
  productDetails: ProductDetail[];
  cartItemNumber?: number;
};

export type PageInfoProductModel = {
  products: ProductModel[];
  pageInfo: {
    totalProduct: number;
    totalPages: number;
    currentPage: number;
  };
};
