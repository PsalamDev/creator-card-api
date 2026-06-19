import mongoose from "mongoose";
import { ulid } from "ulid";

const linkSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
  },
  { _id: false }
);

const rateSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    amount: Number,
  },
  { _id: false }
);

const serviceRatesSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      enum: ["NGN", "USD", "GBP", "GHS"],
    },
    rates: [rateSchema],
  },
  { _id: false }
);

const creatorCardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => ulid(),
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: null,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    creator_reference: {
      type: String,
      required: true,
    },

    links: {
      type: [linkSchema],
      default: [],
    },

    service_rates: {
      type: serviceRatesSchema,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      required: true,
    },

    access_type: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    access_code: {
      type: String,
      default: null,
    },

    created: {
      type: Number,
      default: () => Date.now(),
    },

    updated: {
      type: Number,
      default: () => Date.now(),
    },

    deleted: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);


creatorCardSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const CreatorCard = mongoose.model(
  "CreatorCard",
  creatorCardSchema
);

export default CreatorCard;