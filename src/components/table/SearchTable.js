import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useGetBooksQuery } from '../../services/bookApi';

const columns = [
    { id: 'bookID', label: 'Book ID', minWidth: 100 },
    { id: 'bookTitle', label: 'Book Title', minWidth: 300 },
    { id: 'bookISBN', label: 'Book ISBN', minWidth: 150 },
    { id: 'author', label: 'Author', minWidth: 150 },
    { id: 'publicationYear', label: 'Publication Year', minWidth: 100 },
    { id: 'publisher', label: 'Publisher', minWidth: 100 },
    { id: 'copies', label: 'Copies', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'isActive', label: 'Active', minWidth: 100 },
  ];

  const renderColumns = columns.map(({id, label, minWidth}) => {
    return (
      <TableCell key={id} align="center" colSpan={1} sx={{ minWidth: minWidth, backgroundColor:'white' }}>
        {label}
      </TableCell>
    )
  })
  
  function createData(bookID, bookTitle, bookISBN, author, publicationYear, publisher, copies, category, isActive) {
    return {bookID, bookTitle, bookISBN, author, publicationYear, publisher, copies, category, isActive};
  }
  
  

const SearchTable = ({search, category, filter}) => {

    console.log(filter);

    const {data} =  useGetBooksQuery(( filter ?  {'filter[CategoryID]':category} : {'filter[BookTitle]':search}));

    const rows = data ? data.data.map(({BookID, BookTitle, BookISBN, BookAuthor, BookPublicationYear, BookPublisher, BookCopies, CategoryID, IsActive}) => createData(BookID, BookTitle, BookISBN, BookAuthor, BookPublicationYear, BookPublisher, BookCopies, CategoryID, IsActive)) : [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', mt:2}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead >
              <TableRow >
                {renderColumns}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.bookID} >
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
      </Paper>
  )
}

export default SearchTable