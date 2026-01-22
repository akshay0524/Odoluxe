import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const containerRef = useRef(null);
    const scrollSectionRef = useRef(null);
    const logoRef = useRef(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Tilt up/down
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Tilt left/right

    useEffect(() => {
        const handleMouseMove = (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Normalize to -0.5 to 0.5
            x.set((e.clientX / width) - 0.5);
            y.set((e.clientY / height) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    // Images for GSAP scroll animation
    const scrollImages = [
        '/images/scroll/bag-laptop.jpg',
        '/images/scroll/phone-case.jpg',
        '/images/scroll/wallet-black.jpg',
        '/images/scroll/wallet-collection.jpg',
        '/images/scroll/bag-side.jpg'
    ];

    // Cursor Logic
    const [cursorVariant, setCursorVariant] = React.useState("default");
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring for cursor movement
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    const cursorVariants = {
        default: {
            width: 16,
            height: 16,
            backgroundColor: "white",
            mixBlendMode: "difference",
            x: "-50%",
            y: "-50%",
            opacity: 1
        },
        collection: {
            width: 80,
            height: 80,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            mixBlendMode: "normal",
            x: "-50%",
            y: "-50%",
            opacity: 1,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        }
    };

    const collections = [
        {
            id: 1,
            title: 'Timepieces',
            image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
            link: '/shop?keyword=Watch'
        },
        {
            id: 2,
            title: 'Leather Goods',
            image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
            link: '/shop?keyword=Leather'
        },
        {
            id: 3,
            title: 'Travel Gear',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            link: '/shop?keyword=Bag'
        }
    ];

    // Data for horizontal scroll section
    const scrollData = [
        { letter: 'O', image: scrollImages[0], title: 'The Executive', desc: 'Italian leather laptop briefcase for the modern professional.', align: 'right' },
        { letter: 'D', image: scrollImages[1], title: 'MagSafe Heritage', desc: 'Premium protection that develops a unique patina over time.', align: 'left' },
        { letter: 'O', image: scrollImages[2], title: 'Minimalist Carry', desc: 'Slim, RFID-protected cardholders for essential luxury.', align: 'right' },
        { letter: 'L', image: scrollImages[3], title: 'Signature Set', desc: 'A curated ensemble of our finest leather goods.', align: 'left' },
        { letter: 'U', image: scrollImages[4], title: 'Urban Explorer', desc: 'Versatile and stylish side bag for city nomads.', align: 'right' },
    ];

    useGSAP(() => {
        const sections = gsap.utils.toArray('.horizontal-panel');

        // Main Horizontal Scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollSectionRef.current,
                pin: true,
                scrub: 1,
                // Significantly increased duration for slower scrolling
                end: () => "+=" + (window.innerWidth * 6),
            }
        });

        tl.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none"
        });

        // Image & Text Pop Animations
        const panels = gsap.utils.toArray('.horizontal-panel');
        panels.forEach((panel, i) => {
            const img = panel.querySelector('.scroll-card');
            const text = panel.querySelector('.panel-text');

            if (img && text) {
                gsap.fromTo([img, text],
                    { scale: 0.8, opacity: 0, y: 30 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: tl,
                            start: "left center",
                            toggleActions: "play reverse play reverse",
                            id: `panel-${i}`
                        }
                    }
                );
            }
        });

    }, { scope: containerRef });

    return (
        <div className="home-container" ref={containerRef} style={{ overflowX: 'hidden', cursor: 'none' }}>
            {/* Custom Cursor */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}
                variants={cursorVariants}
                animate={cursorVariant}
            >
                {cursorVariant === 'collection' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </motion.div>
                )}
            </motion.div>

            {/* Hero Section */}
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', perspective: '1000px' }}>
                <div className="hero-content" style={{ textAlign: 'center', zIndex: 2 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        style={{
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            letterSpacing: '-2px',
                            marginBottom: '1rem',
                            rotateX,
                            rotateY,
                            textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 60px rgba(212, 175, 55, 0.2)', // White + Gold Glow
                            cursor: 'default',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        ODOLUXE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{ fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}
                    >
                        Redefining Luxury
                    </motion.p>
                    <div style={{ marginTop: '3rem' }}>
                        ↓ SCROLL TO BEGIN JOURNEY
                    </div>
                </div>
            </section>

            {/* Horizontal Scroll Section */}
            <section ref={scrollSectionRef} style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <div
                    className="horizontal-container"
                    style={{
                        display: 'flex',
                        width: `${(scrollData.length + 1) * 100}vw`, // Dynamic width
                        height: '100%'
                    }}
                >
                    {scrollData.map((item, index) => (
                        <div key={index} className="horizontal-panel" style={{ width: '100vw', height: '100%', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
                            {/* Giant Background Letter */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                                <span style={{ fontSize: '40vw', fontFamily: 'var(--font-heading)', color: 'rgba(212, 175, 55, 0.05)', lineHeight: 1 }}>
                                    {item.letter}
                                </span>
                            </div>

                            {/* Content Container - Grid for Side-by-Side */}
                            <div className="content-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '4rem',
                                height: '100%',
                                padding: '0 10vw',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                {/* Logical swapping of columns based on alignment */}
                                {item.align === 'left' ? (
                                    <>
                                        <div className="panel-text" style={{ textAlign: 'right' }}>
                                            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h2>
                                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                                        </div>
                                        <div className="scroll-card" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '12px', overflow: 'hidden' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', display: 'block' }} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="scroll-card" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '12px', overflow: 'hidden' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', display: 'block' }} />
                                        </div>
                                        <div className="panel-text" style={{ textAlign: 'left' }}>
                                            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h2>
                                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Final Panel: Call to Action */}
                    <div className="horizontal-panel" style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                        <span style={{ fontSize: '40vw', fontFamily: 'var(--font-heading)', color: 'rgba(212, 175, 55, 0.05)' }}>XE</span>
                        <div style={{ position: 'absolute', textAlign: 'center', zIndex: 5 }}>
                            <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Experience the Collection</h3>
                            <Link to="/shop" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>Shop All</Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Featured Collections */}
            <section style={{ padding: 'var(--spacing-xl) 0', minHeight: '100vh', background: 'var(--color-bg-main)', position: 'relative', zIndex: 20 }}>
                <div className="container">
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>The Collections</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                        {collections.map((item) => (
                            <Link to={item.link} key={item.id}>
                                <motion.div
                                    onMouseEnter={() => setCursorVariant("collection")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ height: '500px', position: 'relative', overflow: 'hidden', cursor: 'none' }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(${item.image}) center/cover no-repeat`
                                    }} />
                                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                        <span style={{
                                            textTransform: 'uppercase',
                                            fontSize: '0.8rem',
                                            letterSpacing: '1px',
                                            borderBottom: '1px solid var(--color-accent)'
                                        }}>
                                            Explore
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
