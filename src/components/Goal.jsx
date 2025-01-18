import '../styles/Goal.css'
import PropTypes from 'prop-types'

Goal.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showGenerateTodos: PropTypes.bool,
  handleDelete: PropTypes.func,
  onEdit: PropTypes.func,
}

export default function Goal({
  name,
  id,
  showGenerateTodos,
  handleDelete,
  onEdit,
}) {
  return (
    <article className='goal scale-in-center'>
      <p className='name'>{name}</p>

      {showGenerateTodos && (
        <button className='elevated'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M200-313q10-3 19.5-5t20.5-2h40v-480h-40q-17 0-28.5 11.5T200-760v447Zm40 233q-50 0-85-35t-35-85v-560q0-50 35-85t85-35h280v80H360v480h240v-120h80v200H240q-17 0-28.5 11.5T200-200q0 17 11.5 28.5T240-160h520v-320h80v400H240Zm-40-233v-487 487Zm500-167q0-92 64-156t156-64q-92 0-156-64t-64-156q0 92-64 156t-156 64q92 0 156 64t64 156Z' />
          </svg>
          <span>Generate todos</span>
        </button>
      )}

      <div className='controls'>
        <button className='icon' onClick={() => onEdit({ id, name })}>
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
