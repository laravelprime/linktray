"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Tray } from "@/types"

export const columns: ColumnDef<Tray>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Title</div>,
    cell: ({ row }) => {
        return <div className="font-medium cursor-pointer">{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
  },
  {
    accessorKey: "is_private",
    header: () => <div className="font-bold">Visibility</div>,
    cell: ({ row }) => {
        const formatted = row.getValue('is_private') === 0 ? 'public' : 'private'
        return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tray = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
