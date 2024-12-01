import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/paths";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader";

export const Register = () => {
  const navigate = useNavigate();
  const { fetchData, loading } = useFetchApi();
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

  const handleSubmit = async (e) => {
    if (validateForm()) {
      try {
        const response = await fetchData(apiRoutes.REGISTER, "POST", {
          username: registerForm.username.toLowerCase(),
          password: registerForm.password,
        });
        if (response && response.isSuccess) {
          navigate(Paths.LOGIN);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    if (!registerForm.username) {
      setInvalid((prev) => ({ ...prev, username: true }));
      valid = false;
    }
    if (!registerForm.password) {
      setInvalid((prev) => ({
        ...prev,
        password: true,
        passwordMessage: "Password is Required",
      }));
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
    return valid;
  };

  return (
    <div className="h-full flex items-center justify-around">
      <div className="auth_image_container">
        <div className="auth_image_register" />
      </div>
      <div className="h-full flex_1_1_10 flex items-center justify-center">
        <div className="w-[70%]">
          <div className="text-center text-xl">Register</div>
          <div className="text-center pb-10 text-sm">
            Embark on an Epic Adventure
          </div>
          <div className="auth_input mb-8">
            <input
              type="text"
              id="username"
              className="min_width_200"
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
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
              type="password"
              id="password"
              className="min_width_200"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
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
          </div>
          <div className="auth_input mb-8">
            <input
              className="min_width_200"
              type="password"
              id="confirm-password"
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
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
          </div>
          <div className="pb-5">
            <button
              className="auth_btn min_width_200"
              onClick={() => handleSubmit()}
            >
              {loading ? (
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
            <span className="auth_footer" onClick={() => navigate(Paths.LOGIN)}>
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
