import './App.css';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskInfo from './components/TaskInfo';
import useTask from "./hooks/useTask.tsx";

function App() {


  return (
    <>
      <Header />
      <section className="p-5 px-10 flex gap-10">
        <AddTaskForm />
        <TaskInfo />
      </section>
    </>
  )
}

export default App
