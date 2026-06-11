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

const galleryImages = [
  {img: '/assets/hero.png', cap: 'The Sunset Deck'},
  {img: '/assets/interior.png', cap: 'The Velvet Lounge'},
  {img: '/assets/image-2.png', cap: 'Artisanal Details'},
  {img: '/assets/hero.png', cap: 'Golden Hour Views'},
  {img: '/assets/interior.png', cap: 'Cozy Corners'},
  {img: '/assets/food.png', cap: 'Signature Serves'},
  {img: '/assets/hero.png', cap: 'Aesthetic Balcony'},
  {img: '/assets/interior.png', cap: 'Vintage Decor'},
  {img: '/assets/food.png', cap: 'Gourmet Bites'},
  {img: '/assets/image-2.png', cap: 'Chic Ambiance'},

];

function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: 'var(--color-white)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-emerald)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 'bold' }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Full Aesthetic Gallery
        </motion.h1>

        <motion.div 
          className="gallery-grid"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {galleryImages.map((item, idx) => (
            <motion.div key={idx} className="gallery-item" variants={fadeUp}>
              <img src={item.img} alt={item.cap} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default GalleryPage;
