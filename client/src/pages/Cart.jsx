import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const tax = subtotal * 0.08; // 8% tax example
    const total = subtotal + tax;

    const handleCheckout = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="cart-page" style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '5rem' }}>
            <div className="container">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}
                >
                    Your Shopping Bag
                </motion.h1>

                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                            Your bag is currently empty.
                        </p>
                        <Link to="/shop" className="btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
                        {/* Cart Items List */}
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        display: 'flex',
                                        gap: '2rem',
                                        padding: '2rem 0',
                                        borderBottom: '1px solid var(--color-border)'
                                    }}
                                >
                                    <Link to={`/product/${item._id}`}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '120px', aspectRatio: '4/5', objectFit: 'cover' }}
                                        />
                                    </Link>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <Link to={`/product/${item._id}`} style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                                    {item.name}
                                                </Link>
                                                <p style={{ fontWeight: 600 }}>${item.price}</p>
                                            </div>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{item.category}</p>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)' }}>
                                                <button
                                                    onClick={() => addToCart(item, item.qty - 1)}
                                                    disabled={item.qty <= 1}
                                                    style={{ background: 'none', border: 'none', color: 'white', padding: '0.5rem', cursor: 'pointer' }}
                                                >
                                                    <FiMinus size={14} />
                                                </button>
                                                <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>{item.qty}</span>
                                                <button
                                                    onClick={() => addToCart(item, item.qty + 1)}
                                                    disabled={item.qty >= item.countInStock}
                                                    style={{ background: 'none', border: 'none', color: 'white', padding: '0.5rem', cursor: 'pointer' }}
                                                >
                                                    <FiPlus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--color-text-secondary)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.9rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}
                                            >
                                                <FiTrash2 /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <div style={{ marginTop: '2rem' }}>
                                <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                    <FiArrowLeft /> Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="cart-summary">
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                                <div style={{ borderTop: '1px solid var(--color-border)', margin: '1rem 0' }}></div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 600 }}>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="btn-primary"
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
