// HomePage.tsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.toolkit";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import ReactPaginate from "react-paginate";
import FormAddProduct from "../../components/admin/FormAddProduct";
import { fetchProducts } from "../../store/productSlice";
import {
  fetchCategories,
  fetchParentCategories,
} from "../../store/categorySlice";
import { ProductModel } from "../../models/ProductModel";
import SliderNav from "../../components/admin/SliderNav";
import Product from "../../components/admin/Product";
import "./HomePage.scss";
import Category from "../../components/admin/Category";
import Discount from "../../components/admin/Discount";
import Size from "../../components/admin/Size";

const HomePage = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("product");
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const categories = useSelector(
    (state: RootState) => state.categorySlice.categories
  );
  const parentCategories = useSelector(
    (state: RootState) => state.categorySlice.parentCategories
  );
  const [idCategory, setIdCategory] = useState("");
  const [idParentCategory, setIdParentCategory] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchParentCategories());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [idCategory, idParentCategory, nameSearch, products, currentPage]);

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const matchCategory =
        !idCategory || product.product.categoryId === idCategory;
      const matchParentCategory =
        !idParentCategory ||
        product.product.parentCategoryId === idParentCategory;
      const matchNameSearch =
        !nameSearch ||
        product.product.productName
          .toLowerCase()
          .includes(nameSearch.toLowerCase());

      return matchCategory && matchParentCategory && matchNameSearch;
    });

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    setFilteredProducts(paginatedProducts);
  };

  const handleHiddenFormAdd = () => {
    setIsOpenAddForm(false);
  };

  return (
    <div className="d-flex home-admin justify-content-end">
      <div className="home-admin__nav position-fixed start-0 top-0 p-4">
        <SliderNav setActiveTab={setActiveTab} />
      </div>
      <div className="home-admin__main p-4">
        {isOpenAddForm ? (
          <FormAddProduct onHiddenFormAdd={handleHiddenFormAdd} />
        ) : (
          <div>
            <div className="d-flex w-100 justify-content-between">
              <div>
                <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</p>
                <p>
                  {/* {" "}
                  {activeTab === "product" && products.length}{" "}
                  {activeTab === "category" && categories.length}
                  {/* Thêm các điều kiện tương ứng với các tab khác */}
                  {/* {activeTab === "discount" && discounts.length}
                  {activeTab === "size" && sizes.length} */}
                </p>
              </div>
              <div className="home-admin__wrapper-user--img">
                <img
                  className="home-admin__user--img"
                  src="https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-10-1024.png"
                  alt=""
                />
                <IoIosArrowDown />
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="position-relative input-form me-2">
                <input
                  type="text"
                  placeholder="enter value ...."
                  className="w-100 p-2 rounded-4 border"
                  onChange={(e) => {
                    setNameSearch(e.target.value);
                  }}
                />
                <IoIosSearch
                  className="position-absolute end-0 top-50 bottom-50 my-auto"
                  size={35}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={() => {
                  setIsOpenAddForm(true);
                }}
              >
                ADD
              </button>
            </div>
            <div className="d-flex mt-3 mb-2">{/* ... (existing code) */}</div>
            <div>
              {activeTab === "product" && (
                <Product products={filteredProducts} />
              )}
              {activeTab === "category" && <Category />}
              {activeTab === "discount" && <Discount />}
              {activeTab === "size" && <Size />}
              {/* Tương tự cho các tab khác */}
            </div>

            <div className="d-flex home-admin justify-content-end">
              {activeTab === "product" && (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<span className="pagination-arrow">&raquo;</span>}
                  onPageChange={(selectedPage) => {
                    setCurrentPage(selectedPage.selected);
                  }}
                  pageRangeDisplayed={5}
                  pageCount={Math.ceil(products.length / itemsPerPage)}
                  previousLabel={
                    <span className="pagination-arrow">&laquo;</span>
                  }
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
