import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Pencil,
  Upload,
  Download,
} from "lucide-react";
import Appliedjobs from "./Appliedjobs";
import EditProfileModel from "./EditProfileModel";




function Profile() {
 
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // Dummy User Data
  const user = {
    fullname: "Sanjeev Kumar",
    email: "Eagle_Eye5103@gmail.com",
    phonenumber: "8222825539",
    profile: {
      bio: "Passionate MERN Stack Developer building modern web applications with React, Node.js, Express, and MongoDB.",
      location: "Ambala, Haryana",
      profilePhoto:
        "https://avatars.githubusercontent.com/u/308081100?v=4",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Redux Toolkit",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "REST API",
        "JWT Authentication",
        "Git",
        "GitHub",
        "Vite",
      ],
      resume: "#",
      resumeOriginalName: "Sanjeev_Kumar_Resume.pdf",
    },
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResume(file);
      setLoading(false);
      alert("Resume uploaded successfully!");
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto my-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.profile.profilePhoto} />
                <AvatarFallback>
                  {user?.fullname?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-3xl font-bold">
                  {user?.fullname}
                </h1>

                <p className="text-gray-600 mt-2">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>

            <Button variant="outline" onClick={() => setOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          {/* Contact */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span><a href={`mailto:${user?.email}`}>{user?.email}</a></span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span><a href={`tel:${user?.phonenumber}`}>{user.phonenumber}</a></span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{user.profile.location}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {user?.profile?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Resume
            </h2>

            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleResumeUpload}
            />

            <Button
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Uploading..." : "Upload Resume"}
            </Button>

            {/* Current Resume */}
            <div className="mt-5 border rounded-xl p-5 bg-gray-50">
              <h3 className="font-semibold text-green-600">
                Current Resume
              </h3>

              <p className="mt-2">
                {user.profile.resumeOriginalName}
              </p>

              <a
                href={user.profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </div>

            {/* Uploaded Resume */}
            {resume && (
              <div className="mt-5 border rounded-xl p-5 bg-green-100">
                <h3 className="font-semibold text-green-700">
                  Resume Uploaded Successfully
                </h3>

                <p className="mt-2">{resume.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-2xl shadow mt-8 p-6">
          <h2 className="text-xl font-bold mb-4">
            Applied Jobs
          </h2>

          <Appliedjobs />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModel open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;