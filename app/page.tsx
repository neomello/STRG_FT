'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import AuthAlunoForm from '@/components/AuthAlunoForm'
import BotpressWebchatReact from '@/components/BotpressWebchatReact'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [leadRegistered, setLeadRegistered] = useState(false)
  const router = useRouter()

  // Injetar scripts do Botpress após cadastro
  useEffect(() => {
    if (leadRegistered) {
      router.push('/aluno')
    }
  }, [leadRegistered, router])

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      // Aqui você pode implementar sua própria lógica de autenticação
      console.log('Iniciando processo de login...')
      router.push('/aluno')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background com nova imagem */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/bk_3.png')`,
        }}
      />
      {/* Degradê preto animado */}
      <motion.div
        className="absolute inset-0 w-full h-full z-10"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          background: 'linear-gradient(120deg, rgba(0,0,0,0.95) 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      {/* Conteúdo principal */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-12"
        >
          {/* Logo centralizada sem container escuro */}
          <div className="w-[80px] sm:w-[60px]">
            <img
              src="/logo stronger1.png"
              alt="Logo Stronger Fitness"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Formulário direto na landing page */}
          {!leadRegistered && (
            <AuthAlunoForm onSuccess={() => setLeadRegistered(true)} />
          )}
          {leadRegistered && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-green-400 text-lg font-bold mb-4 text-center">Cadastro realizado com sucesso! Aguarde o atendimento...</p>
              <BotpressWebchatReact />
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
