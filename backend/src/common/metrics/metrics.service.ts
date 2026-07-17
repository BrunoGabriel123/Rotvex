import { Injectable } from '@nestjs/common';

interface EndpointMetric {
  count: number;
  totalDurationMs: number;
  errorCount: number;
  lastStatusCode?: number;
}

interface DomainCounters {
  status_change: number;
  status_blocked: number;
  driver_conflict: number;
  vehicle_conflict: number;
}

@Injectable()
export class MetricsService {
  private readonly endpointMetrics = new Map<string, EndpointMetric>();
  private readonly domainCounters: DomainCounters = {
    status_change: 0,
    status_blocked: 0,
    driver_conflict: 0,
    vehicle_conflict: 0,
  };

  recordRequest(
    method: string,
    path: string,
    durationMs: number,
    statusCode: number,
    errorCode?: string,
  ) {
    const key = `${method.toUpperCase()} ${path}`;
    const metric = this.endpointMetrics.get(key) ?? {
      count: 0,
      totalDurationMs: 0,
      errorCount: 0,
    };

    metric.count += 1;
    metric.totalDurationMs += durationMs;
    metric.lastStatusCode = statusCode;

    if (statusCode >= 400 || errorCode) {
      metric.errorCount += 1;
    }

    this.endpointMetrics.set(key, metric);
  }

  recordDomainEvent(event: keyof DomainCounters) {
    this.domainCounters[event] = (this.domainCounters[event] ?? 0) + 1;
  }

  snapshot() {
    return {
      endpoints: Array.from(this.endpointMetrics.entries()).map(
        ([key, metric]) => ({
          key,
          count: metric.count,
          avgDurationMs:
            metric.count === 0
              ? 0
              : Number((metric.totalDurationMs / metric.count).toFixed(2)),
          errorCount: metric.errorCount,
          lastStatusCode: metric.lastStatusCode,
        }),
      ),
      domain: { ...this.domainCounters },
    };
  }
}
