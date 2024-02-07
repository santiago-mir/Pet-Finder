import { Report } from "../models/models";
import { User } from "../models/models";
import { resend } from "../../lib/resend";

class ReportSeenPetController {
  public static async createReport(
    information: string,
    reporterPhone: string,
    reporterName: string,
    petName: string,
    ownerId: string
  ) {
    if (
      !information ||
      !reporterPhone ||
      !reporterName ||
      !ownerId ||
      !petName
    ) {
      throw new Error("faltan completar campos en el formulario");
    } else {
      //   const newReport = await Report.create({
      //     petName,
      //     reporterName,
      //     reporterPhone,
      //     description: information,
      //   });
      //   const emailFound = (await User.findByPk(ownerId)).get("email");
      // send email to owner
      (async function () {
        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: ["san_chan97@hotmail.com"],
          subject: "Report de mascota",
          html: "<strong>Insertar texto</strong>",
        });

        if (error) {
          return console.error({ error });
        }

        console.log({ data });
      })();
      return true;
    }
  }
}

export { ReportSeenPetController };
