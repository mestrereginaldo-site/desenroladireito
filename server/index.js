import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/dist')))

// Servir arquivos estáticos do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Desenrola Direito API funcionando' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🏛️ Desenrola Direito rodando na porta ${PORT}`)
  console.log(`📱 Acesse: http://localhost:${PORT}`)
})
