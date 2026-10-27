import { sendResponse } from '../../responses/index.mjs';
import { products } from '../../data/index.mjs';

export const handler = async (event) => {
  const { id } = event.pathParameters;

  const product = products.find(p => p.id === id);

  if(!product) {
    return sendResponse(400, { 
      message : 'Bad request: No product with corresponding ID found' 
    });
  } else {
    return sendResponse(200, { product });
  }
};
