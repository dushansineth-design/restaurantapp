// pages/Home.jsx
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import MenuPreview from '../../components/MenuPreview/MenuPreview.jsx';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import ReservationSteps from '../../components/ReservationSteps/ReservationSteps.jsx';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <MenuPreview />
      <Testimonials />
      <ReservationSteps />
    </div>
  );
};

export default Home;