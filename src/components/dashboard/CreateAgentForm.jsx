import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Plus } from "lucide-react";

const CreateAgentForm = ({ onAgentCreated }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    basePrice: "",
    range: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAgent = {
      ...formData,
      id: Date.now(),
      status: "NEGOTIATING",
      date: new Date().toLocaleDateString("en-GB"), // Matches May 2 format
      buyerEmail: user.email,
    };

    const existing = JSON.parse(localStorage.getItem("agents") || "[]");
    localStorage.setItem("agents", JSON.stringify([...existing, newAgent]));
    onAgentCreated();
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <h2 className="text-2xl font-serif font-bold text-[#2D2621] mb-8 flex items-center gap-3">
        <Plus size={28} strokeWidth={3} /> Create New Agent
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Agent Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Agent Title
            </label>
            <input
              required
              className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-100 focus:outline-[#A35831] text-sm"
              placeholder="e.g., Raw Material Procurement"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Domain */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Domain
            </label>
            <select
              required
              className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-100 focus:outline-[#A35831] text-sm text-gray-500"
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
            >
              <option value="">Select domain...</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          {/* Base Price */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Base Price ($)
            </label>
            <input
              required
              type="number"
              className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-100 focus:outline-[#A35831] text-sm"
              placeholder="e.g., 50000"
              onChange={(e) =>
                setFormData({ ...formData, basePrice: e.target.value })
              }
            />
          </div>

          {/* Negotiation Range */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Negotiation Range ($)
            </label>
            <input
              required
              className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-100 focus:outline-[#A35831] text-sm"
              placeholder="e.g., 40,000 - 55,000"
              onChange={(e) =>
                setFormData({ ...formData, range: e.target.value })
              }
            />
          </div>
        </div>

        {/* Description - Spans Full Width */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Requirement Description
          </label>
          <textarea
            required
            rows="4"
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:outline-[#A35831] text-sm resize-none"
            placeholder="Describe what you're looking to procure..."
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-[#A35831] text-white py-3.5 px-10 rounded-xl font-bold flex items-center justify-center gap-3 w-fit hover:bg-[#8e4a28] transition-all mt-4 shadow-lg shadow-[#A35831]/20"
        >
          <Plus size={18} strokeWidth={3} /> Create Agent
        </button>
      </form>
    </div>
  );
};

export default CreateAgentForm;
