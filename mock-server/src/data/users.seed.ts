import type { User } from '../types/user.types';

// Synthetic fixtures for API testing; emails are not intended as real addresses.
export const usersSeed: User[] = [
  { id: 'a1000000-0000-4000-8000-000000000001', firstName: 'Raúl', lastName: 'Alfonsín', email: 'qa.seed.raul.alfonsin@gmail.com', age: 78, status: 'ACTIVE', createdAt: '2026-01-01T10:00:00.000Z', updatedAt: '2026-01-01T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000002', firstName: 'Carlos Saúl', lastName: 'Menem', email: 'qa.seed.carlos.menem@gmail.com', age: 83, status: 'INACTIVE', createdAt: '2026-01-02T10:00:00.000Z', updatedAt: '2026-01-02T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000003', firstName: 'Fernando', lastName: 'de la Rúa', email: 'qa.seed.fernando.delarua@gmail.com', age: 81, status: 'ACTIVE', createdAt: '2026-01-03T10:00:00.000Z', updatedAt: '2026-01-03T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000004', firstName: 'Ramón', lastName: 'Puerta', email: 'qa.seed.ramon.puerta@gmail.com', age: 74, status: 'INACTIVE', createdAt: '2026-01-04T10:00:00.000Z', updatedAt: '2026-01-04T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000005', firstName: 'Adolfo', lastName: 'Rodríguez Saá', email: 'qa.seed.adolfo.rodriguezsaa@gmail.com', age: 79, status: 'ACTIVE', createdAt: '2026-01-05T10:00:00.000Z', updatedAt: '2026-01-05T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000006', firstName: 'Eduardo', lastName: 'Camaño', email: 'qa.seed.eduardo.camano@gmail.com', age: 72, status: 'INACTIVE', createdAt: '2026-01-06T10:00:00.000Z', updatedAt: '2026-01-06T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000007', firstName: 'Eduardo', lastName: 'Duhalde', email: 'qa.seed.eduardo.duhalde@gmail.com', age: 84, status: 'ACTIVE', createdAt: '2026-01-07T10:00:00.000Z', updatedAt: '2026-01-07T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000008', firstName: 'Néstor', lastName: 'Kirchner', email: 'qa.seed.nestor.kirchner@gmail.com', age: 75, status: 'ACTIVE', createdAt: '2026-01-08T10:00:00.000Z', updatedAt: '2026-01-08T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000009', firstName: 'Cristina', lastName: 'Fernández de Kirchner', email: 'qa.seed.cristina.fernandez@gmail.com', age: 69, status: 'ACTIVE', createdAt: '2026-01-09T10:00:00.000Z', updatedAt: '2026-01-09T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000010', firstName: 'Mauricio', lastName: 'Macri', email: 'qa.seed.mauricio.macri@gmail.com', age: 67, status: 'ACTIVE', createdAt: '2026-01-10T10:00:00.000Z', updatedAt: '2026-01-10T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000011', firstName: 'Alberto', lastName: 'Fernández', email: 'qa.seed.alberto.fernandez@gmail.com', age: 66, status: 'INACTIVE', createdAt: '2026-01-11T10:00:00.000Z', updatedAt: '2026-01-11T11:00:00.000Z' },
  { id: 'a1000000-0000-4000-8000-000000000012', firstName: 'Javier', lastName: 'Milei', email: 'qa.seed.javier.milei@gmail.com', age: 54, status: 'ACTIVE', createdAt: '2026-01-12T10:00:00.000Z', updatedAt: '2026-01-12T11:00:00.000Z' },
];
