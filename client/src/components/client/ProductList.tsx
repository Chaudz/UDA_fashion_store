import { useState } from "react";
import { useParams } from "react-router-dom";
import { HiChevronDoubleDown } from "react-icons/hi2";
import BreadcrumbProduct from "./Breadcrumb";
import ReactPaginate from "react-paginate";
import "./styles/ProductList.scss";
import ProductCarousel from "./ProductCarousel ";

const data_product = [
  {
    id: 1,
    price: "350,000",
    productName: "Áo A Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Michael",

    last_name: "Lawson",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 2,
    price: "360,000",
    productName: "Quần Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar:
      "https://product.hstatic.net/1000096703/product/1a_c3e64a10b6314d669e2d094837f0af56_grande.jpg",
  },
  {
    id: 3,
    price: "340,000",
    productName: "Bo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Tobias",
    last_name: "Funke",
    avatar:
      "https://product.hstatic.net/1000096703/product/3_0b355176b8124686a12e3a66c6291faf_grande.jpg",
  },
  {
    id: 4,
    price: "320,000",
    productName: "Co Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Byron",
    last_name: "Fields",
    avatar:
      "https://product.hstatic.net/1000096703/product/7_0b73c763b53347f8b3f498f8f7f55f02_grande.jpg",
  },
  {
    id: 5,
    price: "380,000",
    productName: "Do Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "George",
    last_name: "Edwards",
    avatar:
      "https://product.hstatic.net/1000096703/product/2_38fa41c7870a42b996cc02600240cd25_grande.jpg",
  },
  {
    id: 6,
    price: "280,000",
    productName: "Áo B Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/2_b480ba10f58544d29776c91c86596c6a_grande.jpg",
  },
  {
    id: 7,
    price: "100,000",
    productName: "E Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 8,
    price: "500,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 9,
    price: "1080,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 10,
    price: "50,000",
    productName: "Áo C Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 11,
    price: "160,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 12,
    price: "250,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 13,
    price: "260,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 14,
    price: "390,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 15,
    price: "380,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
  {
    id: 16,
    price: "380,000",
    productName: "Áo Khoác Dù Trắng Phối Xéo AKD00",
    first_name: "Rachel",
    last_name: "Howell",
    avatar:
      "https://product.hstatic.net/1000096703/product/0_7cebef26c1064010865e6360197183c2_master.jpg",
  },
];

function ProductList() {
  const { categoryName } = useParams();
  const [showOptions, setShowOptions] = useState(false);
  const [sortedData, setSortedData] = useState(data_product);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 12;

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleTangDan = () => {
    const sortedByPrice = [...sortedData].sort(
      (a, b) =>
        parseFloat(a.price.replace(",", "")) -
        parseFloat(b.price.replace(",", ""))
    );
    setSortedData(sortedByPrice);
    setCurrentPage(0);
  };

  const handleGiamDan = () => {
    const sortedByPrice = [...sortedData].sort(
      (a, b) =>
        parseFloat(b.price.replace(",", "")) -
        parseFloat(a.price.replace(",", ""))
    );
    setSortedData(sortedByPrice);
    setCurrentPage(0);
  };

  const handleAZ = () => {
    const sortedByName = [...sortedData].sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    setSortedData(sortedByName);
    setCurrentPage(0);
  };

  const handleZA = () => {
    const sortedByName = [...sortedData].sort((a, b) =>
      b.productName.localeCompare(a.productName)
    );
    setSortedData(sortedByName);
    setCurrentPage(0);
  };

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const displayedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <div className="container_product">
      <div className="breadcrumb">
        <BreadcrumbProduct categoryName={categoryName} />
      </div>
      <div className="menu">
        <h3>{categoryName || "All"}</h3>
        <button onClick={handleButtonClick}>
          Sản phẩm nổi bật <HiChevronDoubleDown />
        </button>
        {showOptions && (
          <div className="options">
            <p>Sản phẩm nổi bật</p>
            <p onClick={handleTangDan}>Giá: Tăng dần</p>
            <p onClick={handleGiamDan}> Giá: Giảm dần</p>
            <p onClick={handleAZ}>Tên: A-Z</p>
            <p onClick={handleZA}>Tên: Z-A</p>
          </div>
        )}
      </div>

      <div className="container-fluid form-product">
        <div className="row row-product">
          {displayedData.map((item) => (
            <div key={item.id} className="col col-product ">
              <div className="img_product" style={{ width: 295, height: 295 }}>
                <img
                  style={{ width: 295, height: 295 }}
                  src={item.avatar}
                  alt={`Product ${item.id}`}
                />
              </div>
              <h6 id="name_product">{`${item.productName}${item.id}`}</h6>
              <p id="cost_product">{`${item.price}₫`}</p>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ProductCarousel />
    </div>
  );
}

export default ProductList;
