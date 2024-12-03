
import admin from 'firebase-admin';
const db = admin.firestore();

interface ProductProps {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
  stockQuantity: number;
  unitOfMeasurement: string;
  description: string;
  quantityPerSale: number;
  category: string;
  tags?: string[];
  ratings: number;
  cultivationRegion: string;
}

class Product {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
  stockQuantity: number;
  unitOfMeasurement: string;
  description: string;
  quantityPerSale: number;
  category: string;
  tags: string[];
  ratings: number;
  cultivationRegion: string;

  constructor({
    id,
    name,
    originalPrice,
    discountPrice,
    image,
    stockQuantity,
    unitOfMeasurement,
    description,
    quantityPerSale,
    category,
    tags = [],
    ratings,
    cultivationRegion,
  }: ProductProps) {
    this.id = id;
    this.name = name;
    this.originalPrice = originalPrice;
    this.discountPrice = discountPrice;
    this.image = image;
    this.stockQuantity = stockQuantity;
    this.unitOfMeasurement = unitOfMeasurement;
    this.description = description;
    this.quantityPerSale = quantityPerSale;
    this.category = category;
    this.tags = tags;
    this.ratings = ratings;
    this.cultivationRegion = cultivationRegion;
  }

  // Getter for available units
  get availableUnits(): number {
    return Math.floor(this.stockQuantity / this.quantityPerSale);
  }

  // Getter for discount percentage
  get discountPercentage(): number {
    if (this.originalPrice === 0) return 0;
    return ((this.originalPrice - this.discountPrice) / this.originalPrice) * 100;
  }

  // Method to convert to Firestore-compatible object
  toFirestore(): ProductProps {
    return {
      id: this.id,
      name: this.name,
      originalPrice: this.originalPrice,
      discountPrice: this.discountPrice,
      image: this.image,
      stockQuantity: this.stockQuantity,
      unitOfMeasurement: this.unitOfMeasurement,
      description: this.description,
      quantityPerSale: this.quantityPerSale,
      category: this.category,
      tags: this.tags,
      ratings: this.ratings,
      cultivationRegion: this.cultivationRegion,
    };
  }

  // Static method to create a Product from Firestore document
  static fromFirestore(doc: FirebaseFirestore.DocumentSnapshot): Product {
    const data = doc.data() as ProductProps;
    return new Product(data);
  }
}

// Exporting the Product class
export default Product;
