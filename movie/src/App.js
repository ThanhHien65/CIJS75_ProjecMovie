import Header from "./layout/Header";
import "./Assests/style.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MoviesUpcomming from "./Components/MoviesUpcomming";
import MoviesTopRated from "./Components/MoviesTopRated";
import { RecoilRoot } from "recoil";
import MoviesPopular from "./Components/MoviesPopular";
function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" exact element={<MoviesUpcomming></MoviesUpcomming>}></Route>
            <Route path="/rated" exact element={<MoviesTopRated></MoviesTopRated>}></Route>
            <Route path="/popular" exact element={<MoviesPopular></MoviesPopular>}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}
export default App;
