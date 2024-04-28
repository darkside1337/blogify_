import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useFormik } from "formik";
import { signupSchema } from "src/schemas";
import { axiosInstance as axios } from "src/api/axios";
import ErrorAlert from "./ui/ErrorAlert";
import SuccessAlert from "./ui/SuccessAlert";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupForm = () => {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const { username, email, password, confirmPassword } = values;
    const data = { username, email, password, confirmPassword };
    // POST REQUEST
    try {
      const res = await axios.post("/auth/signup", data);
      console.log("Response:", res);

      if (res.status === 200 || res.status === 201) {
        setIsSubmittedSuccessfully(true);

        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
        return;
      }
    } catch (error) {
      if (
        error.response.request.status === 400 ||
        error.response.request.status === 500
      ) {
        actions.setErrors(error.response.data);
      }
      console.log("Error:", error);
    }
  };

  const {
    values,
    isSubmitting,
    handleBlur,
    touched,
    errors,
    status,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  useEffect(() => {
    document.title = "Signup ";
  }, []);

  return (
    <section className="px-8 py-4 rounded-md">
      <MaxWidthWrapper>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-6 px-4 py-4"
        >
          {/* GENERAL ERROR MESSAGE */}

          {errors.error && <ErrorAlert message={errors?.error} />}

          {/* SUCCESSFULL SUBMISSION MESSAGE */}
          {isSubmittedSuccessfully && (
            <SuccessAlert message="User created successfully!" />
          )}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
              required
            />
          </label>

          {errors.username && touched.username && (
            <p className=" text-sm text-red-600 dark:text-red-600  max-w-[278px]">
              <span className="font-medium">Oops!</span> {errors.username}
            </p>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>

          {errors.email && touched.email && (
            <p className=" text-sm text-red-600 dark:text-red-600 max-w-[278px]">
              <span className="font-medium">Oops!</span> {errors.email}
            </p>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="•••••••••"
              required
            />
          </label>

          {errors.password && touched.password && (
            <p className=" text-sm text-red-600 dark:text-red-600 max-w-[278px]">
              <span className="font-medium">Oops!</span> {errors.password}
            </p>
          )}

          <label className="input input-bordered flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
              required
            />
          </label>

          {errors.confirmPassword && touched.confirmPassword && (
            <p className=" text-sm text-red-600 dark:text-red-600 max-w-[278px]">
              <span className="font-bold">Oops!</span> {errors.confirmPassword}
            </p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary max-w-fit mx-auto"
          >
            Submit
          </button>
        </form>
      </MaxWidthWrapper>
    </section>
  );
};

export default SignupForm;
