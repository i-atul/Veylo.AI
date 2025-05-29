"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Github } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Submission failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 gradient-title">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have questions, feedback, or need support? Our team is here to help you
          every step of the way. Fill out the form below or reach out via the
          contact details.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <div className="bg-gradient-to-br from-[#e3f2fd] to-[#f1f8e9] rounded-2xl p-8 flex-1 flex flex-col gap-5 justify-center shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 text-gray-700 text-base">
            <Mail size={22} />{" "}
            <span className="font-medium">contact@veylo.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-base">
            <Phone size={22} />{" "}
            <span className="font-medium">+91 73095XXXXX</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-base">
            <MapPin size={22} />{" "}
            <span className="font-medium">Kanpur, India</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 mt-4">
            <a
              href="https://github.com/i-atul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-700 transition font-medium"
            >
              <Github size={22} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div className="flex-1">
          <form
            className="bg-white rounded-2xl shadow-xl p-8 w-full border border-gray-100"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700">
              Contact Support
            </h2>
            {submitted ? (
              <div className="text-green-600 text-center mb-4 text-lg font-semibold">
                Thank you for contacting us! We will get back to you soon.
              </div>
            ) : (
              <div className="space-y-5">
                {error && (
                  <div className="text-red-600 text-center mb-2 font-medium bg-red-50 rounded p-2 border border-red-200">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-1 font-semibold text-gray-800">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 outline-none"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-gray-800">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 outline-none"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-800">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 outline-none"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-800">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 outline-none resize-none"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-full font-bold transition bg-gradient-to-r from-[#2af598] to-[#009efd] hover:from-gray-950 hover:to-gray-800 shadow-lg text-lg tracking-wide"
                >
                  Send Message
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
