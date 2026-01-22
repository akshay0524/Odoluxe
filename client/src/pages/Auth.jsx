import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location.pathname]);

    const toggleMode = () => {
        const newMode = !isLogin;
        setIsLogin(newMode);
        navigate(newMode ? '/login' : '/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0a0a0a',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Animation - Optimized */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    width: '140vh', // Responsive size
                    height: '140vh',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                    willChange: 'transform, opacity'
                }}
            />

            {/* Mobile View: Single Centered Card with Tabs */}
            {isMobile ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        width: '90%',
                        maxWidth: '400px',
                        background: 'rgba(20, 20, 20, 0.6)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '2rem',
                        zIndex: 10,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <div style={{ display: 'flex', marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px' }}>
                        <button
                            onClick={() => { setIsLogin(true); navigate('/login'); }}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: 'none',
                                background: isLogin ? 'var(--color-accent)' : 'transparent',
                                color: isLogin ? 'black' : 'var(--color-text-secondary)',
                                borderRadius: '8px',
                                fontWeight: '600',
                                transition: 'all 0.3s'
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); navigate('/register'); }}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: 'none',
                                background: !isLogin ? 'var(--color-accent)' : 'transparent',
                                color: !isLogin ? 'black' : 'var(--color-text-secondary)',
                                borderRadius: '8px',
                                fontWeight: '600',
                                transition: 'all 0.3s'
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.form
                            key={isLogin ? 'login' : 'register'}
                            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleSubmit}
                        >
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                                {isLogin ? 'Enter your details to continue' : 'Join us for exclusive access'}
                            </p>

                            {!isLogin && <InputGroup icon={<FiUser />} type="text" placeholder="Name" />}
                            <InputGroup icon={<FiMail />} type="email" placeholder="Email" />
                            <InputGroup icon={<FiLock />} type="password" placeholder="Password" />

                            <LuxuryButton text={loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")} loading={loading} />

                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <SocialButton icon={<FaGoogle />} />
                                <SocialButton icon={<FiGithub />} />
                            </div>
                        </motion.form>
                    </AnimatePresence>
                </motion.div>
            ) : (
                /* Desktop View: Sliding Overlay (Original Implementation optimized) */
                <div style={{
                    position: 'relative',
                    width: '1000px',
                    height: '600px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '30px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                    display: 'flex',
                    zIndex: 10,
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    {/* LOGIN FORM (Left) */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100%',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)', // Smooth Bezier
                        opacity: isLogin ? 1 : 0,
                        transform: isLogin ? 'translateX(0) scale(1)' : 'translateX(0) scale(0.95)',
                        pointerEvents: isLogin ? 'all' : 'none',
                        willChange: 'opacity, transform'
                    }}>
                        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '320px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h2>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                                <SocialButton icon={<FaGoogle />} />
                                <SocialButton icon={<FiGithub />} />
                                <SocialButton icon={<FiTwitter />} />
                            </div>
                            <span style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>or use your email</span>
                            <InputGroup icon={<FiMail />} type="email" placeholder="Email" />
                            <InputGroup icon={<FiLock />} type="password" placeholder="Password" />
                            <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', display: 'block', textAlign: 'right', marginTop: '0.5rem', marginBottom: '2rem', textDecoration: 'none' }}>Forgot password?</a>
                            <LuxuryButton text={loading ? "Signing In..." : "Sign In"} loading={loading} />
                        </form>
                    </div>

                    {/* REGISTER FORM (Right) */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: '50%',
                        height: '100%',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        opacity: isLogin ? 0 : 1,
                        transform: isLogin ? 'translateX(0) scale(0.95)' : 'translateX(0) scale(1)',
                        pointerEvents: isLogin ? 'none' : 'all',
                        willChange: 'opacity, transform'
                    }}>
                        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '320px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                                <SocialButton icon={<FaGoogle />} />
                                <SocialButton icon={<FiGithub />} />
                                <SocialButton icon={<FiTwitter />} />
                            </div>
                            <span style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>or use your email</span>
                            <InputGroup icon={<FiUser />} type="text" placeholder="Name" />
                            <InputGroup icon={<FiMail />} type="email" placeholder="Email" />
                            <InputGroup icon={<FiLock />} type="password" placeholder="Password" />
                            <div style={{ marginTop: '2rem' }}>
                                <LuxuryButton text={loading ? "Creating Account..." : "Sign Up"} loading={loading} />
                            </div>
                        </form>
                    </div>

                    {/* SLIDING OVERLAY */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: '50%',
                        height: '100%',
                        overflow: 'hidden',
                        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        transform: isLogin ? 'translateX(0)' : 'translateX(-100%)',
                        zIndex: 100,
                        borderRadius: isLogin ? '30px 0 0 30px' : '0 30px 30px 0',
                        willChange: 'transform'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
                            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'white',
                            position: 'relative',
                            left: '-100%',
                            height: '100%',
                            width: '200%',
                            transform: isLogin ? 'translateX(0)' : 'translateX(50%)',
                            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                            display: 'flex',
                            flexDirection: 'row',
                            willChange: 'transform'
                        }}>
                            <div style={{
                                width: '50%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '3rem',
                                textAlign: 'center',
                                background: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '1rem' }}>Welcome Back!</h2>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '80%' }}>To keep connected with us please login with your personal info</p>
                                <GhostButton onClick={toggleMode}>Sign In</GhostButton>
                            </div>
                            <div style={{
                                width: '50%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '3rem',
                                textAlign: 'center',
                                background: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '1rem' }}>Hello, Friend!</h2>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '80%' }}>Enter your personal details and start your journey with ODOLUXE</p>
                                <GhostButton onClick={toggleMode}>Sign Up</GhostButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Custom Components
const SocialButton = ({ icon }) => (
    <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'white', color: 'black' }}
        whileTap={{ scale: 0.95 }}
        style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'all 0.3s'
        }}
    >
        {icon}
    </motion.button>
);

const InputGroup = ({ icon, type, placeholder }) => (
    <div style={{ position: 'relative', marginBottom: '1rem', width: '100%' }}>
        <div style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-secondary)',
            fontSize: '1.1rem'
        }}>
            {icon}
        </div>
        <input
            type={type}
            placeholder={placeholder}
            required
            style={{
                width: '100%',
                padding: '12px 15px 12px 45px',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'background 0.3s'
            }}
            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
        />
    </div>
);

const LuxuryButton = ({ text, loading }) => (
    <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(45deg, #D4AF37, #FDD017)',
            color: '#000',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px'
        }}
    >
        {text}
    </motion.button>
);

const GhostButton = ({ children, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{
            padding: '12px 40px',
            background: 'transparent',
            border: '2px solid white',
            borderRadius: '30px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: 'pointer'
        }}
    >
        {children}
    </motion.button>
);

export default Auth;
