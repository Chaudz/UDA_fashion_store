import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.toolkit";
import {
  fetchCategories,
  fetchParentCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  addParentCategory,
  deleteParentCategory,
  updateParentCategory,
} from "../../store/categorySlice";
import "./styles/Category.scss";

const Category: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categorySlice.categories
  );
  const parentCategories = useSelector(
    (state: RootState) => state.categorySlice.parentCategories
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const [newParentCategoryName, setNewParentCategoryName] = useState("");
  const [editingParentCategoryId, setEditingParentCategoryId] = useState<
    string | null
  >(null);
  const [editedParentCategoryName, setEditedParentCategoryName] = useState("");
  console.log(parentCategories);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchParentCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    dispatch(addCategory(newCategoryName));
    setNewCategoryName("");
  };

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleEditCategory = (categoryId: string) => {
    setEditingCategoryId(categoryId);
    const categoryToEdit = categories.find(
      (category) => category._id === categoryId
    );
    if (categoryToEdit) {
      setEditedCategoryName(categoryToEdit.categoryName);
    }
  };

  const handleUpdateCategory = () => {
    if (editingCategoryId) {
      dispatch(
        updateCategory({
          _id: editingCategoryId,
          categoryName: editedCategoryName,
        })
      );
      setEditingCategoryId(null);
      setEditedCategoryName("");
    }
  };

  const handleAddParentCategory = () => {
    dispatch(addParentCategory(newParentCategoryName));
    setNewParentCategoryName("");
  };

  const handleDeleteParentCategory = (parentCategoryId: string) => {
    dispatch(deleteParentCategory(parentCategoryId));
  };

  const handleEditParentCategory = (parentCategoryId: string) => {
    setEditingParentCategoryId(parentCategoryId);
    const parentCategoryToEdit = parentCategories.find(
      (parentCategory) => parentCategory._id === parentCategoryId
    );
    if (parentCategoryToEdit) {
      setEditedParentCategoryName(parentCategoryToEdit.parentCategoryName);
    }
  };

  const handleUpdateParentCategory = () => {
    if (editingParentCategoryId) {
      dispatch(
        updateParentCategory({
          _id: editingParentCategoryId,
          parentCategoryName: editedParentCategoryName,
        })
      );
      setEditingParentCategoryId(null);
      setEditedParentCategoryName("");
    }
  };

  return (
    <div className="category-container">
      <h2>Category Page</h2>
      <div className="parent-category-section">
        <h3>Parent Categories</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="New Parent Category Name"
            value={newParentCategoryName}
            onChange={(e) => setNewParentCategoryName(e.target.value)}
          />
          <button onClick={handleAddParentCategory}>Add Parent Category</button>
        </div>
        <ul>
          {parentCategories.map((parentCategory) => (
            <li key={parentCategory._id}>
              {editingParentCategoryId === parentCategory._id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editedParentCategoryName}
                    onChange={(e) =>
                      setEditedParentCategoryName(e.target.value)
                    }
                  />
                  <button onClick={handleUpdateParentCategory}>Update</button>
                </div>
              ) : (
                <div className="category-info">
                  {parentCategory.parentCategoryName}{" "}
                  <div className="action-buttons">
                    <button
                      onClick={() =>
                        handleEditParentCategory(parentCategory._id)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteParentCategory(parentCategory._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="category-section">
        <h3>Categories</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {editingCategoryId === category._id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                  <button onClick={handleUpdateCategory}>Update</button>
                </div>
              ) : (
                <div className="category-info">
                  {category.categoryName}{" "}
                  <div className="action-buttons">
                    <button onClick={() => handleEditCategory(category._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCategory(category._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
