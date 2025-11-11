import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface TestReport {
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
    startTime: string;
    endTime: string;
  };
  tests: Array<{
    title: string;
    file: string;
    status: string;
    duration: number;
    error?: string;
    retries: number;
  }>;
}

class CustomJSONReporter implements Reporter {
  private startTime: Date = new Date();
  private results: TestReport = {
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      startTime: '',
      endTime: '',
    },
    tests: [],
  };

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = new Date();
    this.results.summary.startTime = this.startTime.toISOString();
    console.log(`Starting test execution with ${suite.allTests().length} tests`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.summary.total++;
    
    const testInfo = {
      title: test.title,
      file: path.relative(process.cwd(), test.location.file),
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      retries: result.retry,
    };

    this.results.tests.push(testInfo);

    switch (result.status) {
      case 'passed':
        this.results.summary.passed++;
        break;
      case 'failed':
        this.results.summary.failed++;
        break;
      case 'skipped':
        this.results.summary.skipped++;
        break;
    }
  }

  onEnd(result: FullResult) {
    const endTime = new Date();
    this.results.summary.endTime = endTime.toISOString();
    this.results.summary.duration = endTime.getTime() - this.startTime.getTime();

    const reportDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const reportPath = path.join(reportDir, 'test-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    console.log('\n=== Test Execution Summary ===');
    console.log(`Total Tests: ${this.results.summary.total}`);
    console.log(`Passed: ${this.results.summary.passed}`);
    console.log(`Failed: ${this.results.summary.failed}`);
    console.log(`Skipped: ${this.results.summary.skipped}`);
    console.log(`Duration: ${(this.results.summary.duration / 1000).toFixed(2)}s`);
    console.log(`\nJSON Report saved to: ${reportPath}`);
  }
}

export default CustomJSONReporter;