import { client, urlFor } from '../lib/client';
export async function getProduct(params) {
    const { slug } = params;
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
  
    const query1 = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const product = await client.fetch(query1);
    return { products,product }
}

