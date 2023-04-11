import { Component } from "react";

const withMouthePosition = (WrappedComponent) => {
  class Hoc extends Component {

    state = {
        x: 0,
        y: 0
    }

    componentDidMount() {
        document.body.addEventListener('mousemove', this.updateMousePoition)
    }

    updateMousePoition = (e) => {
        this.setState({
            x: e.pageX,
            y: e.pageY
        })
    }

    render() {
      return (
        <WrappedComponent 
            {...this.props}
            mouseX = {this.state.x}
            mouseY = {this.state.y}
        />
      )
    }
  }

  return Hoc;
};

export default withMouthePosition;
