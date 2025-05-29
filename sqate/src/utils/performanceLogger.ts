import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const initPerformanceLogging = (callback: (msg: string) => void): void => {
  const logMetric = (metric: any) => {
    callback(`[Performance] ${metric.name}: ${metric.value.toFixed(2)}`);
  };

  getCLS(logMetric);
  getFID(logMetric);
  getFCP(logMetric);
  getLCP(logMetric);
  getTTFB(logMetric);
}; 