import DashboardCard from '@/components/DashboardCard';
import { Users, ShoppingCart, Palette, UserCheck } from 'lucide-react';

const dashboardData = {
    userCount: 1234,
    assignedOrders: 56,
    assignedDesigns: 23,
    activeUsers: 789
}

export default function Dashboard() {    
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard title="Total Users" value={dashboardData.userCount} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <DashboardCard title="Assigned Orders" value={dashboardData.assignedOrders} icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />} />
                <DashboardCard title="Assigned Designs" value={dashboardData.assignedDesigns} icon={<Palette className="h-4 w-4 text-muted-foreground" />} />
                <DashboardCard title="Active Users" value={dashboardData.activeUsers} icon={<UserCheck className="h-4 w-4 text-muted-foreground" />} />
            </div>
        </div>
    );
}
    
