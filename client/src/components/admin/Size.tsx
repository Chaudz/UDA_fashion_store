import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.toolkit";

const Size: React.FC = () => {
  const sizes = useSelector((state: RootState) => state.sizeReducer.sizes);

  return (
    <div>
      <h2>Size Page</h2>
      <ul>đang phát triển</ul>
    </div>
  );
};

export default Size;
