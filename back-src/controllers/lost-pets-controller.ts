import { Pet } from "../models/models";
import { cloudinary } from "../../lib/cloudinary";
import { index } from "../../lib/algolia";
class LostPetController {
  public static async createReport(
    petName: string,
    imgData: string,
    cityName: string,
    lat: number,
    lng: number,
    userId: number
  ): Promise<Pet> {
    if (!petName || !imgData || !lat || !lng || !userId || !cityName) {
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
        city: cityName,
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
          city: cityName,
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
  public static async getAllPetsAround(lat: number, lng: number) {
    const { hits } = await index.search("", {
      aroundLatLng: `${lat}, ${lng}`,
      aroundRadius: 1000000,
    });
    return hits;
  }
  public static async getAllReports(userId: string) {
    if (!userId) {
      throw new Error("userController: userId invalido o incorrecto");
    } else {
      const userReports = await Pet.findAll({
        where: { userId },
      });

      return userReports;
    }
  }
}

export { LostPetController };
