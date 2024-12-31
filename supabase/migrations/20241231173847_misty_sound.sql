/*
  # Add Metrics Tables

  1. New Tables
    - `module_metrics`: Stores performance metrics for modules
      - `id` (uuid, primary key)
      - `moduleId` (references modules)
      - `cpuUsage` (float)
      - `memoryUsage` (float)
      - `uptime` (integer)
      - `timestamp` (timestamp)
*/

CREATE TABLE IF NOT EXISTS module_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  cpu_usage FLOAT NOT NULL,
  memory_usage FLOAT NOT NULL,
  uptime INTEGER NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);