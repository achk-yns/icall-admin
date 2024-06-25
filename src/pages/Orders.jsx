import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search } from '@syncfusion/ej2-react-grids';
import { styled } from '@mui/system';
import { Header } from '../components';
import { MenuItem, Select, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { useRendezVous } from '../contexts/RendezVousContext';
import StaticComponents from '../components/StaticComponents';
import { LuCalendarClock } from "react-icons/lu";

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root': {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '8px',
    width: '100px !important'
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
  const { rendes, updateRendezVousStatus, CountRendes,deleteRendezVous } = useRendezVous();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


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

  const filteredData = rendes.filter(order => {
    const statusMatch = statusFilter ? order.status === statusFilter : true;
    const dateMatch = (dateFrom && dateTo) ? (new Date(order.createdRv) >= new Date(dateFrom) && new Date(order.createdRv) <= new Date(dateTo)) : true;
    return statusMatch && dateMatch;
  });

  const handleFilterApply = () => {
    setFilterOpen(false);
  };
  const DataStatics =  [
    {
      icon: <LuCalendarClock />,
      amount:CountRendes,
      title: 'Total RDVs',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
      },
      ];
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
      field: 'MOBILE',
      textAlign: 'Center',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.MOBILE}</p>
      ),
    },
    {
      headerText: 'Adresse',
      field: 'ADRESSE_COMPLETE',
      textAlign: 'Center',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.ADRESSE_COMPLETE}</p>
      ),
    },
    {
      headerText: 'Statut',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <CustomSelect
          value={props.STATUT}
          style={{
            width: 100,
            height: 40,
            backgroundColor:
              props.status === 'annule'
                ? 'lightcoral'
                : props.status === 'injecte'
                  ? 'lightgreen'
                  : '#ffeeba',
            color: 'black',
          }}
          onChange={(e) => handleStatusChange(props.NOM, e.target.value)}
        >
          
                <MenuItem value="passage">Passage</MenuItem>
                <MenuItem value="annule">Annule</MenuItem>
                <MenuItem value="installe">Installe</MenuItem>
                <MenuItem value="attente">Attente</MenuItem>
                <MenuItem value="confirme">Confirme</MenuItem>
                <MenuItem value="injecte">Injecte</MenuItem>
        </CustomSelect>
      ),
      textAlign: 'Center',
      width: '120',
    },
    {
      headerText: 'Date de creation ',
      field: 'createdRv',
      textAlign: 'Center',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{formatDate(props.createdRv)}</p>
      ),
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
    <div className="m-2 md:m-10 p-2 md:p-10   rounded-3xl">
      <StaticComponents Data={DataStatics}/>
      <Header category="Page" title="Rendez-vous" Route={{ to: "create", text: "Ajouter" }} />
      <Button variant="outlined" onClick={() => setFilterOpen(true)}>Filter</Button>
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <DialogTitle>Filter Orders</DialogTitle>
        <DialogContent>
          <CustomSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            style={{ marginBottom: '20px', width: '100%' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="invalid">Invalid</MenuItem>
            <MenuItem value="valid">Valid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </CustomSelect>
          <TextField
            label="Date From"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <TextField
            label="Date To"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{ marginBottom: '20px', width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterOpen(false)}>Cancel</Button>
          <Button onClick={handleFilterApply}>Apply</Button>
        </DialogActions>
      </Dialog>
      <ErrorBoundary>
        <GridComponent
          id="gridcomp"
          dataSource={filteredData || []} // Ensure dataSource is an array
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

