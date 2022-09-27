import { Grid,Typography, DialogActions, Button } from '@mui/material'
import React from 'react'
import {BsFillInfoCircleFill} from 'react-icons/bs'

const ISBNFormConfirmation = ({counter, ISBN, onClose}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ width: 400, p: 4, pb: 1 }}
    >
      <Grid item>
        <BsFillInfoCircleFill style={{ fontSize: 50, color: "yellow" }} />
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontFamily: "Arvo", color: "green" }}
        >
          Are your sure that the ISBN: {ISBN} is correct?
        </Typography>
      </Grid>
      <DialogActions>
        <Button
          variant="contained"
          type="button"
          onClick={() =>{ onClose();}}
          sx={{
            height: 45,
            minWidth: 40,
            borderRadius: 5,
            color: "green",
            textTransform: "NONE",
            fontFamily: "Playfair Display",
            border: "1px  solid green",
            backgroundColor: "transparent",
            pr: 5,
            pl: 5,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={() =>{ counter(); onClose();}}
          sx={{
            height: 45,
            minWidth: 40,
            borderRadius: 5,
            color: "green",
            textTransform: "NONE",
            fontFamily: "Playfair Display",
            border: "1px  solid green",
            backgroundColor: "transparent",
            pr: 5,
            pl: 5,
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Grid> 
  )
}

export default ISBNFormConfirmation