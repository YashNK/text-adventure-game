import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { Loader } from "../../components/loader";
import { LocalStorageKeys } from "../../constants";
import { EYE_OPEN } from "../../assets/svgs/eye-open";
import { EYE_SLASHED } from "../../assets/svgs/eye-slashed";
import LoginImage from "../../assets/images/login.webp";
import "./login.scss";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const { fetchData, isLoading, isSuccess, data } = useFetchApi();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState({ username: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data && data.token && isSuccess) {
      localStorage.setItem(LocalStorageKeys.TOKEN, data.token);
      navigate(Page.DASHBOARD);
      toast.success(`Welcome ${data.username}`);
    }
  }, [data]);

  const handleSubmit = () => {
    if (validateForm()) {
      fetchData(`${apiRoutes.USER}/login`, "POST", {
        username: loginForm.username.toLowerCase(),
        password: loginForm.password,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    if (!loginForm.username) {
      setInvalid((prev) => ({ ...prev, username: true }));
      valid = false;
    }
    if (!loginForm.password) {
      setInvalid((prev) => ({ ...prev, password: true }));
      valid = false;
    }
    return valid;
  };

  return (
    <div className="auth_form_container h-full flex items-center justify-around">
      <div className="h-full flex_1_1_10 flex items-center justify-center">
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="w-[70%]"
        >
          <div className="text-center text-xl">Welcome to EchoVerse</div>
          <div className="text-center pb-10 text-sm">
            Embark on an Epic Adventure
          </div>
          <div className="auth_input mb-8">
            <input
              type="text"
              id="username"
              className="min_width_200"
              onChange={(e) => {
                setLoginForm((prev) => ({ ...prev, username: e.target.value }));
                setInvalid((prev) => ({ ...prev, username: false }));
              }}
              required
              value={loginForm.username}
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
              className="min_width_200"
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              value={loginForm.password}
              required
              onChange={(e) => {
                setLoginForm((prev) => ({ ...prev, password: e.target.value }));
                setInvalid((prev) => ({ ...prev, password: false }));
              }}
            />
            <label htmlFor="password">Password</label>
            {invalid.password ? (
              <span className="invalid invalid_top_20 primary_color">
                Password is required
              </span>
            ) : (
              ""
            )}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="invalid invalid_eye cursor-pointer"
            >
              {showPassword ? <EYE_OPEN /> : <EYE_SLASHED />}
            </span>
          </div>
          <div className="pb-5">
            <button
              className="auth_btn min_width_200"
              disabled={isLoading}
              onClick={() => handleSubmit()}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader />
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
          <div className="text-center">
            Do not have an account?{" "}
            <span
              className="auth_footer"
              onClick={() => navigate(Page.REGISTER)}
            >
              Register
            </span>
          </div>
        </div>
      </div>
      <div className="auth_image_container">
        <img src={LoginImage} alt="login" className="auth_image" />
      </div>
    </div>
  );
};
