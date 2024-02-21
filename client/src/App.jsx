import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Category from "./pages/Category";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:slug" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default App;
