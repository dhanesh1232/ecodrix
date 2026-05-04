import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

export interface WebVitalsMetric {
  name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export interface Metrics {
  FCP?: number;
  LCP?: number;
  CLS?: number;
  TTFB?: number;
  INP?: number;
}

export interface RegressionReport {
  hasRegression: boolean;
  degradedMetrics: WebVitalsMetric[];
  percentageChange: number;
}

class PerformanceMonitor {
  private metrics: Map<string, WebVitalsMetric> = new Map();
  private baseline: Metrics | null = null;
  private isInitialized = false;

  /**
   * Initialize Core Web Vitals monitoring
   */
  init(): void {
    if (this.isInitialized) {
      return;
    }

    // Track all Core Web Vitals
    onCLS(this.handleMetric.bind(this));
    onFCP(this.handleMetric.bind(this));
    onINP(this.handleMetric.bind(this));
    onLCP(this.handleMetric.bind(this));
    onTTFB(this.handleMetric.bind(this));

    this.isInitialized = true;

    if (typeof window !== 'undefined') {
      console.log('✅ Performance monitoring initialized');
    }
  }

  /**
   * Handle incoming metric from web-vitals
   */
  private handleMetric(metric: Metric): void {
    const webVitalsMetric: WebVitalsMetric = {
      name: metric.name as WebVitalsMetric['name'],
      value: metric.value,
      rating: metric.rating as WebVitalsMetric['rating'],
      delta: metric.delta,
      id: metric.id,
    };

    this.metrics.set(metric.name, webVitalsMetric);
    this.trackWebVitals(webVitalsMetric);
  }

  /**
   * Track Core Web Vitals metric
   */
  trackWebVitals(metric: WebVitalsMetric): void {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${metric.name}:`, {
        value: metric.value.toFixed(2),
        rating: metric.rating,
        delta: metric.delta.toFixed(2),
      });
    }

    // Report to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.report([metric]).catch((error) => {
        console.error('Failed to report metrics:', error);
      });
    }
  }

  /**
   * Report metrics to analytics
   */
  async report(metrics: WebVitalsMetric[]): Promise<void> {
    try {
      // Send to Google Analytics 4 if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        metrics.forEach((metric) => {
          (window as any).gtag('event', metric.name, {
            value: Math.round(metric.value),
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_rating: metric.rating,
          });
        });
      }

      // Could also send to custom analytics endpoint
      // await fetch('/api/analytics/web-vitals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics),
      // });
    } catch (error) {
      // Silently fail - don't impact user experience
      if (process.env.NODE_ENV === 'development') {
        console.error('Error reporting metrics:', error);
      }
    }
  }

  /**
   * Set baseline metrics for regression detection
   */
  setBaseline(baseline: Metrics): void {
    this.baseline = baseline;
  }

  /**
   * Detect performance regressions
   */
  detectRegression(current: Metrics, baseline: Metrics): RegressionReport {
    const degradedMetrics: WebVitalsMetric[] = [];
    let totalPercentageChange = 0;
    let metricCount = 0;

    // Check each metric for 10% degradation
    const metricNames: (keyof Metrics)[] = ['FCP', 'LCP', 'CLS', 'TTFB', 'INP'];

    for (const name of metricNames) {
      const currentValue = current[name];
      const baselineValue = baseline[name];

      if (currentValue !== undefined && baselineValue !== undefined) {
        const percentageChange = ((currentValue - baselineValue) / baselineValue) * 100;

        if (percentageChange > 10) {
          const storedMetric = this.metrics.get(name);
          if (storedMetric) {
            degradedMetrics.push(storedMetric);
          }
          totalPercentageChange += percentageChange;
          metricCount++;
        }
      }
    }

    return {
      hasRegression: degradedMetrics.length > 0,
      degradedMetrics,
      percentageChange: metricCount > 0 ? totalPercentageChange / metricCount : 0,
    };
  }

  /**
   * Get all collected metrics
   */
  getMetrics(): WebVitalsMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get a specific metric
   */
  getMetric(name: string): WebVitalsMetric | undefined {
    return this.metrics.get(name);
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export for use in Next.js app
export function initPerformanceMonitoring(): void {
  if (typeof window !== 'undefined') {
    performanceMonitor.init();
  }
}
