import React, { Component } from 'react'

import TermDetailsPanel from './TermDetailsPanel'
import GenePropertyPanel from './GenePropertyPanel'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'

const PANEL_TYPES = {
  GENE: 'gene',
  TERM: 'term'
}

class PropertyPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      panelWidth: this.props.width,
      panelHeight: window.innerHeight * 0.5,
      expand: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const selected = this.props.events.get('selected')
    const selectedNew = nextProps.events.get('selected')
    const currentProperty = this.props.currentProperty
    const newProperty = nextProps.currentProperty

    if (selected !== selectedNew || currentProperty !== newProperty) {
      this.setState({
        open: true
      })
    }
  }

  render() {
    const propType = this.props.currentProperty.propType
    let label = '?'

    if (propType === PANEL_TYPES.TERM) {
      label = this.props.currentProperty.data.Label
    } else if (propType === PANEL_TYPES.GENE) {
      label = this.props.currentProperty.id
    }

    const barTitle = label

    const drawerContentsStyle = {
      width: '100%',
      height: '100%',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }

    let appBarPosition = 'absolute'

    const fontColor = propType === PANEL_TYPES.GENE ? '#666666' : 'orange'

    return (
      <div style={drawerContentsStyle}>
        <AppBar position={appBarPosition} color={'default'}>
          <Toolbar>
            <h2 style={{ color: fontColor }}>{barTitle}</h2>
          </Toolbar>
        </AppBar>

        {this.getPanel(this.props.width)}
      </div>
    )
  }

  getPanel = (w) => {
    // Do not return any component if nothing is selected.
    if (this.props.currentProperty.id === null) {
      return <div />
    }

    // This will be gene or term.
    const propType = this.props.currentProperty.propType

    if (propType === PANEL_TYPES.TERM) {
      return (
        <TermDetailsPanel
          {...this.props}
          width={w}
          height={this.state.panelHeight}
          expanded={this.state.expand}
        />
      )
    } else if (propType === PANEL_TYPES.GENE) {
      // Check namespace props here...
      return <GenePropertyPanel {...this.props} />
    } else {
      // Unsupported type
      return (
        <div>
          <h2>Unknown prop type</h2>
        </div>
      )
    }
  }
}

export default PropertyPanel
