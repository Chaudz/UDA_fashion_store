import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductModel } from "../../models/ProductModel";
import { AppDispatch, RootState } from "../../store/store.toolkit";
import { fetchSizes } from "../../store/sizeSlice";
import "./styles/Product.scss";
import { deleteProduct } from "../../store/productSlice";

type PropsType = {
  product: ProductModel;
};

const ProductRow = (props: PropsType) => {
  const product = props.product;
  const dispatch = useDispatch<AppDispatch>();
  const totalStockQuantity = product.productDetails.reduce(
    (accumulator, productDetail) =>
      accumulator + (productDetail.stockQuantity || 0),
    0
  );
  const sizes = useSelector((state: RootState) => state.sizeReducer.sizes);

  useEffect(() => {
    dispatch(fetchSizes());
  }, []);

  const handleDeleteProduct = () => {
    const productIdToDelete = product.product._id;
    dispatch(deleteProduct(productIdToDelete));
  };

  return (
    <tr>
      <td>{product.product._id}</td>
      <td>{product.product.productName}</td>
      <td>
        <td>
          {product.productDetails.map((productDetail) => {
            const sizeInfo = sizes.find(
              (size) => size._id === productDetail.sizeId
            );
            const sizePrice = productDetail.price || 0;

            return (
              <div key={productDetail.sizeId}>
                {sizeInfo?.sizeName} - {sizePrice} đ
              </div>
            );
          })}
        </td>
      </td>
      <td>
        {product.productDetails.map((productDetail) => {
          const sizeInfo = sizes.find(
            (size) => size._id === productDetail.sizeId
          );
          return <div key={productDetail.sizeId}>{sizeInfo?.sizeName}</div>;
        })}
      </td>
      <td>{totalStockQuantity}</td>
      <td>
        <button className="btn btn-success me-2">Edit</button>
        <button className="btn btn-danger" onClick={handleDeleteProduct}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
