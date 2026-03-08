import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const mode = process.argv[2] === 'preview' ? 'preview' : 'dev';
const port = Number(process.env.PORT || 4321);

const preferredInterfacePatterns = [
  /wlan/i,
  /wi-?fi/i,
  /wireless/i,
  /ethernet/i,
  /以太网/i,
];

const ignoredInterfacePatterns = [
  /letstap/i,
  /\btap\b/i,
  /\btun\b/i,
  /vpn/i,
  /virtual/i,
  /vmware/i,
  /hyper-v/i,
  /vethernet/i,
  /loopback/i,
  /bluetooth/i,
  /蓝牙/i,
];

function classifyInterfaces() {
  const interfaces = os.networkInterfaces();
  const preferred = [];
  const fallback = [];
  const ignored = [];

  for (const [name, entries] of Object.entries(interfaces)) {
    if (!entries) continue;

    for (const entry of entries) {
      if (!entry || entry.family !== 'IPv4' || entry.internal) continue;

      const record = {
        name,
        address: entry.address,
      };

      if (ignoredInterfacePatterns.some((pattern) => pattern.test(name))) {
        ignored.push(record);
        continue;
      }

      if (preferredInterfacePatterns.some((pattern) => pattern.test(name))) {
        preferred.push(record);
        continue;
      }

      fallback.push(record);
    }
  }

  return { preferred, fallback, ignored };
}

function printHints() {
  const { preferred, fallback, ignored } = classifyInterfaces();
  const candidates = preferred.length > 0 ? preferred : fallback;

  console.log('');
  console.log(`[mobile] Astro ${mode} will listen on all interfaces (0.0.0.0:${port}).`);

  if (candidates.length > 0) {
    console.log('[mobile] Suggested URL(s) for phone preview:');
    for (const item of candidates) {
      console.log(`  http://${item.address}:${port}    (${item.name})`);
    }
  } else {
    console.log('[mobile] No usable LAN IPv4 address was detected. Check Wi-Fi / Ethernet connection.');
  }

  if (ignored.length > 0) {
    console.log('[mobile] Ignored virtual / VPN adapters:');
    for (const item of ignored) {
      console.log(`  ${item.address}    (${item.name})`);
    }
  }

  console.log('');
}

function resolveAstroBin() {
  const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  const binName = process.platform === 'win32' ? 'astro.cmd' : 'astro';
  return path.join(rootDir, 'node_modules', '.bin', binName);
}

printHints();

const astroBin = resolveAstroBin();
const astroArgs = [mode, '--host', '0.0.0.0', '--port', String(port)];
const child = process.platform === 'win32'
  ? spawn('cmd.exe', ['/c', astroBin, ...astroArgs], {
      stdio: 'inherit',
      env: process.env,
    })
  : spawn(astroBin, astroArgs, {
      stdio: 'inherit',
      env: process.env,
    });

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
