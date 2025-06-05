import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Clientes', path: '/clientes' },
  { name: 'Produtos', path: '/produtos' },
  { name: 'Serviços', path: '/servicos' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="fixed top-0 bg-gray-700 left-0 w-full h-16 text-white flex items-center justify-between px-6 z-20 shadow">
      <div className="font-bold text-2xl">Sistema WB</div>
      <ul className="flex space-x-8">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`transition-colors duration-200 px-2 py-1 rounded ${location.pathname === item.path ? 'text-blue-300 font-semibold' : 'hover:text-blue-300'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 