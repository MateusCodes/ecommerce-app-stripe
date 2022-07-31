import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar
} from 'react-icons/ai';
import Product from '../../components/Product';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ products, product }) => {
    const { image, name, details, price } = product;
    const [photoIndex, setPhotoIndex] = useState(0);
    const { decreaseQuantity, increaseQuantity, qty, onAdd, setShowCart } =
        useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    };

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img
                            src={urlFor(image && image[photoIndex])}
                            alt=""
                            className="product-detail-image"
                        />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, index) => (
                            <img
                                key={index}
                                src={urlFor(item)}
                                className={
                                    index === photoIndex
                                        ? 'small-image selected-image'
                                        : 'small-image'
                                }
                                onMouseEnter={() => setPhotoIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decreaseQuantity}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={increaseQuantity}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={() => onAdd(product, qty)}
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            className="buy-now"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map(item => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const query = `*[_type == 'product'] {
        slug {
            current
        }
    }`;

    const slugs = await client.fetch(query);

    const paths = slugs.map(slug => ({
        params: {
            slug: slug.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params: { slug } }) {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query);

    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    };
}

export default ProductDetails;
