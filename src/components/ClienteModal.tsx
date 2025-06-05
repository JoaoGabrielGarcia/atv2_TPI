import React from 'react';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: ClienteFormData) => void;
}

interface ClienteFormData {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  telefone: string;
  ddd: string;
}

interface ClienteModalState {
  form: ClienteFormData;
  errors: Record<string, string>;
}

const generos = [
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Outro', value: 'Outro' },
];

class ClienteModal extends React.Component<ClienteModalProps, ClienteModalState> {
  constructor(props: ClienteModalProps) {
    super(props);
    this.state = {
      form: {
        nome: '',
        nomeSocial: '',
        genero: '',
        cpf: '',
        rg: '',
        telefone: '',
        ddd: '',
      },
      errors: {}
    };
  }

  validate = () => {
    const { form } = this.state;
    const newErrors: Record<string, string> = {};
    
    if (!form.nome) newErrors.nome = 'Nome obrigatório';
    if (!form.nomeSocial) newErrors.nomeSocial = 'Nome social obrigatório';
    if (!form.genero) newErrors.genero = 'Gênero obrigatório';
    if (!form.cpf || !/^\d{11}$/.test(form.cpf)) newErrors.cpf = 'CPF deve ter 11 dígitos';
    if (!form.rg) newErrors.rg = 'RG obrigatório';
    if (!form.ddd || !/^\d{2}$/.test(form.ddd)) newErrors.ddd = 'DDD inválido';
    if (!form.telefone || !/^\d{8,9}$/.test(form.telefone)) newErrors.telefone = 'Telefone inválido';
    
    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.setState(prevState => ({
      form: { ...prevState.form, [e.target.name]: e.target.value }
    }));
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.validate()) {
      this.props.onSave(this.state.form);
      this.setState({
        form: {
          nome: '',
          nomeSocial: '',
          genero: '',
          cpf: '',
          rg: '',
          telefone: '',
          ddd: '',
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
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4">Cadastrar Cliente</h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Nome</label>
              <input name="nome" value={form.nome} onChange={this.handleChange} className="w-full border rounded px-3 py-2" />
              {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
            </div>
            <div>
              <label className="block font-medium">Nome Social</label>
              <input name="nomeSocial" value={form.nomeSocial} onChange={this.handleChange} className="w-full border rounded px-3 py-2" />
              {errors.nomeSocial && <span className="text-red-500 text-sm">{errors.nomeSocial}</span>}
            </div>
            <div>
              <label className="block font-medium">Gênero</label>
              <select name="genero" value={form.genero} onChange={this.handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Selecione</option>
                {generos.map(g => <option key={g.value} className='text-black' value={g.value}>{g.label}</option>)}
              </select>
              {errors.genero && <span className="text-red-500 text-sm">{errors.genero}</span>}
            </div>
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block font-medium">CPF</label>
                <input name="cpf" value={form.cpf} onChange={this.handleChange} className="w-full border rounded px-3 py-2" maxLength={11} />
                {errors.cpf && <span className="text-red-500 text-sm">{errors.cpf}</span>}
              </div>
              <div className="w-1/2">
                <label className="block font-medium">RG</label>
                <input name="rg" value={form.rg} onChange={this.handleChange} className="w-full border rounded px-3 py-2" />
                {errors.rg && <span className="text-red-500 text-sm">{errors.rg}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <label className="block font-medium">DDD</label>
                <input name="ddd" value={form.ddd} onChange={this.handleChange} className="w-full border rounded px-3 py-2" maxLength={2} />
                {errors.ddd && <span className="text-red-500 text-sm">{errors.ddd}</span>}
              </div>
              <div className="w-2/3">
                <label className="block font-medium">Telefone</label>
                <input name="telefone" value={form.telefone} onChange={this.handleChange} className="w-full border rounded px-3 py-2" maxLength={9} />
                {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ClienteModal; 