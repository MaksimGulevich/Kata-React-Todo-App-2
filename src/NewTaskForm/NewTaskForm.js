import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ onAdded, values, onInputChange, onMinuteChange, onSecondsChange, valueMin, valueSec }) {
  const handleChange = (event) => {
    onInputChange(event.target.value) // Передаем новое значение в основной компонент
  }
  const minuteChange = (event) => {
    onMinuteChange(
      // eslint-disable-next-line no-nested-ternary
      Number.isNaN(Number(event.target.value)) ? '' : Number(event.target.value)
    ) // Передаем новое значение в основной компонент
  }
  const secondsChange = (event) => {
    onSecondsChange(
      // eslint-disable-next-line no-nested-ternary
      Number(event.target.value) >= 60 ? '' : Number.isNaN(Number(event.target.value)) ? '' : Number(event.target.value)
    ) // Передаем новое значение в основной компонент
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          value={values}
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && onAdded()}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="min"
          onChange={minuteChange}
          onKeyDown={(e) => e.key === 'Enter' && onAdded()}
          value={valueMin}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="sec"
          onChange={secondsChange}
          onKeyDown={(e) => e.key === 'Enter' && onAdded()}
          value={valueSec}
          autoFocus
        />
      </form>
    </header>
  )
}
NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
}
export default NewTaskForm
