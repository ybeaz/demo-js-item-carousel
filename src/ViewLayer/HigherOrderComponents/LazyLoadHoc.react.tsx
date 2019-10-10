
import React from 'react'

interface Props {}

const defaultProps: Props = {}

const LazyLoadContainer: React.SFC<Props> = (InputComponent: JSX.Element): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...InputComponent }


  // ************ LIFECYCLE METHODS ************


  // ************ FUNCTIONS ************


  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {

  }

  // ************ RENDER SECTION ************
  const action = { type: 'action1'}
  return <div onClickCapture={e => handleEvents(e, action)}>
    TemplatePureFunctional
  </div>
}

export default LazyLoadContainer

/* 
export const BackgroundColor = (WrappedComponent, props) => {
  return class extends React.Component {
    render(){
      const propsToPass = { ...this.props, ...props }
      return <WrappedComponent {...propsToPass} />
    }
  }
}

// Another variant
export const BackgroundColor1 = (WrappedComponent, props) => {
  class HOC extends React.Component {
    render(){
      const propsToPass = { ...this.props, ...props }
      return <WrappedComponent {...propsToPass} />
    }
  }
  return HOC
}
*/