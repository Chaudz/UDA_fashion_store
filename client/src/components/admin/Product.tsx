import React from "react";
import { ProductModel } from "../../models/ProductModel";
import ProductRow from "./ProductRow";

type ProductProps = {
  products: ProductModel[];
};

const Product: React.FC<ProductProps> = ({ products }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>size</th>
            <th>quantity</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductRow key={index} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
