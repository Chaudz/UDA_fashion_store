import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { deleteProduct } from "../../store/productSlice";
import { AppDispatch, RootState } from "../../store/store.toolkit";
import { fetchSizes } from "../../store/sizeSlice";

const ProductCart = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const sizes = useSelector((state: RootState) => state.sizeReducer.sizes);
  const product = props.product;
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product.productDetails.length > 0) {
      setSelectedSize(product.productDetails[0].sizeId);
    }
    dispatch(fetchSizes());
  }, [product.productDetails]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const getSizeNameById = (sizeId) => {
    const size = sizes.find((s) => s._id === sizeId);
    return size ? size.sizeName : "";
  };

  const getPriceForSelectedSize = () => {
    const selectedProductDetail = product.productDetails.find(
      (detail) => detail.sizeId === selectedSize
    );
    return selectedProductDetail ? selectedProductDetail.price : 0;
  };

  return (
    <div className="cart__wrapper__product d-flex w-100 mt-2">
      <img
        src="https://vn-test-11.slatic.net/p/fec916e167f23aa544fd08fabf681864.jpg"
        alt={product.product.productName}
        className="cart__product-img"
      />

      <div className="ms-3 d-flex flex-column justify-content-center">
        <h2 className="cart__product-title">{product.product.productName}</h2>
        <div className="d-flex align-items-center gap-2">
          <select
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
            }}
          >
            {product.productDetails.map((productDetail) => (
              <option key={productDetail.sizeId} value={productDetail.sizeId}>
                {getSizeNameById(productDetail.sizeId)}
              </option>
            ))}
          </select>
          <p className="cart__product-price m-0 d-block">
            {getPriceForSelectedSize().toLocaleString()} đ
          </p>
        </div>
      </div>
      <button
        className="ms-2 btn btn-danger rounded-0"
        onClick={() => {
          alert("đang phát triển");
        }}
      >
        <IoCloseSharp
          className="cart__product-close--btn"
          fontSize={30}
          cursor="pointer"
        />
      </button>
    </div>
  );
};

export default ProductCart;
