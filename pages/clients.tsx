import { useEffect, useState } from "react";
import { ClientCard } from "../components/ClientCard";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients`)
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Clients</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client: any) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}
