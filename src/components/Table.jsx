import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAction } from "../redux/slices/orderSlice";
import Spinner from "./Spinner";
function Table() {
    // data from store
    const { orders, loading, appErr, serverErr } = useSelector(state => state?.orders);
    console.log(orders)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrdersAction())
    }, [dispatch])
    return (
        <>{loading ? <Spinner /> :
            appErr || serverErr ? (
                <h2 className="text-center text-xl text-red-600">
                    {serverErr} {serverErr}
                </h2>) : orders?.length <= 0 ?
                <div className='w-full h-full flex justify-center items-center mt-96'>No Orders</div>
                : <div className="w-full sm:px-6 px-3 lg:px-36 mt-20 mb-20 overflow-x-auto">
                    <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                        <div className="sm:flex items-center justify-between">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Orders</p>
                        </div>
                    </div>
                    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                    <th className="font-medium text-xl text-left pl-4">Receiver Name</th>
                                    <th className="font-medium text-xl text-left pl-12">Weight (kg)</th>
                                    <th className="font-medium text-xl text-left pl-12">Box Colour</th>
                                    <th className="font-medium text-xl text-left pl-20">Destination</th>
                                    <th className="font-medium text-xl text-left pl-20">No.Boxes</th>
                                    <th className="font-medium text-xl text-left pl-16">Shipping Cost</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {orders?.map((order, index) => {
                                    return (
                                        <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                            <td className="pl-4 cursor-pointer">
                                                <div className="flex items-center">
                                                    <div className="">
                                                        <p className="font-medium">{order?.fullName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-12">
                                                <p className="text-sm font-medium leading-none text-gray-800">{order?.weight}</p>

                                            </td>
                                            <td className="pl-12">
                                                <div style={{ backgroundColor: `${order?.colour}` }} className={` w-[60px] h-[40px]`}></div>
                                            </td>
                                            <td className="pl-20">
                                                <p className="font-medium">{order?.country}</p>
                                            </td>
                                            <td className="pl-20">
                                                <p className="font-medium">{order?.totalBoxes}</p>
                                            </td>
                                            <td className="pl-16">
                                                <p className="font-medium">₹{Math.round(order?.totalCost)}</p>
                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
        }

        </>
    );
}

export default Table;
