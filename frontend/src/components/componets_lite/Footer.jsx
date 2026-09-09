import React from "react";
import { FaFacebook, FaGithubAlt, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import privacypolicy from "./Privacypolcy";
import { Link } from "react-router-dom";
import Termservices from "./Termservices";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Job<span className="text-violet-500">Portal</span>
                        </h2>
                        <p className="mt-4 text-sm leading-6">
                            Find your dream job and connect with top companies. We help
                            students, professionals, and recruiters build successful careers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="hover:text-violet-400 transition">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="/jobs" className="hover:text-violet-400 transition">
                                    Browse Jobs
                                </a>
                            </li>

                            <li>
                                <a href="/companies" className="hover:text-violet-400 transition">
                                    Companies
                                </a>
                            </li>

                            <li>
                                <a href="/about" className="hover:text-violet-400 transition">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Resources
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link to={"/privacy-policy"}>
                                    <button className="hover:text-violet-400 transition cursor-pointer">
                                        Privacy Policy
                                    </button>
                                </Link>
                            </li>

                            <li>
                                <Link to={"/Termservices"}>
                                    <button className="hover:text-violet-400 transition cursor-pointer">
                                        Term & Conditions
                                    </button>
                                </Link>
                            </li>

                            <li>
                                <a href="#" className="hover:text-violet-400 transition">
                                    Help Center
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-violet-400 transition">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Follow Us
                        </h3>

                        <p className="text-sm mb-5">
                            Stay connected with us on social media.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-2 rounded-full bg-slate-800 hover:bg-violet-600 transition"
                            >
                                <FaFacebook />
                            </a>

                            <a
                                href="#"
                                className="p-2 rounded-full bg-slate-800 hover:bg-violet-600 transition"
                            >
                                <FaInstagram size={20} />

                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-violet-600 transition">
                                <FaLinkedinIn size={20} />

                            </a>


                            <a
                                href="#"
                                className="p-2 rounded-full bg-slate-800 hover:bg-violet-600 transition"
                            >
                                <FaLinkedinIn size={20} />
                            </a>

                            <a
                                href="#"
                                className="p-2 rounded-full bg-slate-800 hover:bg-violet-600 transition"
                            >
                                <FaTwitter size={20} />
                            </a>

                            <a
                                href="https://github.com/"
                                className="p-2 rounded-full bg-slate-800 hover:bg-violet-600 transition"
                            >
                                <FaGithubAlt size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} JobPortal. All rights reserved. Made
                    with ❤️ Sanjeev Kumar.
                </div>
            </div>
        </footer>
    );
};

export default Footer;