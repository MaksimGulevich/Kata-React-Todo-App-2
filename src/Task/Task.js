import PropTypes from 'prop-types'
import './Task.css'

function Task({
  onPause,
  onPlay,
  min,
  sec,
  check,
  clasName = null,
  task,
  created,
  onDeleted,
  onEdit,
  onInputEdit,
  onEditInput,
  onCheckedBox,
}) {
  function onChecked(event) {
    onCheckedBox(event.target.checked)
  }

  function handleChangeEdit(event) {
    onInputEdit(event.target.value)
  }

  const t = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`

  return (
    <li className={clasName}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={check} onChange={onChecked} />
        <label htmlFor="edit">
          <span className="title">{task}</span>
          <span className="description">
            <button type="button" className="icon icon-play" aria-label="Старт таймера" onClick={onPlay} />
            <button
              style={{ marginRight: 10 }}
              type="button"
              className="icon icon-pause"
              aria-label="Пауза таймера"
              onClick={onPause}
            />
            {t}
          </span>
          <span className="description">{created}</span>
        </label>
        <button aria-label="Правка задачи" type="button" className="icon icon-edit" onClick={onEdit} />
        <button aria-label="Удаление задачи" type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {clasName === 'editing' && (
        <input
          id="edit"
          type="text"
          defaultValue={task}
          className="edit"
          onFocus={handleChangeEdit}
          onChange={handleChangeEdit}
          onKeyDown={(e) => e.key === 'Enter' && onEditInput()}
          autoFocus
        />
      )}
    </li>
  )
}

Task.propTypes = {
  check: PropTypes.bool.isRequired,
  clasName: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  task: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onInputEdit: PropTypes.func.isRequired,
  onEditInput: PropTypes.func.isRequired,
  onCheckedBox: PropTypes.func.isRequired,
}

export default Task
