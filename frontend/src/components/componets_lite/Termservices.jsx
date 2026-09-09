import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-violet-700 mb-2">
          Terms & Conditions
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 leading-7">
            Welcome to <strong>Job Portal</strong>. By accessing or using our
            website, you agree to comply with these Terms & Conditions. If you
            do not agree with any part of these terms, please do not use our
            services.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
          <p className="text-gray-600 leading-7">
            You must be at least 18 years old or legally eligible to enter into
            a binding agreement to use this website. By creating an account, you
            confirm that the information you provide is accurate and complete.
          </p>
        </section>

        {/* Accounts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>You are responsible for maintaining your account security.</li>
            <li>Keep your password confidential.</li>
            <li>Do not share your login credentials with others.</li>
            <li>
              Notify us immediately if you suspect unauthorized access to your
              account.
            </li>
          </ul>
        </section>

        {/* Job Posting */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            4. Job Postings & Applications
          </h2>
          <p className="text-gray-600 leading-7">
            Recruiters are responsible for ensuring that all job postings are
            accurate and lawful. Job seekers are responsible for providing
            truthful information in their applications. We do not guarantee
            employment or hiring outcomes.
          </p>
        </section>

        {/* Prohibited Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            5. Prohibited Activities
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Posting false or misleading information.</li>
            <li>Uploading harmful software or malicious code.</li>
            <li>Attempting unauthorized access to the website.</li>
            <li>Using the platform for illegal activities.</li>
            <li>Harassing or abusing other users.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            6. Intellectual Property
          </h2>

          <p className="text-gray-600 leading-7">
            All website content, including text, graphics, logos, software, and
            design, is the property of Job Portal unless otherwise stated. You
            may not reproduce, distribute, or modify any content without prior
            written permission.
          </p>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">7. Privacy</h2>

          <p className="text-gray-600 leading-7">
            Your use of our website is also governed by our Privacy Policy,
            which explains how we collect, use, and protect your personal
            information.
          </p>
        </section>

        {/* Limitation */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            8. Limitation of Liability
          </h2>

          <p className="text-gray-600 leading-7">
            Job Portal is not responsible for any direct, indirect, incidental,
            or consequential damages arising from your use of the website,
            including employment decisions made by recruiters or applicants.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            9. Account Termination
          </h2>

          <p className="text-gray-600 leading-7">
            We reserve the right to suspend or terminate any account that
            violates these Terms & Conditions or engages in fraudulent or
            unlawful activity.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            10. Changes to These Terms
          </h2>

          <p className="text-gray-600 leading-7">
            We may update these Terms & Conditions from time to time. Changes
            will be posted on this page, and continued use of the website
            constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-5">
            <p className="font-semibold text-gray-700">Job Portal</p>
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

export default TermsAndConditions;