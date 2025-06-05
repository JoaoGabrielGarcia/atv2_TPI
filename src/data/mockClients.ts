interface Client {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  dataCadastro: Date;
  ddd: string;
  telefone: string;
}

export const mockClients: Client[] = [
  {
    nome: 'Ana Silva',
    nomeSocial: 'Ana S.',
    genero: 'Feminino',
    cpf: '123.456.789-01',
    rg: '89759465',
    dataCadastro: new Date(2024, 4, 20),
    ddd: '12',
    telefone: '978465123'
  },
  {
    nome: 'Bruno Souza',
    nomeSocial: 'Bruno S.',
    genero: 'Masculino',
    cpf: '123.456.789-02',
    rg: '89759466',
    dataCadastro: new Date(2024, 4, 21),
    ddd: '13',
    telefone: '978465124'
  },
  {
    nome: 'Carla Oliveira',
    nomeSocial: 'Carla O.',
    genero: 'Feminino',
    cpf: '123.456.789-03',
    rg: '89759467',
    dataCadastro: new Date(2024, 4, 22),
    ddd: '14',
    telefone: '978465125'
  }
]; 