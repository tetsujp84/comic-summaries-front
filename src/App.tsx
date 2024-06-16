import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComicList from "./ComicList";
import ComicDetail from "./ComicDetail";
import About from "./About";
import Header from "./Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ComicList />} />
        <Route path="/search" element={<ComicList />} />
        <Route path="/summaries/:comicId" element={<ComicDetail />} />
        <Route path="/about/" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
