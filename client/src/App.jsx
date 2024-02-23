import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Category from "./pages/Category";
import Dashboard from "./pages/manage/Dashboard";
import ManageBlog from "./pages/manage/ManageBlog";
import ManageFollower from "./pages/manage/ManageFollower";
import CreatePost from "./pages/manage/CreatePost";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:slug" element={<Category />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-blogs" element={<ManageBlog />} />
        <Route path="/manage-followers" element={<ManageFollower />} />
        <Route path="/create-blog" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
