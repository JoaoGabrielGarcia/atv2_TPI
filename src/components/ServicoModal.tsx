import React from 'react';

interface ServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (servico: ServicoFormData) => void;
}

interface ServicoFormData {
  nome: string;
  valor: number;
}

interface ServicoModalState {
  form: {
    nome: string;
    valor: string;
  };
  errors: Record<string, string>;
}

class ServicoModal extends React.Component<ServicoModalProps, ServicoModalState> {
  constructor(props: ServicoModalProps) {
    super(props);
    this.state = {
      form: {
        nome: '',
        valor: ''
      },
      errors: {}
    };
  }

  validate = () => {
    const { form } = this.state;
    const newErrors: Record<string, string> = {};
    
    if (!form.nome) newErrors.nome = 'Nome obrigatório';
    if (!form.valor || isNaN(Number(form.valor)) || Number(form.valor) <= 0) {
      newErrors.valor = 'Valor deve ser um número positivo';
    }
    
    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      form: { ...prevState.form, [e.target.name]: e.target.value }
    }));
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.validate()) {
      this.props.onSave({ ...this.state.form, valor: Number(this.state.form.valor) });
      this.setState({
        form: {
          nome: '',
          valor: ''
        }
      });
    }
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { form, errors } = this.state;

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-lg p-8 relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4 text-white">Cadastrar Serviço</h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-white">Nome</label>
              <input name="nome" value={form.nome} onChange={this.handleChange} className="w-full border rounded px-3 py-2 bg-gray-900 text-white" />
              {errors.nome && <span className="text-red-400 text-sm">{errors.nome}</span>}
            </div>
            <div>
              <label className="block font-medium text-white">Valor</label>
              <input name="valor" value={form.valor} onChange={this.handleChange} className="w-full border rounded px-3 py-2 bg-gray-900 text-white" type="number" min="0.01" step="0.01" />
              {errors.valor && <span className="text-red-400 text-sm">{errors.valor}</span>}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500" onClick={onClose}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ServicoModal; 