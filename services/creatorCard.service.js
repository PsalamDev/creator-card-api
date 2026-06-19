import CreatorCard from "../models/creatorCard.js";
import { generateSlug } from "../utils/slugGenerator.js";
import { ERROR_CODES, AppError } from "../utils/errors.js";

export const createCard = async (payload) => {
  const {
    title,
    slug,
    creator_reference,
    access_type,
    access_code,
  } = payload;

  // AC01
  if (
    access_type === "private" &&
    !access_code
  ) {
    throw new AppError(ERROR_CODES.AC01);
  }

  // AC05
  if (
    (!access_type || access_type === "public") &&
    access_code
  ) {
    throw new AppError(ERROR_CODES.AC05);
  }

  let finalSlug = slug;

  if (!finalSlug) {
    finalSlug = await generateSlug(title);
  } else {
    const existingCard =
      await CreatorCard.findOne({
        slug: finalSlug,
        deleted: null,
      });

    if (existingCard) {
      throw new AppError(ERROR_CODES.SL02);
    }
  }

  const timestamp = Date.now();

  const card = await CreatorCard.create({
    ...payload,
    slug: finalSlug,
    access_type: access_type || "public",
    created: timestamp,
    updated: timestamp,
    deleted: null,
  });

  return card.toJSON();
};


export const getCardBySlug = async (
  slug,
  accessCode
) => {
  const card =
    await CreatorCard.findOne({
      slug,
      deleted: null,
    });

  if (!card) {
    throw new AppError(ERROR_CODES.NF01);
  }

  if (card.status === "draft") {
    throw new AppError(ERROR_CODES.NF02);
  }

  if (card.access_type === "private") {
    if (!accessCode) {
      throw new AppError(ERROR_CODES.AC03);
    }

    if (accessCode !== card.access_code) {
      throw new AppError(ERROR_CODES.AC04);
    }
  }

  const response = card.toJSON();

  delete response.access_code;

  return response;
};


export const deleteCard = async (
  slug,
  creator_reference
) => {
  const card =
    await CreatorCard.findOne({
      slug,
      deleted: null,
    });

  if (!card) {
    throw new AppError(ERROR_CODES.NF01);
  }

  card.deleted = Date.now();

  await card.save();

  return card.toJSON();
};
