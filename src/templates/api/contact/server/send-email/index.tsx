//node_modules
import nodemailer from "nodemailer";
import getConfig from "next/config";

//logger
import logger from "libs/logger";

//libs
import { ServerError } from "libs/errors";

//types
import { ContactSchemaType } from "src/templates/api/contact/validation";

function getText({ fullname, email, phone, contact, message }: ContactSchemaType) {
  return `New Contact: \n${fullname}\nEmail: ${email}\nPhone: ${phone}\nPrefers to be contacted by ${contact}\n\n${message}`;
}

import EmailComponent from "./email-component";
import { renderToStaticMarkup } from "react-dom/server";

const { serverRuntimeConfig } = getConfig();
const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_TO, EMAIL_USERNAME, EMAIL_PASSWORD } = serverRuntimeConfig;

process.env.EMAIL_HOST;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

async function sendEmail(data: ContactSchemaType) {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "✈ Adjust Travel Bot",
        address: EMAIL_USERNAME,
      },
      to: EMAIL_TO,
      subject: `New Contact - ${data.fullname}`,
      text: getText(data),
      html: renderToStaticMarkup(<EmailComponent {...data} />),
    });

    return info;
  } catch (error: any) {
    logger.log("error", error);
    throw new ServerError("Contact information could not be sent");
  }
}

export default sendEmail;
