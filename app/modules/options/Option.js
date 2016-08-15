import React, { Component, PropTypes } from 'react';
import './Options.css';

const OptionsHeader = ({

}) => {
  return (
    <div>
      Select Your Options
    </div>
  )
}

const Reroll = ({
  clickHandler
}) => {
  return (
    <button onClick={clickHandler} className="btn waves-effect waves-light" type="submit" name="action">Reroll
      <i className="material-icons right">replay</i>
    </button>
  )
}

const RadioOptionItem = ({
  id,
  text,
  click,
  checked,
}) => {
  const onClick = (e) => {
    if (e.target.value === "on") {
      click(text);
    }
  }
  return (
    <p>
      <input checked={checked} onClick={(e) => onClick(e)}  name="group1" type="radio" id={`radio-button-${id}`} /> 
      <label htmlFor={`radio-button-${id}`} >{text}</label>
    </p>
  )
}

const CheckboxItem = ({
  id,
  text,
  click,
  checked,
}) => {

  const onClick = e => {
    console.log(e.target.value);
    if (e.target.value === 'on') {
      click(text);
    }
  }

  return (
    <p>
      <input checked={checked} onClick={e => onClick(e) }type="checkbox" id={`checkbox-id-${id}`} />
      <label htmlFor={`checkbox-id-${id}`}>{text}</label>
    </p>
  )
}

export default class Options extends Component {
  constructor(props) {
    super(props);
  }

  optionProps(item) {
    const { map, selectUniqueOption } = this.props;
    return {
      text: item,
      click: (val) => {
        selectUniqueOption(val);
      },
      checked:(() => {
        return map.selectedOptions.includes(item);
      })()
    }
  }

  checkboxProps(item) {
    const { map, selectMap, removeOption } = this.props;
    return {
      text: item,
      click: (val) => {
        if (map.selectedOptions.includes(item))
          removeOption(val);
        else
          selectMap(val);
      },
      checked: (() => {
        return map.selectedOptions.includes(item);
      })()
    }
  }

  render() {
    const { map, reroll } = this.props;

    return (
      <div className="option-container" >
        <OptionsHeader />
        <form action="#">
          { 
            map.presetOptions.map((option, i) => {
              return <RadioOptionItem id={i} key={i} { ...this.optionProps(option) }/>
            })
          }
        </form>
        <form action="#">
          {
            map.options.map((option, i) => {
              return <CheckboxItem id={i} key={i} { ...this.checkboxProps(option) }/>
            })
          }
        </form>
        <Reroll clickHandler={reroll}/>
      </div>
    )

  }
}

Option.propTypes = {

}
