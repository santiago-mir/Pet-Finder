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
      // upload img a cloudinary
      const imgURL = await cloudinary.uploader.upload(imgData, {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      });
      // crea el report en la DB
      const newReport = await Pet.create({
        name: petName,
        lost: true,
        img_URL: imgURL.secure_url,
        last_lat: lat,
        last_lng: lng,
        userId,
      });

      // crea el report en algolia
      const newAlgoliaRecord = index
        .saveObject({
          objectID: newReport.get("id"),
          name: petName,
          _geoloc: {
            lat,
            lng,
          },
          imgURL: imgURL.secure_url,
        })
        .wait();
      return newReport;
    }
  }
}

export { LostPetController };
