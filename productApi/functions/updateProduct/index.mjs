import middy from "@middy/core";
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import { createError} from '@middy/util'
import { products } from "../../data/index.mjs";
import { sendResponse} from '../../responses/index.mjs';


// id inte finns x
// body saknas x
// body innehåller fel värden x

const updateProduct = async (event) => {
    const { id } = event.pathParameters;

    const {name, price } = event.body;

    if( typeof name !== 'string' || typeof price !== 'number') {
        throw createError(400, 'price and name are required');
    }

    const index = products.findIndex(p => p.id === id)

    if (index === -1 ) {
        throw createError(404, 'No product found');
    }

    const updatedProduct = {id, name, price };
    products[index] = updatedProduct;

    return sendResponse(200, { 
        message : 'Product updated successfully',
        product : updatedProduct,
        products 
    });
}

export const handler = middy(updateProduct)
    .use(httpJsonBodyParser())
    .use(httpErrorHandler());