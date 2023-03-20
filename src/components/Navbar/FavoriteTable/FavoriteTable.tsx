import { Person } from '@/models';
import { removeFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { IconButton } from '@mui/material';
import { GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
export interface FavoriteTableProps {}

const FavoriteTable : React.FC<FavoriteTableProps> = () => {
	const [paginationModel, setPaginationModel] = React.useState({
		pageSize: 5,
		page: 0,
	  });
	
	const dispatch = useDispatch()
	
	const stateFavorites = useSelector((store: AppStore)=> store.favorites);

	const handleClick= (person: Person)=> {
		dispatch(removeFavorite(person))
	}

	const columns =[
	{
		field: 'actions',
		type:'actions',
		sortable: false,
		headerName: '',
		flex: 1,
		minWidth: 50,
		renderCell: (params: GridRenderCellParams) => (
		<>
		{
			<IconButton color="secondary" aria-label="favorites" component="label" onClick={()=>handleClick(params.row)}>
              <DeleteIcon />
          	</IconButton>   
			
		}</>
		)
	},
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
		minWidth: 150,
		renderCell: (params: GridRenderCellParams) => <>{params.value}</>/*what we want to show in row, we are going to associate the object (in this case People -comes from data-) and decide how to show. GridRedenderCellParams are the grid´s params  */
	},
	{
		field: 'category',
		headerName: 'Categories',
		flex: 1,
		renderCell: (params: GridRenderCellParams) => <>{params.value}</>
	},
	{
		field: 'company',
		headerName: 'Company',
		flex: 1,
		renderCell: (params: GridRenderCellParams) => <>{params.value}</>
	}
]
	return (
	<DataGrid
	rows={stateFavorites}
	columns={columns}
	disableColumnSelector
	disableRowSelectionOnClick
	autoHeight
	paginationModel={paginationModel}
	onPaginationModelChange={setPaginationModel}
	getRowId={(row:any)=> row.id}
	pageSizeOptions={[5,10,15]}
	
/>
	)
};

export default FavoriteTable;
