import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Header, RequiresAuth } from "./components";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { userLoginHandler, userLogoutHandler } from "./features";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          userLoginHandler({
            token: userAuth.accessToken,
            userId: userAuth.uid,
            username: userAuth.displayName,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(userLogoutHandler());
      }
      return () => {
        unsubscribe();
      };
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Toaster />
      <header className="header">
        <Header />
      </header>
      <main>
        <Routes>
          {/* Public Routes */}
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
