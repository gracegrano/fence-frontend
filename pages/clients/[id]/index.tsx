
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ClientProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const clientRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/${id}`);
        if (!clientRes.ok) throw new Error("Client not found");
        const clientData = await clientRes.json();

        const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?client_id=${id}`);
        const projectsData = await projectsRes.json();

        setClient(clientData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-600">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{client.name}</h1>
        <p className="text-sm text-gray-600 mb-1"><strong>Company:</strong> {client.company_name || "—"}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {client.email}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> {client.phone}</p>
        <p className="text-sm text-gray-600"><strong>Location:</strong> {client.city}, {client.state}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found for this client.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="bg-white shadow rounded p-4">
                <h3 className="font-semibold text-gray-800">{project.name || "Unnamed Project"}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Address:</strong> {project.address}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {project.status || "N/A"}</p>
                <button className="mt-2 text-blue-600 text-sm hover:underline">View Estimate</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
