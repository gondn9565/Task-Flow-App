// import React, { useState, useEffect, useMemo } from "react";
// import { useOutletContext } from "react-router-dom";

// import { layoutClasses, SORT_OPTIONS } from "../assets/Dummy";
// import { ListChecks, Filter } from "lucide-react";

// const API_BASE = "http://localhost:4000/api/tasks";
// const PendingPages = () => {
//   const { tasks = [], refreshTasks } = useOutletContext();
//   const [sortBy, setSortBy] = useState("newest");
//   const [selectedTask, setselectedTask] = useState(null);
//   const [showModel, setShowModel] = useState(false);

//   const getHeaders = () => {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No auth token found");
//     return {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };
//   };
//   const sortedPendingTasks = useMemo(() => {
//     const filtered = tasks.filter(
//       (t) =>
//         !t.completed ||
//         (typeof t.completed === "string" && t.completed.toLowerCase() === "no")
//     );
//     return filtered.sort((a, b) => {
//       if (sortBy === "newest")
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortBy === "oldest")
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       const order = { high: 3, medium: 2, low: 1 };
//       return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()];
//     });
//   }, [tasks, sortBy]);

//   return (
//     <div className={layoutClasses.container}>
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
//           <ListChecks className="text-purple-500" />
//           Pending Task
//         </h1>
//         <p className="text-sm text-gray-500 mt-1 ml-7">
//           {sortedPendingTasks.length} task
//           {sortedPendingTasks.length !== 1 && "s"} needing your attention
//         </p>
//       </div>
//       <div className={layoutClasses.sortBox}>
//         <div className="flex items-center gap-2 text-gray-700 font-medium">
//           <Filter className="w-4 h-4 text-purple-500" />
//           <span className="text-sm">Sort by:</span>
//         </div>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className={layoutClasses.select}
//         >
//           <option value="newest">Newest First</option>
//           <option value="oldest">Oldest First</option>
//           <option value="priority">By Priority</option>
//         </select>
//         <div className={layoutClasses.tabWrapper}>
//           {SORT_OPTIONS.map((opt) => (
//             <button
//               key={opt.id}
//               onClick={() => setSortBy(opt.id)}
//               className={layoutClasses.tabButton(sortBy === opt.id)}
//             >
//               {opt.icon}
//               {opt.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//     <div className={layoutClasses.addBox} onClick={()=> setShowModel(true)}>
//       <div className="flex items-center justify-center gap-3 text-gray-500 group-hover:text-purple-600 transition-colors">
//         <div></div>
//       </div>

//     </div>
//      </div>
//   );
// };

// export default PendingPages;
import React, { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import { layoutClasses, SORT_OPTIONS } from "../assets/Dummy";
import { ListChecks, Filter, Plus } from "lucide-react";
import TaskItem from "../components/TaskItem";
import TaskModel from "../components/TaskModel";

const API_BASE = "http://localhost:4000/api/tasks";

const PendingPages = () => {
  const { tasks = [], refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token found");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const sortedPendingTasks = useMemo(() => {
    const filtered = tasks.filter(
      (t) =>
        !t.completed ||
        (typeof t.completed === "string" && t.completed.toLowerCase() === "no")
    );
    return filtered.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      const order = { high: 3, medium: 2, low: 1 };
      return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()];
    });
  }, [tasks, sortBy]);

  return (
    <div className={layoutClasses.container}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ListChecks className="text-purple-500" />
          Pending Task
        </h1>
        <p className="text-sm text-gray-500 mt-1 ml-7">
          {sortedPendingTasks.length} task
          {sortedPendingTasks.length !== 1 && "s"} needing your attention
        </p>
      </div>

      {/* Sort Box */}
      <div className={layoutClasses.sortBox}>
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Filter className="w-4 h-4 text-purple-500" />
          <span className="text-sm">Sort by:</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={layoutClasses.select}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">By Priority</option>
        </select>
        <div className={layoutClasses.tabWrapper}>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={layoutClasses.tabButton(sortBy === opt.id)}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Box */}
      <div className={layoutClasses.addBox} onClick={() => setShowModel(true)}>
        <div className="flex items-center justify-center gap-3 text-gray-500 group-hover:text-purple-600 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
            <Plus className="text-purple-500" size={18} />
          </div>
          <span className="font-medium">Add New Task</span>
        </div>
      </div>
      <div className="space-y-4">
        {sortedPendingTasks.length === 0 ? (
          <div className={layoutClasses.emptyState}>
            <div className="max-w-xs mx-auto py-6">
              <div className={layoutClasses.emptyIconBg}>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                All caught up!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                No pending tasks - great work!
              </p>
              <button
                onClick={() => setShowModel(true)}
                className={layoutClasses.emptyBtn}
              >
                Create New Task
              </button>
            </div>
          </div>
        ) : (
          sortedPendingTasks.map((task) => (
            <TaskItem key={task._id || task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default PendingPages;
