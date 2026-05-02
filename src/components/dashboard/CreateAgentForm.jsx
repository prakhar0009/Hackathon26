import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const CreateAgentForm = ({ onAgentCreated }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    subdomain: "",
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
      date: new Date().toISOString().split("T")[0],
      buyerEmail: user.email,
    };

    const existing = JSON.parse(localStorage.getItem("agents") || "[]");
    localStorage.setItem("agents", JSON.stringify([...existing, newAgent]));

    // Reset form and notify parent
    setFormData({
      title: "",
      domain: "",
      subdomain: "",
      basePrice: "",
      range: "",
      description: "",
    });
    onAgentCreated();
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-serif font-bold text-[#2D2621] mb-8 flex items-center gap-2">
        <span className="text-3xl">+</span> Create New Agent
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase">
            Agent Title
          </label>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 outline-[#A35831]"
            placeholder="e.g., Raw Material Procurement"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase">
            Domain
          </label>
          <select
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 outline-[#A35831]"
            value={formData.domain}
            onChange={(e) =>
              setFormData({ ...formData, domain: e.target.value })
            }
          >
            <option value="">Select domain...</option>
            <option value="Technology">Technology</option>
            <option value="Raw Materials">Raw Materials</option>
            <option value="Services">Services</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase">
            Base Price ($)
          </label>
          <input
            type="number"
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 outline-[#A35831]"
            placeholder="e.g., 50000"
            value={formData.basePrice}
            onChange={(e) =>
              setFormData({ ...formData, basePrice: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase">
            Negotiation Range ($)
          </label>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 outline-[#A35831]"
            placeholder="e.g., 40,000 - 55,000"
            value={formData.range}
            onChange={(e) =>
              setFormData({ ...formData, range: e.target.value })
            }
          />
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase">
            Requirement Description
          </label>
          <textarea
            rows="4"
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100 outline-[#A35831]"
            placeholder="Describe what you're looking to procure..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-[#A35831] text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8e4a28] transition-colors col-span-1"
        >
          <span>+</span> Create Agent
        </button>
      </form>
    </div>
  );
};

export default CreateAgentForm;
