// src/App.jsx
// import HomeBanner from './components/HomeBanner';
import MovieList from "./components/MovieList";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/gomovie-react-redux" element={<Home />} />
          {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
          <Route path="/gomovie-react-redux/search" element={<MovieList />} />
          <Route path="/gomovie-react-redux/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
