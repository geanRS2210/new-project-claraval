type Data = {
  id: number;
  user: string;
  level: string;
  password: string;
  state: string;
}[];
export const database: Data = [
  {
    id: 1,
    user: 'gean',
    password: '12345678',
    level: 'administrator',
    state: 'valid',
  },
  {
    id: 2,
    user: 'mauricio',
    password: '12345678',
    level: 'operator',
    state: 'valid',
  },
  {
    id: 3,
    user: 'aleatorio',
    password: '12345678',
    level: 'operator',
    state: 'invalid',
  },
];
