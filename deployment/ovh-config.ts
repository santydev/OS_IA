import { z } from 'zod';

export const ovhConfig = {
  server: {
    type: 'VPS',
    plan: 'Elite',
    region: 'gravelines',
    specs: {
      cpu: 4,
      ram: '8GB',
      storage: '160GB SSD'
    }
  },
  
  network: {
    domain: 'os-ia.com',
    ssl: true,
    cdn: true,
    firewall: {
      allowedPorts: [22, 80, 443],
      allowedIPs: [] // À configurer
    }
  },

  database: {
    type: 'PostgreSQL',
    version: '15',
    config: {
      maxConnections: 100,
      sslMode: 'require'
    }
  }
};