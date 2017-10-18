import React from 'react'

import OntologySelector from './OntologySelector'

import style from './style.css'

const TopPage = props => (
  <div className={style.container}>

    <div className={style.row1}>
      <div className={style.titleText}>
        HiView &alpha;
      </div>

      <div className={style.subtitle}>
        Universal browser for hierarchical data
      </div>
    </div>

    <OntologySelector
      {...props}
    />

    <footer className={style.row3}>
      <a href='http://www.cytoscape.org/' target='_blank'>
        &copy; 2017 University of California, San Diego Trey Ideker Lab
      </a>
    </footer>
  </div>
)

export default TopPage