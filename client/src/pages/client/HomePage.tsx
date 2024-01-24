import { useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductCarousel from "../../components/client/ProductCarousel ";
import { addProduct } from "../../store/productSlice";
import "./HomePage.scss";
import "swiper/css";
import "swiper/css/pagination";

const listBanner = [
  {
    id: 1,
    img: "https://file.hstatic.net/1000096703/file/new_54bdde61828c48a396df94faa792c673.jpg",
    url: "all",
  },
  {
    id: 2,
    img: "https://file.hstatic.net/1000096703/file/somicotton_0aba4b4cda614572b542dfb634dcaa17.jpg",
    url: "so-mi",
  },
  {
    id: 3,
    img: "https://file.hstatic.net/1000096703/file/somitn_51b5a0a20ced4f24a260bc5076eef55a.jpg",
    url: "so-mi-tay-ngan",
  },
  {
    id: 4,
    img: "https://file.hstatic.net/1000096703/file/akdu_dk_xeo_e87ad07a3ed44183bfdff88009fe292f.jpg",
    url: "ao-khoac",
  },
];

const categories = [
  {
    title: "ÁO KHOÁC",
    categoryId: 1,
  },
  {
    title: "SƠ MI",
    categoryId: 2,
  },
  {
    title: "QUẦN DÀI",
    categoryId: 3,
  },
  {
    title: "QUẦN SHORT",
    categoryId: 4,
  },
];

const products = [
  {
    category: "ÁO KHOÁC",
    products: [
      {
        id: 1,
        price: 300000,
        title: "Áo Khoác Dù Dây Kéo Xéo AKD0042",
        img: "https://product.hstatic.net/1000096703/product/anh_bia_shopee_0a0163d7b95643d19db8dfb12585cf14_grande.jpg",
        size: "M",
        color: "Black",
        cardItemNumber: 1,
      },
      {
        id: 2,
        price: 300000,
        title: "Áo Khoác Dù Dây Kéo Xéo AKD0042",
        img: "https://product.hstatic.net/1000096703/product/anh_bia_shopee_0a0163d7b95643d19db8dfb12585cf14_grande.jpg",
        size: "L",
        color: "Blue",
        cardItemNumber: 1,
      },
      {
        id: 3,
        price: 300000,
        title: "Áo Khoác Dù Dây Kéo Xéo AKD0042",
        img: "https://product.hstatic.net/1000096703/product/anh_bia_shopee_0a0163d7b95643d19db8dfb12585cf14_grande.jpg",
        size: "XL",
        color: "Red",
        cardItemNumber: 1,
      },
      {
        id: 4,
        price: 280000,
        title: "Áo Khoác Dù Dây Kéo Xéo AKD0021",
        img: "https://product.hstatic.net/1000096703/product/anh_bia_shopee_0a0163d7b95643d19db8dfb12585cf14_grande.jpg",
        size: "S",
        color: "Green",
        cardItemNumber: 1,
      },
    ],
  },
  {
    category: "SƠ MI",
    products: [
      {
        id: 5,
        price: 250000,
        title: "Sơ Mi Nam Trắng SMI0085",
        img: "https://product.hstatic.net/1000096703/product/1_2ae5c1d3bd274f9b9f988ac7ba2a9040_grande.jpg",
        size: "S",
        color: "White",
        cardItemNumber: 1,
      },
      {
        id: 6,
        price: 250000,
        title: "Sơ Mi Nam Đen SMI0092",
        img: "https://product.hstatic.net/1000096703/product/1_2ae5c1d3bd274f9b9f988ac7ba2a9040_grande.jpg",
        size: "M",
        color: "Black",
        cardItemNumber: 1,
      },
      {
        id: 7,
        price: 250000,
        title: "Sơ Mi Nam Xanh Dương SMI0078",
        img: "https://product.hstatic.net/1000096703/product/1_2ae5c1d3bd274f9b9f988ac7ba2a9040_grande.jpg",
        size: "L",
        color: "Blue",
        cardItemNumber: 1,
      },
      {
        id: 8,
        price: 250000,
        title: "Sơ Mi Nam Xanh Lá SMI0056",
        img: "https://product.hstatic.net/1000096703/product/1_2ae5c1d3bd274f9b9f988ac7ba2a9040_grande.jpg",
        size: "XL",
        color: "Green",
        cardItemNumber: 1,
      },
    ],
  },
  {
    category: "QUẦN DÀI",
    products: [
      {
        id: 9,
        price: 250000,
        title: "Sơ Mi Nam Trắng SMI0085",
        img: "https://product.hstatic.net/1000096703/product/1_993bed70e4a44ff0a4fe1bdb872a17c6_grande.jpg",
        size: "S",
        color: "White",
      },
      {
        id: 10,
        price: 250000,
        title: "Sơ Mi Nam Đen SMI0092",
        img: "https://product.hstatic.net/1000096703/product/1_993bed70e4a44ff0a4fe1bdb872a17c6_grande.jpg",
        size: "M",
        color: "Black",
      },
      {
        id: 11,
        price: 250000,
        title: "Sơ Mi Nam Xanh Dương SMI0078",
        img: "https://product.hstatic.net/1000096703/product/1_993bed70e4a44ff0a4fe1bdb872a17c6_grande.jpg",
        size: "L",
        color: "Blue",
      },
      {
        id: 12,
        price: 250000,
        title: "Sơ Mi Nam Xanh Lá SMI0056",
        img: "https://product.hstatic.net/1000096703/product/1_993bed70e4a44ff0a4fe1bdb872a17c6_grande.jpg",
        size: "XL",
        color: "Green",
      },
    ],
  },
  {
    category: "QUẦN SHORT",
    products: [
      {
        id: 13,
        price: 250000,
        title: "Sơ Mi Nam Trắng SMI0085",
        img: "https://product.hstatic.net/1000096703/product/1_2990050edac54c589b589a1286d97818_grande.jpg",
        size: "S",
        color: "White",
      },
      {
        id: 14,
        price: 250000,
        title: "Sơ Mi Nam Đen SMI0092",
        img: "https://product.hstatic.net/1000096703/product/1_2990050edac54c589b589a1286d97818_grande.jpg",
        size: "M",
        color: "Black",
      },
      {
        id: 15,
        price: 250000,
        title: "Sơ Mi Nam Xanh Dương SMI0078",
        img: "https://product.hstatic.net/1000096703/product/1_2990050edac54c589b589a1286d97818_grande.jpg",
        size: "L",
        color: "Blue",
      },
      {
        id: 16,
        price: 250000,
        title: "Sơ Mi Nam Xanh Lá SMI0056",
        img: "https://product.hstatic.net/1000096703/product/1_2990050edac54c589b589a1286d97818_grande.jpg",
        size: "XL",
        color: "Green",
      },
    ],
  },
];

const HomePage = () => {
  const ditpatch = useDispatch();
  const [isActive, setIsActive] = useState(0);
  const [categoryName, setCategoryName] = useState("ÁO KHOÁC");
  // const ditpatch = useDispatch();

  // useEffect(() => {
  //   ditpatch(fetchProducts());
  // }, []);

  const handleClickCategory = (index: number) => {
    setIsActive(index);
  };

  return (
    <div className="homepage position-relative">
      <div className="slider__wrapper">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {listBanner.map((banner, index) => {
            return (
              <SwiperSlide className="swiper" key={index}>
                <img key={index} src={banner.img} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <p className="title__product-new text-uppercase">Sản phẩm mới</p>
        <div className="d-flex nav-category gap-4 ">
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                className={isActive == index ? "active" : ""}
                onClick={() => {
                  handleClickCategory(index);
                  console.log(category.title);
                  setCategoryName(category.title);
                }}
              >
                {category.title}
              </li>
            );
          })}
        </div>
      </div>
      <div className="mt-5 category__card-product d-flex flex-column align-items-center">
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={4}
          className="mySwiper"
        >
          {products.map((el) => {
            if (el.category == categoryName) {
              return el.products.map((product) => {
                return (
                  <SwiperSlide>
                    <div className="d-flex flex-column align-items-center category__card me-4">
                      <div className="w-100 d-flex justify-content-center position-relative">
                        <img
                          className="category__card-img"
                          src={product.img}
                          alt=""
                        />
                        <div className="d-flex position-absolute bottom-0 w-100 wrapper__btn-card__img">
                          <button
                            className="btn w-50 btn-card__img"
                            onClick={() => {
                              alert("đang phát triển");
                            }}
                          >
                            Mua ngay
                          </button>
                          <div
                            style={{
                              width: "5%",
                            }}
                          ></div>
                          <button
                            className="btn w-50 btn-card__img"
                            onClick={() => {
                              alert("đang phát triển");
                            }}
                          >
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                      <Link to={"/"}>{product.title}</Link>
                      <p className="product-price">{product.price}đ</p>
                    </div>
                  </SwiperSlide>
                );
              });
            }
          })}
        </Swiper>
        <button
          className="btn my-3 btn__load-data px-4 py-2"
          onClick={() => {
            alert("Đang phát triển...");
          }}
        >
          Xem thêm
        </button>
      </div>
      <div className="d-flex gap-2 mb-5">
        <div className="product-intro position-relative">
          <img
            src="https://file.hstatic.net/1000096703/file/13_f161048fd69e41c096161641f468d663.jpg"
            alt=""
          />
          <div className="card-overlay position-absolute start-0 left-0 bottom-0 end-0"></div>
        </div>
        <div className="product-intro position-relative">
          <img
            src="https://file.hstatic.net/1000096703/file/9_c25efb770ca748868ff408bea4c4c4c5.jpg"
            alt=""
          />
          <div className="card-overlay position-absolute start-0 left-0 bottom-0 end-0"></div>
        </div>
        <div className="product-intro position-relative">
          <img
            src="https://file.hstatic.net/1000096703/file/11_7441d71a347d4bf29645e98a4d1826c8.jpg"
            alt=""
          />
          <div className="card-overlay position-absolute start-0 left-0 bottom-0 end-0"></div>
        </div>
      </div>
      <ProductCarousel />
    </div>
  );
};

export default HomePage;
