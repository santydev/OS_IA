export interface InstallationStep {
  id: string;
  name: string;
  description: string;
  validate: () => Promise<boolean>;
  execute: () => Promise<void>;
  rollback: () => Promise<void>;
}

export interface SystemRequirements {
  minCPU: number;
  minRAM: number;
  minDiskSpace: number;
  requiredPorts: number[];
}

export interface InstallationConfig {
  requirements: SystemRequirements;
  steps: InstallationStep[];
}