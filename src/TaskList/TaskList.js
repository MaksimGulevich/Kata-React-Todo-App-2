import React from 'react'
import PropTypes from 'prop-types'
import './TaskList.css'

function TaskList({ children }) {
  return <ul className="todo-list">{children}</ul>
}

TaskList.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TaskList
