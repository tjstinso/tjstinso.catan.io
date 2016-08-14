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

class OptionItem extends Component {
  constructor(props) {
    super(props);
  }

  click(e) {
    if (e.target.value === "on") {
      this.props.click(this.props.text);
    }
  }

  render() {
    const { id, text } = this.props;
    return (
      <p>
        <input onClick={(e) => this.click(e)} ref='check' name="group1" type="radio" id={`radio-button-${id}`} /> 
        <label htmlFor={`radio-button-${id}`} >{text}</label>
      </p>
    )
  }
}

export default class Options extends Component {
  constructor(props) {
    super(props);
  }

  optionProps(item) {
    const { selectUniqueOption, gameOptions } = this.props;
    return {
      text: item,
      click: (val) => {
        selectUniqueOption(val);
      }
    }
  }

  render() {
    const { gameOptions } = this.props;

    return (
      <div className="option-container" >
        <OptionsHeader />
        <form action="#">
          { 
            gameOptions.options.map((option, i) => {
              return <OptionItem id={i} key={i} { ...this.optionProps(option) }/>
            })
          }
        </form>
      </div>
    )
  }
}

Option.propTypes = {
  /**
   * 
   *
   * @returns {undefined}
   */
  gameptions: PropTypes.object,
}
