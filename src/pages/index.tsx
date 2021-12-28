import type { NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {signIn} = useContext(AuthContext)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    signIn({email, password})
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='Senha' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
        <button type='submit'>Logar</button>
      </form>
    </div>
  )
}

export default Home
