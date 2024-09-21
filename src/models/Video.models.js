import { model, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    videoFile: {
      type: String,
      unique: true,
    },
    thumbnail: {
      type: String,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Video title must be required"],
    },
    description: {
      type: String,
      required: [true, "Video description must be required"],
    },
    duration: {
      type: Number,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
      //   required: [true, "Verify the video is uploaded or not"],
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model("Video", videoSchema);
