import { useEffect, useState } from "react";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { useParams } from "react-router-dom";

export const Characters = () => {
  const { storyId } = useParams();
  const { fetchData, data, isSuccess } = useFetchApi();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchData(`${apiRoutes.CHARACTERS}/${storyId}`, "GET");
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setCharacters(data);
    }
  }, [data, isSuccess]);
};
