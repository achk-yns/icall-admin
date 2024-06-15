import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ category, title , Route }) => {
  return (
    <div className=' container  p-4 flex justify-between items-center'>
        <div>
          <p className='text-gray-400'>
            {category}
          </p>
          <p className='text-3xl font-extrabold tracking-tight text-slate-900'>
            {title}
          </p>
        </div>
        {Route &&  <div>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" to={Route.to}>{Route.text}</Link>
        </div> }
       
    </div>
  )
}

export default Header