//node_modules
import mjml from "mjml";
import nodemailer from "nodemailer";
import getConfig from "next/config";
import { stripHtml } from "string-strip-html";

//logger
import logger from "libs/logger";

//libs
import { ServerError } from "libs/errors";

//types
import { ContactSchemaType } from "src/templates/api/contact/validation";

function getText(data: ContactSchemaType) {
  const message = stripHtml(data.message || "").result;
  return `New Travel Customer\n${data.fullname}\nEmail: ${data.email}\nPhone: ${data.phone}\nPrefers to be contacted by ${data.contact}\n\n${message}`;
}

function getHtml(data: ContactSchemaType) {
  const message = stripHtml(data.message || "").result;
  const output = mjml(
    `<mjml>
  <mj-body>
    <mj-section background-color="#f8f9fa">
      <mj-column vertical-align="top" width="100%">
        <mj-text font-size="40px" font-weight="bold" padding="25px">New Travel Customer</mj-text>
      </mj-column>
      <mj-section>
        <mj-column>
          <mj-text font-size="24px" font-family="helvetica">${data.fullname}</mj-text>
          <mj-text font-size="16px">Email: ${data.email}</mj-text>
          <mj-text font-size="16px">Phone: ${data.phone}</mj-text>
          <mj-text font-size="16px">Prefers to be contacted by ${data.contact}</mj-text>
          <mj-divider border-color="#000000"></mj-divider>
          <mj-text font-size="14px" font-family="helvetica">${message}</mj-text>
        </mj-column>
      </mj-section>
    </mj-section>
  </mj-body>
</mjml>`
  );
  return output.html;
}

const { serverRuntimeConfig } = getConfig();
const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_TO, EMAIL_USERNAME, EMAIL_PASSWORD } = serverRuntimeConfig;

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
      from: `"✈ Adjust Travel Bot" <${EMAIL_USERNAME}>`,
      to: EMAIL_TO,
      subject: `New Travel Customer - ${stripHtml(data.fullname).result}`,
      text: getText(data),
      html: getHtml(data),
    });

    return info;
  } catch (error: any) {
    logger.log("error", error);
    throw new ServerError("Contact information could not be sent");
  }
}

export default sendEmail;
