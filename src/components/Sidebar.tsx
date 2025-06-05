import { Link } from 'react-router-dom';
import React from 'react';

const navItems = [
  { name: 'Clientes', path: '/clientes' },
  { name: 'Produtos', path: '/produtos' },
  { name: 'Serviços', path: '/servicos' },
];

class Navbar extends React.Component {
  render() {
    return (
      <nav className="fixed top-0 bg-gray-700 left-0 w-full h-16 text-white flex items-center justify-between px-6 z-20 shadow">
        <div className="font-bold text-2xl">Sistema WB</div>
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition-colors duration-200 px-2 py-1 rounded ${window.location.pathname === item.path ? 'text-blue-300 font-semibold' : 'hover:text-blue-300'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Navbar; 