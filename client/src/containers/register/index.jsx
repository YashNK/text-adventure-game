import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { Loader } from "../../components/loader";
import { EYE_OPEN } from "../../assets/svgs/eye-open";
import { EYE_SLASHED } from "../../assets/svgs/eye-slashed";
import I18, { i18Get } from "../../plugins/i18";
import LazyImage from "../../utils/lazy-image";
import RegisterImage from "../../assets/images/register.webp";
import PlaceholderImage from "../../assets/images/register-small.webp";

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
        passwordMessage: i18Get("PASSWORD_DOES_NOT_MATCH"),
      }));
      valid = false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: i18Get("PASSWORD_SPECIAL_CHARACTERS"),
      }));
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: i18Get("PASSWORD_SHOULD_CONTAIN_A_NUMBER"),
      }));
      valid = false;
    }
    if (!/[A-Z]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: i18Get("PASSWORD_SHOULD_CONTAIN_UPPERCASE"),
      }));
      valid = false;
    }
    if (!/[a-z]/.test(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: i18Get("PASSWORD_SHOULD_CONTAIN_LOWERCASE"),
      }));
      valid = false;
    }
    if (registerForm.password.length < 8) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: i18Get("PASSWORD_SHOULD_CONTAIN_8"),
      }));
      valid = false;
    }
    if (!registerForm.password) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: i18Get("PASSWORD_IS_REQUIRED"),
      }));
      valid = false;
    }
    return valid;
  };

  return (
    <div className="auth_form_container h-full overflow-auto flex items-center justify-around">
      <div className="auth_image_container">
        <LazyImage
          src={RegisterImage}
          placeholder={PlaceholderImage}
          alt={i18Get("REGISTER")}
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
          <div className="text-center text-xl">
            <I18 tkey="REGISTER" />
          </div>
          <div className="text-center pb-10 text-sm">
            <I18 tkey="START_YOUR_ADVENTURE" />
          </div>
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
            <label htmlFor="username">
              <I18 tkey="USERNAME" />
            </label>
            {invalid.username ? (
              <span className="invalid invalid_top_20 primary_color">
                <I18 tkey="USERNAME_IS_REQUIRED" />
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
            <label htmlFor="password">
              <I18 tkey="PASSWORD" />
            </label>
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
            <label htmlFor="confirm-password">
              <I18 tkey="CONFIRM_PASSWORD" />
            </label>
            {invalid.confirmPassword ? (
              <span className="invalid invalid_top_20 primary_color">
                <I18 tkey="PASSWORD_IS_REQUIRED" />
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
                <span>
                  <I18 tkey="REGISTER" />
                </span>
              )}
            </button>
          </div>
          <div className="text-center">
            <I18 tkey="ALREADY_HAVE_AN_ACCOUNT" />?{" "}
            <span className="auth_footer" onClick={() => navigate(Page.LOGIN)}>
              <I18 tkey="LOGIN" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
