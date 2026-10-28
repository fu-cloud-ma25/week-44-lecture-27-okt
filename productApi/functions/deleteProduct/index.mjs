import { products } from '../../data/index.mjs';
import { sendResponse} from '../../responses/index.mjs';



export const handler = async (event) => {
    const { id } = event.pathParameters;
    
    const index = products.findIndex(p => p.id === id);

    if (index === -1 ) {
        return sendResponse( 404, {message : 'No product found'});
    }

    const [deletedProduct] =  products.splice(index, 1);
 
    return sendResponse(200, { 
        message : 'Product deleted successfully',
        product : deletedProduct,
        products 
    });

}