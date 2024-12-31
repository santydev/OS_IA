import { Calendar } from './components/Calendar';
import { Module } from '@/core/types/module';

export const AgendaModule: Module = {
  id: 'agenda',
  name: 'Agenda',
  description: 'Calendar and event management system',
  icon: 'calendar',
  enabled: true,
  route: '/dashboard/agenda'
};

export { Calendar as default } from './components/Calendar';