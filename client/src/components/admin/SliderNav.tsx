import React from "react";
import "./styles/SliderNav.scss";

type SliderNavProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const SliderNav: React.FC<SliderNavProps> = ({ setActiveTab }) => {
  return (
    <div className="slider-nav">
      <div className="user-avatar">
        <img
          src="https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-10-1024.png"
          alt="User Avatar"
        />
        <p>MY STORE</p>
      </div>
      <div className="slider-item" onClick={() => setActiveTab("product")}>
        Product
      </div>
      <div className="slider-item" onClick={() => setActiveTab("category")}>
        Category
      </div>
      <div className="slider-item" onClick={() => setActiveTab("size")}>
        Size
      </div>
      <div className="slider-item" onClick={() => setActiveTab("discount")}>
        Discount
      </div>
    </div>
  );
};

export default SliderNav;
