import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Design {
    designID: string
    customerID: string
    status: string
    material: string
    quantity: number
    size: string
    color: string
    description: string
}

interface DesignDetailsModalProps {
  design: Design | null
  isOpen: boolean
  onClose: () => void
}

export function DesignDetailsModal({ design, isOpen, onClose }: DesignDetailsModalProps) {
    if (!design) return null

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
                        Design #{design.designID}
                        <Badge className={`${getStatusColor(design.status)} capitalize`}> {design.status} </Badge>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Customer ID:</span>
                        <span>{design.customerID}</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Material:</span>
                        <span>{design.material}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Quantity:</span>
                        <span>{design.quantity}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Size:</span>
                        <span>{design.size}</span>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Color:</span>
                        <span>{design.color}</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <span className="font-medium">Description:</span>
                        <span>{design.description}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

