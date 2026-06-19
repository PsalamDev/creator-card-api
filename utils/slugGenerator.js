import CreatorCard from "../models/creatorCard.js";

export const generateRandomSuffix = (length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
};

export const createBaseSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
};

export const generateSlug = async (title) => {
  const baseSlug = createBaseSlug(title);

  let slug = baseSlug;

  if (slug.length < 5) {
    slug = `${baseSlug}-${generateRandomSuffix()}`;
  }

  let exists = await CreatorCard.findOne({ slug });

  while (exists) {
    slug = `${baseSlug}-${generateRandomSuffix()}`;

    exists = await CreatorCard.findOne({ slug });
  }

  return slug;
};