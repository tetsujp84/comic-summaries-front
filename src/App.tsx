import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ComicList from './ComicList';
import ComicDetail from './ComicDetail';
import About from "./About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComicList />} />
        <Route path="/summaries/:comicId" element={<ComicDetail />} />
        <Route path="/about/" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
