import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

import productsData from '../products';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            // Mock API delay
            setTimeout(() => {
                const foundProduct = productsData.find(p => p._id === id);
                setProduct(foundProduct);
                setLoading(false);
            }, 500);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            alert('Added to cart'); // Optional: replace with a nicer toast
        }
    };

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Product not found</div>;

    return (
        <div className="product-details" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '5rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="product-image"
                >
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '4px' }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="product-info"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '1.5rem' }}>${product.price}</p>

                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                        {product.description}
                    </p>

                    <button
                        className="btn-primary"
                        style={{ alignSelf: 'start' }}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails;
