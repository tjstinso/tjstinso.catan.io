import React, { Component, PropTypes } from 'react';
import './Options.css';

const OptionsHeader = ({
  text
}) => {
  return (
    <div>{text}</div>
  )
}

const Reroll = ({
  clickHandler
}) => {
  return (
    <button onClick={clickHandler} className="option-button btn waves-effect waves-light" type="submit" name="action">Reroll
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
    <p className="radio-item radio-item-secondary">
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
    if (e.target.value === 'on') {
      click(text);
    }
  }

  return (
    <p className="radio-item">
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
    const { map, setMode } = this.props;
    return {
      text: item,
      click: (val) => {
        setMode(val);
      },
      checked:(() => {
        return map.mode === item;
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

  renderOptions() {
    const { map } = this.props;
    return map.mode === 'CUSTOM' ? (
      <div>
        <OptionsHeader text={"Select Custom"}/>
        <form action="#">
          {
            map.options.map((option, i) => {
              return <CheckboxItem id={i} key={i} { ...this.checkboxProps(option) }/>
            })
          }
        </form>
      </div>
    ) : null 
  }

  render() {
    const { map, reroll } = this.props;

    return (
      <div className="option-container" >
        <h4>Options </h4>

        <OptionsHeader text={"Select Preset"}/>
        <form action="#">
          { 
            map.presetOptions.map((option, i) => {
              return <RadioOptionItem id={i} key={i} { ...this.optionProps(option) }/>
            })
          }
        </form>
        { this.renderOptions() }


        <Reroll clickHandler={reroll}/>
      </div>
    )

  }
}

Option.propTypes = {

}
