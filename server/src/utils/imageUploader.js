import cloudinary from "../config/cloudinary.js";

export const UploadMultipleToCloudinary = async (multipleImages) => {
  try {
    const uploadMultiple = multipleImages.map(async (imgfile) => {
      const b64 = Buffer.from(imgfile.buffer).toString("base64");
      const dataURI = `data:${imgfile.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "Cravings/menuItems",
        width: 500,
        height: 500,
        crop: "fill",
      });

      return { url: result.secure_url, publicID: result.public_id };
    });

    const uploadImages = await Promise.all(uploadMultiple);

    return uploadImages;
  } catch (error) {
    console.log("Cloudinary Error", error);
    throw new Error("Image upload failed");
  }
};
