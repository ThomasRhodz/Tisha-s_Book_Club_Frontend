//For Components
import React, {useState} from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Stack,  Divider, Button, TextField, Select, InputLabel, FormControl, MenuItem } from '@mui/material'

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Methods for api call
import { useGetLastBookQuery, useAddBookMutation, useGetExactBookQuery, useGetExactBookISBNQuery } from '../../services/bookApi';
import { useGetCategoriesQuery } from '../../services/categoryApi';

//Schema: Rules for inputs
const schema = yup.object({
    book_title: yup.string().required('Book title is required'),
    book_ISBN: yup.string().required('ISBN is required'),
    book_author: yup.string().required('Author is required'),
    publication_year: yup.string().required('Publication year is required'),
    publisher: yup.string().required('Publisher is required'),
    book_copies: yup.string().required('Enter the number of copies'),
    category: yup.number().required('category is required'),
  });

//----------------------------------------------------------------------------------------------------------------------------------------------------

//Functional components: (Main)
const BookForm = ({onClose, toast}) => {

    //Geting the data using api call, use for displaying the ID of the next book registration.
    const {data} = useGetLastBookQuery();

    //Getting the data/ list of categories using api call/ http request, use for mapping an option in a select component
    const {data:categoryData} = useGetCategoriesQuery();
    
    //Array for displaying no category for select component of category
    const emptyCategory = [{'CategoryID':1, 'categoryName': 'No category available' }];

    //Providing a Menuitem base on the content within the data gathered from the http request.
    const renderMenuItem = categoryData ? categoryData.data.map(({CategoryID, CategoryName}) => {
        return (
            <MenuItem key={CategoryID} value={CategoryID}>
                {CategoryName}
            </MenuItem>
        );
    }) : emptyCategory.map(({CategoryID, CategoryName}) => {
        return (
            <MenuItem key={CategoryID} value={CategoryID}>
                {CategoryName}
            </MenuItem>
        );
    });

    //For react hook form
    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    //Setting initial value for the category select component and providing a update method (onChange)
    const [bookCategory, setBookCategory ] = React.useState(1);

    const handleBookCategoryChange = (event) => {
        setBookCategory(event.target.value);
    };

    //renaming the method of api call, so taht it can be called inside a function
    const [addBook] = useAddBookMutation();

    //State for book name and ISBN for rechecking its availability in teh database. storing it an a temporary variable 
    const [bookName, setBookName] = useState('');
    const [bookISBN, setBookISBN] = useState('');

    //using the states as the value for the api call for filtering the database for checking its duplicates.
    const {data:BookData} = useGetExactBookQuery({'filter[BookTitle]': bookName});
    const {data:ISBNData} = useGetExactBookISBNQuery({'filter[BookISBN]': bookISBN});
    
    //the actual function that handles the data within the form for book registration
    const onSubmit = (data) => {

        //saving teh data frok the form ans making a body taht will be pass on and use in the http request for storing a new instance of a book.
        const input = {
            'BookTitle': data.book_title,
            'BookISBN': data.book_ISBN,
            'BookAuthor': data.book_author,
            'BookPublicationYear': data.publication_year,
            'BookPublisher': data.publisher,
            'BookCopies': data.book_copies,
            'CategoryID': data.category
        }
    
        //algorithm for checking the number of duplicates of BookName and Book ISBN number
        let counter = 0;
        for (var i =0 ; i < (BookData ? BookData.data.length : 0); i++) { counter++; };

        let counter2 = 0;
        for (var Z =0 ; Z < (ISBNData ? ISBNData.data.length : 0); Z++) { counter2++; };
        
        //Condition for the actions that will be initiated base on the two counters
        if ( counter === 0 && counter2 === 0){
            addBook(input);
            toast('New book was successfully added.');
            onClose();
        }
        else if ( counter === 0 && counter2 === 1){
            toast('Book ISBN already exists in the database.');
        }
        else if ( counter === 1 && counter2 === 0){
            toast('Book Name already exists in the database.');
        }
        else{
            toast('Book info already exists in the database.');
        }
        
    };

  return (
    <Grid>
        <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
            <Grid item>
            <DialogTitle>New Book</DialogTitle>
            </Grid>

            <Grid item sx={{ width: '100%' }}>
            <Divider light />
            </Grid>
        </Stack>

        <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' alignItems='center' sx={{width: {xs:330, sm: 360, md:450}, padding:2}}>


            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    label={'BookID'}
                    value={data? (data.data.BookID + 1) : 1} 
                    style={{ width: '100%' }}
                    size='small'
                    disabled
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("book_title")}
                    label={'Book Title'} 
                    style={{ width: '100%' }}
                    value={bookName}
                    onChange={(event) => setBookName(event.target.value)}
                    size='small'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("book_ISBN")}
                    label={'Book ISBN'} 
                    style={{ width: '100%' }}
                    value={bookISBN}
                    onChange={(event) => setBookISBN(event.target.value)}
                    size='small'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("book_author")}
                    label={'Book Author'} 
                    style={{ width: '100%' }}
                    size='small'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("publication_year")}
                    label={'Publication Year'} 
                    style={{ width: '100%' }}
                    size='small'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("publisher")}
                    label={'Publisher'} 
                    style={{ width: '100%' }}
                    size='small'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("book_copies")}
                    label={'Book Copies'} 
                    style={{ width: '100%' }}
                    size='small'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item  sx={{ width:'100%' }}>
                <FormControl variant="outlined" sx={{ width:'100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                    {...register("category")}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label='Category'
                    size='small'
                    value={bookCategory}
                    onChange={handleBookCategoryChange}
                >
                    {renderMenuItem}
                </Select>
                </FormControl>
            </Grid>

        </Grid>
        
        <DialogActions sx={{ paddingRight:2 }}>
            <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
                Discard
            </Button>
            <Button variant='contained' type='submit'  sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'NONE', fontFamily:'Playfair Display',}}>
                Add book
            </Button>
        </DialogActions>
        </form>
    </Grid>
  )
}

export default BookForm