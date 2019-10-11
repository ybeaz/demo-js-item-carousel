import React from 'react'

import './ItemCard.less'

interface Props {
  handleEvents?: Function,
  classNameAdd?: string,
  name?: string,
  alt?: string,
  width?: number,
  href?: string,
  height?: number,
  high?: number,
  low?: number,
}

const defaultProps: Props = {}

const ItemCard: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props: Props = { ...defaultProps, ...inputProps }

  // ************ LIFECYCLE METHODS ************

  // ************ FUNCTIONS ************

  // ************ EVENT HANDLERS ************

  // ************ RENDER SECTION ************
  const {
    handleEvents: handleEventsProps, classNameAdd, name, alt, width, href, height, high, low
  } = props

  return <div className={`ItemCard ${classNameAdd}`} >
    <div className='ItemCard__name_wrapper'>
      <div className='ItemCard__name'>
        {name}
      </div>
    </div>
    <img
      className='ItemCard__images' src={href}
      width={width} height={height} alt={alt}
      onLoad={e => handleEventsProps(e, {type: 'imageLoaded'})}
      onClick={e => handleEventsProps(e, {type: 'openModalImgSized'})}
    />
    <div className='ItemCard__priceRange'>
      <div className='ItemCard__priceRange_regular_high'>${high}-</div>
      <div className='ItemCard__priceRange_regular_low'>${low}</div>
    </div>
  </div>
}

export default ItemCard
