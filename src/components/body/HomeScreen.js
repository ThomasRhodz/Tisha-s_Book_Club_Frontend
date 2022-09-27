//For components
import React from 'react';
import { Button, Grid, Typography, Stack } from '@mui/material';

//changing page with state
import { Link } from 'gatsby'; 

//Image
import Logo from '../../images/TBCLogo.png' // importing and image

//Functional component (Main)
const HomeScreen = () => {

    //variable to be pass on as a props for determining a module to display
    const ModuleFocus =  { id: '1' };
    const ModuleFocus2 =  { id: '2' };
    const ModuleFocus3 =  { id: '3' };

  return (
    // Main/Parent Container
    <Grid container direction='column' alignItems='center' sx={{ width: '100%', pt: 10 }}>
        
        {/* First item/child conytainer: Logo */}
        <Grid item>
            <img src={Logo} alt='IND Logo' style={{ width:650, height:170}} />
        </Grid>

        {/* Item/Child container holding the buttons  */}
        <Grid item sx={{ width: 400 }}>

            {/* Container (stack) for making the buttons to align vertically */}
            <Stack direction='column' >
                <div style={{ height:30 }}/>{/* serve as separator space between components */}

                {/* First Button */}
                <Link id="label" style={{textDecoration:'none', color:'white'}} to="/moduleScreens" state={ModuleFocus}>
                    <Button variant='contained' sx={{ width:400, pt:2, pb:2 }} >
                        <Typography variant='h4' sx={{ fontFamily: 'Arvo', textTransform:'none', color:'white' }}>
                            Search a Book
                        </Typography>
                    </Button>
                </Link>
                <div style={{ height:20}}/> {/* serve as separator space between components */}

                {/* Second Button */}
                <Link id="label" style={{textDecoration:'none', color:'white'}} to="/moduleScreens" state={ModuleFocus2}>
                    <Button variant='contained' sx={{ width:400, pt:2, pb:2 }}>
                        <Typography variant='h4' sx={{ fontFamily: 'Arvo', textTransform:'none', color:'white' }}>
                            Book Module
                        </Typography>
                    </Button>
                </Link>
                <div style={{ height:20 }}/>{/* serve as separator space between components */}
        
                {/* Third Button */}
                <Link id="label" style={{textDecoration:'none', color:'white'}} to="/moduleScreens" state={ModuleFocus3}>
                    <Button variant='contained' sx={{ width:400, pt:2, pb:2}}>
                        <Typography variant='h4' sx={{ fontFamily: 'Arvo', textTransform:'none', color:'white' }}>
                            Category Module
                        </Typography>
                    </Button>
               </Link>
            </Stack>{/* End of container (stack) */}
        </Grid>{/* End of 2nd item container (Grid) */}
    </Grid> //* End of Parent container (Grid)
  )
}

export default HomeScreen