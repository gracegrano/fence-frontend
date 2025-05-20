
import { useEffect, useState } from 'react';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients`)
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Clients</h2>
      <ul>
        {clients.map((c, i) => (
          <li key={i}>{c.name} - {c.email}</li>
        ))}
      </ul>
    </div>
  );
}
