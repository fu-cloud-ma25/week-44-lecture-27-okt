import { sendResponse } from "../../responses/index.mjs";
import { products } from "../../data/index.mjs";

export const handler = async (event) => {
  const { name, price } = JSON.parse(event.body);
  
  const newProduct = {
    id : crypto.randomUUID().slice(0, 5),
    name, 
    price
  };

  products.push(newProduct);

  return sendResponse(201, { 
    message : 'Product created successfully',
    product : newProduct,
    products 
  });
};