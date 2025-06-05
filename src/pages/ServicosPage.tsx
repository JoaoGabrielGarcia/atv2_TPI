import React from 'react';
import ServicoModal from '../components/ServicoModal';
import { mockServices } from '../data/mockServices';

const filtros = [
  { label: 'Todos', value: 'todos' },
  { label: 'Top 10 mais consumidos', value: 'top10' },
];

interface Servico {
  nome: string;
  valor: number;
  qtdConsumida?: number;
}

interface ServicosPageState {
  servicos: Servico[];
  modalOpen: boolean;
  filtro: string;
}

class ServicosPage extends React.Component<{}, ServicosPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      servicos: mockServices,
      modalOpen: false,
      filtro: 'todos'
    };
  }

  filtrarServicos(servicos: Servico[], filtro: string) {
    switch (filtro) {
      case 'top10':
        return [...servicos].sort((a, b) => (b.qtdConsumida || 0) - (a.qtdConsumida || 0)).slice(0, 10);
      default:
        return servicos;
    }
  }

  handleFiltroChange = (value: string) => {
    this.setState({ filtro: value });
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  }

  handleSaveServico = (servico: Servico) => {
    this.setState(prevState => ({
      servicos: [...prevState.servicos, servico],
      modalOpen: false
    }));
  }

  render() {
    const { servicos, modalOpen, filtro } = this.state;
    const servicosFiltrados = this.filtrarServicos(servicos, filtro);

    return (
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Serviços</h1>
          <div className="flex gap-2 flex-wrap items-center">
            {filtros.map(f => (
              <button
                key={f.value}
                className={`px-3 py-1 rounded border ${filtro === f.value ? 'bg-blue-700 text-white' : 'bg-gray-950 text-blue-700 border-blue-700'} transition`}
                onClick={() => this.handleFiltroChange(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition" onClick={this.handleModalOpen}>
            Cadastrar Serviço
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
              {servicosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center text-gray-300 py-8">Nenhum serviço cadastrado.</td>
                </tr>
              ) : (
                servicosFiltrados.map((s, i) => (
                  <tr key={i} className="border-t border-gray-600">
                    <td className="px-4 py-2">{s.nome}</td>
                    <td className="px-4 py-2">R$ {s.valor.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <ServicoModal
          isOpen={modalOpen}
          onClose={this.handleModalClose}
          onSave={this.handleSaveServico}
        />
      </div>
    );
  }
}

export default ServicosPage; 