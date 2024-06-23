import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search } from '@syncfusion/ej2-react-grids';
import { styled } from '@mui/system';
import { Header } from '../components';
import { MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import { useRendezVous } from '../contexts/RendezVousContext';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root': {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '8px',
    width: '50px !important'
  },
  '& .MuiSelect-icon': {
    color: 'blue',
  },
  '& .MuiMenuItem-root': {
    color: 'green',
  },
  '&.invalid': {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  '&.valid': {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  '&.pending': {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
}));

const Orders = () => {
  const { rendes, updateRendezVousStatus, deleteRendezVous } = useRendezVous();
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    if (rowData && rowData.NOM) {
      const { NOM } = rowData;
      navigate(`/Rendez-Vous/${NOM}`);
    } else {
      console.error('Invalid rowData:', rowData);
    }
  };

  const handleStatusChange = (nom, newStatus) => {
    updateRendezVousStatus(nom, newStatus);
  };

  const handleDelete = (NOM) => {
    deleteRendezVous(NOM);
  };

  const ordersGrid = [
    {
      headerText: 'Nom',
      field: 'NOM',
      width: '150',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.NOM}</p>
      ),
    },
    {
      headerText: 'Prenom',
      field: 'PRENOM',
      width: '150',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.PRENOM}</p>
      ),
    },
    {
      headerText: 'Telephone',
      field: 'TELEPHONE',
      textAlign: 'Center',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.TELEPHONE}</p>
      ),
    },
    {
      headerText: 'Adresse',
      field: 'ADRESSE',
      textAlign: 'Center',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.ADRESSE}</p>
      ),
    },
    {
      headerText: 'Status',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <CustomSelect
          value={props.status}
          style={{
            width: 100,
            height: 40,
            backgroundColor:
              props.status === 'invalid'
                ? 'lightcoral'
                : props.status === 'valid'
                  ? 'lightgreen'
                  : '#ffeeba',
            color: 'white',
          }}
          onChange={(e) => handleStatusChange(props.NOM, e.target.value)}
        >
          <MenuItem value="invalid">Invalid</MenuItem>
          <MenuItem value="valid">Valid</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </CustomSelect>
      ),
      textAlign: 'Center',
      width: '120',
    },
    {
      headerText: 'Actions',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      textAlign: 'Center',
      template: (props) => (
        <div>
          <button onClick={() => handleDelete(props.NOM)}>
            <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Rendez-vous" Route={{ to: "create", text: "Ajouter" }} />
      <ErrorBoundary>

        <GridComponent
          id="gridcomp"
          dataSource={rendes || []} // Ensure dataSource is an array
          allowPaging
          allowSorting
          toolbar={['Search']}
          width='auto'
          rowSelected={(e) => handleRowClick(e.data)}
          keyExtractor={(item, index) => item.NOM} // Ensure unique keys for rows
        >
          <ColumnsDirective>
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index}  {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Search, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>
      </ErrorBoundary>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default Orders;
