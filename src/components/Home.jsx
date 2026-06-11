import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Clock, Phone, Video, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const galleryImages = [
  {img: '/assets/hero.png', cap: 'The Sunset Deck'},
  {img: '/assets/image-1.png', cap: 'The Velvet Lounge'},
  {img: '/assets/image-2.png', cap: 'Artisanal Details'},
  {img: '/assets/image-3.png', cap: 'Golden Hour Views'},
  {img: '/assets/image-4.png', cap: 'Cozy Corners'},
  {img: '/assets/food.png', cap: 'Signature Serves'},
];

const socialMediaItems = [
  { type: 'reel', src: "https://www.instagram.com/p/DCzX2mfTbnL/" },
  { type: 'reel', src: "https://www.instagram.com/p/DK9ixSIzr5O/" },
  { type: 'reel', src: "https://www.instagram.com/p/DCKNhLvzBng/" },
  { type: 'reel', src: "https://www.instagram.com/p/DSqDeHEE45m/" },
  { type: 'reel', src: "https://www.instagram.com/p/DWB6P8YExH-/" },
  { type: 'reel', src: "https://www.instagram.com/reel/DCM4vClyV-s/" },
  // Duplicate for smooth infinite scroll
  { type: 'reel', src: "https://www.instagram.com/p/DWB6P8YExH-/" },
  { type: 'reel', src: "https://www.instagram.com/p/DK9ixSIzr5O/" },
  { type: 'reel', src: "https://www.instagram.com/p/DCKNhLvzBng/" },
  { type: 'reel', src: "https://www.instagram.com/p/DSqDeHEE45m/" },
  { type: 'reel', src: "https://www.instagram.com/p/DWB6P8YExH-/" },
  { type: 'reel', src: "https://www.instagram.com/p/DK9ixSIzr5O/" }
];

// Inline SVG for Verified Star
const VerifiedStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="verification-badge">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Inline SVG for Play Button
const PlayIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Dynamically load Instagram embed script
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm) window.instgrm.Embeds.process();
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/assets/logo.jpg" alt="The Cafe Lakeside Logo" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)' }} />
          <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '3px', fontWeight: 600, fontSize: '1.2rem' }}>THE CAFE LAKESIDE</span>
        </Link>
        <div className="nav-links">
          <a href="#vibe">The Vibe</a>
          <Link to="/gallery">Gallery</Link>
          <Link to="/menu">Menu</Link>
          <a href="#experience">Experience</a>
          <a href="#visit">Visit Us</a>
        </div>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100vh', 
              background: 'rgba(20, 10, 5, 0.95)', 
              zIndex: 99, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '2.5rem' 
            }}
          >
            {[
              { label: 'The Vibe', to: '#vibe', isScroll: true },
              { label: 'Gallery', to: '/gallery', isScroll: false },
              { label: 'Menu', to: '/menu', isScroll: false },
              { label: 'Visit Us', to: '#visit', isScroll: true },
            ].map((link, idx) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * idx }}
              >
                {link.isScroll ? (
                  <a href={link.to} 
                     style={{ color: 'var(--color-gold-light)', fontSize: '2.5rem', fontFamily: 'var(--font-serif)', textDecoration: 'none', letterSpacing: '2px', fontWeight: '300' }} 
                     onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.to} 
                     style={{ color: 'var(--color-gold-light)', fontSize: '2.5rem', fontFamily: 'var(--font-serif)', textDecoration: 'none', letterSpacing: '2px', fontWeight: '300' }} 
                     onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <img src="/assets/logo.jpg" alt="The Cafe Lakeside Logo" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--color-gold)', objectFit: 'cover' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.img 
          src="/assets/hero.png" 
          alt="Nainital View" 
          className="hero-bg"
          style={{ y: heroY }}
        />
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className="hero-title" variants={fadeUp}>
            <span style={{ color: 'var(--color-white)', display: 'block' }}>Nainital's Most Picturesque Lakeside</span>
            <span style={{ color: 'var(--color-gold-light)', fontStyle: 'italic', fontWeight: 400 }}>Culinary Experience.</span>
          </motion.h1>
          <motion.p className="hero-subtitle" variants={fadeUp}>
            Framed by expansive windows overlooking Naini Lake, our café blends chic warmth with views that shift with the mountain mist. Whether you’re here for an artisanal brew, a sunlit brunch, or a candlelit dinner, every corner is curated to stay with you.
          </motion.p>
          <motion.a href="#vibe" className="btn-glow" variants={fadeUp} style={{ display: 'inline-block', textDecoration: 'none' }}>
            Explore the Vibe
          </motion.a>
        </motion.div>
      </section>

      {/* Gallery Section Preview */}
      <section id="gallery" className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              textAlign: 'center', 
              color: 'var(--color-charcoal)',
              fontSize: '2.5rem',
              marginBottom: '3rem'
            }}
          >
            <span style={{ color: 'var(--color-emerald-light)', fontWeight: 'bold' }}>The Aesthetic</span> 
            <span style={{ color: 'var(--color-gold)', margin: '0 1rem', fontWeight: '300', opacity: 0.5 }}>|</span> 
            <span style={{ fontStyle: 'italic' }}>Framed by the Lake.</span>
          </motion.h2>
          <motion.div 
            className="gallery-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {galleryImages.map((item, idx) => (
              <motion.div key={idx} className="gallery-item" variants={fadeUp}>
                <img src={item.img} alt={item.cap} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <Link to="/gallery" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>See Full Gallery</Link>
          </motion.div>
        </div>
      </section>

      {/* Celebrity Wall & Social Buzz */}
      <section id="vibe" className="section-padding" style={{ background: '#FDFBF7' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              textAlign: 'center', 
              color: 'var(--color-charcoal)',
              fontSize: '2.5rem',
              marginBottom: '3rem'
            }}
          >
            <span style={{ color: 'var(--color-emerald-light)', fontWeight: 'bold' }}>The Vibe</span> 
            <span style={{ color: 'var(--color-gold)', margin: '0 1rem', fontWeight: '300', opacity: 0.5 }}>|</span> 
            <span style={{ fontStyle: 'italic' }}>Seen at The Scenic Social.</span>
          </motion.h2>
        </div>
        <div className="social-ticker-container" style={{ overflow: 'hidden', width: '100%' }}>
          <motion.div 
            style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', paddingLeft: isMobile ? '1rem' : '2rem' }}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: isMobile ? 15 : 40, ease: "linear" }}
          >
            {socialMediaItems.map((item, i) => {
              const isReel = item.type === 'reel';
              const Wrapper = isReel ? 'div' : 'a';
              return (
                <Wrapper 
                  href={!isReel ? "https://instagram.com" : undefined}
                  target={!isReel ? "_blank" : undefined}
                  rel={!isReel ? "noreferrer" : undefined}
                  key={i} 
                  className="social-card-premium" 
                  style={{ 
                    background: isReel ? 'transparent' : '#000', 
                    padding: 0, 
                    textDecoration: 'none', 
                    flexShrink: 0, 
                    aspectRatio: isReel ? undefined : '4/5',
                    height: isReel ? 'max-content' : '480px',
                    width: isReel ? (isMobile ? '240px' : '326px') : undefined,
                    overflow: isReel ? 'visible' : 'hidden',
                    boxShadow: isReel ? 'none' : undefined,
                    borderRadius: isReel ? '0' : undefined
                  }}
                >
                  {isReel ? (
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink={item.src.includes('?') ? item.src : `${item.src}?utm_source=ig_embed&utm_campaign=loading`}
                    data-instgrm-version="14" 
                    style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: isMobile ? '240px' : '326px', padding: 0, width: 'calc(100% - 2px)' }}
                  >
                    <div style={{ padding: '16px' }}>
                      <a href={item.src} style={{ background: '#FFFFFF', lineHeight: 0, padding: 0, textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noreferrer">
                        View this post on Instagram
                      </a>
                    </div>
                  </blockquote>
                ) : item.type === 'video' ? (
                  <>
                    <video 
                      src={item.src}
                      autoPlay loop muted playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />
                    <div className="video-controls">
                      <PlayIcon />
                    </div>
                  </>
                ) : (
                  <img 
                    src={item.src} 
                    alt="Social Post" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                  />
                )}
                {item.type !== 'reel' && (
                  <div className="social-overlay">
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                      <span style={{ display: 'inline-block', width: '25px', height: '25px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }}></span>
                      @{item.handle}
                      {item.isVerified && <VerifiedStar />}
                    </p>
                    <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.5rem', color: 'white', marginBottom: 0 }}>{item.caption}</p>
                  </div>
                )}
              </Wrapper>
            );
          })}
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <a href="https://www.instagram.com/cafelakesidenainital?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>View More on Instagram</a>
        </motion.div>
      </section>

      {/* Signature Plates Preview */}
      <section id="menu" className="section-padding" style={{ background: 'var(--color-cream)' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              textAlign: 'center', 
              color: 'var(--color-charcoal)',
              fontSize: '2.5rem',
              marginBottom: '3rem'
            }}
          >
            <span style={{ color: 'var(--color-emerald-light)', fontWeight: 'bold' }}>Signature Plates</span> 
            <span style={{ color: 'var(--color-gold)', margin: '0 1rem', fontWeight: '300', opacity: 0.5 }}>|</span> 
            <span style={{ fontStyle: 'italic' }}>Taste the Clouds.</span>
          </motion.h2>
          
          <motion.div 
            className="menu-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="menu-item" variants={fadeUp}>
              <img src="/assets/food.png" alt="Avocado Toast" className="menu-img" />
              <div className="menu-details">
                <div className="menu-header">
                  <span className="menu-name">Truffle Avocado Toast <span className="badge-popular">Trending</span></span>
                  <span className="menu-price">₹450</span>
                </div>
                <p className="menu-desc">Smashed Hass avocado, edible flowers, truffle oil drizzle on artisanal sourdough.</p>
              </div>
            </motion.div>
            <motion.div className="menu-item" variants={fadeUp}>
              <img src="/assets/food.png" alt="Latte" className="menu-img" />
              <div className="menu-details">
                <div className="menu-header">
                  <span className="menu-name">Lakeside Gold Latte</span>
                  <span className="menu-price">₹280</span>
                </div>
                <p className="menu-desc">Our signature roast with 24k edible gold leaf and rich Madagascar vanilla.</p>
              </div>
            </motion.div>
          </motion.div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/menu" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section id="experience" className="experience-section">
        <div className="container experience-split">
          <div className="experience-text">
            <motion.div 
              className="exp-block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Panoramic Valley Views</h3>
              <p>Perched on the edge of the Nainital hills, our open-air deck offers an unobstructed, breathtaking view of the emerald lake below and the mist-covered mountains above.</p>
            </motion.div>
            <motion.div 
              className="exp-block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Sunset Boho Interiors</h3>
              <p>Designed for the modern aesthete. Sun-baked terracotta, warm champagne gold accents, and lush indoor foliage create the perfect golden-hour backdrop for your next viral post.</p>
            </motion.div>
          </div>
          <div className="experience-visual">
            <motion.img 
              src="/assets/interior.png" 
              alt="Experience" 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="visit" className="footer">
        <div className="footer-grid">
          <div className="footer-info">
            <h4>Visit Us</h4>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <MapPin className="text-gold" />
              <p>Mall Road, Upper Mall,<br/>Nainital, Uttarakhand 263002</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <Clock className="text-gold" />
              <p>Mon - Sun: 8:00 AM - 11:00 PM</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Phone className="text-gold" />
              <p>+91 98765 43210</p>
            </div>
            
            <div className="social-links">
              <a href="#"><Camera size={20} /></a>
              <a href="#"><Video size={20} /></a>
            </div>
          </div>
          
          <div>
            <div className="footer-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.655848552179!2d79.45330317556942!3d29.39535077525712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0a1bc28fd9d61%3A0x7cae7ba916987db3!2sNainital%20Lake!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 The Cafe Lakeside. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
