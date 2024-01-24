import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.toolkit";

const Discount: React.FC = () => {
  const discounts = useSelector((state: RootState) =>
    state.productReducer.products.map((product) => product.discountPercent)
  );

  return (
    <div>
      <h2>Discount Page</h2>
      <ul>Đang phát triển</ul>
    </div>
  );
};

export default Discount;
