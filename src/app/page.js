import React from 'react';

import { Product, FooterBnner, HeroBanner, ClientOnly } from '../../components';
import { client } from '../../lib/client';



const Home = async () => {
  const { products,bannerData } = await getData();

  
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
  
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations passages</p>
      </div>

      <div className='products-container'> 
        {products?.map((product) => <Product key={product?._id} product={product}/>)} 
      </div>

      <FooterBnner footerBanner={bannerData && bannerData[0]} />

    </div>
  );

}

//Get All Products and Banner Data from our Sanity  --> '*' means All

async function getData() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { products,bannerData };
} 

export default Home;

