import '../styles/Journals.css'
import Navbar from '../components/Navbar'
import Journal from '../components/Journal'
import { useState } from 'react'

export default function Journals() {
  let id = 11
  const data = [
    {
      id: '1',
      subject: 'My first journal',
      body: 'This is my first journal here. I am excited to start documenting my thoughts and experiences in this journal. It feels like a new beginning and I am looking forward to writing more.',
    },
    {
      id: '2',
      subject: 'A day at the park',
      body: 'Spent a wonderful day at the park with family. We had a picnic, played games, and enjoyed the beautiful weather. It was a perfect day to relax and unwind.',
    },
    {
      id: '3',
      subject: 'Learning React',
      body: 'Started learning React today. It is quite interesting! The component-based architecture and the use of hooks make it a powerful library for building user interfaces. I am eager to learn more and build some cool projects.',
    },
    {
      id: '4',
      subject: 'Grocery shopping',
      body: 'Went grocery shopping and bought some fresh vegetables. The market was bustling with activity and I managed to get everything on my list. Cooking with fresh ingredients always makes the meals taste better.',
    },
    {
      id: '5',
      subject: 'Workout routine',
      body: 'Followed my workout routine and feeling great. Exercise is such an important part of my daily routine and it helps me stay fit and healthy. Today’s session was particularly intense but rewarding.',
    },
    {
      id: '6',
      subject: 'Movie night',
      body: 'Watched a great movie with friends last night. It was a comedy and we laughed so much. Spending time with friends and enjoying a good movie is always a fun way to spend the evening.',
    },
    {
      id: '7',
      subject: 'Cooking experiment',
      body: 'Tried a new recipe and it turned out delicious. Cooking is one of my favorite hobbies and experimenting with new recipes is always exciting. This new dish will definitely be added to my list of favorites.',
    },
    {
      id: '8',
      subject: 'Reading a book',
      body: 'Started reading a new book and it is very engaging. The storyline is captivating and the characters are well-developed. I can’t wait to see how the story unfolds.',
    },
    {
      id: '9',
      subject: 'Weekend getaway',
      body: 'Went on a weekend getaway to the mountains. The scenery was breathtaking and it was a great escape from the hustle and bustle of city life. Hiking and exploring nature was refreshing and rejuvenating.',
    },
    {
      id: '10',
      subject: 'Meeting with old friends',
      body: 'Had a great time catching up with old friends. We reminisced about the good old days and shared what’s been happening in our lives. It was wonderful to reconnect and strengthen our bonds.',
    },
  ]

  const [journals, setJournals] = useState(data)
  const [newJournal, setNewJournal] = useState({ subject: '', body: '' })
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
  const [currentJournal, setCurrentJournal] = useState(null)

  const handleDelete = (id) => {
    setJournals(journals.filter((journal) => journal.id !== id))
  }

  const handleUpdate = (journal) => {
    setCurrentJournal(journal)
    setIsUpdateFormOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setJournals([...journals, { ...newJournal, id: id++ }])
    setNewJournal({ subject: '', body: '' })
    setIsCreateFormOpen(false)
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    setJournals(
      journals.map((journal) =>
        journal.id === currentJournal.id
          ? { ...journal, ...currentJournal }
          : journal
      )
    )
    setIsUpdateFormOpen(false)
  }

  return (
    <>
      <Navbar />
      <main className='pane journals'>
        {journals.map((journal) => (
          <Journal
            key={journal.id}
            id={journal.id}
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
                Update
              </button>
            </div>
          </form>
        </dialog>
      </main>
    </>
  )
}
