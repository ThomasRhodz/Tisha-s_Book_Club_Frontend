import React from 'react'
import { Grid, Container, Stack, Typography, Divider, IconButton, Select, Tooltip, MenuItem,  } from '@mui/material'
import Link from '@mui/material/Link';
import { SearchField } from '../form/FormComponents';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import { useGetCategoriesQuery } from '../../services/categoryApi';
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import SearchTable from '../table/SearchTable';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid white",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: "Arvo",
      "&:focus": {
        borderRadius: 4,
        borderColor: "white",
      },
    },
  }));


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

const SearchModule = () => {

    const {data:categoryData} = useGetCategoriesQuery();
 
    const renderMenuItem = categoryData ? categoryData.data.map(({CategoryID, CategoryName}) => {
        return (
            <MenuItem key={CategoryID} value={CategoryID}>
                {CategoryName}
            </MenuItem>
        );
    }) : [];

  //States
  const [search, setSearch] = React.useState('')
  const [filterOn, setFilterOn] = React.useState(false)
  const handleFilterClick = () => {
    if (filterOn){
        setFilterOn(false)
    }
    else{
        setFilterOn(true)
    }
  };
  const [finalSearch, setFinalSearch] = React.useState('')
  const [bookCategory, setBookCategory ] = React.useState(1);

  const handleBookCategoryChange = (event) => {
    setBookCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchInitiate = () => {
    setFinalSearch(search)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack direction='column'>
            <Stack direction='row' sx={{pb:1}}>
              <Grid sx={{flexGrow:1}}>
                <Typography variant='h4' sx={{fontFamily:'Raleway', fontWeight:'bold', color:'white'}}>
                  Search a Book
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
                <Stack direction='row' sx={{backgroundColor:'white', width:'100%', p:1, pt: 0, pb:0, borderRadius:2 }} >
                    <Select
                        
                        label='Category'
                        size='small'
                        input={<BootstrapInput />}
                        value={bookCategory}
                        onChange={handleBookCategoryChange}
                    >
                        {renderMenuItem}
                    </Select>
                    <Divider orientation='vertical' variant={'middle'} flexItem sx={{ backgroundColor:'gray' }}/>
                    <Tooltip title={filterOn ? 'Turn off filter' : 'Turn on Filter'}>
                        <IconButton onClick={() => handleFilterClick()} color="secondary">
                            <FilterAltIcon sx={filterOn?{display:'none'} : { color:'#61B1C1', display:'flex' }} />
                            <FilterAltOffIcon sx={filterOn?{color:'#61B1C1', display:'flex'} : { display:'none' }}  />
                        </IconButton>
                    </Tooltip>
                </Stack>
                
              </Grid>
            </Stack>

            <Divider  sx={{ borderBottomWidth: 0.1, backgroundColor:'#d5eaef' }} />
            <Grid container direction='column' alignItems='center' sx={{ width:'100%' }}>
                <SearchTable search={finalSearch} filter={filterOn} category={bookCategory} />
            </Grid>
        </Stack>
        
        <Copyright sx={{ pt: 4 }} />
    </Container>
  )
}

export default SearchModule