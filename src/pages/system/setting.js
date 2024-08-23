import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";

//internal import
import Dashboard from "@pages/system/dashboard";
import CompanyServices from "@services/CompanyServices";
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const MyOrders = () => {
    const { currentPage, handleChangePage, isLoading, setIsLoading } = useContext(SidebarContext);

    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const handleGetCustomerOrders = async () => {
            setLoading(true);
            try {
                const res = await CompanyServices.getCompanyAll({});
                if (isMounted) {
                    setData(res);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setLoading(false);
                    setError(error.message);
                }
            }
        };

        handleGetCustomerOrders();

        return () => {
            isMounted = false; // Clean up the effect by setting isMounted to false
        };
    }, [currentPage]);

    const pageCount = Math.ceil(data?.totalDoc / 8);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const filteredData = data?.filter((item) => {
        return item.company_name.toLowerCase().includes(search.toLowerCase());
    });

    //   console.log('data', data)

    return (
        <>
            {isLoading ? (
                <Loading loading={isLoading} />
            ) : (
                <Dashboard
                    title={showingTranslateValue(
                        storeCustomizationSetting?.dashboard?.my_order
                    )}
                    description="This is user order history page"
                >
                    <div className="overflow-hidden rounded-md font-serif">
                        {loading ? (
                            <Loading loading={loading} />
                        ) : error ? (
                            <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">
                                {error}
                            </h2>
                        ) : data?.length === 0 ? (
                            <div className="text-center">
                                <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
                                    <IoBagHandle />
                                </span>
                                <h2 className="font-medium text-md my-4 text-gray-600">
                                    You Have no order Yet!
                                </h2>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <h2 className="text-xl font-serif font-semibold mb-5">
                                    {`รายการบริษัททั้งหมด ${data?.length} รายการ`}
                                </h2>
                                <div className="my-2 flex justify-between">
                                    <div>
                                        <input type="text" placeholder="ค้นหาชื่อบริษัท" className="rounded-md w-[25rem] border-gray-300" onChange={(e) => setSearch(e.target.value)} />
                                    </div>
                                    <div className="">
                                        <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">เพิ่มบริษัท</button>
                                    </div>
                                </div>
                                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                                            <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr className="bg-gray-100">
                                                        <th
                                                            scope="col"
                                                            className="text-center font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >
                                                            ID
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-start font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >
                                                            ชื่อบริษัท
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-center font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >
                                                            รูปภาพ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {filteredData.length > 0 ?
                                                    <tbody className="bg-white divide-y divide-gray-200 text-[14px]">
                                                        {filteredData?.map((item, index) => {
                                                            console.log('item', item)
                                                            return (
                                                                <tr
                                                                    key={item.company_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <td className="text-center py-4">
                                                                        {item.company_id}
                                                                    </td>
                                                                    <td
                                                                        className="hover:text-emerald-500 hover:underline text-start"
                                                                        onClick={() => {
                                                                            console.log('item', item)
                                                                        }}
                                                                    >
                                                                        {item.company_name}
                                                                    </td>
                                                                    <td className="flex justify-center">
                                                                        <img src={item.company_image} alt="icon" className="w-10 h-10" />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                    :
                                                    <tbody className="bg-white divide-y divide-gray-200 text-[14px]">
                                                        {data?.map((item, index) => {
                                                            return (
                                                                <tr
                                                                    key={item.type_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <td className="text-center py-4">
                                                                        {item.type_id}
                                                                    </td>
                                                                    <td
                                                                        className="hover:text-emerald-500 hover:underline"
                                                                        onClick={() => {
                                                                            console.log('item', item)
                                                                        }}
                                                                    >
                                                                        {item.type_name}
                                                                    </td>
                                                                    <td className="">
                                                                        {item.icon}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                }
                                            </table>
                                            {data?.totalDoc > 10 && (
                                                <div className="paginationOrder">
                                                    <ReactPaginate
                                                        breakLabel="..."
                                                        nextLabel="Next"
                                                        onPageChange={(e) =>
                                                            handleChangePage(e.selected + 1)
                                                        }
                                                        pageRangeDisplayed={3}
                                                        pageCount={pageCount}
                                                        previousLabel="Previous"
                                                        renderOnZeroPageCount={null}
                                                        pageClassName="page--item"
                                                        pageLinkClassName="page--link"
                                                        previousClassName="page-item"
                                                        previousLinkClassName="page-previous-link"
                                                        nextClassName="page-item"
                                                        nextLinkClassName="page-next-link"
                                                        breakClassName="page--item"
                                                        breakLinkClassName="page--link"
                                                        containerClassName="pagination"
                                                        activeClassName="activePagination"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Dashboard>
            )}
        </>
    );
};

export default MyOrders;
