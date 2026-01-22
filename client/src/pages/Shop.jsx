import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

import { useLocation } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const search = location.search; // ?keyword=Watch
                const { data } = await axios.get(`http://localhost:5000/api/products${search}`);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

    return (
        <div className="shop-page" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div className="container" style={{ padding: 'var(--spacing-md) var(--spacing-sm)' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 'var(--spacing-md)', fontSize: '3rem', textAlign: 'center' }}
                >
                    All Collections
                </motion.h1>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>Loading...</div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 'var(--spacing-md)',
                        rowGap: 'var(--spacing-lg)'
                    }}>
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
