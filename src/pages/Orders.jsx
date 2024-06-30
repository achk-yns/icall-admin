import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search } from '@syncfusion/ej2-react-grids';
import { styled } from '@mui/system';
import { Header } from '../components';
import { MenuItem, Select, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Container, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { useRendezVous } from '../contexts/RendezVousContext';
import StaticComponents from '../components/StaticComponents';
import { useAuth } from '../contexts/authContext';
import { FaFilter } from "react-icons/fa6";
import { MdOutlineRemoveRedEye, MdOutlineEditCalendar } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import * as XLSX from 'xlsx';

const CustomSelect = styled(Select)(() => ({
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
  const { rendes, DataStatics, updateRendezVousStatus, handleSearchTermChange, deleteRendezVous } = useRendezVous();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');



  const handleRowClick = (rowData) => {
    if (rowData && rowData._id) {
      const { _id } = rowData;
      navigate(`/Rendez-Vous/${_id}`);
    } else {
      console.error('Invalid rowData:', rowData);
      toast.error('Invalid data selected');
    }
  };

  const handleRowClickEdite = (rowData) => {
    if (rowData && rowData._id) {
      const { _id } = rowData;
      navigate(`/Rendez-Vous/${_id}/edit`);
    } else {
      console.error('Invalid rowData:', rowData);
      toast.error('Invalid data selected');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRendezVousStatus(id, newStatus);
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRendezVous(id);
      toast.success('Rendez-vous deleted successfully');
    } catch (error) {
      toast.error('Failed to delete rendez-vous');
    }
  };

  const filteredData = Array.isArray(rendes) ? rendes.filter(order => {
    const statusMatch = statusFilter ? order.STATUT === statusFilter : true;
    const dateMatch = (dateFrom && dateTo) ? (new Date(order.createdRv) >= new Date(dateFrom) && new Date(order.createdRv) <= new Date(dateTo)) : true;
    return statusMatch && dateMatch;
  }) : [];

  const handleFilterApply = () => {
    setFilterOpen(false);
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
                  : props.status === 'installe'
                    ? '#afeeee'
                    : props.status === 'attente'
                      ? '#add8e6'
                      : props.status === 'confirme'
                        ? '#98fb98' : 'lightgreen',
            color: 'black',
          }}
          onChange={(e) => handleStatusChange(props._id, e.target.value)}
        >
          <MenuItem value="passage" style={{ backgroundColor: '#ffeeba' }}>Passage</MenuItem>
          <MenuItem value="annule" style={{ backgroundColor: 'lightcoral' }}>Annulé</MenuItem>
          <MenuItem value="installe" style={{ backgroundColor: '#afeeee' }}>Installé</MenuItem>
          <MenuItem value="attente" style={{ backgroundColor: '#add8e6' }}>Attenté</MenuItem>
          <MenuItem value="confirme" style={{ backgroundColor: '#98fb98' }}>Confirmé</MenuItem>
          <MenuItem value="injecte" style={{ backgroundColor: 'lightgreen' }}>Injecté</MenuItem>
        </CustomSelect>
      ),
      field: 'STATUT',
      width: '120',
      textAlign: 'Center',
    },
    {
      headerText: 'Date',
      field: 'DATE_PRIS_RDV',
      width: '150',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{ fontSize: "16px" }}>{props.DATE_PRIS_RDV}</p>
      ),
    },
    user.ROLE === "admin" ? {
      headerText: 'Actions',
      width: '100',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => handleRowClickEdite(props)}
          >
            <MdOutlineEditCalendar style={{ fontSize: '1.5rem' }} />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(props._id)}
            style={{ color: 'red' }}
          >
            <DeleteOutlined style={{ fontSize: '1.5rem' }} />
          </button>
          <button
            type="button"
            onClick={() => handleRowClick(props)}
          >
            <MdOutlineRemoveRedEye style={{ fontSize: '1.5rem' }} />
          </button>
        </div>
      ),
    } : {
      headerText: 'Actions',
      width: '100',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => handleRowClickEdite(props)}
          >
            <MdOutlineEditCalendar style={{ fontSize: '1.5rem' }} />
          </button>
          <button
            type="button"
            onClick={() => handleRowClick(props)}
          >
            <MdOutlineRemoveRedEye style={{ fontSize: '1.5rem' }} />
          </button>
        </div>
      ),
    },
  ].filter(Boolean);

  const exportToXLSX = () => {
    try {
      if(filteredData.length > 0 ){
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'RendezVous');
        XLSX.writeFile(wb, 'rendezvous.xlsx');
        toast.success('Exported to XLSX successfully');
      }else{
        toast.error('Aucun Rendez-vous , Failed to export to XLSX');
      }
    } catch (error) {
      toast.error('Failed to export to XLSX');
    }
  };

  return (
    <div className="p-4 rounded-3xl" style={{ marginBottom: 40 }}>

      <StaticComponents Data={DataStatics} />
      <Container>
        <Header category="Page" title="Rendez-vous" Route={{ to: "create", text: "Ajouter" }} />
        <div className='flex  justify-between items-center'>
          <div >
            <div className='flex  items-center cursor-pointer' onClick={() => setFilterOpen(true)} >
              <FaFilter className='m-2' />
              <h4 className='text-bold '>Filter</h4>
            </div>
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
                  <MenuItem value="passage" style={{ backgroundColor: '#ffeeba' }}>Passage</MenuItem>
                  <MenuItem value="annule" style={{ backgroundColor: 'lightcoral' }}>Annulé</MenuItem>
                  <MenuItem value="installe" style={{ backgroundColor: '#afeeee' }}>Installé</MenuItem>
                  <MenuItem value="attente" style={{ backgroundColor: '#add8e6' }}>Attenté</MenuItem>
                  <MenuItem value="confirme" style={{ backgroundColor: '#98fb98' }}>Confirmé</MenuItem>
                  <MenuItem value="injecte" style={{ backgroundColor: 'lightgreen' }}>Injecté</MenuItem>
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
          </div>
          <div className="flex items-center space-x-2 mt-3 " style={{ marginBottom: 20 }}>
            <Input aria-label="Demo input" className="w-80" onChange={(e) => handleSearchTermChange(e.target.value)} placeholder="Tapez quelque chose…" />
          </div>
          <div className='flex  items-center cursor-pointer' onClick={exportToXLSX}>
            <CiExport className={"h-8 w-8 ms-2 "} />
            <h4 className='text-bold '>Export</h4>
          </div>
        </div>

        <ToastContainer />
        <ErrorBoundary>
          <GridComponent
            id="gridcomp"
            dataSource={filteredData } // Ensure dataSource is an array
            allowPaging
            allowSorting
            toolbar={['Search']}
            width='auto'
            keyExtractor={(item, index) => item._id} // Ensure unique keys for rows
          >
            <ColumnsDirective>
              {ordersGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, ContextMenu, Search, Filter, Page, ExcelExport, Edit, PdfExport]} />
          </GridComponent>
        </ErrorBoundary>
      </Container>
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
    toast.error('An unexpected error occurred.');
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default Orders;
