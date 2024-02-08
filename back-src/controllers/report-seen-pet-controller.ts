import { Report } from "../models/models";
import { User } from "../models/models";
import { sendEmail } from "../../lib/nodemailer";

class ReportSeenPetController {
  public static async createReport(
    information: string,
    reporterPhone: string,
    reporterName: string,
    petName: string,
    ownerId: string
  ): Promise<Report> {
    if (
      !information ||
      !reporterPhone ||
      !reporterName ||
      !ownerId ||
      !petName
    ) {
      throw new Error("faltan completar campos en el formulario");
    } else {
      const newReport = await Report.create({
        petName,
        reporterName,
        reporterPhone,
        description: information,
      });
      const emailFound = (await User.findByPk(ownerId)).get("email").toString();
      // send email to owner
      sendEmail(emailFound, petName, reporterPhone, reporterName, information);
      return newReport;
    }
  }
}

export { ReportSeenPetController };
