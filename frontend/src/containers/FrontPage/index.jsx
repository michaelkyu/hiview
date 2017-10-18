import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

import TopPage from '../../components/TopPage/index'
import * as dataSourceActions from '../../actions/datasource'

import teal from 'material-ui/colors/teal';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: teal, // Purple and green play nicely together.
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
})


const FrontPage = props => (
  <MuiThemeProvider theme={theme}>
    <TopPage
      dataSource={props.dataSource}
      dataSourceActions={props.dataSourceActions}
    />
  </MuiThemeProvider>
)

const mapStateToProps = state => (
  {
    dataSource: state.datasource,
  }
)

function mapDispatchToProps(dispatch) {
  return {
    dataSourceActions: bindActionCreators(dataSourceActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage)