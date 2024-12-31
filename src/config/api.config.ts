export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    MODULES: '/api/modules',
    SNAPSHOTS: '/api/snapshots',
    RESOURCES: '/api/resources',
    METRICS: '/api/metrics'
  },
  VERSION: 'v1'
} as const;