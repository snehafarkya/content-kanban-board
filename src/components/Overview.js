import { LuFileText } from "react-icons/lu";
import { FaPen, FaEye, FaCheckCircle } from "react-icons/fa";


function OverviewCard({ title, count, icon, color }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-zinc-200 w-full">
      {/* Icon */}
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-xl font-bold text-black">{count}</p>
        <p className="text-sm text-zinc-600 capitalize">{title}</p>
      </div>
    </div>
  );
}

export default function Overview({ tasks }) {
  const statusCount = {
    idea: tasks.filter((t) => t.status === "idea").length,
    writing: tasks.filter((t) => t.status === "writing").length,
    review: tasks.filter((t) => t.status === "review").length,
    published: tasks.filter((t) => t.status === "published").length,
  };

  const completion =
    tasks.length > 0
      ? Math.round((statusCount.published / tasks.length) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:w-auto  gap-4 mb-8">
      <OverviewCard
        title="Ideas"
        count={statusCount.idea}
        color="bg-yellow-100 text-yellow-600"
        icon={<LuFileText size={20} />}
      />

      <OverviewCard
        title="Writing"
        count={statusCount.writing}
        color="bg-blue-100 text-blue-600"
        icon={<FaPen size={20} />}
      />

      <OverviewCard
        title="Review"
        count={statusCount.review}
        color="bg-purple-100 text-purple-600"
        icon={<FaEye size={20} />}
      />

      <OverviewCard
        title="Published"
        count={statusCount.published}
        color="bg-green-100 text-green-600"
        icon={<FaCheckCircle size={20} />}
      />

      {/* Completion Card */}
      <div className="flex items-center justify-center bg-white rounded-xl p-6 border border-zinc-200">
        <div className="text-center">
          <p className="text-xl font-bold text-black">{completion}%</p>
          <p className="text-sm text-zinc-600">Complete</p>
        </div>
      </div>
    </div>
  );
}
