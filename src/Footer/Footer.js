import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css'

function Footer({ oncountActiveTasks, onActive, onDone, onAll, onClearCompleted, isFilter }) {
  const button = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]

  const buttons = button.map(({ name, label }) => {
    const isActive = isFilter === name
    let clasName
    if (isActive === true) {
      clasName = 'selected'
    }

    let doneOrActive

    if (name === 'all') {
      doneOrActive = onAll
    } else if (name === 'active') {
      doneOrActive = onActive
    } else if (name === 'done') {
      doneOrActive = onDone
    }

    return (
      <li key={name}>
        <button type="button" className={clasName} onClick={() => doneOrActive()}>
          {label}
        </button>
      </li>
    )
  })

  return (
    <footer className="footer">
      <span className="todo-count">{oncountActiveTasks} items left</span>
      <ul className="filters">{buttons}</ul>
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  oncountActiveTasks: PropTypes.number.isRequired,
  onActive: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onAll: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  isFilter: PropTypes.string.isRequired, // Предположим, что isFilter - это строка. Измените тип, если это не так.
}

export default Footer
