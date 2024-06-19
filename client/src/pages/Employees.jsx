import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids'


import { Header } from '../components'
import { useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'

const Employees = () => {
  const apiBaseUrl = process.env.UrlServer;
  const [usersData, setUsersData] = useState([])
  const { user, token, loading } = useSelector((state) => state.auth);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      if (response.ok) {
        const data =await response.json()
        console.log("users",data);
        setUsersData(data.data)
      }
    } catch (error) {
      console.log("error Fetching users")
    }
  }
  useEffect(() => {
    console.log(apiBaseUrl)
    fetchUsers();
  }, [])



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
      headerText: 'Actions',
      width: '150',
      headerTemplate: (props) => <h1 style={{ fontSize: '16px' }}>{props.headerText}</h1>,
      textAlign: 'Center',
      template: (props) => (
        <div>
          <button onClick={() => console.log(props.NOM)}>
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
      />
      <GridComponent
        id='gridcomp'
        dataSource={usersData}
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
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  )
}

export default Employees