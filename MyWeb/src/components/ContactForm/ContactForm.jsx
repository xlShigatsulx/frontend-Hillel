import { useState, useRef } from 'react';

export function ContactForm() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Send Data:', formData);

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    formRef.current.reset();
  };

  return (
    <form
      ref={formRef}
      className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-gray-600">
          Full Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-orange-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-gray-600">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border border-orange-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1 text-gray-600">
          Phone:
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="border border-orange-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="subject" className="mb-1 text-gray-600">
          Subject:
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          className="border border-orange-100 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="md:col-span-2 flex flex-col">
        <textarea
          name="message"
          id="message"
          className="border border-orange-100 rounded-md p-4 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="self-start w-50 text-2xl text-white bg-amber-600 p-4 rounded-full hover:bg-amber-700 hover:text-gray-300 duration-300 ease-in-out"
      >
        Надіслати
      </button>
    </form>
  );
}
