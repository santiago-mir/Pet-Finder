import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_TOKEN);

async function sendEmail(
  emailContent: string,
  userEmail: string,
  petName: string
) {
  const { data, error } = await resend.emails.send({
    from: "Pet Finder petfinder@hotmail.com",
    to: [userEmail],
    subject: "Un usuario vio a " + petName,
    html: emailContent,
  });
  if (error) {
    return console.log({ error });
  }
  console.log(data);
}

export { sendEmail };
