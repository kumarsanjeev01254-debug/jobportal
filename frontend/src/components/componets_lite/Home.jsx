import React, { useEffect } from "react";

import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./categories";
import Latestjobs from "./Latestjobs";
import Footer from "./Footer";

import useGetAllJobs from "@/hooks/GetAlljobs";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // =========================
  // GET JOBS
  // =========================
  const { loading, error } = useGetAllJobs();

  // =========================
  // REDUX STATE
  // =========================
  const allJobs = useSelector(
    (state) => state.job?.allJobs || []
  );

  const user = useSelector(
    (state) => state.auth?.user
  );

  // =========================
  // DEBUG
  // =========================
  console.log("========== HOME ==========");
  console.log("Jobs:", allJobs);
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("User:", user);
  console.log("==========================");

  // =========================
  // RECRUITER REDIRECT
  // =========================
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />

      <Header />

      <Categories />

      <Latestjobs />

      <Footer />
    </div>
  );
};

export default Home;