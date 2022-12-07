import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Header, RequiresAuth } from "./components";

function App() {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <main>
        {/* Publics Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route element={<RequiresAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
