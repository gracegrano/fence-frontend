"use client";

import { useState } from "react";
import { FormInput } from "../components/FormInput";

export default function NewClient() {
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setSubmitted(true);
      setForm({
        name: "",
        company_name: "",
        email: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip_code: ""
      });
    } else {
      alert("Error while saving client.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">New Client Registration</h1>
        {submitted && (
          <div className="mb-4 text-green-600 font-semibold">
            Client successfully created!
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Company Name"
            id="company_name"
            name="company_name"
            type="text"
            value={form.company_name}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Address Line 1"
            id="address_line1"
            name="address_line1"
            type="text"
            value={form.address_line1}
            onChange={handleChange}
          />
          <FormInput
            label="Address Line 2"
            id="address_line2"
            name="address_line2"
            type="text"
            value={form.address_line2}
            onChange={handleChange}
          />
          <FormInput
            label="City"
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            required
          />
          <FormInput
            label="State"
            id="state"
            name="state"
            type="text"
            value={form.state}
            onChange={handleChange}
            required
          />
          <FormInput
            label="ZIP Code"
            id="zip_code"
            name="zip_code"
            type="text"
            value={form.zip_code}
            onChange={handleChange}
          />

          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
