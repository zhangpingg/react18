import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Test from './pages/test';
import BatchUpdate from './pages/batchUpdate';
import NotUrgentUpdate from './pages/notUrgentUpdate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/batchUpdate" element={<BatchUpdate />} />
        <Route path="/notUrgentUpdate" element={<NotUrgentUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
