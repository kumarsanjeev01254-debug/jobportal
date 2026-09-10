import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setAllJobs } from "@/redux/JobSlice";
import { JOB_API_ENDPOINT } from "@/utilis/data";

const useGetAllJobs = (enabled = true) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${JOB_API_ENDPOINT}/get`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "ALL JOBS RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          dispatch(
            setAllJobs(response.data.jobs || [])
          );
        } else {
          dispatch(setAllJobs([]));

          setError(
            response.data?.message ||
              "Failed to fetch jobs"
          );
        }
      } catch (err) {
        console.error(
          "Get All Jobs Error:",
          err.response?.data || err.message
        );

        dispatch(setAllJobs([]));

        setError(
          err.response?.data?.message ||
            "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch, enabled]);

  return {
    loading,
    error,
  };
};

export default useGetAllJobs;
