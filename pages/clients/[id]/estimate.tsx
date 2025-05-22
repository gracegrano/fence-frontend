
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreateEstimate() {
  const router = useRouter();
  const { id } = router.query;

  const [items, setItems] = useState([]);
  const [laborMethod, setLaborMethod] = useState("post"); // or "linear"
  const [depositPercent, setDepositPercent] = useState(50);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addItem = () => {
    setItems([...items, { category: "post", name: "", quantity: 0, unit_price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "quantity" || field === "unit_price" ? Number(value) : value;
    setItems(updated);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/estimates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: id,
          items,
          labor_method: laborMethod,
          deposit_percent: depositPercent,
          note
        }),
      });

      if (!response.ok) throw new Error("Failed to save estimate");
      const estimate = await response.json();
      router.push(`/projects/${id}/estimate/${estimate.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Create Estimate</h1>

      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 mb-2">
          <select value={item.category} onChange={(e) => updateItem(i, "category", e.target.value)} className="border px-2 py-1 rounded">
            <option value="post">Post</option>
            <option value="panel">Panel</option>
            <option value="gate">Gate</option>
            <option value="accessory">Accessory</option>
            <option value="labor">Labor</option>
          </select>
          <input type="text" placeholder="Item name" value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} className="border px-2 py-1 rounded" />
          <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(i, "quantity", e.target.value)} className="border px-2 py-1 rounded" />
          <input type="number" placeholder="Unit Price" value={item.unit_price} onChange={(e) => updateItem(i, "unit_price", e.target.value)} className="border px-2 py-1 rounded" />
        </div>
      ))}

      <button onClick={addItem} className="bg-gray-100 border px-4 py-1 rounded mb-4">+ Add Item</button>

      <div className="mb-4">
        <label className="block font-medium mb-1">Labor Calculation Method</label>
        <select value={laborMethod} onChange={(e) => setLaborMethod(e.target.value)} className="border px-3 py-2 rounded">
          <option value="post">By Post</option>
          <option value="linear">By Linear Feet (Chain Link)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Deposit Percentage (%)</label>
        <input type="number" value={depositPercent} onChange={(e) => setDepositPercent(Number(e.target.value))} className="border px-3 py-2 rounded w-24" />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Notes</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} className="border px-3 py-2 rounded w-full" />
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="text-right">
        <p className="mb-2 font-semibold">Total: ${getTotal().toFixed(2)}</p>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {saving ? "Saving..." : "Save Estimate"}
        </button>
      </div>
    </div>
  );
}
