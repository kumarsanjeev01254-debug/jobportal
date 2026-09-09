import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { COMPANY_API_ENDPOINT } from "@/utilis/data";
import { setAllCompany } from "@/redux/CompanySlice";

const usegetAllCompany = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${COMPANY_API_ENDPOINT}/get`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "ALL COMPANIES RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          dispatch(
            setAllCompany(
              response.data.companies || []
            )
          );
        } else {
          dispatch(setAllCompany([]));

          setError(
            response.data?.message ||
              "Failed to fetch companies"
          );
        }
      } catch (error) {
        console.error(
          "GET ALL COMPANIES ERROR:",
          error.response?.data ||
            error.message
        );

        dispatch(setAllCompany([]));

        setError(
          error.response?.data?.message ||
            "Failed to fetch companies"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [dispatch]);

  return {
    loading,
    error,
  };
};

export default usegetAllCompany;