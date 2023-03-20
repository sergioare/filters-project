import { Person } from '@/models';
import { addFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface PeopleTableProps {}

const PeopleTable : React.FC<PeopleTableProps> = () => {
	const [paginationModel, setPaginationModel] = React.useState({
		pageSize: 5,
		page: 0,
	  });
	
	const dispatch = useDispatch()
	
	const statePeople = useSelector((store: AppStore)=> store.people);
	const favoritePeople = useSelector((store: AppStore)=> store.favorites);

	const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

	const findPerson = (person: Person)=> !!favoritePeople.find(p=> p.id === person.id)
	//   !! use to convert the result in a boolean
	const filterPerson = (person: Person)=> favoritePeople.filter(p=> p.id !== person.id)


	const handleChange= (person: Person)=> {
		const filteredPeople = findPerson(person)? filterPerson(person):[...selectedPeople, person];
		dispatch(addFavorite(filteredPeople))
		setSelectedPeople(filteredPeople)
	}

	const columns =[
	{
		field: 'actions',
		type:'actions',
		sortable: false,
		headerName: '',
		flex: 1,
		minWidth: 50,
		renderCell: (params: GridRenderCellParams) => <>{
			<Checkbox 
				size='small'
				checked={findPerson(params.row)} 
				onChange={()=>handleChange(params.row)}
			/>
		}</>
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
	},
	{
		field: 'levelOfHappiness',
		headerName: 'Level of Happiness',
		flex: 1,
		renderCell: (params: GridRenderCellParams) => <>{params.value}</>
	}
]

	useEffect(()=>{
		setSelectedPeople(favoritePeople)
	},[favoritePeople])
	return (
	<DataGrid
	rows={statePeople}
	columns={columns}
	disableColumnSelector
	disableRowSelectionOnClick
	autoHeight
	paginationModel={paginationModel}
	onPaginationModelChange={setPaginationModel}
	getRowId={(row:any)=> row.id}
	pageSizeOptions={[5,10,15]}
	sx={{
		boxShadow: 2,
		border: 2,
		borderColor: 'primary.light',
		'& .MuiDataGrid-cell:hover': {
			color: 'primary.main',
		  },
		color: 'white'
	}}
	
/>
	)
};

export default PeopleTable;
