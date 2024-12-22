import { LocalStorageKeys } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Page } from "../../constants/routes";

export const useFetchApi = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const fetchData = async (apiRoute, apiMethod, reqBody = null) => {
    setIsLoading(true);
    setData(null);
    setIsSuccess(null);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const token = localStorage.getItem(LocalStorageKeys.TOKEN);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch(apiRoute, {
        method: apiMethod,
        headers,
        body: reqBody ? JSON.stringify(reqBody) : null,
      });
      const response = await res.json();
      if (res.ok) {
        if (response.messageCode === 1) {
          toast.success(response.message);
        }
        setData(response.data);
        setIsSuccess(response.isSuccess);
        return response.data;
      } else if (res.status === 401) {
        toast.error("Your Session has expired.");
        localStorage.clear();
        navigate(Page.LOGIN);
      } else if (res.status === 403) {
        toast.error("Access Denied");
        navigate(Page.FORBIDDEN);
      } else {
        toast.error(response.message || "Something went wrong");
        setIsSuccess(response.isSuccess);
      }
    } catch (err) {
      toast.error("Network or Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, isSuccess, data };
};
