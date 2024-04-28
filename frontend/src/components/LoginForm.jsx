import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useFormik } from "formik";
import { loginSchema } from "src/schemas";
import { axiosInstance as axios } from "src/api/axios";
import useAuth from "src/hooks/useAuth";
import { AUTH_ACTIONS } from "src/context/AuthContext";
import SuccessfulLoginAlert from "./ui/SuccessfulLoginAlert";
import ErrorAlert from "./ui/ErrorAlert";
import { useEffect } from "react";

const LoginForm = () => {
  useEffect(() => {
    document.title = "Login 🚀";
  }, []);

  const navigate = useNavigate();
  const [loggedInSuccessfully, setloggedInSuccessfully] = useState(false);
  const { dispatch } = useAuth();

  useEffect(() => {
    let timeoutId;
    if (loggedInSuccessfully) {
      timeoutId = setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [loggedInSuccessfully, navigate]);

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post("/auth/login", values);

      console.log("response:", res);

      const payload = { ...res.data, isAuthenticated: true };

      console.log("data:", payload);
      if (res.status === 200) {
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload });
        setloggedInSuccessfully(true);
      }
    } catch (error) {
      if (error.response.request.status === 401) {
        actions.setErrors(error.response.data);
      }
    }
  };

  const {
    values,
    isSubmitting,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <section className="px-8 py-4 rounded-md">
      <MaxWidthWrapper>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 py-4">
          {loggedInSuccessfully && <SuccessfulLoginAlert />}
          {errors.error && <ErrorAlert message={errors?.error} />}

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
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary max-w-fit mx-auto"
          >
            Login
          </button>
        </form>
      </MaxWidthWrapper>
    </section>
  );
};

export default LoginForm;
