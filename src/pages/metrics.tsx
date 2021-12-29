import { GetServerSideProps } from "next"
import { setupApiClient } from "../services/api"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Metrics() {

  return (
    <>
      <div>Métricas</div>
    </>
  )
}


export const getServerSideProps:GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  await apiClient.get('me')
  
  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})