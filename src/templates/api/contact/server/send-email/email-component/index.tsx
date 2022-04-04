import { CSSProperties, FunctionComponent } from "react";
import toUpper from "lodash/toUpper";

//types
import { ContactSchemaType } from "src/templates/api/contact/validation";

const tdStyle: CSSProperties = {
  direction: "ltr",
  fontSize: "0px",
  padding: "20px 0",
  textAlign: "center",
};

const tableStyle: CSSProperties = {
  border: "0",
  verticalAlign: "top",
  width: "100%",
};

const tdTextStyle: CSSProperties = {
  fontSize: "0px",
  padding: "10px 25px",
  wordBreak: "break-word",
};

const displayStyle: CSSProperties = {
  lineHeight: 1.2,
  textAlign: "left",
  color: "black",
};

const groupStyle: CSSProperties = {
  fontSize: "0px",
  textAlign: "left",
  direction: "ltr",
  display: "inline-block",
  verticalAlign: "top",
  width: "100%",
};

const wrapperStyle: CSSProperties = {
  margin: "0px auto",
  maxWidth: "600px",
};

const EmailComponent: FunctionComponent<ContactSchemaType> = ({ fullname, phone, email, contact, message }) => {
  return (
    <html>
      <title></title>
      <body>
        <div style={wrapperStyle}>
          <table role="presentation" cellPadding={0} cellSpacing={0} style={{ background: "#f8f9fa", backgroundColor: "#f8f9fa", width: "100%" }}>
            <tbody>
              <tr>
                <td style={tdStyle}>
                  <div style={groupStyle}>
                    <table role="presentation" cellPadding={0} cellSpacing={0} style={tableStyle}>
                      <tr>
                        <td align="left" style={tdTextStyle}>
                          <div style={{ fontSize: "40px", fontWeight: "bold", ...displayStyle }}>New Contact</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div style={wrapperStyle}>
                    <table role="presentation" cellPadding={0} cellSpacing={0} style={tableStyle}>
                      <tbody>
                        <tr>
                          <td style={tdStyle}>
                            <div style={groupStyle}>
                              <table role="presentation" cellPadding={0} cellSpacing={0} style={tableStyle}>
                                <tr>
                                  <td align="left" style={tdTextStyle}>
                                    <div style={{ fontSize: "24px", ...displayStyle }}>{fullname}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style={tdTextStyle}>
                                    <div style={{ fontSize: "16px", ...displayStyle }}>Email: {email}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style={tdTextStyle}>
                                    <div style={{ fontSize: "16px", ...displayStyle }}>Phone: {phone}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style={tdTextStyle}>
                                    <div style={{ fontSize: "16px", ...displayStyle }}>
                                      Prefers to be contacted by: <b>{toUpper(contact)}</b>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style={tdTextStyle}>
                                    <p style={{ borderTop: "solid 4px black", fontSize: "1px", margin: "0px auto", width: "100%" }} />
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style={tdTextStyle}>
                                    <div style={{ fontSize: "16px", whiteSpace: "pre-wrap", ...displayStyle }}>{message}</div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
};

export default EmailComponent;
