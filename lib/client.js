import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'zohfpil4',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// Get Sanity Images

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);







