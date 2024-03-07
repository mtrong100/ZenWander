import React, { useEffect, useState } from "react";
import { getBlogsFromUserApi } from "../../api/blogApi";
import { useSelector } from "react-redux";
import TitleSection from "../../components/TitleSection";
import ViewChart from "../../components/ViewChart";
import LikeChart from "../../components/LikeChart";
import BlogChart from "../../components/BlogChart";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  console.log("🚀 ~ Dashboard ~ blogs:", blogs);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || "");
      const res = await getBlogsFromUserApi(token, currentUser?._id, {
        limit: 9999,
      });
      setBlogs(res?.docs);
    } catch (error) {
      setBlogs([]);
      console.log(error);
    }
  }

  return (
    <section>
      <TitleSection>Personal dashboard</TitleSection>

      <div className="my-10 space-y-8">
        <div className="space-y-5">
          <TitleSection>View Statistic</TitleSection>
          <ViewChart data={blogs} />
        </div>
        <div className="space-y-5">
          <TitleSection>Like Statistic</TitleSection>
          <LikeChart data={blogs} />
        </div>
        <div className="space-y-5">
          <TitleSection>Blog Statistic</TitleSection>
          <BlogChart data={blogs} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
