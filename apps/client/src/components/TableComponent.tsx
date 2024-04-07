import {CellValueChangedEvent, ColDef, ValueFormatterParams} from "ag-grid-community";
import {useCallback, useEffect, useMemo, useState} from "react";
import {AgGridReact, CustomCellRendererProps} from "ag-grid-react";
import {useRequest} from "../hooks/request.hook.ts";
import {toast} from "react-toastify";
import GrandRow from "./GrandRow.tsx";

interface IRow {
  id: string,
  description: string,
  name: string,
  quantity: number,
  createdAt: string,
}

/* Format Date Cells */
const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export default function TableComponent() {
  const {request} = useRequest()
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([]);

  const deleteInventory = (id: string, name: string, data: IRow[]) => {
    request({url: `/api/inventory/${id}`, method: 'DELETE'})
        .then(() => {
          const filteredRow = data.filter(r => r.id !== id)
          setRowData(filteredRow)
          toast.success(`${name} inventory was successfully removed`)
        })
  }

  const flex = window.innerWidth > 768 ? 1 : undefined

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef<IRow>[]>([
    {field: "id", flex},
    {field: "name", editable: true, flex},
    {field: "description", editable: true, flex},
    {field: "quantity", editable: true, flex},
    {field: "createdAt", valueFormatter: dateFormatter, flex},
    {
      headerName: 'Action', cellRenderer: ActionRenderer, cellRendererParams: {
        deleteInventory
      }, flex
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => ({
    filter: true,
  }), [])

  useEffect(() => {
    request({url: '/api/inventory'})
        .then((res) => {
          setRowData([...res, {id: 'full', quantity: 0}])
        })
  }, [])

  const handleCellUpdate = (event: CellValueChangedEvent) => {
    if (!event.value && event.value !== 0) {
      event.node.setData({...event.data, [event.column.getColId()]: event.oldValue})
      toast.error('Field cannot be empty')
      return
    }

    request({url: `/api/inventory/${event.data.id}`, method: 'POST', body: {[event.column.getColId()]: event.value}})
        .then(() => {
          toast.success('Inventory was successfully updated')
        })
        .catch(() => {
          event.node.setData({...event.data, [event.column.getColId()]: event.oldValue})
        })
  }

  const fullWidthCellRenderer = useCallback(GrandRow, []);
  const fullWidthCellRendererParams = useMemo(() => {
    return {
      data: rowData.reduce((acc, item, index) => {
        console.log(acc, item)
        return {
          ...acc,
          amount: index,
          quantity: acc.quantity + item.quantity
        }
      }, {quantity: 0})
    }
  }, [rowData]);

  return (
      <div className={"ag-theme-quartz"} style={{width: '90%', height: '400px'}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={handleCellUpdate}
            onSelectionChanged={event => console.log(event)}
            rowSelection='multiple'
            isFullWidthRow={(data: any) => data.rowNode.data.id === 'full'}
            fullWidthCellRenderer={fullWidthCellRenderer}
            fullWidthCellRendererParams={fullWidthCellRendererParams}
            pagination
        />
      </div>
  )
}


interface ActionCellRendererParams extends CustomCellRendererProps {
  deleteInventory: (id: string, name: string, data: IRow[]) => void;
}

const ActionRenderer = (params: ActionCellRendererParams) => {

  const handleClick = () => {
    const rowData: IRow[] = []
    params.api.forEachNode(node => rowData.push(node.data))
    params.deleteInventory(params.data.id, params.data.name, rowData)
  }

  return (
      <button
          onClick={handleClick}
          type="button"
          className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >Delete</button>
  )
}
