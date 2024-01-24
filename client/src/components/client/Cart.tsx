import { IoCloseSharp } from "react-icons/io5";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./styles/Cart.scss";
import { fetchProducts } from "../../store/productSlice";

type Props = {
  onSetIsCartVisible: (value: boolean) => void;
};

const Cart = (props: Props): JSX.Element => {
  const ditpatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const { onSetIsCartVisible } = props;
  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );

  useEffect(() => {
    ditpatch(fetchProducts());
  }, []);

  return (
    <div className="cart position-fixed end-0 top-0 bottom-0">
      <h1 className="title text-uppercase">Giỏ hàng</h1>
      <div className="cart__wrapper__products mt-5">
        {products.length !== 0 ? (
          products.map((product, index) => (
            <ProductCart key={index} product={product} />
          ))
        ) : (
          <div>Hiện chưa có sản phẩm</div>
        )}
      </div>

      <div className="cart__separator w-100 my-4"></div>
      <div className="d-flex justify-content-between">
        <h2 className="cart__total-title">Tổng tiền</h2>
        <h2 className="cart__total-price">đang phát triển</h2>
      </div>
      <div className="d-flex mt-2 justify-content-between">
        <button className="btn text-uppercase btn-dark rounded-0 cart__btn-watch--cart">
          Xem giỏ hàng
        </button>
        <button className="btn text-uppercase btn-dark rounded-0 cart__btn-payment">
          Thanh toán
        </button>
      </div>
      <IoCloseSharp
        className="position-absolute icon-close"
        fontSize={30}
        cursor="pointer"
        onClick={() => {
          onSetIsCartVisible(false);
        }}
      />
    </div>
  );
};

export default Cart;
