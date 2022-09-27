import React, {useState} from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Stack,  Divider, Button, TextField, Select, InputLabel, FormControl, MenuItem, Dialog  } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ISBNFormConfirmation from './ISBNFormConfirmation';

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useGetCategoriesQuery } from '../../services/categoryApi';
import {useUpdateBooksMutation, useDeleteBookMutation, useGetExactBookISBNQuery, useGetExactBookQuery} from '../../services/bookApi'

//Schema: Rules for inputs
const schema = yup.object({
    book_title: yup.string().required('Book title is required'),
    book_ISBN: yup.string().required('ISBN is required'),
    book_author: yup.string().required('Author is required'),
    publication_year: yup.string().required('Publication year is required'),
    publisher: yup.string().required('Publisher is required'),
    book_copies: yup.string().required('Enter the number of copies'),
    category: yup.string().required('category is required'),
    is_active: yup.string().required('status is required'),
  });

const EditBookForm = ({onClose, id, title, ISBN, author, year, publisher, copies, category, stat, toast}) => {

    const {data:categoryData} = useGetCategoriesQuery();
 
    const renderMenuItem = categoryData ? categoryData.data.map(({CategoryID, CategoryName}) => {
        return (
            <MenuItem key={CategoryID} value={CategoryID}>
                {CategoryName}
            </MenuItem>
        );
    }) : [];

    //For react hook form
  const {register, handleSubmit,  formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  const [bookID, setID ] = React.useState(id);
  const [bookTitle, setTitle ] = React.useState(title);
  const [bookISBN, setISBN ] = React.useState(ISBN);
  const [bookAuthor, setAuthor ] = React.useState(author);
  const [bookPublishYear, setYear ] = React.useState(year);
  const [bookPublisher, setPublisher ] = React.useState(publisher);
  const [bookCopies, setCopies ] = React.useState(copies);
  const [bookCategory, setCat ] = React.useState(category);
  const [enableSave, setEnableSave ] = React.useState(true);
  const [stats, setStats ] = React.useState(stat);

  const valueChecker = () => {
    setEnableSave(false)
  }

  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = (BookID) => {
    deleteBook(BookID);
    toast('Book was successfully deleted.');
    onClose();
  }
  
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false)
  }

  const [updateBook] = useUpdateBooksMutation();

  const onSubmit = () => {
    setOpenConfirmation(true)
  };

  const {data:BookData} = useGetExactBookQuery({'filter[BookTitle]': bookTitle});
  const {data:ISBNData} = useGetExactBookISBNQuery({'filter[BookISBN]': bookISBN});

  const onSubmitFinal = () => {
    const input = {
        id,
        data: {
            'BookTitle': bookTitle,
            'BookISBN': bookISBN,
            'BookAuthor': bookAuthor,
            'BookPublicationYear': bookPublishYear,
            'BookPublisher': bookPublisher,
            'BookCopies': bookCopies,
            'CategoryID': bookCategory,
            'IsActive': stats
        }
    }

    let counter = 0;
    for (var i =0 ; i < (BookData ? BookData.data.length : 0); i++) { counter++; };

    let counter2 = 0;
    for (var Z =0 ; Z < (ISBNData ? ISBNData.data.length : 0); Z++) { counter2++; };

    if (title===bookTitle && ISBN === bookISBN  && author === bookAuthor && year === bookPublishYear && publisher === bookPublisher && copies === bookCopies && bookCategory === category && stats === stat ){
        toast('No actions can be done.');
        setEnableSave(true)
    }
    else {
        console.log('conter: ',counter, ' counter2: ',counter2)
        if ( counter === 0 && counter2 === 0){
            updateBook(input)
            toast('Book was successfully updated.');
            onClose();
        }
        else if ( counter >= 0 && counter2 >= 2){
            toast('Book ISBN already exists in the database.');
        }
        else if ( counter === 0 && counter2 === 1){
            updateBook(input)
            toast('Book was successfully updated.');
            onClose();
        }
        else if ( counter === 1 && counter2 === 0){
            updateBook(input)
            toast('Book was successfully updated.');
            onClose();
        }
        else if ( counter === 1 && counter2 === 1 && title===bookTitle && ISBN === bookISBN){
            updateBook(input)
            toast('Book was successfully updated.');
            onClose();
        }
        else if ( counter === 2 && counter2 === 0){
            updateBook(input)
            toast('Book was successfully updated.');
            onClose();
        }
        else{
            toast('Book info already exists in the database.');
        }
        
    }
}

  return (
    <Grid>
        <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
            <Grid item>
            <DialogTitle>Book Manager</DialogTitle>
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
                    value={ bookID } 
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
                    size='small'
                    required
                    value={bookTitle}
                    onChange={(event) => {setTitle(event.target.value); valueChecker();}}
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("book_ISBN")}
                    label={'Book ISBN'} 
                    style={{ width: '100%' }}
                    size='small'
                    required
                    value={bookISBN}
                    onChange={(event) => {setISBN(event.target.value); valueChecker();}}
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
                    value={bookAuthor}
                    onChange={(event) => {setAuthor(event.target.value); valueChecker();}}
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
                    value={bookPublishYear}
                    onChange={(event) => {setYear(event.target.value); valueChecker();}}
                    
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
                    value={bookPublisher}
                    onChange={(event) => {setPublisher(event.target.value); valueChecker();}} 
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
                    value={bookCopies}
                    onChange={(event) => {setCopies(event.target.value); valueChecker();}}
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
                    onChange={(event) => {setCat(event.target.value); valueChecker();}}
                >
                    {renderMenuItem}
                </Select>
                </FormControl>
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
              <FormControl variant="outlined" sx={{ width:'100%' }}>
                <InputLabel >Is Active</InputLabel>
                <Select
                    {...register("is_active")}
                    label={'Status'} 
                    style={{ width: '100%' }}
                    size='small'
                    value={stats}
                    onChange={(event) => {setStats(event.target.value); valueChecker();}}
                    required
                >
                    <MenuItem value={'yes'}>
                        Yes
                    </MenuItem>
                    <MenuItem value={'no'}>
                        No
                    </MenuItem>
                </Select>
              </FormControl>
            </Grid>

        </Grid>

        <Stack direction='row' sx={{ width: '100%', pl:2, pr:2}}>
            <Grid sx={{ flexGrow:1 }}>
                <Button variant='contained' type='button' onClick={()=>handleDeleteBook(id)} startIcon={<DeleteIcon sx={{ color:'red' }} />} sx={{ backgroundColor:'transparent', border:' 1px solid red', height:45, minWidth:40, borderRadius:1, color: 'red', textTransform:'NONE', fontFamily:'Playfair Display', borderRadius:5}}>
                    Delete 
                </Button>
            </Grid>
            <DialogActions>
                <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
                    Discard
                </Button>
                <Button variant='contained' type='submit' disabled={enableSave} sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'NONE', fontFamily:'Playfair Display',}}>
                    Save
                </Button>
            </DialogActions>
        </Stack>
        
        
        <Dialog open={openConfirmation} onClose={handleCloseConfirmation} >
          <ISBNFormConfirmation onClose={() => handleCloseConfirmation()} ISBN={bookISBN} counter={() => onSubmitFinal()} />
        </Dialog>
        </form>
    </Grid>
  )
}

export default EditBookForm