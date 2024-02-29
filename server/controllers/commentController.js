import Comment from "../models/commentModel.js";
import { queryParams } from "../utils/constants.js";
import { errorHandler } from "../utils/errorHandler.js";

/* GET BLOGS */
export const getAllComments = async (req, res, next) => {
  const {
    page = queryParams.PAGE,
    limit = queryParams.LIMIT,
    sort = queryParams.SORT,
    order = queryParams.ORDER,
  } = req.query;

  try {
    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
      populate: {
        path: "user",
        select: "name email _id avatar provider verified",
      },
    };

    const data = await Comment.paginate({}, options);

    if (!data.docs || data.docs.length === 0) {
      next(errorHandler(404, "not found"));
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/* CRUD BLOG */
export const createComment = async (req, res, next) => {
  try {
    const newCmt = new Comment(req.body);
    await newCmt.save();

    return res
      .status(201)
      .json({ message: "Create new cmt sucessfully", results: newCmt });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Comment.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "cmt updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Comment.findByIdAndDelete(id);

    if (!data) {
      return next(errorHandler(404, "not found"));
    }

    return res.status(200).json({ message: "Cmt has been deleted" });
  } catch (error) {
    next(error);
  }
};
