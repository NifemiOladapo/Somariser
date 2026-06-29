"use client"

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { deleteSummaryAction } from "@/actions/summary-action"
import { toast } from "sonner"

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
    const [pending, startTransition] = useTransition();
    const [open, setOpen] = useState(false)
    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteSummaryAction(summaryId)
            if (!result.success) {
                toast.error("Failed to delete summary")
            }
            setOpen(false)
        })

    }
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Summary</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this summary? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)} variant={"ghost"} className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100" >Cancel</Button>
                    <Button onClick={handleDelete} variant={"destructive"} className="bg-gray-900  hover:bg-gray-600">{pending ? "Deleting..." : "Delete"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteButton