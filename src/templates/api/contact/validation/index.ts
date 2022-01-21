import * as yup from "yup";
import { phone } from "phone";
import { AnyObject } from "yup/lib/object";
import lodashSet from "lodash/set";

export const contacts = ["email", "phone", "text"];

const phoneNumberTest: yup.TestConfig<string, AnyObject> = {
  name: "phone-test",
  message: "${path} is not a valid phone number",
  test: function (value, test) {
    const code = test.options.context?.code;
    const response = phone(value, { country: code });
    return response.isValid;
  },
};

const schema = yup.object({
  fullname: yup.string().required().default(""),
  phone: yup.string().required().default("").test(phoneNumberTest),
  email: yup.string().email().required().default(""),
  contact: yup.string().required().oneOf(contacts).default(contacts[0]),
  message: yup.string().optional(),
});

export type ContactSchemaType = yup.InferType<typeof schema>;

export const getFormikValidate = (code: string) => async (values: ContactSchemaType) => {
  try {
    await schema.validate(values, {
      abortEarly: false,
      context: { code: code },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.inner.reduce((errors, currentError) => {
        errors = lodashSet(errors, currentError.path || "", currentError.message);
        return errors;
      }, {});
    }
    throw error;
  }
  return {};
};

export default schema;
