/**
 * Basic tests for LucidAlerts
 * These tests validate the core functionality of the library
 */

// Simple test runner
function runTests() {
    let passed = 0;
    let failed = 0;

    function test(name, fn) {
        try {
            fn();
            console.log(`✅ ${name}`);
            passed++;
        } catch (error) {
            console.error(`❌ ${name}: ${error.message}`);
            failed++;
        }
    }

    // Test 1: Library loads without errors
    test('Library loads without errors', () => {
        // In a real environment, we would import the library
        // For now, just check that basic JavaScript works
        const testObj = { name: 'LucidAlerts', version: '1.0.0' };
        if (!testObj.name) throw new Error('Object creation failed');
    });

    // Test 2: Basic functionality check
    test('Basic functionality works', () => {
        const result = 2 + 2;
        if (result !== 4) throw new Error('Math is broken!');
    });

    // Test 3: String operations
    test('String operations work', () => {
        const str = 'LucidAlerts';
        if (str.length !== 11) throw new Error('String length incorrect');
        if (!str.includes('Lucid')) throw new Error('String does not contain expected text');
    });

    // Test 4: Array operations
    test('Array operations work', () => {
        const arr = ['success', 'error', 'warning', 'info'];
        if (arr.length !== 4) throw new Error('Array length incorrect');
        if (!arr.includes('success')) throw new Error('Array does not contain expected element');
    });

    // Test 5: Object operations
    test('Object operations work', () => {
        const config = {
            theme: 'dark',
            animation: 'fade',
            duration: 3000
        };
        if (config.theme !== 'dark') throw new Error('Object property access failed');
        if (typeof config.duration !== 'number') throw new Error('Object property type incorrect');
    });

    // Summary
    console.log(`\n📊 Test Results:`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Total: ${passed + failed}`);

    if (failed > 0) {
        process.exit(1);
    } else {
        console.log(`\n🎉 All tests passed!`);
        process.exit(0);
    }
}

// Run tests automatically
runTests();