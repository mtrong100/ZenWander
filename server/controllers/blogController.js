import Blog from "../models/blogModel.js";
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
  } = req.query;

  try {
    const filter = {};

    if (query) {
      filter.title = new RegExp(query, "i");
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

export const getBlogsByCategory = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    sort = queryParams.SORT,
    order = queryParams.ORDER,
    query,
  } = req.query;

  const { category } = req.params;

  try {
    const filter = { category };

    if (query) {
      filter.title = new RegExp(query, "i");
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
      next(errorHandler(404, "Not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getBlogDetail = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Blog.findById(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* GET BLOGS FROM USERS */
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
    const filter = { author: authorId }; // Filter by author ID

    if (query) {
      filter.title = new RegExp(query, "i");
    }

    if (category) {
      filter.category = category; // Filter by category
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
