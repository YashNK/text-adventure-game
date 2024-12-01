import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/paths";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { toast } from "react-toastify";
import { apiRoutes } from "../../constants/api-routes";
import { Loader } from "../../components/loader";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { fetchData, loading } = useFetchApi();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState({ username: false, password: false });

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetchData(apiRoutes.LOGIN, "POST", {
          username: loginForm.username.toLowerCase(),
          password: loginForm.password,
        });
        if (response.token) {
          localStorage.setItem("TOKEN", response.token);
          navigate(Paths.BASE);
        }
      } catch (err) {
        toast.error(err.message);
      }
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
    <div className="h-full flex items-center justify-around">
      <div className="h-full flex_1_1_10 flex items-center justify-center">
        <div className="w-[70%]">
          <div className="text-center text-xl">Welcome to D&D</div>
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
              type="password"
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
          </div>
          <div className="pb-5">
            <button
              className="auth_btn min_width_200"
              disabled={loading}
              onClick={() => handleSubmit()}
              type="submit"
            >
              {loading ? (
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
              onClick={() => navigate(Paths.REGISTER)}
            >
              Register
            </span>
          </div>
        </div>
      </div>
      <div className="auth_image_container">
        <div className="auth_image_login" />
      </div>
    </div>
  );
};
