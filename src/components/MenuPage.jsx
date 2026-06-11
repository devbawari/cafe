import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-emerald)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 'bold' }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Signature Plates & Brews
        </motion.h1>

        <motion.div 
          className="menu-grid"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Menu Item 1 */}
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

          {/* Menu Item 2 */}
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
          
          {/* Menu Item 3 */}
          <motion.div className="menu-item" variants={fadeUp}>
            <img src="/assets/food.png" alt="Dessert" className="menu-img" />
            <div className="menu-details">
              <div className="menu-header">
                <span className="menu-name">Cloud 9 Tiramisu <span className="badge-popular">Must Try</span></span>
                <span className="menu-price">₹380</span>
              </div>
              <p className="menu-desc">Classic Italian mascarpone served in a smoke-filled glass dome.</p>
            </div>
          </motion.div>
          
          {/* Menu Item 4 */}
          <motion.div className="menu-item" variants={fadeUp}>
            <img src="/assets/interior.png" alt="Matcha" className="menu-img" />
            <div className="menu-details">
              <div className="menu-header">
                <span className="menu-name">Ceremonial Matcha</span>
                <span className="menu-price">₹320</span>
              </div>
              <p className="menu-desc">Uji matcha whisked to perfection with oat milk and agave.</p>
            </div>
          </motion.div>
          
          {/* Menu Item 5 */}
          <motion.div className="menu-item" variants={fadeUp}>
            <img src="/assets/food.png" alt="Pasta" className="menu-img" />
            <div className="menu-details">
              <div className="menu-header">
                <span className="menu-name">Sundried Tomato Pesto Pasta</span>
                <span className="menu-price">₹550</span>
              </div>
              <p className="menu-desc">Handmade fettuccine tossed in fresh basil pesto, topped with burrata.</p>
            </div>
          </motion.div>

          {/* Menu Item 6 */}
          <motion.div className="menu-item" variants={fadeUp}>
            <img src="/assets/food.png" alt="Croissant" className="menu-img" />
            <div className="menu-details">
              <div className="menu-header">
                <span className="menu-name">Almond Butter Croissant</span>
                <span className="menu-price">₹220</span>
              </div>
              <p className="menu-desc">Flaky, buttery pastry filled with house-made roasted almond cream.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default MenuPage;
