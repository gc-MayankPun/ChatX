import * as yup from "yup";

// identifier: yup
//   .string()
//   .trim()
//   .required("Choose at least one source to receive reset password link"),

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^\S*$/, "Must not contain spaces")
    .required("Username is required")
    .min(3, "Must be at least 3 characters long")
    .max(50, "Must not be more than 50 characters long"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .min(8, "Must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: yup.string().trim().required("Please confirm your password"),
});

export const getValidationSchema = (endpoint) => {
  if (endpoint === "/login") return loginSchema;
  if (endpoint === "/register") return registerSchema;
};
