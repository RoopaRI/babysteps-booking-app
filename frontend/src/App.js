import './App.css';
import Marquee from './components/Marquee/Marquee';
import DoctorsList from './components/DoctorsList/DoctorsList';
import HeroSection from './components/HeroSection/HeroSection';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Marquee />
      <HeroSection />
        <DoctorsList/>
        
      </header>
    </div>
  );
}

export default App;
