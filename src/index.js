import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { formatDistanceToNowStrict } from 'date-fns'

import NewTaskForm from './NewTaskForm/NewTaskForm'
import TaskList from './TaskList/TaskList'
import Footer from './Footer/Footer'
import Task from './Task/Task'
import './index.css'
import './default.css'

/// Устанавливаем начальное значение id задачи
let idCount = 100

function App() {
  const [task, setTask] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editValue, setEditValue] = useState('')
  // const [checkBox, setCheckBox] = useState(false);
  const [filter, setFilter] = useState('all')
  // const [formatCreate, setFormatCreate] = useState("");

  const newItem = {
    task: inputValue,
    check: false,
    clasName: null,
    timeCreated: new Date(),
    id: (idCount += 1),
  }

  const editItem = {
    task: editValue,
    check: false,
    clasName: null,
    id: (idCount += 1),
  }

  // Функция для обновления времени "ago" для каждой задачи
  const updateTaskTimes = () => {
    setTask((tasks) =>
      tasks.map((taskes) => ({
        ...taskes,
        created: formatDistanceToNowStrict(taskes.timeCreated, {
          addSuffix: true,
        }),
      }))
    )
  }

  const handleInputChange = (newValue) => {
    setInputValue(newValue) // Обновляем состояние
  }

  const handleEditChange = (editValues) => {
    setEditValue(editValues) // Обновляем состояние
  }

  /// //Сделать выборку не по калассам, а добавить  done active и сделать выборку по нему

  function filters(items, filteres) {
    switch (filteres) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => item.check === false)
      case 'done':
        return items.filter((item) => item.check === true)
      default:
        return items
    }
  }

  const filterResult = filters(task, filter)

  const elem = filterResult.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => setTask(task.filter((it) => it.id !== id))}
        // Пишем функцию которое изменяет состояние задачи на редактирование>>
        onEdit={() => {
          const tk = [...task]
          const edited = task.filter((itemes) => itemes.id === id)
          const [editeded] = edited
          editeded.clasName = 'editing'
          tk.map((itms) => {
            if (itms.id === id) {
              return editeded
            }
            return null
          })
          setTask(tk)
        }}
        // Передаем функцию которая при вводе в инпут обновляет значение стейта
        onInputEdit={handleEditChange}
        // Функция изменяющая задачу на новую при нажатии 'ENTER'
        onEditInput={() => {
          let tk = [...task]
          tk = tk.map((items) => {
            if (items.id === id) {
              editItem.check = items.check
              editItem.created = items.created
              editItem.timeCreated = items.timeCreated
              if (editItem.check === true) editItem.clasName = 'completed'
              return editItem
            }
            return items
          })
          setTask(tk)
        }}
        // Чекбоксы, при нажатии сохраняем значения выполненный или активный в стейт
        onCheckedBox={(checkValue) => {
          const completed = task.map((i) => {
            const itm = { ...i }
            if (itm.id === id) {
              if (checkValue === true) {
                itm.clasName = 'completed'
                itm.check = true
                return itm
              }
              if (checkValue === false) {
                itm.clasName = null
                itm.check = false
                return itm
              }
            }
            return itm
          })
          setTask(completed)
        }}
      />
    )
  })

  /// ///Количество активных задач
  const countActiveTasks = task.filter((item) => !item.check).length

  // Возвращаем приложение из компонентов
  return (
    <section className="todoapp">
      <NewTaskForm
        onInputChange={handleInputChange}
        onAdded={() => {
          if (inputValue.trim().length !== 0 && inputValue.length !== 0) {
            setTask([...task, newItem])
          }
          // Вызываем функцию для отображения времени создания задачи
          updateTaskTimes()
          // Стираем поле ввода
          setInputValue('')
        }}
        values={inputValue}
      />
      <section className="main">
        <TaskList>{elem}</TaskList>
        <Footer
          oncountActiveTasks={countActiveTasks}
          onActive={() => setFilter('active')}
          onDone={() => setFilter('done')}
          onAll={() => setFilter('all')}
          onClearCompleted={() => setTask(task.filter((item) => item.clasName !== 'completed'))}
          isFilter={filter}
        />
      </section>
    </section>
  )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(<App />)
