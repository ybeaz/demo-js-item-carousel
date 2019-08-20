import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as action from '../../DataLayer/actions/index'
import { handleActions } from '../../DataLayer/reduces/handleActions'


interface StateFromProps {
  reduxState: any,
}

interface DispatchFromProps {
  action: any,
  // handleActions: Function,
}


const mapStateToProps = state => {
  return {
    reduxState: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(action, dispatch),
    handleActions,
  }
}

// export const CommonContainer = Component => connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component)
// Look at https://stackoverflow.com/a/48292811/4791116
// Source of ideas: https://spin.atomicobject.com/2017/04/20/typesafe-container-components/
export const CommonContainer = Component => connect<StateFromProps, DispatchFromProps, void>(mapStateToProps, mapDispatchToProps)(Component)
