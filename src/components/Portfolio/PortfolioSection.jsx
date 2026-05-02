import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useMousePosition';
import { portfolioProjects, categories } from '../../data/portfolio';

function ProjectCard({ project, index, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Generate deterministic Unsplash image for each project
  const imageUrls = [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=750&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=750&fit=crop&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=750&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=750&fit=crop&q=80",
  ];

  return (
    <motion.div
      className="portfolio-card"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      <img
        className="portfolio-card-image"
        src={imageUrls[project.id - 1] || imageUrls[0]}
        alt={project.title}
        loading="lazy"
      />
      <div className="portfolio-card-overlay">
        <span className="portfolio-card-category">{project.category}</span>
        <h3 className="portfolio-card-title">{project.title}</h3>
        <span className="portfolio-card-location">{project.location} — {project.date}</span>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const imageUrls = [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop&q=80",
  ];

  return (
    <motion.div
      className="portfolio-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="portfolio-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="portfolio-modal-image"
          src={imageUrls[project.id - 1] || imageUrls[0]}
          alt={project.title}
        />
        <div className="portfolio-modal-content">
          <p className="section-label">{project.category}</p>
          <h2 style={{ fontSize: '2rem' }}>{project.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {project.location} — {project.date}
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '8px' }}>
            {project.description}
          </p>
          <a href="#contact" className="btn-primary" style={{ marginTop: '16px', alignSelf: 'flex-start' }}
            onClick={onClose}>
            Inquire About This Project
          </a>
        </div>
        <button className="portfolio-modal-close" onClick={onClose} aria-label="Close">✕</button>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, isVisible] = useScrollReveal(0.05);

  const filtered = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory);

  // Lock body scroll when modal is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
  }

  return (
    <section className="portfolio" id="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Selected Works</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            A curated collection of stories told through light, shadow, and emotion.
          </p>
        </motion.div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
