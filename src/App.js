import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import Admin from "./pages/Admin";
import SplashScreen from "./pages/SplashScreen";
import Profile from "./pages/Profile";
import SuratKelulusan from "./pages/SuratKelulusan";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {showSplash ? (
        <SplashScreen onDone={() => setShowSplash(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/result" element={<Result />} />
          <Route path="/comoestas" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/surat/:nisn" element={<SuratKelulusan />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
