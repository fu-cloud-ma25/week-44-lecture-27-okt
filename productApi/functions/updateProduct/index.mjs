import { products } from "../../data/index.mjs";
import { sendResponse} from '../../responses/index.mjs';


// id inte finns x
// body saknas x
// body innehåller fel värden x

export const handler = async (event) => {
    const { id } = event.pathParameters;

    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return sendResponse( 400, {message : 'Body must be JSON'});
    }

    const {name, price } = body;

    if( typeof name !== 'string' || typeof price !== 'number') {
        return sendResponse( 400, {message : 'price and name are required'});
    }

    const index = products.findIndex(p => p.id === id)

    if (index === -1 ) {
        return sendResponse( 404, {message : 'No product found'});
    }

    const updatedProduct = {id, name, price };
    products[index] = updatedProduct;

    return sendResponse(200, { 
        message : 'Product updated successfully',
        product : updatedProduct,
        products 
    });
}