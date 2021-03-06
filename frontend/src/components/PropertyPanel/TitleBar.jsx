import React from 'react'
import OpenIcon from 'material-ui-icons/OpenInNew'
import Typography from 'material-ui/Typography'

import style from './style.css'

const titleContainerStyle = {
  height: '4em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0
}

const TitleBar = props => (
  <div style={titleContainerStyle}>
    <OpenIcon
      className={style.linkIcon}
      onClick={handleClick(props.geneSymbol)}
    />
    <Typography
      variant="display1"
      align="center"
      style={{ color: '#333333', fontSize: '2.5em', marginRight: '0.7em' }}
    >
      {props.geneSymbol}:
    </Typography>
    <Typography
      variant="display2"
      style={{ color: '#666666', fontSize: '1.3em' }}
    >
      {props.title}
    </Typography>
  </div>
)

const handleClick = gene => () => {
  window.open(`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
}

export default TitleBar
