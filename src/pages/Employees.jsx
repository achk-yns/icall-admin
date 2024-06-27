import React, { useEffect } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids'


import { Header } from '../components'
import { DeleteOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/authContext'


const Employees = () => {
  const {Users} = useAuth();
  
  useEffect(()=>{ console.log(Users)},[Users])
  const UsersGrid = [
    {
      headerText: 'Nom',
      field: 'NOM',
      width: '150',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{fontSize:"16px"}}>{props.NOM}</p>
      ),
    },
    {
      headerText: 'Prenom',
      field: 'PRENOM',
      width: '150',
      textAlign: 'Center',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{fontSize:"16px"}}>{props.PRENOM}</p>
      ),
    },
    {
      headerText: 'email',
      field: 'EMAIL',
      textAlign: 'Center',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => (
        <p style={{fontSize:"16px"}}>{props.EMAIL}</p>
      ),
    },
    {
      headerText: 'Role',
      field: 'ROLE',
      textAlign: 'Center',
      width: '50',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      template: (props) => {
        const roleStyles = {
          admin: { backgroundColor: '#FF5733', color: 'white' },
          agent: { backgroundColor: '#33FF57', color: 'white' },
          superviseur: { backgroundColor: '#3357FF', color: 'white' },
          installeur: { backgroundColor: '#FF33A1', color: 'white' },
        };
        const style = {
          fontSize: '12px',
          padding: '5px 10px',
          borderRadius: '5px',
          ...roleStyles[props.ROLE],
        };
    
        return (
          <p style={style}>{props.ROLE}</p>
        );
      },
    },    
    {
      headerText: 'Actions',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      textAlign: 'Center',
      template: (props) => (
        <div>
          <button onClick={() => console.log(props.id)}>
            <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header
        category='Page'
        title='Utilisateurs'
        Route={{to:"ajouter",text:"ajouter"}}
      />
      <GridComponent
        id='gridcomp'
        dataSource={Users}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width='auto'
      >
        <ColumnsDirective>
          {UsersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search ,Toolbar ,Resize,ContextMenu, Sort,Filter]} />
      </GridComponent>
    </div>
  )
}

export default Employees