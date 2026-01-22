import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <Link to={`/product/${product._id}`}>
                <div style={{ position: 'relative', paddingTop: '125%', background: '#111', overflow: 'hidden' }}>
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        src={product.image}
                        alt={product.name}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </Link>
            <div style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{product.category}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 600 }}>${product.price}</p>
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--color-glass)',
                    border: 'none',
                    color: 'white',
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)'
                }}
            >
                <FiShoppingBag size={16} />
            </motion.button>
        </div>
    );
};

export default ProductCard;
