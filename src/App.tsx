import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ComicList from './ComicList';
import ComicDetail from './ComicDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComicList />} />
        <Route path="/summaries/:comicId" element={<ComicDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
