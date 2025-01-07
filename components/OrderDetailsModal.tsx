import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Order {
    orderID: string
    customerID: string
    status: string
    material: string
    quantity: number
    size: string
    color: string
    fileUrl: string
}

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
    if (!order) return null

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'approved':
                return 'bg-green-100 text-green-800'
            case 'rejected':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        Order #{order.orderID}
                        <Badge className={`${getStatusColor(order.status)} capitalize`}> {order.status} </Badge>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Customer ID:</span>
                        <span>{order.customerID}</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Material:</span>
                        <span>{order.material}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Quantity:</span>
                        <span>{order.quantity}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Size:</span>
                        <span>{order.size}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Color:</span>
                        <span>{order.color}</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">File URL:</span>
                        <span className="truncate">{order.fileUrl}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

