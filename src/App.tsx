import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import PageA from './pages/pageA'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pageA" element={<PageA />} />
      </Routes>
    </Router>
  );
}

export default App;
