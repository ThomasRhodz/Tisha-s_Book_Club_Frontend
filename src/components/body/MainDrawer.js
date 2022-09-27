//Components
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

//Premade Components
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {Box, Toolbar,  Divider, IconButton, CssBaseline, Grid, Tooltip }  from '@mui/material/';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';

//For navigation
import { navigate } from 'gatsby'; //navigate redirect you to a page 

//For notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Body Components
import SearchModule from '../parts/SearchModule';
import CategoryModule from '../parts/CategoryModule';
import BookModule from '../parts/BookModule';

//Image and Icons
import Logo from '../../images/TBCLogo.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {BiBook, BiSearchAlt, BiCategoryAlt} from 'react-icons/bi';

//Variable: for initializing the width if the drawer.
const drawerWidth = 240;


//Styling Drawer and transition
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
//End of drawer styling


//Styling App Bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
//End of app bar styling


//Functional Component (Main)
const MainDrawer = ({tabFocusesOn}) => {

  //initializing a tost as a function that will be dynamic depending on the action done by the user.
  const notify = (message) => toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    
  //State and functions
  const [open, setOpen] = React.useState(false); //State for drawer

  //Handling Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [menuItem, setMenuItem] = React.useState(tabFocusesOn); //State for Menu or what tab is currently open
  const theme = useTheme();

  //Array of static menu
  const appMenu = [
    {
      id: '1',
      title: 'Search a Book',
      collapse: false,
    },
    {
      id: '2',
      title: 'Book Form',
      collapse: false,
    },
    {
      id: '3',
      title: 'Category Form',
      collapse: false,
    },
    
  ];

  //Function for  mapping/looping the array of menu items from appMenu in the drawer
  const renderAppMenu = appMenu.map(({id, title}) => {
    
    //function for choosing the icon for the menu item
    const iconSwitcher = () => {
      if (id==='1') {
        return ( <BiSearchAlt style={{ fontSize: 25, color: menuItem===id ? '#61B1C1' : 'white'}}/> );
      } 
      else if(id==='2'){
        return ( <BiBook style={{ fontSize: 25, color: menuItem===id ? '#61B1C1' : 'white'}} /> );
      }
      else if(id==='3'){
        return ( <BiCategoryAlt style={{ fontSize: 25, color: menuItem===id ? '#61B1C1' : 'white'}} /> );
      }
    };

    return (
      // Rendering the list item and using icon switcher to set its icon.
      <ListItem key={id} disablePadding sx={{ display: 'block' }}>
        <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,}} onClick={() => setMenuItem(id)}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
            {iconSwitcher()}
          </ListItemIcon>
          <ListItemText primary={title} sx={{ opacity: open ? 1 : 0, }} style={{color:'white', fontFamily:'arvo'}} />
        </ListItemButton>
      </ListItem>
    )
  })

  return (
    //Main container: Box
    <Box sx={{ display: 'flex' }}>

      {/* Component that contain the notification as toas when action is done. */}
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>

      {/* App Bar Component */}
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#0B1C2B'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon style={{color:'white'}}/>
          </IconButton>
          <Grid sx={{ flexGrow:1 }} onClick={()=>navigate('/')}>
            <img src={Logo} alt='IND Logo' style={{ width:160, height:30}}  />
          </Grid>
          <Tooltip title='Go back'>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => navigate('/')}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <ArrowBackIcon style={{color:'white'}}/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Drawer that contains the menu */}
      <Drawer variant="permanent" open={open} PaperProps={{ sx: {backgroundColor: '#0B1C2B'} }}>
        
        {/** For minimizing the menu */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:'white'}}/> : <ChevronLeftIcon style={{color:'white'}}/>}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/** For minimizing the menu */}
        <List>
         {renderAppMenu}
        </List>  
      </Drawer>
      
      {/* Component container (child): Box */}
      <Box component="main" sx={{backgroundColor: "#0e2336", flexGrow: 1, height: '100vh', overflow: 'auto'}}>

        <DrawerHeader />

        <Grid display={menuItem==='1' ? 'flex' : 'none'}>
          <SearchModule />
        </Grid>
        <Grid display={menuItem==='2' ? 'flex' : 'none'}>
          <BookModule toast={(stringMessage)=>notify(stringMessage)} />
        </Grid>
        <Grid display={menuItem==='3' ? 'flex' : 'none'}>
          <CategoryModule toast={(stringMessage)=>notify(stringMessage)} />
        </Grid> 
      </Box>{/* End of child container: box (container for components) */}
      
    </Box>//End of parent container: Box
  )
}

export default MainDrawer