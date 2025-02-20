import './App.css';
import Marquee from './components/Marquee/Marquee';
import HeroSection from './components/HeroSection/HeroSection';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Marquee />
      <HeroSection />
        <Dashboard/>
      </header>
    </div>
  );
}

export default App;
