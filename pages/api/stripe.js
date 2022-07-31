import Stripe from 'stripe';

const stripeSecretKey = `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`;

const stripe = new Stripe(stripeSecretKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1LRa70BOHzZvW81SPQ1uTiAn' },
                    { shipping_rate: 'shr_1LRa82BOHzZvW81S348B6Flu' }
                ],
                line_items: req.body.cartItems.map(item => {
                    const img = item.image[0].asset._ref;
                    const newImage = img
                        .replace(
                            'image-',
                            'https://cdn.sanity.io/images/51bmxwqg/production/'
                        )
                        .replace('-webp', '.webp');

                    return {
                        price_data: {
                            currency: 'brl',
                            product_data: {
                                name: item.name,
                                images: [newImage]
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1
                        },
                        quantity: item.quantity
                    };
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`
            };
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
