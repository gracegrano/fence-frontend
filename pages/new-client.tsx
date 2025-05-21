import { useState } from "react";

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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
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
      alert("Erro ao salvar cliente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Novo Cliente</h1>
      {submitted && <p className="text-green-600 mb-4">Cliente cadastrado com sucesso!</p>}
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
        {[
          ["name", "Nome completo"],
          ["company_name", "Nome da empresa"],
          ["email", "E-mail"],
          ["phone", "Telefone"],
          ["address_line1", "Endereço - Linha 1"],
          ["address_line2", "Endereço - Linha 2"],
          ["city", "Cidade"],
          ["state", "Estado"],
          ["zip_code", "ZIP Code"],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm"
              required={["name", "email", "phone", "city", "state"].includes(field)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Salvar Cliente
        </button>
      </form>
    </div>
  );
}
