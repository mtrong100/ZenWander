import { BookOpen, Code, Cpu, MapPin, Shirt, Trophy } from "lucide-react";

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

export const sortOptions = [
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
    icon: <BookOpen size={20} />,
  },
  {
    title: "coding",
    icon: <Code size={20} />,
  },
  {
    title: "technology",
    icon: <Cpu size={20} />,
  },
  {
    title: "fashion",
    icon: <Shirt size={20} />,
  },
  {
    title: "travel",
    icon: <MapPin size={20} />,
  },
  {
    title: "sports",
    icon: <Trophy size={20} />,
  },
];
