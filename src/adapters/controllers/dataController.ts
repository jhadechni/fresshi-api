import { Request, Response } from "express";
import { getDataService } from "../../domain/services/dataServices";
import admin from "firebase-admin";
import Product from "../../domain/models/productModel";
const db = admin.firestore();

export const getData = async (req: Request, res: Response) => {
  try {
    const data = await getDataService();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    originalPrice,
    discountPrice,
    image,
    stockQuantity,
    unitOfMeasurement,
    description,
    quantityPerSale,
    category,
    tags,
    ratings,
    cultivationRegion,
  } = req.body;
  const productId = db.collection('products').doc().id; 
  const product = new Product({
    id: productId,
    name,
    originalPrice,
    discountPrice,
    image,
    stockQuantity,
    unitOfMeasurement,
    description,
    quantityPerSale,
    category,
    tags,
    ratings,
    cultivationRegion,
  });

  try {
    await db.collection("products").doc(product.id).set(product.toFirestore());
    res.status(201).send("Product created successfully");
  } catch (error: any) {
    res.status(500).send(`Error creating product: ${error.message}`);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const doc = await db.collection("products").doc(productId).get();
    if (!doc.exists) {
      res.status(404).send("Product not found");
      return;
    }
    const product = Product.fromFirestore(doc);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).send(`Error getting product: ${error.message}`);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    // Get the existing product
    const doc = await db.collection("products").doc(productId).get();
    if (!doc.exists) {
      res.status(404).send("Product not found");
      return;
    }

    // Update the product fields
    const existingProduct = Product.fromFirestore(doc);
    Object.assign(existingProduct, req.body);
    await db
      .collection("products")
      .doc(existingProduct.id)
      .set(existingProduct.toFirestore());
    res.status(200).send("Product updated successfully");
  } catch (error: any) {
    res.status(500).send(`Error updating product: ${error.message}`);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    await db.collection("products").doc(productId).delete();
    res.status(200).send("Product deleted successfully");
  } catch (error: any) {
    res.status(500).send(`Error deleting product: ${error.message}`);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsCollection = await db.collection("products").get();
    const products = productsCollection.docs.map((doc) => Product.fromFirestore(doc));
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).send(`Error getting products: ${error.message}`);
  }
}