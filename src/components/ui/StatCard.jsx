const StatCard = ({ icon, label, value, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
    <div className={`p-4 rounded-lg ${colorClass}`}>{icon}</div>
    <div>
      <p className="text-3xl font-bold text-[#2D2621]">{value}</p>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">
        {label}
      </p>
    </div>
  </div>
);

export default StatCard;
