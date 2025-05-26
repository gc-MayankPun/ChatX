import { DELETED_USERNAME } from "./constants";
import * as yup from "yup";

const noEmojiRegex =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g;

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^\S*$/, "Must not contain spaces")
    .test("no-emojis", "Must not contain emojis 🤣", (value) => {
      if (!value) return true;
      return !noEmojiRegex.test(value);
    })
    .notOneOf([`[${DELETED_USERNAME}]`], "This username is not allowed")
    .required("Username is required")
    .min(3, "Must be at least 3 characters long")
    .max(20, "Must not be more than 20 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .min(8, "Must be at least 8 characters long"),
});

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^\S*$/, "Must not contain spaces")
    .required("Username is required")
    .min(3, "Must be at least 3 characters long")
    .max(15, "Must not be more than 15 characters long"),
  password: yup.string().trim().required("Please confirm your password"),
});

export const getValidationSchema = (endpoint) => {
  if (endpoint === "/login") return loginSchema;
  if (endpoint === "/register") return registerSchema;
};
