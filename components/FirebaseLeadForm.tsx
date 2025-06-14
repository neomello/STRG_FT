"use client";

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FirebaseLeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      await addDoc(collection(db, 'aluno'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setStatus('success');
      setFormData({ nome: '', email: '', whatsapp: '' });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6 space-y-5 font-mono relative"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-red-600 text-center">
        CT Stronger Fitness
        </h2>
        {status === 'success' && (
          <div className="text-center text-sm font-semibold text-green-400">
            Cadastro realizado com sucesso!
          </div>
        )}
        {status === 'error' && (
          <div className="text-center text-sm font-semibold text-red-400">
            Erro ao enviar. Tente novamente.
          </div>
        )}
        <div>
          <label htmlFor="nome" className="block text-zinc-400 mb-1">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-zinc-500"
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-zinc-400 mb-1">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-zinc-500"
            placeholder="Seu e-mail"
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="block text-zinc-400 mb-1">WhatsApp:</label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-zinc-500"
            placeholder="Ex: (99) 99999-9999"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {status === 'loading' ? 'ENVIANDO...' : 'CONFIRMAR CADASTRO'}
        </button>
        <p className="text-xs text-center text-zinc-500 pt-4">
          Seus dados estão protegidos. Usamos apenas para contato da equipe CT Stronger Fitness.
        </p>
      </form>
    </div>
  );
} 