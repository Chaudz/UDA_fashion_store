// create controller user by ts and express
import { Request, Response } from "express";
import ParentCategory, { IParentCategory } from "../models/parentCategory";
import Product from "../models/productModel";

class ParentCategoryController {
  async addParentCategory(req: Request, res: Response) {
    try {
      const { parentCategoryName } = req.body;
      const existingParentCategory: IParentCategory | null = await ParentCategory.findOne({
        parentCategoryName,
      });

      if (existingParentCategory) {
        return res.status(409).json({ message: "Parent Category already exists !" });
      }

      const newParentCategory: IParentCategory = await new ParentCategory({ parentCategoryName });

      await newParentCategory.save();

      res.status(201).json(newParentCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllParentCategory(req: Request, res: Response) {
    try {
      const name = await ParentCategory.find();
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ message: "Internal server error !" });
    }
  }
  async getParentCategoryById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const name = await ParentCategory.findById({ _id: id });

      if (!name) {
        return res.status(404).json({ message: "Parent Category does not exist !" });
      }

      res.status(200).json(name);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateParentCategory(req: Request, res: Response) {
    try {
      const parentCategoryId = req.params.id;
      const { parentCategoryName } = req.body;

      const updateData = {
        parentCategoryName,
      };
      const updatedParentCategory = await ParentCategory.findOneAndUpdate(
        { _id: parentCategoryId },
        updateData,
        { new: true },
      );
      if (!updatedParentCategory) {
        return res.status(404).json({ message: "Parent Category does not exist !" });
      }

      res.status(200).json({ updatedParentCategory });
    } catch (error) {
      res.status(500).json({ message: "Internal server error !" });
    }
  }
  async deleteParentCategory(req: Request, res: Response) {
    try {
      const parentCategoryId = req.params.id;
      const productCount = await Product.countDocuments({ parentCategoryId });

      if (productCount > 0) {
        return res
          .status(409)
          .json({ message: "Cannot delete Parent Category with associated products" });
      }
      const existingParentCategory: IParentCategory | null = await ParentCategory.findByIdAndDelete(
        parentCategoryId,
      );

      if (!existingParentCategory) {
        return res.status(404).json({ message: "Parent Category not found" });
      }
      res.status(200).json({ message: "Delete Success!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ParentCategoryController();
