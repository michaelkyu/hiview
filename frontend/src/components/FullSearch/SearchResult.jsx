import React, {Component} from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import OpenIcon from 'material-ui-icons/OpenInNew'

import Collapse from 'material-ui/transitions/Collapse';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';


import AliasList from './AliaseList'


const resultStyle = {
  maxHeight: '40em',
  overflow: 'auto',
}


class SearchResult extends Component {

  state = {}

  buildNestedList = (idList, id2prop) => {

    const nestedList = {}

    // Creates basic structure only with original nodes
    idList.forEach(id => {
      const props = id2prop[id]
      if (!props.Hidden) {
        nestedList[props.Label] = {
          props: props,
          children: {
            [id]: props
          }
        }
      }
    })

    idList.forEach(id => {
      const props = id2prop[id]
      if (props.Hidden) {
        const label = props.Label
        const parent = nestedList[label]
        parent.children[id] = props
      }
    })

    return nestedList
  }

  handleClick = (nodeId, rootId) => {
    this.props.commandActions.findPath([nodeId, rootId])
  };

  handleToggle = (label) => {
    if(this.state[label] === undefined) {
      this.setState({[label]: true});
    } else {
      this.setState({[label]: !this.state[label]});
    }
  }

  render() {
    let results = this.props.search.result

    if (results === undefined || results === null) {
      return (
        <List style={resultStyle}>
          <ListItem>
            <ListItemText
              primary={'No result!'}
            />
          </ListItem>
        </List>
      )
    }

    const id2prop = this.props.id2prop
    const nestedList = this.buildNestedList(results, id2prop)
    const parents = Object.keys(nestedList)

    return (
      <List style={resultStyle}>
        {
          parents.map((parent, i) =>

            (
              <div>
                <ListItem
                  key={i}
                >
                  <ListItemIcon
                    onClick={(e) => this.handleClick(nestedList[parent].props.id, this.props.rootId)}
                  >
                    <OpenIcon
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={nestedList[parent].props.Label}
                    secondary={nestedList[parent].props.NodeType}
                  />
                  {this.state[parent] ?
                    <ExpandLess
                      onClick={(e) => this.handleToggle(parent)}
                    /> :
                    <ExpandMore
                      onClick={(e) => this.handleToggle(parent)}
                    />
                  }
                </ListItem>

                <Collapse component="li" in={this.state[parent]} timeout="auto" unmountOnExit>
                  <AliasList
                    rootId={this.props.rootId}
                    aliases={nestedList[parent].children}
                    commandActions={this.props.commandActions}
                    currentPath={this.props.currentPath}
                  />
                </Collapse>
              </div>
            )
          )
        }
      </List>
    )
  }
}


export default SearchResult
