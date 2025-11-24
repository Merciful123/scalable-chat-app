import DashNav from '@/components/dashboard/DashNav'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

const Dashboard = async () => {
    const session:CustomSession|null = await getServerSession(authOptions);
  return (
    <div>
        <DashNav name={session?.user?.name!}  image={session?.user?.image ?? undefined}/>
    </div>
  )
}

export default Dashboard