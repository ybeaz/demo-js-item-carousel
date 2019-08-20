import React from 'react'

import * as Interfaces from '../../Shared/interfaces'
import { CommonContainer } from '../Containers/CommonContainer.react'
import { SectionWrapper } from '../Components/SectionWrapper.react'
import { Carousel } from '../Components/Carousel.react'
import { Pagination } from '../Components/Pagination.react'

interface Props {
  readonly reduxState: any,
  readonly handleActions: Function,
}
interface State {
  groupItem: number,
  imageItem: number,
}

class ItemCardPage extends React.PureComponent<Props, State> {
  public static defaultProps: any = {
  }

  constructor(props: any) {
    super(props)
    this.state = {
      groupItem: 0,
      imageItem: 0,
    }
  }

  componentWillMount(){
    const action: Interfaces.Action = {
      type: 'GET_TREE_DATA',
      data: {},
    }
    // console.info('Analytics02->componentDidUpdate', { analytics })
    this.props.handleActions({}, action)
  }

  getItemCard: Function = (): JSX.Element => {
    const { groupItem, imageItem } = this.state
    const { reduxState } = this.props
    const { treeData } = reduxState
    const { groups } = treeData
    const { name, images, priceRange } = groups ? groups[groupItem] : []
    const { alt = '', rel = '', width = 0, href = '', height = 0 } = groups ? images[imageItem] : {}
    const { regular = {} } = groups ? priceRange : {}
    const { high = 0, low = 0 } = groups ? regular : {}

    return <div className='ItemCard'>
      <div className='ItemCard__name'>{name}</div>
      <img className='ItemCard__images' src={href} width={width} height={height} alt={alt} />
      <div className='ItemCard__priceRange_regular_high'>{high}</div>
      <div className='ItemCard__priceRange_regular_low'>{low}</div>
    </div>
  }


  render(): JSX.Element {
    const itemCardElem = this.getItemCard()

    console.info('ItemCard->render()', { props: this.props, })
    return <SectionWrapper>
      {itemCardElem}
    </SectionWrapper>
  }
}

export const ItemCard: any = CommonContainer(ItemCardPage)
