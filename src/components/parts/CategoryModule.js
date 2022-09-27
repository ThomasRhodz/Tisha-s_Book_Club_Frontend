import React from 'react'
import { Grid, Container, Stack, Typography, Divider, Button, IconButton } from '@mui/material'
import Link from '@mui/material/Link';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { SearchField } from '../form/FormComponents';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

//Dialog
import Dialog from '@mui/material/Dialog';
import CategoryForm from '../form/CategoryForm';

import CategoryTable from '../table/CategoryTable';


function Copyright(props) {
    return (
      <Typography variant="body2" style={{color:'white'}} align="center" {...props}>
        {'Copyright © '}
        <Link style={{color:'white'}} href="https://mui.com/">
          Tisha's Book Club
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const CategoryModule = ({toast}) => {

  //States
  const [open, setOpen] = React.useState(false); //-> for open and close of dialog
  const [search, setSearch] = React.useState('')
  const [finalSearch, setFinalSearch] = React.useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchInitiate = () => {
    setFinalSearch(search)
  }
  
    //function for opening and closing the dialog
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    //Function for closing the create forumn dialog
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack direction='column'>
            
            
            <Stack direction='row' sx={{pb:1}}>
              <Grid sx={{flexGrow:1}}>
                <Typography variant='h4' sx={{fontFamily:'Raleway', fontWeight:'bold', color:'white'}}>
                  Category Module
                </Typography>
              </Grid>

              <Grid sx={{flexGrow:1}}>
                <Stack direction='row' sx={{backgroundColor:'white', width:300, p:2, pt: 0, pb:0, borderRadius:10 }} >
                    <SearchField
                      variant='outlined'
                      inputProps={{ style: { fontFamily: 'raleway',}}}
                      placeholder={'Search'}
                      value={ search } 
                      onChange={handleSearchChange}
                      size='small'
                    />
                    <IconButton onClick={() => searchInitiate()} color="secondary">
                      <SearchRoundedIcon sx={{ color:'gray' }} />
                    </IconButton>
                  </Stack>
              </Grid>
              
              <Grid >
                <Button variant='contained' startIcon={<AddRoundedIcon style={{ fontSize:30}}/>} onClick={() => handleClickOpen()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'NONE'}}>
                  <Typography variant='body1' sx={{fontFamily:'Raleway', fontWeight:'bold', color:'white'}}>
                    Add new category
                  </Typography>
                </Button>    
              </Grid>
            </Stack>

            <Divider  sx={{ borderBottomWidth: 0.1, backgroundColor:'#d5eaef' }} />
            <Grid container direction='column' alignItems='center' sx={{ width:'100%' }}>
                <CategoryTable search={finalSearch} toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>
        </Stack>
        
        <Copyright sx={{ pt: 4 }} />

        <Dialog open={open} onClose={handleClose} scroll='body'>
          <CategoryForm onClose={() => handleClose()} toast={(stringMessage)=>toast(stringMessage)}/>
        </Dialog>
    </Container>
  )
}

export default CategoryModule