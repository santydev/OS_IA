export interface Module {
  id: string;
  name: string;
  type: 'AI' | 'UTILITY';
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  resources: {
    cpu: number;
    memory: number;
  };
}

export interface Snapshot {
  id: string;
  moduleId: string;
  timestamp: Date;
  state: Record<string, unknown>;
}

export interface KernelState {
  modules: Module[];
  resources: {
    totalCpu: number;
    totalMemory: number;
    availableCpu: number;
    availableMemory: number;
  };
}