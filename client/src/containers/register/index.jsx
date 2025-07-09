import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { Loader } from "../../components/loader";
import { EYE_OPEN } from "../../assets/svgs/eye-open";
import { EYE_SLASHED } from "../../assets/svgs/eye-slashed";
import RegisterImage from "../../assets/images/register.webp";

export const Register = () => {
  const navigate = useNavigate();
  const { fetchData, isLoading, isSuccess, data } = useFetchApi();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [invalid, setInvalid] = useState({
    username: false,
    password: false,
    passwordMessage: "",
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(Page.LOGIN);
    }
  }, [data, isSuccess]);

  const handleSubmit = () => {
    if (validateForm()) {
      fetchData(`${apiRoutes.USER}/register`, "POST", {
        username: registerForm.username.toLowerCase(),
        password: registerForm.password,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const { password } = registerForm;
    if (!registerForm.username) {
      setInvalid((prev) => ({ ...prev, username: true }));
      valid = false;
    }
    if (!registerForm.confirmPassword) {
      setInvalid((prev) => ({ ...prev, confirmPassword: true }));
      valid = false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password does not match",
      }));
      valid = false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password should contain a special character",
      }));
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password should contain a number",
      }));
      valid = false;
    }
    if (!/[A-Z]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password should contain a uppercase character",
      }));
      valid = false;
    }
    if (!/[a-z]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password should contain a lowercase character",
      }));
      valid = false;
    }
    if (registerForm.password.length < 8) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password should contain 8 characters",
      }));
      valid = false;
    }
    if (!registerForm.password) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password is required",
      }));
      valid = false;
    }
    return valid;
  };

  return (
    <div className="auth_form_container h-full overflow-auto flex items-center justify-around">
      <div className="auth_image_container">
        <img
          src={RegisterImage}
          alt="Registration Image"
          className="auth_image"
        />
      </div>
      <div className="flex_1_1_10 h-full overflow-auto py-5 flex my-auto items-center justify-center">
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="w-[70%] my-auto"
        >
          <div className="text-center text-xl">Register</div>
          <div className="text-center pb-10 text-sm">Start your adventure</div>
          <div className="auth_input mb-8">
            <input
              type="text"
              id="username"
              className="min_width_200"
              onChange={(e) => {
                setRegisterForm((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
                setInvalid((prev) => ({ ...prev, username: false }));
              }}
              value={registerForm.username}
              required
            />
            <label htmlFor="username">Username</label>
            {invalid.username ? (
              <span className="invalid invalid_top_20 primary_color">
                Username is required
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="auth_input mb-8">
            <input
              type={`${showPassword.password ? "text" : "password"}`}
              id="password"
              className="min_width_200"
              value={registerForm.password}
              onChange={(e) => {
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
                setInvalid((prev) => ({ ...prev, password: false }));
              }}
              required
            />
            <label htmlFor="password">Password</label>
            {invalid.password ? (
              <span className="invalid invalid_top_20 primary_color">
                {invalid.passwordMessage}
              </span>
            ) : (
              ""
            )}
            <span
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !showPassword.password,
                }))
              }
              className="invalid invalid_eye cursor-pointer"
            >
              {showPassword.password ? <EYE_OPEN /> : <EYE_SLASHED />}
            </span>
          </div>
          <div className="auth_input mb-8">
            <input
              className="min_width_200"
              type={`${showPassword.confirmPassword ? "text" : "password"}`}
              id="confirm-password"
              value={registerForm.confirmPassword}
              onChange={(e) => {
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
                setInvalid((prev) => ({ ...prev, confirmPassword: false }));
              }}
              required
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            {invalid.confirmPassword ? (
              <span className="invalid invalid_top_20 primary_color">
                Password is required
              </span>
            ) : (
              ""
            )}
            <span
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmPassword: !showPassword.confirmPassword,
                }))
              }
              className="invalid invalid_eye cursor-pointer"
            >
              {showPassword.confirmPassword ? <EYE_OPEN /> : <EYE_SLASHED />}
            </span>
          </div>
          <div className="pb-5">
            <button
              className="auth_btn min_width_200"
              onClick={() => handleSubmit()}
            >
              {isLoading ? (
                <>
                  <Loader />
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </div>
          <div className="text-center">
            Already have an account?{" "}
            <span className="auth_footer" onClick={() => navigate(Page.LOGIN)}>
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
