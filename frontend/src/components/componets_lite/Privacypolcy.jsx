import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-violet-700 mb-2">
          Privacy Policy
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-600 leading-7">
            Welcome to <strong>Job Portal</strong>. We respect your privacy and
            are committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, store, and protect your data
            when you use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. Information We Collect
          </h2>

          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Password (encrypted)</li>
            <li>Resume / CV</li>
            <li>Profile Photo (optional)</li>
            <li>Education and Work Experience</li>
            <li>Skills and Certifications</li>
            <li>Company Details (for recruiters)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Create and manage your account.</li>
            <li>Help employers find suitable candidates.</li>
            <li>Allow job seekers to apply for jobs.</li>
            <li>Improve website performance and user experience.</li>
            <li>Provide customer support.</li>
            <li>Send important updates and notifications.</li>
            <li>Prevent fraud and maintain platform security.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Cookies
          </h2>

          <p className="text-gray-600 leading-7">
            We use cookies to improve your browsing experience, remember your
            preferences, and analyse website traffic. You can disable cookies
            from your browser settings at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            5. Sharing Your Information
          </h2>

          <p className="text-gray-600 leading-7">
            We do not sell your personal information. Your information may be
            shared only with recruiters when you apply for jobs, trusted service
            providers who help operate our platform, or authorities when
            required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            6. Data Security
          </h2>

          <p className="text-gray-600 leading-7">
            We use industry-standard security practices to protect your data.
            However, no method of online transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            7. Your Rights
          </h2>

          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Access your personal information.</li>
            <li>Update or correct your profile.</li>
            <li>Delete your account.</li>
            <li>Request a copy of your personal data.</li>
            <li>Contact us with privacy-related concerns.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            8. Third-Party Links
          </h2>

          <p className="text-gray-600 leading-7">
            Our website may contain links to third-party websites. We are not
            responsible for their privacy practices or content. Please review
            their privacy policies before providing personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            9. Changes to This Policy
          </h2>

          <p className="text-gray-600 leading-7">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page along with the updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            10. Contact Us
          </h2>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-5">
            <p className="text-gray-700">
              <strong>Job Portal</strong>
            </p>

            <p className="text-gray-600">
              Email: eagleeye@jobportal.com
            </p>

            <p className="text-gray-600">
              Phone: +91 8222825539
            </p>

            <p className="text-gray-600">
              Address: Ambala, Haryana, India
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;