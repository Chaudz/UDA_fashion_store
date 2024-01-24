import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import ProductDetail, { IProductDetail } from "../models/productDetailModel";
import Attribute, { IAtribute } from "../models/atributeModel";
import Product, { IProduct } from "../models/productModel";
import ProductImage, { IProductImage } from "../models/productImageModel";

type ProductSize = {
  sizeId: Object;
  stockQuantity: number;
  price: number;
};

type ProductAttribute = {
  attributeName: string;
  attributeValue: string;
};

type ImageUrls = {
  imageUrl: string;
};

type AllProduct = {
  product: IProduct;
  productDetails: IProductDetail[];
  productImages: IProductImage[];
  attributes: IAtribute[];
};

class ProductController {
  async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      if (!isValidObjectId(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
      }

      const product: IProduct | null = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      const productDetails: IProductDetail[] = await ProductDetail.find({ productId });

      const productImages: IProductImage[] = await ProductImage.find({ productId });

      const attributes: IAtribute[] = await Attribute.find({ productId });

      const result: AllProduct = {
        product,
        productDetails,
        productImages,
        attributes,
      };

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const products: IProduct[] = await Product.find().skip(startIndex).limit(endIndex);
      const allProduct: AllProduct[] = await Promise.all(
        products.map(async (product) => {
          const productDetails: IProductDetail[] = await ProductDetail.find({
            productId: product._id,
          });
          const productImages: IProductImage[] = await ProductImage.find({
            productId: product._id,
          });
          const attributes: IAtribute[] = await Attribute.find({
            productId: product._id,
          });

          return {
            product,
            productDetails,
            productImages,
            attributes,
          } as unknown as AllProduct;
        }),
      );

      const result = {
        products: allProduct,
        pageInfo: {
          totalProduct: await Product.countDocuments(),
          totalPages: Math.ceil((await Product.countDocuments()) / limit),
          currentPage: page,
        },
      };
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const categoryId = req.query.categoryId;
      const parentCategoryId = req.query.parentCategoryId;
      if (!isValidObjectId(categoryId) || !isValidObjectId(parentCategoryId)) {
        return res.status(400).json({ message: "Invalid productId and parentCategoryId" });
      }

      const products: IProduct[] | null = await Product.find({
        categoryId,
        parentCategoryId,
      });

      if (!products) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      const allProduct: AllProduct[] = await Promise.all(
        products.map(async (product) => {
          const productDetails: IProductDetail[] = await ProductDetail.find({
            productId: product._id,
          });
          const productImages: IProductImage[] = await ProductImage.find({
            productId: product._id,
          });
          const attributes: IAtribute[] = await Attribute.find({
            productId: product._id,
          });

          return {
            product,
            productDetails,
            productImages,
            attributes,
          } as unknown as AllProduct;
        }),
      );

      res.status(200).json(allProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createProducts(req: Request, res: Response) {
    try {
      const productSizes: ProductSize[] = req.body.productSizes ?? [];
      const productAttributes: ProductAttribute[] = req.body.productAttributes ?? [];
      const imageUrls: ImageUrls[] = req.body.imageUrls ?? [];
      const discountPercent = req.body.discountPercent ?? 0;
      const productDesc = req.body.productDesc ?? "";
      const { productName, categoryId, parentCategoryId } = req.body;
      console.log(productName);
      console.log(productAttributes);
      console.log(productSizes);

      const newProduct = new Product({
        productName,
        productDesc,
        discountPercent,
        categoryId,
        parentCategoryId,
      });

      const savedProduct = await newProduct.save();

      const savedAttributes = await Attribute.insertMany(
        productAttributes.map((attribute) => ({
          attributeName: attribute.attributeName,
          attributeValue: attribute.attributeValue,
          productId: savedProduct._id,
        })),
      );

      const savedProductImage = await ProductImage.insertMany(
        imageUrls.map((imageUrl) => ({
          imageUrl: imageUrl.imageUrl,
          productId: savedProduct._id,
        })),
      );

      const productDetails: any = [];
      for (let i = 0; i < productSizes.length; i++) {
        const savedProductDetail = await new ProductDetail({
          stockQuantity: productSizes[i].stockQuantity,
          price: productSizes[i].price,
          productId: savedProduct._id,
          sizeId: productSizes[i].sizeId,
        }).save();
        productDetails.push(savedProductDetail);
      }
      console.log("thành công");
      return res.status(201).json({
        product: savedProduct,
        attributes: savedAttributes,
        productDetails: productDetails,
        productImage: savedProductImage,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;

      await ProductDetail.deleteMany({ productId });

      await Attribute.deleteMany({ productId });

      await ProductImage.deleteMany({ productId });

      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (deletedProduct) {
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const productSizes: ProductSize[] = req.body.productSizes ?? [];
      const productAttributes: ProductAttribute[] = req.body.productAttributes ?? [];
      const imageUrls: ImageUrls[] = req.body.imageUrls ?? [];
      const discountPercent = req.body.discountPercent ?? 0;
      const productDesc = req.body.productDesc ?? "";
      const { productName, categoryId, parentCategoryId } = req.body;

      if (!isValidObjectId(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
      }

      if (
        !productName ||
        !categoryId ||
        !parentCategoryId ||
        imageUrls.length === 0 ||
        productAttributes.length === 0 ||
        productSizes.length === 0
      ) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          productName,
          productDesc,
          discountPercent,
          categoryId,
          parentCategoryId,
        },
        { new: true },
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      await ProductDetail.updateMany(
        { productId },
        {
          stockQuantity: req.body.productSizes.map((size: ProductSize) => size.stockQuantity),
          price: req.body.productSizes.map((size: ProductSize) => size.price),
        },
      );

      await Attribute.updateMany(
        { productId },
        {
          atributeName: req.body.productAttributes.map(
            (attr: ProductAttribute) => attr.attributeName,
          ),
          atributeValue: req.body.productAttributes.map(
            (attr: ProductAttribute) => attr.attributeValue,
          ),
        },
      );

      await ProductImage.updateMany(
        { productId },
        {
          imageUrl: req.body.imageUrls.map((url: ImageUrls) => url.imageUrl),
        },
      );

      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new ProductController();
