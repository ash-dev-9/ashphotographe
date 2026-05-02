import { Suspense, lazy } from 'react'
import { Navbar } from './components/Layout/Navbar';
import { CustomCursor } from './components/Layout/CustomCursor';
import { Footer } from './components/Layout/Footer';
import { WhatsAppButton } from './components/Layout/WhatsAppButton';
import LoadingScreen from './components/UI/LoadingScreen';
import ErrorBoundary from './components/UI/ErrorBoundary';

const HeroSection = lazy(() => import('./components/Hero/HeroSection'));
const AboutSection = lazy(() => import('./components/About/AboutSection'));
const PortfolioSection = lazy(() => import('./components/Portfolio/PortfolioSection'));
const ServicesSection = lazy(() => import('./components/Services/ServicesSection'));
const PricingSection = lazy(() => import('./components/Pricing/PricingSection'));
const TestimonialsSection = lazy(() => import('./components/Testimonials/TestimonialsSection'));
const ProcessSection = lazy(() => import('./components/Process/ProcessSection'));
const ContactSection = lazy(() => import('./components/Contact/ContactSection'));

const SectionLoader = () => (
  <div style={{
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.3)',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '0.2em',
    fontSize: '0.75rem',
  }}>
    Loading...
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <WhatsAppButton />
      <CustomCursor />
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Navbar />
      <main>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
