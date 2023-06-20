import Stripe from 'stripe';
import { NextResponse } from 'next/server';


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request) { 
    const body = await request.json(); 
    // const requestHeaders = new Headers(request.headers);
    // console.log(requestHeaders.get('origin'));

    const headers = request.headers;
    let url = headers.get('origin');

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1NKGeoAiESwg0hjV99fUWlj4' },
            ],
            line_items: body.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/zohfpil4/production/').replace('-webp', '.webp');

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: item.price * 100,
                    },

                    adjustable_quantity: {
                        enabled:true,
                        minimum: 1,
                    },

                    quantity: item.quantity
                };
            }),
            success_url: `${url}/success`,
            cancel_url: `${url}/canceled`,
        };

        const session = await stripe.checkout.sessions.create(params);
        return NextResponse.json(session);

    } 
    catch (error) {
        return NextResponse.error(error.message);
    }

}


 