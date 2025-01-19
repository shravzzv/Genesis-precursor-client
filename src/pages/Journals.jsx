import '../styles/Journals.css'
import Navbar from '../components/Navbar'
import Journal from '../components/Journal'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

Journals.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Journals({ isAuthenticated }) {
  const [journals, setJournals] = useState([])
  const [newJournal, setNewJournal] = useState({ subject: '', body: '' })
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [currentJournal, setCurrentJournal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'https://genesis-precursor-server-production.up.railway.app/journals',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setJournals(response.data)
      } catch (error) {
        console.error('Error fetching journals:', error)
      }
    }

    fetchJournals()
    return () => {}
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `https://genesis-precursor-server-production.up.railway.app/journals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setJournals(journals.filter((journal) => journal._id !== id))
    } catch (error) {
      console.error('Error deleting journal:', error)
    }
  }

  const handleUpdate = (journal) => {
    setCurrentJournal(journal)
    setIsUpdateFormOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'https://genesis-precursor-server-production.up.railway.app/journals',
        newJournal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setJournals([...journals, response.data.newJournal])
    } catch (error) {
      console.error('Error creating journal:', error)
    } finally {
      setIsLoading(false)
    }
    setNewJournal({ subject: '', body: '' })
    setIsCreateFormOpen(false)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `https://genesis-precursor-server-production.up.railway.app/journals/${currentJournal.id}`,
        currentJournal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setJournals(
        journals.map((journal) =>
          journal._id === response.data.updatedJournal._id
            ? { ...journal, ...response.data.updatedJournal }
            : journal
        )
      )
      setIsUpdateFormOpen(false)
    } catch (error) {
      console.error('Error updating journal:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />
  }

  return (
    <>
      <Navbar />
      <main className='pane journals'>
        {journals.length === 0 && (
          <p>There are no journals yet. Create some!</p>
        )}

        {journals.map((journal) => (
          <Journal
            key={journal._id}
            id={journal._id}
            subject={journal.subject}
            body={journal.body}
            handleDelete={handleDelete}
            onEdit={handleUpdate}
          />
        ))}

        <button
          className='addJournal fab'
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
            <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z' />
          </svg>
          <div className='headline'>Create a journal</div>

          <form onSubmit={handleSubmit}>
            <div className='formControl'>
              <label htmlFor='subject'>Subject:*</label>
              <input
                type='text'
                name='subject'
                id='subject'
                value={newJournal.subject}
                onChange={(e) =>
                  setNewJournal({ ...newJournal, subject: e.target.value })
                }
                required
                autoFocus
              />
            </div>

            <div className='formControl'>
              <label htmlFor='body'>Body*:</label>
              <textarea
                name='body'
                id='body'
                rows='3'
                value={newJournal.body}
                onChange={(e) =>
                  setNewJournal({ ...newJournal, body: e.target.value })
                }
                required
              ></textarea>
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
                {isLoading ? 'Creating...' : 'Create'}
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

          <div className='headline'>Update a journal</div>

          <form onSubmit={handleUpdateSubmit}>
            <div className='formControl'>
              <label htmlFor='subject'>Subject:*</label>
              <input
                type='text'
                name='subject'
                id='subject'
                value={currentJournal?.subject || ''}
                onChange={(e) =>
                  setCurrentJournal({
                    ...currentJournal,
                    subject: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className='formControl'>
              <label htmlFor='body'>Body:</label>
              <textarea
                name='body'
                id='body'
                rows='3'
                value={currentJournal?.body || ''}
                onChange={(e) =>
                  setCurrentJournal({ ...currentJournal, body: e.target.value })
                }
              ></textarea>
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
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}
