
"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function NewProject() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zip_code: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, client_id: id }),
      });

      if (!response.ok) throw new Error("Failed to save project");
      const project = await response.json();
      router.push(`/clients/${id}`);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" required className="w-full border rounded px-3 py-2" />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Fence Type" required className="w-full border rounded px-3 py-2" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full border rounded px-3 py-2" />
        <div className="flex gap-3">
          <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full border rounded px-3 py-2" />
          <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="w-full border rounded px-3 py-2" />
          <input name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="ZIP" required className="w-full border rounded px-3 py-2" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          {submitting ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
