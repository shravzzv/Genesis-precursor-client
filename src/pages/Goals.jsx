import '../styles/Goals.css'
import Goal from '../components/Goal'
import Navbar from '../components/Navbar'
import { useState } from 'react'

export default function Goals() {
  let id = 15
  const data = [
    { name: 'Learn programming and build a personal project', id: 1 },
    { name: 'Learn cooking and try out new recipes every week', id: 2 },
    { name: 'Exercise regularly to maintain a healthy lifestyle', id: 3 },
    { name: 'Read more books and expand my knowledge', id: 4 },
    { name: 'Travel the world and experience different cultures', id: 5 },
    { name: 'Save money for future investments and emergencies', id: 6 },
    {
      name: 'Learn a new language on Duolingo practicing everyday to become fluent',
      id: 7,
    },
    { name: 'Start a blog and share my thoughts and experiences', id: 8 },
    { name: 'Volunteer and give back to the community', id: 9 },
    { name: 'Improve public speaking skills by joining a local club', id: 10 },
    { name: 'Take a photography course and improve my skills', id: 11 },
    { name: 'Meditate daily to improve mental health', id: 12 },
    { name: 'Learn to play a musical instrument', id: 13 },
    { name: 'Create a personal website to showcase my portfolio', id: 14 },
  ]

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [goals, setGoals] = useState(data)
  const [newGoalName, setNewGoalName] = useState('')

  const handleDelete = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleUpdate = (id, newName) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, name: newName } : goal))
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    goals.push({ name: newGoalName, id: id++ })
    setNewGoalName('')
    setIsCreateFormOpen(false)
  }

  return (
    <>
      <Navbar />
      <main className='pane goals'>
        {goals.map((goal) => (
          <Goal
            key={goal.id}
            id={goal.id}
            name={goal.name}
            showGenerateTodos
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
        <button
          className='addGoal fab'
          onClick={() => setIsCreateFormOpen(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
          </svg>
        </button>

        <dialog open={isCreateFormOpen}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            className='icon'
          >
            <path d='M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z' />
          </svg>

          <div className='headline'>Create a goal</div>

          <form onSubmit={handleSubmit}>
            <div className='formControl'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                id='name'
                required
                placeholder='a smart goal'
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
              />
            </div>

            <div className='actions'>
              <button
                className='text'
                type='button'
                onClick={() => setIsCreateFormOpen(false)}
              >
                Cancel
              </button>
              <button type='submit' className='filled'>
                Create
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}

// todo: implement the addGoal functionality
// todo: implment the generateTodos functionality
// todo: implement the updateGoal functionality
