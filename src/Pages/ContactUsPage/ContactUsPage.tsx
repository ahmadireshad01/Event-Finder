import Nav from "../../components/Nav";
import React from "react";
import { useState } from "react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://172.30.10.42:8000/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        if (data.errors) {
          // Handle validation errors
          const errorMessages = data.errors.map((err: any) => `${err.field}: ${err.message}`).join(', ');
          setSubmitStatus({ type: 'error', message: `Validation error: ${errorMessages}` });
        } else {
          setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message.' });
        }
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <div className=" text-white min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <h1 className="text-2xl font-semibold">Get in Touch</h1>

          {/* Status Messages */}
          {submitStatus.type === 'success' && (
            <div className="bg-green-800 text-green-200 p-3 rounded-md">
              {submitStatus.message}
            </div>
          )}
          
          {submitStatus.type === 'error' && (
            <div className="bg-red-800 text-red-200 p-3 rounded-md">
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 font-medium">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className="w-full h-28 bg-gray-700 rounded-md p-2 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-md font-medium transition duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Alternative contact text */}
          <p className="text-xs text-gray-400 mt-2">
            Alternatively, you can reach us directly at{" "}
            <a href="mailto:support@localevents.com" className="underline">
              support@localevents.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}



