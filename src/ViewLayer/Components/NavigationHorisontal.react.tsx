
import React from 'react'
import { Link  } from 'react-router-dom'
import './NavigationHorisontal.less'

interface Props {}

const defaultProps: Props = {}

const NavigationHorisontal: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...inputProps }


  // ************ LIFECYCLE METHODS ************


  // ************ FUNCTIONS ************


  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {

  }

  // ************ RENDER SECTION ************
  const action = { type: 'action1'}
  return <nav className='Navigation'>
    <ul className='Navigation__ul'>
      <li className='Navigation__li'>
        <Link to='/demo-js-item-carousel.html/ItemList' className='Navigation__a'>
          <span>Home</span>
        </Link>
      </li>
    </ul>
  </nav>

}

export default NavigationHorisontal
