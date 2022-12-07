import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { RequiresAuth } from "./components";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="my-4">
          chathouse
          <span className="pl-1" role="img" aria-label="chat">
            💬
          </span>
        </h1>
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
