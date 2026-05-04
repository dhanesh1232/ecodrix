import fs from 'fs';
import path from 'path';

interface PerformanceBudgets {
  maxInitialBundleSize: number; // 200 KiB
  maxRouteChunkSize: number;    // 100 KiB
  maxAssetSize: number;          // 50 KiB
}

interface ChunkInfo {
  name: string;
  size: number;
  sizeKiB: number;
  modules: string[];
}

interface DependencyInfo {
  name: string;
  size: number;
  sizeKiB: number;
  version: string;
}

interface BundleReport {
  totalSize: number;
  totalSizeKiB: number;
  chunks: ChunkInfo[];
  dependencies: DependencyInfo[];
  timestamp: string;
}

interface BudgetResult {
  passed: boolean;
  violations: string[];
  warnings: string[];
}

const PERFORMANCE_BUDGETS: PerformanceBudgets = {
  maxInitialBundleSize: 200 * 1024, // 200 KiB
  maxRouteChunkSize: 100 * 1024,    // 100 KiB
  maxAssetSize: 50 * 1024,          // 50 KiB
};

function formatBytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} KiB`;
}

function analyzeBuildStats(buildDir: string): BundleReport {
  const statsPath = path.join(buildDir, '.next', 'build-manifest.json');
  
  if (!fs.existsSync(statsPath)) {
    throw new Error(`Build manifest not found at ${statsPath}. Run 'pnpm build' first.`);
  }

  const manifest = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));
  
  const chunks: ChunkInfo[] = [];
  let totalSize = 0;

  // Analyze all pages and their chunks
  for (const [page, files] of Object.entries(manifest.pages)) {
    const pageFiles = files as string[];
    let pageSize = 0;

    for (const file of pageFiles) {
      const filePath = path.join(buildDir, '.next', file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        pageSize += stats.size;
        totalSize += stats.size;
      }
    }

    chunks.push({
      name: page,
      size: pageSize,
      sizeKiB: pageSize / 1024,
      modules: pageFiles,
    });
  }

  // Sort chunks by size (largest first)
  chunks.sort((a, b) => b.size - a.size);

  return {
    totalSize,
    totalSizeKiB: totalSize / 1024,
    chunks,
    dependencies: [], // Will be populated from package.json if needed
    timestamp: new Date().toISOString(),
  };
}

function checkBudgets(report: BundleReport, budgets: PerformanceBudgets): BudgetResult {
  const violations: string[] = [];
  const warnings: string[] = [];

  // Check initial bundle size (main + first page)
  const initialChunks = report.chunks.filter(c => 
    c.name === '/_app' || c.name === '/' || c.name.includes('main')
  );
  const initialSize = initialChunks.reduce((sum, chunk) => sum + chunk.size, 0);

  if (initialSize > budgets.maxInitialBundleSize) {
    violations.push(
      `Initial bundle size ${formatBytes(initialSize)} exceeds budget of ${formatBytes(budgets.maxInitialBundleSize)}`
    );
  }

  // Check individual route chunks
  for (const chunk of report.chunks) {
    if (chunk.size > budgets.maxRouteChunkSize) {
      warnings.push(
        `Route chunk "${chunk.name}" (${formatBytes(chunk.size)}) exceeds recommended size of ${formatBytes(budgets.maxRouteChunkSize)}`
      );
    }
  }

  // Check individual assets
  for (const chunk of report.chunks) {
    for (const module of chunk.modules) {
      if (module.endsWith('.js') || module.endsWith('.css')) {
        const filePath = path.join(process.cwd(), '.next', module);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          if (stats.size > budgets.maxAssetSize) {
            warnings.push(
              `Asset "${module}" (${formatBytes(stats.size)}) exceeds recommended size of ${formatBytes(budgets.maxAssetSize)}`
            );
          }
        }
      }
    }
  }

  return {
    passed: violations.length === 0,
    violations,
    warnings,
  };
}

function generateReport(report: BundleReport, budgetResult: BudgetResult): void {
  console.log('\n📊 Bundle Analysis Report');
  console.log('========================\n');
  
  console.log(`Total Bundle Size: ${formatBytes(report.totalSize)}`);
  console.log(`Timestamp: ${report.timestamp}\n`);

  console.log('📦 Largest Chunks:');
  console.log('------------------');
  report.chunks.slice(0, 10).forEach((chunk, index) => {
    console.log(`${index + 1}. ${chunk.name}: ${formatBytes(chunk.size)}`);
  });

  console.log('\n🎯 Performance Budget Check:');
  console.log('----------------------------');
  
  if (budgetResult.passed) {
    console.log('✅ All performance budgets passed!');
  } else {
    console.log('❌ Performance budget violations:');
    budgetResult.violations.forEach(violation => {
      console.log(`   - ${violation}`);
    });
  }

  if (budgetResult.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    budgetResult.warnings.forEach(warning => {
      console.log(`   - ${warning}`);
    });
  }

  // Save report to file
  const reportDir = path.join(process.cwd(), '.next', 'analyze');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, `bundle-report-${Date.now()}.json`);
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ report, budgetResult }, null, 2)
  );
  console.log(`\n📄 Full report saved to: ${reportPath}\n`);
}

function main() {
  try {
    const buildDir = process.cwd();
    console.log('🔍 Analyzing bundle...\n');
    
    const report = analyzeBuildStats(buildDir);
    const budgetResult = checkBudgets(report, PERFORMANCE_BUDGETS);
    
    generateReport(report, budgetResult);

    // Exit with error code if budgets are violated
    if (!budgetResult.passed) {
      console.error('❌ Build failed due to performance budget violations.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error analyzing bundle:', error);
    process.exit(1);
  }
}

main();
