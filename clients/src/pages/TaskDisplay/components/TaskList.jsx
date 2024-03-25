import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Filtered Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="border-b border-gray-200 py-4">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            <p className="text-sm text-gray-600 mb-2">Category: {task.categoryId.name}</p>
            <p className="text-sm text-gray-600 mb-2">Duration: {task.durationDays} days</p>
            <p className="text-sm text-gray-600 mb-2">Total Price: ${task.totalPrice}</p>
            <div className="text-sm text-gray-600 mb-2">
              <p>Client: {task.client.name}</p>
              <p>Email: {task.client.email}</p>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <p>Skills:</p>
              <ul className="list-disc pl-5">
                {task.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <p>Sections:</p>
              <ul className="list-disc pl-5">
                {task.sections.map((section, index) => (
                  <li key={index}>
                    <p>{section.title}</p>
                    <p>{section.description}</p>
                    <p>Price: ${section.price}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  
  );
};

export default TaskList;
