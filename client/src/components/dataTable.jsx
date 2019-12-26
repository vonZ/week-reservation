import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const DataTable = (props) => {
	const { tableData = [] } = props;

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
					<tr>{renderRowHeading(tableData[0])}</tr>
				</thead>
				<tbody>
					{tableData.map((data, index) => (
						<tr>{renderRowCell(data)}</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

DataTable.propTypes = {
  tableData: PropTypes.array
};

export default DataTable;
