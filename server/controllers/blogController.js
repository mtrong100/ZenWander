import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import { queryParams } from "../utils/constants.js";
import { errorHandler } from "../utils/errorHandler.js";

/* GET BLOGS */
export const getAllBlogs = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    sort = queryParams.SORT,
    order = queryParams.ORDER,
    query,
    category,
    status,
  } = req.query;

  try {
    const filter = {};

    if (query) {
      filter.title = new RegExp(query, "i");
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
      populate: {
        path: "author",
        select: "name email _id avatar provider verified",
      },
    };

    const data = await Blog.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getBlogDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Blog.findById(id).populate({
      path: "author",
      select: "name email _id avatar provider verified",
    });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getBlogsFromUser = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    sort = queryParams.SORT,
    order = queryParams.ORDER,
    query,
    category,
  } = req.query;

  const { authorId } = req.params;

  try {
    const filter = { author: authorId };

    if (query) {
      filter.title = new RegExp(query, "i");
    }

    if (category) {
      filter.category = category;
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
      populate: {
        path: "author",
        select: "name email _id avatar provider verified",
      },
    };

    const data = await Blog.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getCommentsFromBlog = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    order = queryParams.ORDER,
  } = req.query;

  const { blogId } = req.params;

  try {
    const filter = { blog: blogId };

    const options = {
      page,
      limit,
      sort: { createdAt: order === "asc" ? 1 : -1 },
      populate: {
        path: "user",
        select: "name email _id avatar provider verified",
      },
    };

    const data = await Comment.paginate(filter, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* CRUD BLOG */
export const createBlog = async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    return res
      .status(201)
      .json({ message: "Create new blog sucessfully", results: newBlog });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "blog updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Blog.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "Blog has been deleted" });
  } catch (error) {
    next(error);
  }
};

/* VIEW BLOG */
export const viewBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.views += 1;

    await blog.save();

    return res.status(200).json({ message: "View count updated successfully" });
  } catch (error) {
    next(error);
  }
};

/* LIKE BOG */
export const likeBlog = async (req, res, next) => {
  const { blogId, userId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    const user = await User.findById(userId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (blog.likes.includes(userId) && user.favorites.includes(blogId)) {
      blog.likes = blog.likes.filter((item) => item !== userId);
      user.favorites = user.favorites.filter((item) => item !== blogId);

      await blog.save();
      await user.save();

      return res.json({ message: "Unlike blog successfully" });
    } else {
      blog.likes.push(userId);
      user.favorites.push(blogId);

      await blog.save();
      await user.save();

      return res.json({ message: "Like blog successfully" });
    }
  } catch (error) {
    next(error);
  }
};
