// nodejs - hw - mongodb / src / db / models/contacts.js
import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'UAH'],
      default: 'UAH',
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    accessories: {
      type: [String],
      default: [],
    },
    warranty_period: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = model('Products', productsSchema);
