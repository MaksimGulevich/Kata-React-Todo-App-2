import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ onAdded, values, onInputChange }) {
  const handleChange = (event) => {
    onInputChange(event.target.value) // Передаем новое значение в основной компонент
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        value={values}
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && onAdded()}
        autoFocus
      />
    </header>
  )
}
NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
}
export default NewTaskForm
