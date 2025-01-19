import '../styles/Todo.css'
import PropTypes from 'prop-types'

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  deadline: PropTypes.string,
  goalName: PropTypes.string,
  goalId: PropTypes.string,
  onEdit: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default function Todo({
  id,
  title,
  description,
  deadline,
  goalName,
  goalId,
  onEdit,
  handleDelete,
}) {
  const formatDeadline = (deadline) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(deadline).toLocaleDateString(undefined, options)
  }

  const formatDeadlineForInput = (deadline) => {
    const date = new Date(deadline)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  return (
    <article className='todo scale-in-center'>
      <p className='title'>{title}</p>
      {description && <p className='description'>{description}</p>}

      {goalName && (
        <button className='elevated'>
          {goalName.length > 20
            ? goalName.slice(0, 20).trimEnd() + '...'
            : goalName}
        </button>
      )}

      {deadline && (
        <div className='deadline'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z' />
          </svg>
          <span>{formatDeadline(deadline)}</span>
        </div>
      )}

      <div className='controls'>
        <button
          className='icon'
          onClick={() =>
            onEdit({
              id,
              title,
              description,
              deadline: formatDeadlineForInput(deadline),
              goal: goalId,
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
          </svg>
        </button>

        <button className='icon' onClick={() => handleDelete(id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z' />
          </svg>
        </button>
      </div>
    </article>
  )
}
