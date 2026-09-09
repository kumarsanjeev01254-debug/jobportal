import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setSingleCompany } from "@/redux/CompanySlice";
import { COMPANY_API_ENDPOINT } from "@/utilis/data";

const GetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      dispatch(setSingleCompany(null));
      return;
    }

    const fetchCompanyById = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "Company By ID Response:",
          response.data
        );

        if (response.data?.success) {
          dispatch(
            setSingleCompany(
              response.data.company
            )
          );
        } else {
          dispatch(setSingleCompany(null));

          setError(
            response.data?.message ||
              "Failed to fetch company"
          );
        }
      } catch (err) {
        console.error(
          "Get Company By ID Error:",
          err.response?.data || err.message
        );

        dispatch(setSingleCompany(null));

        setError(
          err.response?.data?.message ||
            "Failed to fetch company"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyById();
  }, [companyId, dispatch]);

  return {
    loading,
    error,
  };
};

export default GetCompanyById;