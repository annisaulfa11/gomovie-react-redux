// src/App.jsx
import HomeBanner from "./HomeBanner";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Genre from "./Genre";

function App() {
  return (
    <div>
      <HomeBanner />
      <Genre />
      <Popular />
      <TopRated />
    </div>
  );
}

export default App;
