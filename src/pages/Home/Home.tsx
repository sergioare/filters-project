import React from 'react';
export interface HomeProps {}
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { People } from '@/data/people';

const Home : React.FC<HomeProps> = () => {
	const [paginationModel, setPaginationModel] = React.useState({
		pageSize: 5,
		page: 0,
	  });	
	const columns =[{
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
			rows={People}
			columns={columns}
			disableColumnSelector
			disableRowSelectionOnClick
			autoHeight
			paginationModel={paginationModel}
        	onPaginationModelChange={setPaginationModel}
			getRowId={(row:any)=> row.id}
			
		/>
	)
};

export default Home;
