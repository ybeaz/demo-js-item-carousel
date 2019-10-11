import React from 'react'

import * as serviceFunc from '../../Shared/serviceFunc'
import './Spinner.less'

interface Props {
  readonly sid?: string,
  readonly display: boolean,
}

const Spinner: React.SFC<Props> = (props: Props): JSX.Element => {
  const { sid, display } = props
  const displayClass = serviceFunc.getDisplayClass(display)

  return (
    <div className={`Spinner Spinner_${sid} ${displayClass}`}>
      <img
        src='https://userto.com/img/spinner.gif'
        alt='Loading'
      />
    </div>
  )
}

export default Spinner
