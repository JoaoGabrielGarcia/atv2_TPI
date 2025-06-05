import { useState } from 'react';

interface ServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (servico: any) => void;
}

export default function ServicoModal({ isOpen, onClose, onSave }: ServicoModalProps) {
  const [form, setForm] = useState({ nome: '', valor: '' });
  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: any = {};
    if (!form.nome) newErrors.nome = 'Nome obrigatório';
    if (!form.valor || isNaN(Number(form.valor)) || Number(form.valor) <= 0) newErrors.valor = 'Valor deve ser um número positivo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...form, valor: Number(form.valor) });
      setForm({ nome: '', valor: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-white">Cadastrar Serviço</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-white">Nome</label>
            <input name="nome" value={form.nome} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-gray-900 text-white" />
            {errors.nome && <span className="text-red-400 text-sm">{errors.nome}</span>}
          </div>
          <div>
            <label className="block font-medium text-white">Valor</label>
            <input name="valor" value={form.valor} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-gray-900 text-white" type="number" min="0.01" step="0.01" />
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