import {CustomCellRendererProps} from "ag-grid-react";

export default function GrandRow({data}: CustomCellRendererProps) {
  return (
      <div className='flex items-center justify-center h-full'>Total items: {data.amount}. Total quantity: {data.quantity}</div>
  )
}
