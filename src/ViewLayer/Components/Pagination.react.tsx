import React from 'react'

import * as Interfaces from '../../Shared/interfaces'
import { CommonContainer } from '../Containers/CommonContainer.react'

import './Pagination.less'

interface Props {
  readonly reduxState?: any,
  readonly itemsSrc: any,
    /* Example
      itemsSrc: [
        {
          id: 0,
          capture: 'New York',
          src: 'https://www.w3schools.com/bootstrap4/la.jpg',
          active: true,
        },
        {
          id: 1,
          capture: 'Chicago',
          src: 'https://www.w3schools.com/bootstrap/ny.jpg',
          active: true,
        },
        {
          id: 2,
          capture: 'Los Angeles',
          src: 'https://www.w3schools.com/bootstrap4/la.jpg',
          active: true,
        },
        ...
      ]
    */
  readonly type: string,
    // Type: 'number', if not then 'thumbnail'
  readonly activeItem: number,
    // Serial number of the active item
  readonly handleActions?: Function,
}
interface State {
}

const defaultProps: Props = {
  type: 'thumbnail',
  activeItem: 0,
  itemsSrc: [
    {
      id: 0,
      capture: 'New York',
      src: 'https://www.w3schools.com/bootstrap4/ny.jpg',
      active: true,
    },
    {
      id: 1,
      capture: 'Chicago',
      src: 'https://www.w3schools.com/bootstrap4/chicago.jpg',
      active: true,
    },
    {
      id: 2,
      capture: 'Los Angeles',
      src: 'https://www.w3schools.com/bootstrap4/la.jpg',
      active: true,
    },
  ],
}

const PaginationComp: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  const props: Props = { ...defaultProps, ...inputProps }

  const paginationRender: Function = (
    type: string, source: any, activeItem: number
    ): JSX.Element => {
    const lineHeight = (type === 'number') ? '' : 'Pagination__lineHigher'
    const padding = (type === 'number') ? '' : 'Pagination__padding'
    const items = source.map(( item: any ) => {
      const { id, src } = item
      let itemClass = 'Pagination__item'
      if (id === activeItem) {
        itemClass += ' Pagination__active'
      }
      // console.info('Pagination->paginationRender', { id, activeItem, item })
      return <div key={id} className={`${itemClass} ${padding}`}>
        {type === 'number' ? 
          <a className='Pagination__link_number' href="#"
            onClick={ e => handleEvents(e, {type: 'clickItem', item})}>
            {id + 1}
          </a>
          : <a className='Pagination__link_thumbnail' href="#"
              onClick={ e => handleEvents(e, {type: 'clickItem', item})}>
              <img src={src} className='Pagination__thumbnail' />
          </a>
        }
      </div>
    })

    return (
      <div className='Pagination__list'>
        <div className='Pagination__item_prev'>
          <a className={`Pagination__link_prev ${lineHeight}`} href='#'
            onClick={e => handleEvents( e, {type: 'prevItem'} )}>
            <i className='fas fa-chevron-left' />
          </a>
        </div>
        {items}
        <div className={`Pagination__item_next ${padding}`}>
          <a className={`Pagination__link_next ${lineHeight}`} href='#'
            onClick={e => handleEvents( e, {type: 'nextItem'})}>
            <i className='fas fa-chevron-right' />
          </a>
        </div>
      </div>
    )
  }

  const handleEvents: Function = (e: any, action: Interfaces.Action): void => {
    const { reduxState, handleActions } = props
    const { treeData, indexCollection } = reduxState
    const { pagination } = indexCollection
    const { groups } = treeData

    let data: any
    let paginationNext: number
    // console.info(`Face->handleEvents() type: ${action.type} [0]`, { handleActions, props, action, e })

    switch (action.type) {

      case 'prevItem':
      {
        paginationNext = pagination === 0 ? 0 : pagination - 1
        data = { pagination: paginationNext }
      }
      break

      case 'clickItem':
      {
        data = { pagination: action.item.id }
      }
      break

      case 'nextItem':
      {
        paginationNext = groups.length === pagination + 1? pagination : pagination + 1
        data = { pagination: paginationNext }
      }
      break

      default: {
        console.info(`Pagination->handleEvents unexpected action type: ${action.type}`, { action })
      }
    }

    const action1: Interfaces.Action = {
      type: 'SET_PAGE_IND',
      data,
    }
    handleActions({}, action1)
    // console.info(`Pagination->handleEvents() type: ${action.type} [10]`, { data, props, action, e })
  }

  // render() =>
  const { reduxState, type, itemsSrc, activeItem } = props
  const { modalWindows } = reduxState
  const { display } = modalWindows
  // console.info('Pagination->render()', { activeItem, itemsSrc })

  return <div className='Pagination' >
    {display ? null
    : paginationRender(type, itemsSrc, activeItem)
    }
  </div>

}

export default CommonContainer(PaginationComp)
