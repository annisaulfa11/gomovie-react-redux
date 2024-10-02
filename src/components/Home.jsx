// src/App.jsx
import HomeBanner from "./HomeBanner";
import Header from "./ui/Header";
import Popular from "./Popular";
import TopRated from "./TopRated";

function App() {
  return (
    <div>
      <Header />
      <HomeBanner />
      <Popular />
      <TopRated />
    </div>
  );
}

export default App;
