import '../styles/Todos.css'
import Todo from '../components/Todo'
import Navbar from '../components/Navbar'
import { useState } from 'react'

export default function Todos() {
  let id = 15
  const data = [
    {
      title: 'Complete the project report',
      description:
        'lorem ipsum dolor sit amet lorem ispum dolor sit maet lorem ispum dolor sit maet',
      goal: 'Career Advancement of the second kind and lorem ipsum dolor sit amet.',
      id: 1,
    },
    {
      title: 'Buy groceries for the week',
      description: 'Purchase vegetables, fruits, and other essentials',
      deadline: '2023-10-16',
      id: 2,
    },
    {
      title: 'Schedule a meeting with the team',
      description: 'Organize a meeting to discuss project updates',
      deadline: '2023-10-17',
      goal: 'Career Advancement',
      id: 3,
    },
    {
      title: 'Pay utility bills',
      description: 'Pay electricity, water, and internet bills',
      deadline: '2023-10-18',
      id: 4,
    },
    {
      title: 'Plan the weekend trip',
      description: 'Decide on the destination and make necessary bookings',
      deadline: '2023-10-19',
      goal: 'Recreation & Leisure',
      id: 5,
    },
    {
      title: 'Organize the workspace',
      description: 'Clean and arrange the desk and shelves',
      deadline: '2023-10-20',
      id: 6,
    },
    {
      title: 'Read the new book',
      description: 'Start reading the book purchased last week',
      deadline: '2023-10-21',
      goal: 'Personal Development',
      id: 7,
    },
    {
      title: 'Exercise for 30 minutes',
      description: 'Do a 30-minute workout session',
      deadline: '2023-10-22',
      goal: 'Health & Fitness',
      id: 8,
    },
    {
      title: 'Call family and friends',
      description: 'Catch up with family and friends over the phone',
      deadline: '2023-10-23',
      id: 9,
    },
    {
      title: 'Prepare for the presentation',
      description: 'Create slides and practice for the upcoming presentation',
      deadline: '2023-10-24',
      goal: 'Career Advancement',
      id: 10,
    },
    {
      title: 'Clean the house',
      description: 'Do a thorough cleaning of the house',
      deadline: '2023-10-25',
      id: 11,
    },
    {
      title: 'Meditate for 15 minutes',
      description: 'Spend 15 minutes meditating',
      deadline: '2023-10-26',
      goal: 'Spiritual Growth',
      id: 12,
    },
    {
      title: 'Learn a new skill online',
      description: 'Enroll in an online course and start learning',
      deadline: '2023-10-27',
      goal: 'Educational Pursuits',
      id: 13,
    },
    {
      title: 'Update the resume',
      description: 'Revise and update the resume with recent experiences',
      deadline: '2023-10-28',
      goal: 'Career Advancement',
      id: 14,
    },
  ]

  const [todos, setTodos] = useState(data)
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    deadline: '',
    goal: '',
  })
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleUpdate = (todo) => {
    setCurrentTodo(todo)
    setIsUpdateFormOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodos([...todos, { ...newTodo, id: id++ }])
    setNewTodo({
      title: '',
      description: '',
      deadline: '',
      goal: '',
    })
    setIsCreateFormOpen(false)
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, ...currentTodo } : todo
      )
    )
    setIsUpdateFormOpen(false)
  }

  const goals = [
    'none',
    'Personal Development',
    'Health & Fitness',
    'Career Advancement',
    'Financial Management',
    'Relationship Building',
    'Recreation & Leisure',
    'Community Service',
    'Spiritual Growth',
    'Educational Pursuits',
    'Home Improvement',
  ]

  return (
    <>
      <Navbar />
      <main className='pane todos'>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description || ''}
            deadline={todo.deadline || ''}
            goal={todo.goal || ''}
            handleDelete={handleDelete}
            onEdit={handleUpdate}
          />
        ))}
        <button
          className='addTodo fab'
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
            <path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q48 0 93.5 11t87.5 32q15 8 19.5 24t-5.5 30q-10 14-26.5 18t-32.5-4q-32-15-66.5-23t-69.5-8q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-8-.5-15.5T798-511q-2-17 6.5-32.5T830-564q16-5 30 3t16 24q2 14 3 28t1 29q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-328 372-373q11-11 27.5-11.5T852-781q11 11 11 28t-11 28L452-324q-12 12-28 12t-28-12L282-438q-11-11-11-28t11-28q11-11 28-11t28 11l86 86Z' />
          </svg>
          <div className='headline'>Create a todo</div>

          <form onSubmit={handleSubmit}>
            <div className='formControl'>
              <label htmlFor='title'>Title:*</label>
              <input
                type='text'
                name='title'
                id='title'
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
                required
                autoFocus
              />
            </div>

            <div className='formControl'>
              <label htmlFor='description'>Description:</label>
              <textarea
                name='description'
                id='description'
                rows='3'
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className='formControl'>
              <label htmlFor='deadline'>Deadline:</label>
              <input
                type='datetime-local'
                name='deadline'
                id='deadline'
                value={newTodo.deadline}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, deadline: e.target.value })
                }
              />
            </div>

            <div className='formControl'>
              <label htmlFor='goal'>Goal:</label>
              <select
                name='goal'
                id='goal'
                value={newTodo.goal}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, goal: e.target.value })
                }
              >
                {goals.map((goal, index) => (
                  <option key={index} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
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

        <dialog open={isUpdateFormOpen}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            className='icon'
          >
            <path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
          </svg>

          <div className='headline'>Update a todo</div>

          <form onSubmit={handleUpdateSubmit}>
            <div className='formControl'>
              <label htmlFor='name'>Updated name:</label>
              <input
                type='text'
                name='name'
                id='name'
                value={currentTodo?.name || ''}
                onChange={(e) =>
                  setCurrentTodo({ ...currentTodo, name: e.target.value })
                }
                required
              />
            </div>

            <div className='actions'>
              <button
                className='text'
                type='button'
                onClick={() => setIsUpdateFormOpen(false)}
              >
                Cancel
              </button>
              <button type='submit' className='filled'>
                Update
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}
