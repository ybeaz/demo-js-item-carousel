
import React from 'react'

import './Header.less'

interface Props {
  children: any,
}

const defaultProps: Props = {
  children: '',
}

const Header: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...inputProps }


  // ************ LIFECYCLE METHODS ************


  // ************ FUNCTIONS ************


  // ************ EVENT HANDLERS ************

  
  // ************ RENDER SECTION ************
  return <header className='Header'>
    {props.children}
  </header>
}

export default Header
