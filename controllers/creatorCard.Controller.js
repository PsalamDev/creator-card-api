import CreatorCard from "../models/creatorCard.js";
import {
  createCard,
  getCardBySlug,
  deleteCard,
} from "../services/creatorCard.service.js";

import { successResponse } from "../utils/response.js";

export const createCardController = async (
  req,
  res,
  next
) => {
  try {
    const card = await createCard(req.body);

    return res.status(200).json(
      successResponse(
        "Creator Card Created Successfully.",
        card
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getCardController = async (
  req,
  res,
  next
) => {
  try {
    const card = await getCardBySlug(
      req.params.slug,
      req.query.access_code
    );

    return res.status(200).json(
      successResponse(
        "Creator Card Retrieved Successfully.",
        card
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteCardController = async (
  req,
  res,
  next
) => {
  try {
    const card = await deleteCard(
      req.params.slug,
      req.body.creator_reference
    );

    return res.status(200).json(
      successResponse(
        "Creator Card Deleted Successfully.",
        card
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getAllCardsController = async (req, res) => {
  try {
    const cards = await CreatorCard.find();

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};