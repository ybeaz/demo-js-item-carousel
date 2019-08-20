import React from 'react'

interface Props {
  readonly itemsSrc: any,
  readonly activeItem: any,
  readonly handleEvents: Function,
}
interface State {
}

export class Pagination extends React.Component<Props, State> {
  public static defaultProps: any = {
  }

  paginationRender = ( source, activeItem, handleEvents ) => {

    const items = source.map(( item, i ) => {
      let itemClass = 'page-item'
      if (item.id === activeItem) {
        itemClass += ' active'
      }
      // console.info('MenuContent->paginationRender', { id: item.id, item, pageItemClass, activeItem: activeItem })
      return <li key={i} className={ itemClass }>
        <a className="page-link" href="#"
        onClick={ e => handleEvents( e, 'clickItem', item )}>
          { i + 1 }</a>
      </li>
    })

    return (
      <ul className="pagination pagination-sm justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" 
            onClick={e => handleEvents( e, 'prevItem', {}, items )}>Prev</a>
        </li>
        {items}
        <li className="page-item">
          <a className="page-link" href="#"
            onClick={e => handleEvents( e, 'nextItem', {}, items )}>Next</a>
        </li>
      </ul>
    )
  }

  public render(): JSX.Element {
    const { itemsSrc, activeItem, handleEvents } = this.props
    // console.info('MenuContent->render()', { source })

    return <div>{this.paginationRender( itemsSrc, activeItem, handleEvents)}</div>
  }
}
