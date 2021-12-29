import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/api-client"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('me').then(response => console.log(response))
  }, [])

  return <div>Dashboard: {user.email}</div>
}

// export const getServerSideProps:GetServerSideProps = withSSRAuth(async (ctx) => {
//   const apiClient = setupApiClient(ctx)
//   await apiClient.get('me')

//   return {
//     props: {}
//   }
// })