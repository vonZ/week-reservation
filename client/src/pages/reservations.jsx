import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

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
	if (error) return <p>ERROR</p>;

	const renderRowCell = (cellData) => {
		const data = Object.values(cellData);
		const itemToReturn = data.map((item) => <td>{item}</td>);
		return itemToReturn;
	};

	const renderRowHeading = (cellData) => {
		const data = Object.keys(cellData);
		const itemToReturn = data.map((item) => <th>{item}</th>);
		return itemToReturn;
	};

	return (
		<Container>
			<Table responsive hover>
				<thead>
					<tr>{renderRowHeading(data.getAllReservations[0])}</tr>
				</thead>
				<tbody>
					{data.getAllReservations.map((data, index) => (
						<tr>{renderRowCell(data)}</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Reservations;
