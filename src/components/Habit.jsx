import { useState } from 'react'
import '../styles/Habit.css'
import PropTypes from 'prop-types'

Habit.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  repeatDays: PropTypes.arrayOf(PropTypes.string).isRequired,
  isToday: PropTypes.bool,
  onEdit: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default function Habit({
  id,
  title,
  description,
  repeatDays,
  isToday,
  onEdit,
  handleDelete,
}) {
  const [isCompleted, setIsCompleted] = useState(false)

  return (
    <article className='habit scale-in-center'>
      {isToday ? (
        <div className='today'>
          <p className={`title ${isCompleted ? 'completed' : ''}`}>{title}</p>
          <button className='icon' onClick={() => setIsCompleted(!isCompleted)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
            >
              <path d='m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <p className={'title'}>{title}</p>

          {description && <p className='description'>{description}</p>}

          <div className='repeatDays'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
            >
              <path d='M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z' />
            </svg>
            {repeatDays.map((day, index) => (
              <span key={index}>
                {day}
                {index < repeatDays.length - 1 && ', '}
              </span>
            ))}
          </div>

          <div className='controls'>
            <button
              className='icon'
              onClick={() => onEdit({ id, title, description, repeatDays })}
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
        </>
      )}
    </article>
  )
}
