import * as fs from 'fs';
import * as path from 'path';

fs.rmSync(path.join(__dirname, '../lib'), { recursive: true, force: true });
fs.rmSync(path.join(__dirname, '../assets'), { recursive: true, force: true });
fs.mkdirSync(path.join(__dirname, '../lib'), { recursive: true });
