import {
  BookOpen,
  Code,
  Cpu,
  LayoutDashboard,
  List,
  MapPin,
  PlusSquare,
  Shirt,
  Trophy,
  UsersRound,
} from "lucide-react";

export const blogStatus = [
  { title: "Hot" },
  { title: "Trending" },
  { title: "Normal" },
];

export const defaultAvatar =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const blogParams = {
  PAGE: 1,
  LIMIT: 10,
  SORT: "title",
  ORDER: "desc",
};

export const sidebarLinks = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    title: "Create",
    icon: <PlusSquare size={20} />,
    path: "/create-blog",
  },
  {
    title: "Blogs",
    icon: <List size={20} />,
    path: "/manage-blogs",
  },

  {
    title: "Followers",
    icon: <UsersRound size={20} />,
    path: "/manage-followers",
  },
];

export const orderOptions = [
  {
    title: "Lastest",
    value: "desc",
  },
  {
    title: "Oldest",
    value: "asc",
  },
];

export const blogSortOptions = [
  {
    title: "Title",
    value: "title",
  },
  {
    title: "Category",
    value: "category",
  },
  {
    title: "Type",
    value: "type",
  },
  {
    title: "Status",
    value: "status",
  },
];

export const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "About",
    path: "/about",
  },
];

export const blogCategories = [
  {
    title: "education",
    value: "education",
    icon: <BookOpen size={20} />,
  },
  {
    title: "coding",
    value: "coding",
    icon: <Code size={20} />,
  },
  {
    title: "technology",
    value: "technology",
    icon: <Cpu size={20} />,
  },
  {
    title: "fashion",
    value: "fashion",
    icon: <Shirt size={20} />,
  },
  {
    title: "travel",
    value: "travel",
    icon: <MapPin size={20} />,
  },
  {
    title: "sports",
    value: "sports",
    icon: <Trophy size={20} />,
  },
];
