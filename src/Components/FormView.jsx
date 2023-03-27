import React, { Component } from 'react';

class FormView extends Component {
  render() {
    return (
      <>
        <form className="form">
          <p>Поиск по #тегу</p>
          <input
            className="integ"
            placeholder="Поиск по тегу"
            value={this.props.tag}
            onChange={this.props.noteChange}
          />
          <button
            className="btn btn-primary btn-sm m-2  one"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Поиск заметки по тегу"
            onClick={this.props.searchTag}
          >
            Поиск
          </button>
        </form>

        <form className="form2">
          <p>Введите данные</p>
          <textarea
            className="omne"
            value={this.props.value}
            onChange={this.props.handleChange}
            placeholder="Введите техт"
          ></textarea>
          <button
            className="btn btn-success btn-sm m-2 one"
            onClick={this.props.handleSubmit}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Сохранить введенное значение"
          >
            Сохранить
          </button>
        </form>

        <ul>
          {this.props.data.length > 0
            ? this.props.data.map((item, index) => (
                <div key={index}>
                  <li onClick={() => this.props.handleActive(item)}>{item}</li>
                  <button
                    onClick={() => this.props.edit(index)}
                    className="btn btn-success btn-sm m-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="1. Вводишь текс в поле
                          2. жмешь  внести изменение для сохранения"
                  >
                    Внести изменения
                  </button>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => this.props.delEvent(index)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Удаляет значение текущей строки"
                  >
                    Удалить текущую информацию
                  </button>
                </div>
              ))
            : null}
        </ul>

        <ul>
          {this.props.note.length > 0
            ? this.props.note.map((item, index) => (
                <div key={index}>
                  <li>{item}</li>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => this.props.delHashtag(index)}
                  >
                    Удалить
                  </button>
                </div>
              ))
            : null}
        </ul>
      </>
    );
  }
}
export default FormView;
