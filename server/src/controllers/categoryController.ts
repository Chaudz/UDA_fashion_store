import { Request, Response } from "express";
import Category, { ICategory } from "../models/categoryModel";
import Product from "../models/productModel";

class CategoryController {
  async addCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.body;
      const existingCategory: ICategory | null = await Category.findOne({
        categoryName,
      });

      if (existingCategory) {
        return res.status(409).json({ message: "Category already exists !" });
      }

      const newCategory: ICategory = await new Category({ categoryName });

      await newCategory.save();

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllCategory(req: Request, res: Response) {
    try {
      const name = await Category.find();
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ message: "Internal server error !" });
    }
  }
  async getCategoryById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const name = await Category.findById({ _id: id });

      if (!name) {
        return res.status(404).json({ message: "Category does not exist !" });
      }

      res.status(200).json(name);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const CategoryId = req.params.id;
      const { categoryName } = req.body;

      const updateData = {
        categoryName,
      };
      const updatedCategory = await Category.findOneAndUpdate({ _id: CategoryId }, updateData, {
        new: true,
      });
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category does not exist !" });
      }

      res.status(200).json({ updatedCategory });
    } catch (error) {
      res.status(500).json({ message: "Internal server error !" });
    }
  }
  async deleteCategory(req: Request, res: Response) {
    try {
      const CategoryId = req.params.id;

      const productCount = await Product.countDocuments({ CategoryId });

      if (productCount > 0) {
        return res.status(409).json({ message: "Cannot delete Category with associated products" });
      }
      const existingCategory: ICategory | null = await Category.findByIdAndDelete(CategoryId);

      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Delete Success!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new CategoryController();
