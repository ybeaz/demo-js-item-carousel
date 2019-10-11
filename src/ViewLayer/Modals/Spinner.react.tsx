import React from 'react'

import './Spinner.less'

interface Props {
  readonly sid?: string,
}

const Spinner: React.SFC<Props> = (props: Props): JSX.Element => {
  const { sid } = props

  return (
    <div className={`Spinner Spinner_${sid}`}>
      <img
        src='https://userto.com/img/spinner.gif'
        alt='Loading'
      />
    </div>
  )
}

export default Spinner
