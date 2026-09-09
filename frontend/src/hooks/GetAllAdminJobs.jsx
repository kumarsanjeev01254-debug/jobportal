
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { JOB_API_ENDPOINT } from "@/utilis/data";
import { setAllAdminJobs } from "@/redux/Jobslice";

const GetAllAdminJobs = (enabled = true) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const fetchAllAdminJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${JOB_API_ENDPOINT}/admin/jobs`,
          {
            withCredentials: true,
          }
        );

        console.log("ALL ADMIN JOBS RESPONSE:", response.data);

        if (response.data?.success) {
          dispatch(
            setAllAdminJobs(response.data.jobs || [])
          );
        } else {
          dispatch(setAllAdminJobs([]));

          setError(
            response.data?.message ||
              "Failed to fetch admin jobs"
          );
        }
      } catch (err) {
        console.error(
          "Get All Admin Jobs Error:",
          err.response?.data || err.message
        );

        dispatch(setAllAdminJobs([]));

        setError(
          err.response?.data?.message ||
            "Failed to fetch admin jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch, enabled]);

  return {
    loading,
    error,
  };
};

export default GetAllAdminJobs;

