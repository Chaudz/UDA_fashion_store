import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.toolkit";
import {
  fetchCategories,
  fetchParentCategories,
} from "../../store/categorySlice";
import { addProduct } from "../../store/productSlice";
import { AttributeType } from "../../models/AttributeModel";
import { ProductDetailType } from "../../models/ProductDetailModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { fetchSizes } from "../../store/sizeSlice";
import "./styles/FormAddProduct.scss";

type PropsType = {
  onHiddenFormAdd: () => void;
};

const FormAddProduct = (props: PropsType) => {
  const [attributes, setAttributes] = useState<AttributeType[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetailType[]>([]);
  const [idCategory, setIdCategory] = useState("");
  const [idParentCategory, setIdParentCategory] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [discription, setDiscription] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const sizes = useSelector((state: RootState) => state.sizeReducer.sizes);
  const dispatch = useDispatch<AppDispatch>();
  const hiddenFormAdd = props.onHiddenFormAdd;
  const categories = useSelector(
    (state: RootState) => state.categorySlice.categories
  );
  const parentCategories = useSelector(
    (state: RootState) => state.categorySlice.parentCategories
  );
  const addingProduct = useSelector(
    (state: RootState) => state.productReducer.loading
  );

  const handleAddProduct = () => {
    dispatch(
      addProduct({
        productName: nameProduct,
        productAttributes: attributes,
        discountPercent,
        productDesc: discription,
        categoryId: idCategory,
        productSizes: productDetails,
        idParentCategory: idParentCategory,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchParentCategories());
    dispatch(fetchSizes());
  }, [dispatch]);

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { _id: "", attributeName: "", attributeValue: "", productId: "" },
    ]);
  };

  const updateAttribute = (
    index: number,
    field: keyof AttributeType,
    value: string
  ) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const addProductDetail = () => {
    setProductDetails([
      ...productDetails,
      { stockQuantity: 0, price: 0, productId: "", sizeId: "" },
    ]);
  };

  const updateProductDetail = (
    index: number,
    field: keyof ProductDetailType,
    value: string | number
  ) => {
    const updatedProductDetails = [...productDetails];
    updatedProductDetails[index][field] = value;
    setProductDetails(updatedProductDetails);
  };

  const deleteAttribute = (index: number) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  const deleteProductDetail = (index: number) => {
    const updatedProductDetails = [...productDetails];
    updatedProductDetails.splice(index, 1);
    setProductDetails(updatedProductDetails);
  };

  return (
    <div className="form-add-product-container">
      <div className="d-flex justify-content-between">
        <p className="form-add-product-heading">Add New Product</p>
        <div>
          <button
            className="form-add-product-close-btn"
            onClick={hiddenFormAdd}
          >
            Close
          </button>
        </div>
      </div>
      <div>
        {addingProduct && (
          <div className="loading-overlay">
            <AiOutlineLoading3Quarters className="loading-icon" fontSize={40} />
          </div>
        )}
        <div>
          <p>Name Product</p>
          <input
            type="text"
            className="form-add-product-input"
            placeholder="Enter name..."
            onChange={(e) => {
              setNameProduct(e.target.value);
            }}
          />
        </div>
        <div>
          <p>Category: </p>
          <select
            className="form-add-product-select"
            name="category"
            onChange={(e) => {
              setIdCategory(e.target.value);
            }}
          >
            <option value="">Choose</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>ParentCategory: </p>
          <select
            className="form-add-product-select"
            name="category"
            onChange={(e) => {
              setIdParentCategory(e.target.value);
            }}
          >
            <option value="">Choose</option>
            {parentCategories.map((parentCategory) => (
              <option key={parentCategory._id} value={parentCategory._id}>
                {parentCategory.parentCategoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Discount Percent</p>
          <input
            type="number"
            className="form-add-product-input"
            placeholder="Enter discount percent"
            onChange={(e) => {
              setDiscountPercent(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <p>Description</p>
          <textarea
            className="form-add-product-textarea"
            onChange={(e) => {
              setDiscription(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <p>Attributes:</p>
          {attributes.map((attribute, index) => (
            <div key={index} className="form-add-product-attribute">
              <input
                type="text"
                placeholder="Attribute Name"
                value={attribute.attributeName}
                onChange={(e) =>
                  updateAttribute(index, "attributeName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Attribute Value"
                value={attribute.attributeValue}
                onChange={(e) =>
                  updateAttribute(index, "attributeValue", e.target.value)
                }
              />
              <button
                className="form-add-product-delete-btn"
                onClick={() => deleteAttribute(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button className="form-add-product-add-btn" onClick={addAttribute}>
            Add Attribute
          </button>
        </div>
        <div>
          <p>Product Details:</p>
          {productDetails.map((productDetail, index) => (
            <div key={index} className="form-add-product-product-detail">
              <input
                type="number"
                placeholder="Stock Quantity"
                value={productDetail.stockQuantity}
                onChange={(e) =>
                  updateProductDetail(
                    index,
                    "stockQuantity",
                    parseInt(e.target.value)
                  )
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={productDetail.price}
                onChange={(e) =>
                  updateProductDetail(index, "price", parseInt(e.target.value))
                }
              />
              <select
                name="sizeId"
                id={`sizeId-${index}`}
                value={productDetail.sizeId}
                onChange={(e) =>
                  updateProductDetail(index, "sizeId", e.target.value)
                }
                className="form-add-product-select"
              >
                <option value="">Choose Size</option>
                {sizes.map((size) => (
                  <option key={size._id} value={size._id}>
                    {size.sizeName}
                  </option>
                ))}
              </select>
              <button
                className="form-add-product-delete-btn"
                onClick={() => deleteProductDetail(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            className="form-add-product-add-btn"
            onClick={addProductDetail}
          >
            Add Product Detail
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="form-add-product-success-btn"
            onClick={() => {
              handleAddProduct();
            }}
          >
            Thêm sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
