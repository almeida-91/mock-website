import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/r/business"
            element={<Home thread={"business"} />}
          ></Route>
          <Route
            path="/r/celebrity"
            element={<Home thread={"celebrity"} />}
          ></Route>
          <Route path="/r/gaming" element={<Home thread={"gaming"} />}></Route>
          <Route path="/r/sports" element={<Home thread={"sports"} />}></Route>
          <Route
            path="/r/television"
            element={<Home thread={"television"} />}
          ></Route>
          <Route path="/r/test" element={<Home thread={"test"} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
