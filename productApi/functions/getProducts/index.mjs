import { sendResponse } from '../../responses/index.mjs';
import { products } from '../../data/index.mjs';

export const handler = async (event) => {
  if(products.length < 0) {
    return sendResponse(404, { message : 'No products found!' });
  } else {
    return sendResponse(200, { products });
  }
};
