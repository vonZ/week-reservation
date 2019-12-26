import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DataTable from '../components/dataTable';

export const GET_ALL_RESERVATIONS = gql`
	query getAllReservations {
		getAllReservations {
			id
			userId
			fromDate
			toDate
			comment
			transportType
			payedInAdvanced
			rentOveralls
		}
	}
`;

const Reservations = () => {
	const { data, loading, error } = useQuery(GET_ALL_RESERVATIONS);
	if (loading) return <p>LOADING</p>;
	if (error) return <p>ERROR</p>

	return (
    <DataTable tableData={data.getAllReservations} />
	);
};

export default Reservations;
