// src/validation/students.js
import Joi from 'joi';


export const createProductSchema = Joi.object({
  product_name: Joi.string().min(3).max(50).required(), 
  category: Joi.string().min(3).max(30).required(), 
  brand: Joi.string().min(2).max(30).required(), 
  price: Joi.number().positive().required(), 
  currency: Joi.string().valid('USD', 'EUR', 'UAH').required(), 
  description: Joi.string().min(10).max(1000).required(), 
  stock: Joi.number().integer().min(0).required(), 
  rating: Joi.number().min(0).max(5).required(), 
  warranty_period: Joi.string().min(3).max(20).required(), 
  features: Joi.array().items(Joi.string()).default([]), 
  accessories: Joi.array().items(Joi.string()).default([]), 
  isFavourite: Joi.boolean().default(false), 
});


export const updateProductSchema = Joi.object({
  product_name: Joi.string().min(3).max(50), 
  category: Joi.string().min(3).max(30), 
  brand: Joi.string().min(2).max(30), 
  price: Joi.number().positive(), 
  currency: Joi.string().valid('USD', 'EUR', 'UAH'),
  description: Joi.string().min(10).max(1000),
  stock: Joi.number().integer().min(0),
  rating: Joi.number().min(0).max(5), 
  warranty_period: Joi.string().min(3).max(20),
  features: Joi.array().items(Joi.string()).default([]), 
  accessories: Joi.array().items(Joi.string()).default([]), 
  isFavourite: Joi.boolean().default(false),
});