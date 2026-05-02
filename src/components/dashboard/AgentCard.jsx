import { MessageSquare, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgentCard = ({ agent }) => {
  const navigate = useNavigate();

  // Status badge styling logic
  const getStatusStyles = (status) => {
    switch (status) {
      case "NEGOTIATING":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "WAITING":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "COMPLETED":
        return "bg-green-50 text-green-600 border-green-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-[#2D2621] text-lg leading-tight w-2/3 truncate">
            {agent.title}
          </h3>
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusStyles(agent.status)}`}
          >
            ● {agent.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <Tag size={14} />
          <p className="text-xs font-bold uppercase tracking-wider">
            {agent.domain} {agent.subdomain && `• ${agent.subdomain}`}
          </p>
        </div>

        <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed">
          {agent.description}
        </p>

        <div className="bg-gray-50 p-4 rounded-2xl mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Target Range
          </p>
          <p className="font-bold text-[#A35831] text-base">${agent.range}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={14} />
          <span className="text-xs font-medium">{agent.date}</span>
        </div>
        <button
          onClick={() => navigate(`/chat/${agent.id}`)}
          className="bg-[#A35831] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#8B4A29] transition-all flex items-center gap-2 shadow-sm"
        >
          <MessageSquare size={14} />
          Open Chat
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
