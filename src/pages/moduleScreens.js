import { Grid } from '@mui/material'
import React from 'react'
import Drawer from '../components/body/MainDrawer'

const moduleScreens = ({location}) => {
    const tabFocus = location?.state?.id
  return (
    <Grid >
      <Drawer tabFocusesOn={tabFocus}/>
    </Grid>
  )
}

export default moduleScreens