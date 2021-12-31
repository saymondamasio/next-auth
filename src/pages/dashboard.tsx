import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { api } from "../services/api-client"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  const useCanSeeMetrics = useCan({
    roles: ['administrator', 'editor']
  })

  useEffect(() => {
    api.get('me').then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Logout</button>

      { useCanSeeMetrics && <div>Métricas</div>}
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

// export const getServerSideProps:GetServerSideProps = withSSRAuth(async (ctx) => {
//   const apiClient = setupApiClient(ctx)
//   await apiClient.get('me')

//   return {
//     props: {}
//   }
// })