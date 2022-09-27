import React from 'react'
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Stack,  Divider, Button, TextField, Select, InputLabel, FormControl, MenuItem, Dialog  } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useUpdateCategoriesMutation, useDeleteCategoryMutation, useGetExactCategoryQuery } from '../../services/categoryApi';
import { useGetBooksQuery } from '../../services/bookApi';

//Schema: Rules for inputs
const schema = yup.object({
    category_name: yup.string().required('category name is required'),
    is_active:  yup.string().required('category name is required'),
  });

const EditCategoryForm = ({onClose, id, name, stat, toast}) => {

  const [categName, setCategname ] = React.useState(name);
  const [stats, setStats ] = React.useState(stat);
  const [buttonDisable, setButton ] = React.useState(true);

  const buttonEnabler = () => {
    setButton(false)
  }
    //For react hook form
  const {register, handleSubmit,  formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  const [deleteCategory] = useDeleteCategoryMutation();
    const {data} = useGetBooksQuery({'filter[CategoryID]':id});
    const handleDeleteCategory = (categoryID) => {
    let counter = 0;
    for (var i =0 ; i < (data ? data.data.length : 0); i++) { counter++; }
    
    if ( counter === 0){
      deleteCategory(categoryID);
      toast('The category was successfully deleted');
      onClose()
    }
    else{
      toast('Error: Book dependency exist');
    }
  }

  const {data:categoryData} = useGetExactCategoryQuery({'filter[CategoryName]': categName});

  const [updateCategory] = useUpdateCategoriesMutation();
  
  const onSubmit = (data) => {

    const input = {
      id,
      data: {
        'CategoryName': data.category_name,
        'IsActive': data.is_active
      }
    }

    if (data.category_name === name && data.is_active === stat ){
        toast('No actions can be done');
    }

    else if (data.category_name !== name && data.is_active === stat ){
      let counter = 0;
      for (var i =0 ; i < (categoryData ? categoryData.data.length : 0); i++) { counter++; };
    
      if ( counter === 0 ){
        updateCategory(input)
        toast('The category was successfully updated.');
        onClose();
      }
      else{
        toast('Book category name already exists in the database.');
      }
    }

    else if (data.category_name !== name && data.is_active !== stat ){
      console.log(categoryData.data.length)
      let counter = 0;
      for (var i =0 ; i < (categoryData ? categoryData.data.length : 0); i++) { counter++; };
    
      if ( counter === 0 ){
        updateCategory(input)
        toast('The category was successfully updated.');
        onClose(); 
      }
      else{
        toast('Book category name already exists in the database.');
      }
    }
    else{
      updateCategory(input)
      toast('The category was successfully updated.');
      onClose();
    }
  };

  return (
    <Grid>
        <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
            <Grid item>
            <DialogTitle>Category Manager</DialogTitle>
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
                    value={id} 
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
                    size='small'
                    value={categName}
                    onChange={(event) => {setCategname(event.target.value); buttonEnabler();}}
                    required
                />
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
                    onChange={(event) => {setStats(event.target.value); buttonEnabler();}}
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
            <div style={{height:15}} />

        </Grid>

        <Stack direction='row' sx={{ width: '100%', pl:2, pr:2}}>
            <Grid sx={{ flexGrow:1 }}>
                <Button variant='contained' type='button' onClick={()=>handleDeleteCategory(id)} startIcon={<DeleteIcon sx={{ color:'red' }} />} sx={{ backgroundColor:'transparent', border:' 1px solid red', height:45, minWidth:40, borderRadius:1, color: 'red', textTransform:'NONE', fontFamily:'Playfair Display', borderRadius:5}}>
                    Delete 
                </Button>
            </Grid>
            <DialogActions>
                <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
                    Discard
                </Button>
                <Button variant='contained' type='submit' disabled={buttonDisable} sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'NONE', fontFamily:'Playfair Display',}}>
                    Save
                </Button>
            </DialogActions>
        </Stack>

        {/* <Dialog open={openConfirmation} onClose={handleCloseConfirmation} >
          <LegalServiceConfirmation onClose={() => handleCloseConfirmation()}  />
        </Dialog> */}
        </form>
    </Grid>
  )
}

export default EditCategoryForm