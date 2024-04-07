import React, {useState} from "react";
import {useRequest} from "../hooks/request.hook.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


type InventoryData = {
  name: string,
  description: string,
  quantity: number | undefined
}
export default function CreationPage() {
  const {request} = useRequest()
  const navigate = useNavigate()
  const [inventoryData, setInventoryData] = useState<InventoryData>({
    name: '', description: '', quantity: undefined
  })

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryData({
      ...inventoryData,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    request({url: '/api/inventory', method: 'POST', body: inventoryData})
        .then(() => {
          // setInventoryData({
          //   name: '', description: '', quantity: undefined
          // })
          toast.success('Inventory was successfully created')
          navigate('/')
        })
  }

  return (
      <section className="bg-gray-50 dark:bg-gray-900 md:min-w-[500px] w-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div
              className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Inventory
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Inventory name
                  </label>
                  <input
                      name="name"
                      id="name"
                      value={inventoryData.name}
                      onChange={handleFieldChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                      name="description"
                      id="description"
                      value={inventoryData.description}
                      onChange={handleFieldChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                      type='number'
                      name="quantity"
                      id="quantity"
                      value={inventoryData.quantity}
                      onChange={handleFieldChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
