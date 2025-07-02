require('dotenv').config()
require('rootpath')()
console.clear()

// ─────────────────────────────────────────────
// Dummy Express server ‑ keeps Render/Replit alive
const express = require('express')
const app = express()

app.get('/', (_, res) => res.send('Genesis‑Bot is running!'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Dummy server listening on port ${PORT}`))
// ─────────────────────────────────────────────

const { spawn } = require('child_process')
const path = require('path')
const CFonts = require('cfonts')
const chalk = require('chalk')

function start () {
   let args = [path.join(__dirname, 'client.js'), ...process.argv.slice(2)]
   let p = spawn(process.argv[0], args, {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
   }).on('message', data => {
      if (data == 'reset') {
         console.log('Restarting...')
         p.kill()
         delete p
      }
   }).on('exit', code => {
      console.error('Exited with code:', code)
      start() // 🧠 only restart the bot — not the Express server!
   })
}

const major = parseInt(process.versions.node.split('.')[0], 10)
if (major < 20) {
   console.error(
      `\n❌ This script requires Node.js 20+ to run reliably.\n` +
      `   You are using Node.js ${process.versions.node}.\n` +
      `   Please upgrade to Node.js 20+ to proceed.\n`
   )
   process.exit(1)
}

CFonts.say('NEOXR BOT', { font: 'tiny', align: 'center', colors: ['system'] })
CFonts.say('Github : https://github.com/neoxr/neoxr-bot', { colors: ['system'], font: 'console', align: 'center' })
start()
