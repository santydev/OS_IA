import { Module } from '../../kernel/types';

export class HealthAnalyzer {
  analyzeModuleHealth(module: Module) {
    const issues = [];

    if (module.status === 'ERROR') {
      issues.push({
        severity: 'HIGH',
        message: `Module ${module.name} is in error state`,
        timestamp: new Date()
      });
    }

    if (module.resources.cpu > 90) {
      issues.push({
        severity: 'MEDIUM',
        message: `Module ${module.name} has high CPU usage`,
        timestamp: new Date()
      });
    }

    return issues;
  }

  analyzeSystemHealth(modules: Module[]) {
    const errorCount = modules.filter(m => m.status === 'ERROR').length;
    const totalModules = modules.length;
    
    return {
      status: errorCount === 0 ? 'HEALTHY' : 
              errorCount < totalModules / 3 ? 'DEGRADED' : 'ERROR',
      errorCount,
      totalModules,
      timestamp: new Date()
    };
  }
}