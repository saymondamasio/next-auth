import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../erros/AuthTokenErro"

export function withSSRAuth<T>(fn: GetServerSideProps<T>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)
  
    if(!cookies['nextauth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    
    try {
        return await fn(ctx)
      } catch (error) {
        if(error instanceof AuthTokenError) {
          destroyCookie(ctx, 'nextauth.token')
          destroyCookie(ctx, 'nextauth.refreshToken')
  
          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
        }

        return {
          props: {} as T
        }
      }
  }
}