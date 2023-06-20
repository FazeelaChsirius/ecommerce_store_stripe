import React from 'react';
import ProductDetail from './ProductDetail';
import { client, urlFor } from '../../../../lib/client';
import { getProduct } from '../../../../utils/getProduct';

const ProductDetails = async({ params }) => {

  const {product,products } = await getData(params);

  return (
    <div>
      <ProductDetail product={product} products={products} />
    </div>
  )
}

async function getData(params) {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const { slug } = params;

  const query1 = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query1);
  return { products,product }
}


export default ProductDetails;

