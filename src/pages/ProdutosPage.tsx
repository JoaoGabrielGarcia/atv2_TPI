import { useState } from 'react';
import ProdutoModal from '../components/ProdutoModal';
import { mockProducts } from '../data/mockProducts';

const filtros = [
  { label: 'Todos', value: 'todos' },
  { label: 'Top 10 mais consumidos', value: 'top10' },
];

function filtrarProdutos(produtos: any[], filtro: string) {
  switch (filtro) {
    case 'top10':
      return [...produtos].sort((a, b) => (b.qtdConsumida || 0) - (a.qtdConsumida || 0)).slice(0, 10);
    default:
      return produtos;
  }
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<any[]>(mockProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtro, setFiltro] = useState('todos');

  const produtosFiltrados = filtrarProdutos(produtos, filtro);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex gap-2 flex-wrap items-center">
          {filtros.map(f => (
            <button
              key={f.value}
              className={`px-3 py-1 rounded border ${filtro === f.value ? 'bg-blue-700 text-white' : 'bg-gray-950 text-blue-700 border-blue-700'} transition`}
              onClick={() => setFiltro(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition" onClick={() => setModalOpen(true)}>
          Cadastrar Produto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center text-gray-300 py-8">Nenhum produto cadastrado.</td>
              </tr>
            ) : (
              produtosFiltrados.map((p, i) => (
                <tr key={i} className="border-t border-gray-600">
                  <td className="px-4 py-2">{p.nome}</td>
                  <td className="px-4 py-2">R$ {p.valor.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ProdutoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={produto => {
          setProdutos([...produtos, produto]);
          setModalOpen(false);
        }}
      />
    </div>
  );
}