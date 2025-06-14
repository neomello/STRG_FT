import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AuthAlunoForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    senha: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.senha);
        setStatus('success');
        onSuccess?.();
      } else {
        // Cadastro
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
        const user = userCredential.user;
        await addDoc(collection(db, 'aluno'), {
          uid: user.uid,
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          status: true,
          timestamp: serverTimestamp()
        });
        setStatus('success');
        setFormData({ nome: '', email: '', whatsapp: '', senha: '' });
        onSuccess?.();
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMsg(error.message || 'Erro ao autenticar/cadastrar.');
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6 space-y-5 font-mono relative"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-red-600 text-center">
          {isLogin ? 'Acessar Área do Aluno' : 'Cadastro de Aluno'}
        </h2>
        {status === 'success' && (
          <div className="text-center text-sm font-semibold text-green-400">
            {isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!'}
          </div>
        )}
        {status === 'error' && (
          <div className="text-center text-sm font-semibold text-red-400">
            {errorMsg}
          </div>
        )}
        {!isLogin && (
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
        )}
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
            required={!isLogin}
            className="w-full px-4 py-2 bg-black border border-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-zinc-500"
            placeholder="Ex: (99) 99999-9999"
          />
        </div>
        <div>
          <label htmlFor="senha" className="block text-zinc-400 mb-1">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-zinc-500"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {status === 'loading' ? (isLogin ? 'ENTRANDO...' : 'CADASTRANDO...') : (isLogin ? 'ENTRAR' : 'CADASTRAR')}
        </button>
        <p className="text-xs text-center text-zinc-500 pt-4">
          {isLogin ? 'Ainda não tem cadastro?' : 'Já tem cadastro?'}{' '}
          <button
            type="button"
            className="text-red-400 underline hover:text-red-600"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Cadastre-se aqui' : 'Acesse aqui'}
          </button>
        </p>
      </form>
    </div>
  );
} 