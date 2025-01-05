import { Mail } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const user = {
    email: "rahulbushi69@gmail.com",
    name: "Rahul A B",
    photoURL: "https://github.com/shadcn.png",
    role: "admin",
    timestamp: "January 2, 2025 at 7:03:41 PM UTC+5:30"
}

export default function ProfilePage() {
    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.photoURL} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                    <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                </div>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{user.email}</span>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    Member since: {user.timestamp}
                </div>
                </CardContent>
            </Card>
        </div>
    );
}

