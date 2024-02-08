import * as nodemailer from "nodemailer";

async function sendEmail(
  toEmail: string,
  petName: string,
  reporterNumber: string,
  reporterName: string,
  reporterInfo: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Pet Finder",
      address: process.env.USER_EMAIL,
    }, // sender address
    to: [toEmail], // list of receivers
    subject: `Alguien ha visto a ${petName}`, // Subject line
    text: "PetFinder aviso de mascota perdida", // plain text body
    html: `<b>${reporterName} ha visto a tu mascota ${petName}, reportando la siguiente informacion: </b>
    <br>
    ${reporterInfo}
    <br>
    <b>Podes comunicarte con ${reporterName} a su telefono ${reporterNumber}</b>
   ,`, // html body
  };
  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("email enviado ok");
    } catch (error) {
      console.error(error);
    }
  };
  sendMail(transporter, mailOptions);
}
export { sendEmail };
