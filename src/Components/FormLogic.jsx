import React, { Component } from 'react';
import FormView from './FormView';

class Form extends Component {
  constructor(props) {
    super(props); //вызвать конструктор наследуемого класса, те React.Component
    this.state = {
      value: '',
      tag: '',
      data: [],
      note: [],
      json: null,
    };
    // эта привязка обязательна для работы `this` в колбэке, возвращает функцию с жесткой привязкой контекста
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.noteChange = this.noteChange.bind(this);
    this.searchTag = this.searchTag.bind(this);
  }
  //получение активного элемента
  handleActive(item) {
    this.setState({ value: item });
  }

  // Изменить
  noteChange(event) {
    this.setState({
      // добавляет в очередь изменения в состоянии компонента.
      tag: event.target.value, // содержит элемент, на котором сработало событие
    });
  }

  //Поиск
  searchTag(event) {
    event.preventDefault(); // явный вызов обработчика
    let data = this.state.data; // передача значения
    let indexOfStevie = data.findIndex((i) => i.indexOf(this.state.tag) !== -1); // Не равно
    data.unshift(data[indexOfStevie]); // добавляет элемент в начало массива и возвращает новую длину массива
    data.splice(indexOfStevie + 1, 1); //изменяет содержимое массива, удаляя существующие элементы.
    this.setState({
      data: data, // функционально эквивалентно
    });
  }
  handleChange(event) {
    // обновляет состояние React-компонента, значение в поле будет обновляться по мере того, как пользователь печатает
    this.setState({
      value: event.target.value, // добавляет в очередь изменения в состоянии компонента.
    });

    let val = this.state.value.split(/(#[a-z\d-]+;)/gi); //разбивает объект String на массив строк путём разделения строки указанной подстрокой.
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === '#') {
        let array = [];
        array.push(val[i]);
        this.setState({
          note: array, // функционально эквивалентно
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault(); // явный вызов обработчика
    let addJson = {
      data: this.state.data,
      note: this.state.note,
    };
    this.setState({
      data: this.state.data.concat(this.state.value), //возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
      json: JSON.stringify(addJson), //возвращает JavaScript-значение, преобразованное в JSON-строку
    });
  }
  delEvent = (index) => {
    let arr = this.state.data;
    arr.splice(index, 1); //изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые
    this.setState({ data: arr }); // функционально эквивалентно
  };
  delHashtag = (index) => {
    let tag = this.state.note;
    let val = this.state.value;
    let del = tag.splice(index, 1);
    let clearTag = val.substring(0, val.length - 1).replace(del, ''); //возвращает подстроку строки между двумя индексами  возвращает новую строку с некоторыми или всеми сопоставлениями с шаблоном, заменёнными на заменитель
    this.setState({
      note: tag,
      value: clearTag,
    });
  };
  edit = (index) => {
    let val = this.state.value;
    let arr = this.state.data;
    arr.splice(index, 1, val);
    this.setState({ data: arr });
  };
  render() {
    return (
      <div>
        <FormView
          value={this.state.value}
          data={this.state.data}
          note={this.state.note}
          tag={this.state.tag}
          handleChange={this.handleChange}
          delHashtag={this.delHashtag}
          delEvent={this.delEvent}
          edit={this.edit}
          handleSubmit={this.handleSubmit}
          handleActive={this.handleActive}
          searchTag={this.searchTag}
          noteChange={this.noteChange}
        />
      </div>
    );
  }
}
export default Form;
