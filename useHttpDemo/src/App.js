import React, { useEffect, useState, useCallback } from "react";
import useHttp from "./hooks/useHttp";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const transformTask = useCallback( (taskObj) => {
    const loadedTasks = [];
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTasks);
  }, [] );

  const httpData = useHttp(
    { url: "https://moviedb-3b2a4-default-rtdb.firebaseio.com/tasks.json" },
    transformTask
  );

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
