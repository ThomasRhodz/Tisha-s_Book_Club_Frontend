import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditCategoryForm from '../form/EditCategoryForm';
import { useGetCategoriesQuery } from '../../services/categoryApi';


//Dialog
import Dialog from '@mui/material/Dialog';

const columns = [
    { id: 'categoryID', label: 'Category ID', minWidth: 300 },
    { id: 'categoryName', label: 'Category', minWidth: 400 },
    { id: 'isActive', label: 'IsActive', minWidth: 300 },
  ];

  const renderColumns = columns.map(({id, label, minWidth}) => {
    return (
      <TableCell key={id} align="center" colSpan={1} sx={{ minWidth: minWidth, backgroundColor:'white' }}>
        {label}
      </TableCell>
    )
  })
  
  function createData(categoryID, categoryName, isActive) {
    return { categoryID, categoryName, isActive};
  }

const CategoryTable = ({search, toast}) => {

    const {data} = useGetCategoriesQuery({'filter[CategoryName]':search});

    const rows = data ? data.data.map(({CategoryID, CategoryName,IsActive}) => createData(CategoryID, CategoryName ,IsActive)) : [];

    const [id, setID] = React.useState('');
    const [categoryName, setCategoryName] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewCategory, setViewCategory] = React.useState(false); //-> for open and close of  dialog
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };


    //function for opening and closing the Inquiry dialog
    const handleCategoryOpen = (ID, category, stat) => {
        setViewCategory(true);
        setID(ID)
        setCategoryName(category)
        setStatus(stat)
    };
    
    //Function for closing the Inquiry dialog
    const handleCategoryClose = () => {
        setViewCategory(false);
      
    };
  
    return (
      <Paper sx={{ width: '100%', mt:2}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {renderColumns}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.categoryID} onClick={() => handleCategoryOpen(row.categoryID, row.categoryName, row.isActive)}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align='center'>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={viewCategory} onClose={handleCategoryClose} scroll='body'>
          <EditCategoryForm onClose={() => handleCategoryClose()} id={id} name={categoryName} stat={status} toast={(stringMessage)=>toast(stringMessage)}/>
        </Dialog>
      </Paper>
  )
}

export default CategoryTable