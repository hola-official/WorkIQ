import React, { useState } from "react";

const TaskFilter = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("newest");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any filter button was clicked before calling onFilter
    if (filter === "newest" || filter === "bestMatch") {
      onFilter({ searchQuery, filter });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Filter Tasks</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="border border-gray-200 rounded-md px-3 py-2 w-48"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Filter
        </button>
      </form>
      <div className="flex flex-wrap">
        <button
          type="button"
          onClick={() => handleFilterChange("newest")}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${
            filter === "newest" ? "bg-blue-600" : ""
          }`}
        >
          Newest
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("bestMatch")}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            filter === "bestMatch" ? "bg-blue-600" : ""
          }`}
        >
          Best Match
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;
