
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Fungsi untuk menambahkan path Electron sesuai dengan sistem operasi
function addElectronPath() {
    const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
    if (os.platform() === 'win32') {
        process.env.PATH += ';' + path.dirname(electronPath);
    } else {
        process.env.PATH += ':' + path.dirname(electronPath);
    }
}

// Panggil fungsi untuk menambahkan path Electron
addElectronPath();

// Menjalankan aplikasi 1 (Node.js)
const app1 = spawn('node', ['index.js'], { stdio: 'inherit' });

// Menjalankan aplikasi 2 (Electron) setelah 10 detik
setTimeout(() => {
    console.log('Open View');
    const app2 = spawn('electron', ['app.js'], { stdio: 'inherit' });

    // Tangani peristiwa saat proses Electron ditutup
    app2.on('exit', (code, signal) => {
        console.log('Electron process exited with code:', code, 'and signal:', signal);

        // Keluar dari proses utama (aplikasi Node.js) saat proses Electron ditutup
        process.exit();
    });
}, 10000);
