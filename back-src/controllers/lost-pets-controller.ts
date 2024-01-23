import { Pet } from "../models/models";
import { cloudinary } from "../../lib/cloudinary";
import { index } from "../../lib/algolia";
class LostPetController {
  public static async createReport(
    petName: string,
    imgData: string,
    lat: number,
    lng: number,
    userId: number
  ): Promise<Pet> {
    if (!petName || !imgData || !lat || !lng || !userId) {
      throw new Error("faltan completar campos en el formulario");
    } else {
      const imgURL = await cloudinary.uploader.upload(imgData, {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      });
      console.log(typeof imgURL);
      const newReport = await Pet.create({
        name: petName,
        lost: true,
        img_URL: imgURL.secure_url,
        last_lat: lat,
        last_lng: lng,
        userId,
      });

      return newReport;
    }
  }
}

export { LostPetController };
