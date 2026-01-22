import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiMenu, FiSearch, FiX, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import productsData from '../products';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Suggestion Logic
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (keyword.length > 1) {
                const lowerKeyword = keyword.toLowerCase();
                const filtered = productsData.filter(p =>
                    p.name.toLowerCase().includes(lowerKeyword)
                );
                setSuggestions(filtered.slice(0, 5));
            } else {
                setSuggestions([]);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce

        return () => clearTimeout(timeoutId);
    }, [keyword]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/shop?keyword=${keyword}`);
            setSearchOpen(false);
            setKeyword('');
            setSuggestions([]);
        } else {
            navigate('/');
        }
    };

    const handleSuggestionClick = (id) => {
        navigate(`/product/${id}`);
        setSearchOpen(false);
        setKeyword('');
        setSuggestions([]);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%', // Centered
                    // transform: 'translateX(-50%)', // Handled by motion x: '-50%'
                    width: '90%',
                    maxWidth: '1100px',
                    padding: '0.8rem 2.5rem',
                    background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(255, 255, 255, 0.05)', // Dynamic glass
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '100px', // Pill shape
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
                    transition: 'background 0.4s ease, padding 0.4s ease'
                }}
            >
                <div className="nav-left" style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={() => setMenuOpen(true)}
                        style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer', marginRight: '1.5rem', display: 'flex' }}
                    >
                        <FiMenu />
                    </button>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer', display: 'flex' }}
                        >
                            {searchOpen ? <FiX /> : <FiSearch />}
                        </button>

                        <AnimatePresence>
                            {searchOpen && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: '250px', opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        left: '200%', // Shifted to not overlap icons
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        marginLeft: '1rem',
                                    }}
                                >
                                    <form onSubmit={submitHandler} style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            style={{
                                                width: '100%',
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid white',
                                                color: 'white',
                                                padding: '0.25rem',
                                                fontFamily: 'var(--font-body)',
                                                outline: 'none'
                                            }}
                                            autoFocus
                                        />

                                        {/* Suggestions Dropdown */}
                                        {suggestions.length > 0 && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 'calc(100% + 15px)', // Pushed down
                                                left: 0,
                                                width: '100%',
                                                background: 'rgba(20, 20, 20, 0.95)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                zIndex: 10
                                            }}>
                                                {suggestions.map((product) => (
                                                    <div
                                                        key={product._id}
                                                        onClick={() => handleSuggestionClick(product._id)}
                                                        style={{
                                                            padding: '0.8rem',
                                                            cursor: 'pointer',
                                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                            fontSize: '0.9rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.8rem',
                                                            color: 'var(--color-text-main)'
                                                        }}
                                                        className="suggestion-item"
                                                    >
                                                        <img src={product.image} alt="" style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%' }} />
                                                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <button type="submit" style={{ display: 'none' }}></button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="nav-center">
                    <Link to="/" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: '600', letterSpacing: '-1px' }}>
                        ODOLUXE
                    </Link>
                </div>

                <div className="nav-right">
                    <Link to="/cart" style={{ position: 'relative', fontSize: '1.2rem', display: 'flex' }}>
                        <FiShoppingBag />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-8px',
                                    fontSize: '0.65rem',
                                    background: 'var(--color-accent)',
                                    color: 'black',
                                    borderRadius: '50%',
                                    width: '15px',
                                    height: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>
                </div>
            </motion.nav>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(5px)',
                                zIndex: 199
                            }}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '300px',
                                height: '100%',
                                background: 'var(--color-bg-main)',
                                borderRight: '1px solid var(--color-border)',
                                zIndex: 200,
                                padding: '3rem 2rem',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Menu</h2>
                                <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
                                    <FiX />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <Link to="/" onClick={() => setMenuOpen(false)} style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Home <FiChevronRight />
                                </Link>
                                <Link to="/shop" onClick={() => setMenuOpen(false)} style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Shop All <FiChevronRight />
                                </Link>
                                <Link to="/cart" onClick={() => setMenuOpen(false)} style={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Cart <FiChevronRight />
                                </Link>
                                <div style={{ borderTop: '1px solid var(--color-border)', margin: '1rem 0' }}></div>
                                <Link to="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                                    Register
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
