import { ProductsCollection } from '../db/models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllProducts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  searchTerm = '',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const searchFilter = searchTerm
    ? { product_name: { $regex: searchTerm, $options: 'i' } }
    : {};

  const productsQuery = ProductsCollection.find({ ...filter, ...searchFilter });

  const [productsCount, products] = await Promise.all([
    ProductsCollection.countDocuments({ ...filter, ...searchFilter }),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: products,
    ...paginationData,
  };
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findOne({ _id: productId });
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create({ ...payload });
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({ _id: productId });
  return product;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const updatedProduct = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!updatedProduct) return null;

  return updatedProduct;
};
