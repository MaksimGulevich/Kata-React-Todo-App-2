import React, { useState, useEffect } from 'react'
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
  const [filter, setFilter] = useState('all')
  const [minutes, setMinute] = useState('')
  const [seconds, setSeconds] = useState('')
  const [intervalId, setIntervalId] = useState(null)

  const newItem = {
    task: inputValue,
    check: false,
    clasName: null,
    timeCreated: new Date(),
    id: (idCount += 1),
    min: Number(minutes),
    sec: Number(seconds),
    playPause: false,
  }

  const editItem = {
    task: editValue,
    check: false,
    clasName: null,
    id: (idCount += 1),
  }

  // Функция для обновления времени "ago" для каждой задачи

  const updateTaskTimes = () => {
    const updateTimes = () => {
      setTask((tasks) =>
        tasks.map((taskes) => ({
          ...taskes,
          created: formatDistanceToNowStrict(taskes.timeCreated, {
            addSuffix: true,
          }),
        }))
      )
    }
    updateTimes()

    const intId = setInterval(() => updateTimes(), 1000)

    return intId
  }

  const handleInputChange = (newValue) => {
    setInputValue(newValue) // Обновляем состояние
  }

  const handleMinuteChange = (newValue) => {
    setMinute(newValue) // Обновляем состояние
  }
  const handleSecondsChange = (newValue) => {
    setSeconds(newValue) // Обновляем состояние
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

  useEffect(() => {
    const time = setInterval(() => {
      setTask((prevTask) =>
        prevTask.map((it) => {
          if (it.sec !== 0 || it.min !== 0) {
            if (it.playPause) {
              if (it.sec < 1) {
                return { ...it, sec: 59, min: Number(it.min) - 1 }
              }
              return { ...it, sec: Number(it.sec) - 1 }
            }
          }
          return it
        })
      )
    }, 1000)

    return () => clearInterval(time)
  }, [])

  const elem = filterResult.map((item) => {
    const { id, playPause, ...itemProps } = item

    return (
      <Task
        key={id}
        {...itemProps}
        onPlay={() => {
          if (playPause === true) {
            return
          }
          let play = [...task]
          play = task.map((playItem) => {
            if (playItem.id === id) {
              const plItem = playItem
              plItem.playPause = true
              return playItem
            }
            return playItem
          })
          setTask(play)
        }}
        onPause={() => {
          if (playPause === false) {
            return
          }
          let pause = [...task]
          pause = task.map((pauseItem) => {
            if (pauseItem.id === id) {
              const pausItem = pauseItem
              pausItem.playPause = false
              return pausItem
            }
            return pauseItem
          })
          setTask(pause)
        }}
        onDeleted={() => {
          clearInterval(intervalId) // Очищаем интервал
          setTask(task.filter((it) => it.id !== id))
        }}
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
              editItem.min = items.min
              editItem.sec = items.sec
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
        onMinuteChange={handleMinuteChange}
        onSecondsChange={handleSecondsChange}
        onAdded={() => {
          if (inputValue.trim().length !== 0 && inputValue.length !== 0) {
            setTask([...task, newItem])
          }
          // Вызываем функцию для отображения времени создания задачи
          const newIntervalId = updateTaskTimes()
          setIntervalId(newIntervalId)

          // Стираем поле ввода
          setInputValue('')
          setMinute('')
          setSeconds('')
        }}
        values={inputValue}
        valueMin={minutes}
        valueSec={seconds}
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
