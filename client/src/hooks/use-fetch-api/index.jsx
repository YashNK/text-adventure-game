import { useState } from "react";
import { toast } from "react-toastify";

export const useFetchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (apiRoute, apiMethod, reqBody = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiRoute, {
        method: apiMethod,
        headers: { "Content-Type": "application/json" },
        body: reqBody ? JSON.stringify(reqBody) : null,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      }
      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
};
