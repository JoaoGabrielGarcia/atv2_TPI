import { useState } from 'react';
import ClienteModal from '../components/ClienteModal';
import { mockClients } from '../data/mockClients';

const filtros = [
  { label: 'Todos', value: 'todos' },
  { label: 'Top 10 consumidores (quantidade)', value: 'top10' },
  { label: 'Top 10 menos consumidores', value: 'menos10' },
  { label: 'Top 5 consumidores (valor)', value: 'top5valor' },
];

const generos = [
  { label: 'Todos', value: '' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Outro', value: 'Outro' },
];

function filtrarClientes(clientes: any[], filtro: string, genero: string) {
  let filtrados = clientes;
  if (genero) {
    filtrados = filtrados.filter(c => c.genero === genero);
  }
  switch (filtro) {
    case 'top10':
      return [...filtrados].sort((a, b) => (b.qtdConsumida || 0) - (a.qtdConsumida || 0)).slice(0, 10);
    case 'menos10':
      return [...filtrados].sort((a, b) => (a.qtdConsumida || 0) - (b.qtdConsumida || 0)).slice(0, 10);
    case 'top5valor':
      return [...filtrados].sort((a, b) => (b.valorConsumido || 0) - (a.valorConsumido || 0)).slice(0, 5);
    default:
      return filtrados;
  }
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>(mockClients);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [genero, setGenero] = useState('');

  const clientesFiltrados = filtrarClientes(clientes, filtro, genero);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <div className="flex gap-2 flex-wrap items-center">
          {filtros.map(f => (
            <button
              key={f.value}
              className={`px-3 py-1 rounded border ${filtro === f.value ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border-blue-700'} transition`}
              onClick={() => setFiltro(f.value)}
            >
              {f.label}
            </button>
          ))}
          <select
            className="px-3 py-1 rounded border border-blue-700 bg-gray-950 text-blue-700"
            value={genero}
            onChange={e => setGenero(e.target.value)}
          >
            {generos.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition" onClick={() => setModalOpen(true)}>
          Cadastrar Cliente
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Nome Social</th>
              <th className="px-4 py-2 text-left">Gênero</th>
              <th className="px-4 py-2 text-left">CPF</th>
              <th className="px-4 py-2 text-left">RG</th>
              <th className="px-4 py-2 text-left">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-300 py-8">Nenhum cliente cadastrado.</td>
              </tr>
            ) : (
              clientesFiltrados.map((c, i) => (
                <tr key={i} className="border-t border-gray-600">
                  <td className="px-4 py-2">{c.nome}</td>
                  <td className="px-4 py-2">{c.nomeSocial}</td>
                  <td className="px-4 py-2">{c.genero}</td>
                  <td className="px-4 py-2">{c.cpf}</td>
                  <td className="px-4 py-2">{c.rg}</td>
                  <td className="px-4 py-2">({c.ddd}) {c.telefone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ClienteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={cliente => {
          setClientes([...clientes, cliente]);
          setModalOpen(false);
        }}
      />
    </div>
  );
} 