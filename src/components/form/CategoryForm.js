//Premade components
import React, {useState} from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Stack,  Divider, Button, TextField  } from '@mui/material'

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Methods for api call
import { useAddCategoryMutation, useGetLastCategoryQuery, useGetExactCategoryQuery } from '../../services/categoryApi';

//Schema: Rules for inputs
const schema = yup.object({
    category_name: yup.string().required('categpry name is required'),
  });

 //----------------------------------------------------------------------------------------------------------------------------------------------------
 
 //Functional components: (Main) 
const CategoryForm = ({onClose, toast}) => {

  const {data} = useGetLastCategoryQuery(); //using the method that get the last ID of a category for displaying it in the form later on

  //For react hook form
  const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });

  //Renaming the api call method
  const [addCategory] = useAddCategoryMutation();

  //state -> using it as a variable that will be used for filtering category names for chacking any duplications
  const [categName, setCategName] = useState('');
  const {data:categoryData} = useGetExactCategoryQuery({'filter[CategoryName]': categName}); //Using category name for the api call of filtering

  //On submit function after entering a category name
  const onSubmit = (data) => {
    
    //getting the data from the form
    const input = {
      'CategoryName': data.category_name
    }

    //Algorithm for checking duplication
    let counter = 0;
    for (var i =0 ; i < (categoryData ? categoryData.data.length : 0); i++) { counter++; };
  
    //when counter is equalt to zero then there is no duplication within the database, thus it will continue
    if ( counter === 0){
      addCategory(input)
      toast('New category was successfully added.');
      onClose();
    }
    else{ //else it will excute nothing and trigger a toast/notification
      toast('Book category already exists in the database.');
    }
    

  };

  return (
    <Grid>
        <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
            <Grid item>
            <DialogTitle>New Category</DialogTitle>
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
                    label={'CategoryID'}
                    value={data? (data.data.CategoryID + 1) : 1}
                    style={{ width: '100%' }}
                    size='small'
                    disabled
                />
            </Grid>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("category_name")}
                    label={'Category'} 
                    style={{ width: '100%' }}
                    value={categName}
                    onChange={(event) => setCategName(event.target.value)}
                    size='small'
                    required
                />
            </Grid>
            <div style={{height:15}} />

        </Grid>
        
        <DialogActions sx={{ paddingRight:2 }}>
            <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
                Discard
            </Button>
            <Button variant='contained' type='submit'  sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'NONE', fontFamily:'Playfair Display',}}>
                Add category
            </Button>
        </DialogActions>
        </form>
    </Grid>
  )
}

export default CategoryForm