const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const PROJECT_DIR = __dirname;
const APP_NAME = 'os-ui';  // Must match ecosystem.config.js
const PORT = 3000;
const LOG_FILE = path.join(PROJECT_DIR, 'deploy.log');
const DEPLOY_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(LOG_FILE, logMessage);
}

function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, {
            cwd: PROJECT_DIR,
            maxBuffer: 10 * 1024 * 1024,
            timeout: 600000
        }, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stdout, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

function checkHealth() {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${PORT}`, (res) => {
            resolve(res.statusCode === 200 || res.statusCode === 404);
        });

        req.on('error', () => resolve(false));
        req.setTimeout(5000, () => {
            req.destroy();
            resolve(false);
        });
    });
}

async function isAppRunning() {
    try {
        const { stdout } = await execCommand('pm2 jlist');
        const processes = JSON.parse(stdout);
        return processes.some(p => p.name === APP_NAME);
    } catch (err) {
        return false;
    }
}

async function deploy() {
    log('========================================');
    log('Starting deployment...');
    log('========================================');

    try {
        // Check if app exists in PM2
        log('0. Checking PM2 status...');
        const appExists = await isAppRunning();
        log(appExists ? `✓ App "${APP_NAME}" is running in PM2` : `ℹ App "${APP_NAME}" not found in PM2`);

        // Pull latest code
        log('1. Pulling latest code...');
        await execCommand('git fetch origin');
        await execCommand('git reset --hard origin/master');
        log('✓ Code updated');

        // Install dependencies
        log('2. Installing dependencies...');
        await execCommand('yarn install');
        log('✓ Dependencies installed');

        // Build
        log('3. Building application...');
        await execCommand('yarn build');
        log('✓ Build successful');

        // Start or Reload based on whether app exists
        if (appExists) {
            log('4. Reloading with PM2 (zero-downtime)...');
            try {
                await execCommand(`pm2 reload ${APP_NAME} --update-env`);
                log('✓ PM2 reload completed');
            } catch (reloadErr) {
                log('⚠ Reload failed, trying restart...');
                await execCommand(`pm2 restart ${APP_NAME} --update-env`);
                log('✓ PM2 restart completed');
            }
        } else {
            log('4. Starting app with PM2 (first time)...');
            await execCommand('pm2 start ecosystem.config.js');
            log('✓ App started');
        }

        // Wait for stabilization
        log('5. Waiting for app to stabilize...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Verify health
        log('6. Verifying app health...');
        const isHealthy = await checkHealth();

        if (!isHealthy) {
            log('⚠ Warning: App may not be responding properly');
        } else {
            log('✓ App is healthy and responding');
        }

        // Save PM2 configuration
        await execCommand('pm2 save');
        log('✓ PM2 configuration saved');

        log('========================================');
        log('✅ Deployment completed successfully!');
        log('========================================');

    } catch (err) {
        log('========================================');
        log('❌ Deployment failed!');
        log(`Error: ${err.error ? err.error.message : err.message}`);
        if (err.stderr) log(`Stderr: ${err.stderr}`);
        if (err.stdout) log(`Stdout: ${err.stdout}`);
        log('========================================');

        // Attempt recovery
        log('Attempting to ensure app is running...');
        try {
            const appExists = await isAppRunning();
            if (!appExists) {
                log('Starting app as recovery...');
                await execCommand('pm2 start ecosystem.config.js');
            } else {
                log('Restarting app as recovery...');
                await execCommand(`pm2 restart ${APP_NAME}`);
            }
            log('✓ Recovery completed');
        } catch (recoveryErr) {
            log('✗ Recovery failed');
        }
    }
}

// Initial deployment
log('=== Zero-Downtime Deploy Scheduler Started ===');
log(`Project: ${PROJECT_DIR}`);
log(`App Name: ${APP_NAME}`);
log(`Port: ${PORT}`);
log(`Deploy Interval: Every 2 hours`);
log('===================================');

deploy();

setInterval(() => {
    deploy();
}, DEPLOY_INTERVAL);

process.on('SIGINT', () => {
    log('Scheduler stopped by user');
    process.exit(0);
});

process.on('SIGTERM', () => {
    log('Scheduler stopped');
    process.exit(0);
});
