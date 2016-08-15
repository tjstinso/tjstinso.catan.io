import React, { Component, PropTypes } from 'react';
import './Canvas.css';

export default class Canvas extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    const { view } = this.props;
    let ele = this.refs.myCanvas;
    let ctx = this.refs.myCanvas.getContext('2d');
    ctx.clearRect(0,0,ele.width,ele.height);

  }

  componentDidUpdate() {
    this.paint();
  }

  componentDidMount() {
    const { view, map } = this.props;
    const ele = this.refs.myCanvas;
    const ctx = this.refs.myCanvas.getContext('2d');
    let size = Math.min(this.refs.parent.parentElement.clientWidth, this.refs.parent.parentElement.clientHeight);
    this.refs.parent.width = size;
    this.refs.parent.height = size;
    this.sizeListener();
    this.resizeCanvas();
  }

  sizeListener() {
    window.addEventListener('resize', () => { this.resizeCanvas(); }, false);
  }

  resizeCanvas() {
    let ctx = this.refs.myCanvas.getContext('2d');
    let ele = this.refs.myCanvas;
    let parent = this.refs.parent;
    ctx.clearRect(0,0,ele.width,ele.height);
    
    let width = parent.parentNode.clientWidth;
    let height = parent.parentNode.clientHeight;

    if (width > height) {
      ele.width = height;
      ele.height = height;
    } else {
      ele.width = width;
      ele.height = width;
    }
    this.props.updateSize(ele.width, this.props.map);
    this.paint();
  }

  paint() {
    const { map, view } = this.props;
    let ctx = this.refs.myCanvas.getContext('2d');
    view.map.draw(map.map, ctx);
  }

  render() {
    const { width } = this.props.view.map;

    return (
      <div className="canvas-first-parent valign-wrapper" ref="parent" style={{
      }} >
        <canvas className="valign" ref="myCanvas" />
      </div>
    )
  }

}

Canvas.propTypes = {
  view: PropTypes.object,
}

