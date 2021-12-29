import Router from "next/router"
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api-client"

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User
  isAuthenticated: boolean
}

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  Router.push('/')
}


export const AuthContext = createContext({} as AuthContextData)

interface Props {
  children: ReactNode
}



export function AuthContextProvider({children}:Props) {

  const [user, setUser] = useState<User>({} as User)


  useEffect(() => {
      const { 'nextauth.token': token } = parseCookies()

      if(token){
        api.get('/me').then(response => {
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        })
        .catch(() => signOut())
      }
  }, [])

  async function signIn({email,password}: SignInCredentials) {
    
    try {
      const response = await api.post('sessions', {email, password})

      const { token, refreshToken, roles, permissions } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        email,
        roles,
        permissions
      })

      //@ts-ignore
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      Router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }


  return <AuthContext.Provider value={{signIn, isAuthenticated: !!user, user}}>
    {children}
  </AuthContext.Provider>
}