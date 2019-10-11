
import React from 'react'
import { Link  } from 'react-router-dom'

import * as serviceFunc from '../../Shared/serviceFunc'

import './NavigationHorisontal.less'

interface Props {
  navList: string[],
}

const defaultProps: Props = {
  navList: [''],
}

const NavHorizontal: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...inputProps }


  // ************ LIFECYCLE METHODS ************


  // ************ FUNCTIONS ************ 

  const getItemList: Function = (arr: string[]): JSX.Element[] =>
    arr.map((item: any, i: number) => (
      <li key={`NavHorizontal_li_${i}`} className='NavHorizontal__li'>
        <Link to={item.to} className='NavHorizontal__a'>
          <div 
            className={`NavHorizontal__capture ${serviceFunc.getNavActiveClass(item.active)}`}>
            {item.capture}
          </div>
        </Link>
      </li>
    ))

  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {

  }

  // ************ RENDER SECTION ************
  const action = { type: 'action1'}
  const { navList } = props
  return <nav className='NavHorizontal'>
    <ul className='NavHorizontal__ul'>
      {getItemList(navList)}
    </ul>
  </nav>

}

export default NavHorizontal
