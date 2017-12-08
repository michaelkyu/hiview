import React, {Component, PropTypes} from 'react'

import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Switch from 'material-ui/Switch'

class ColorMapSelector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      enabled: true
    }
  }

  render() {
    return (

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.enabled}
              onChange={(event, checked) => this.setState({ enabled: checked })}
            />
          }
          label="Enable Primary Edge Color Mapping:"
        />
      </FormGroup>
    )
  }

}

export default ColorMapSelector
