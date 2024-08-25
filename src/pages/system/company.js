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
import MainModal from "@components/modal/MainModal";
import Uploader from "@components/image-uploader/UploaderInternal";
import {
    FiSave,
    FiPlusCircle,
    FiXCircle,
    FiTrash2
} from "react-icons/fi";
import UploadFileService from "@services/UploadFileService";
import AttributeServices from "@services/AttributeServices";
import { dialog } from "@components/sweetalert2";

const MyOrders = () => {
    const { currentPage, handleChangePage, isLoading, setIsLoading } = useContext(SidebarContext);

    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [objectForm, setObjectForm] = useState({
        company_name: "",
        company_image: ""
    });

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

    const handleGetCompanyAll = async () => {
        const res = await CompanyServices.getCompanyAll({});
        setData(res);
        setLoading(false);
    }

    const handleAddCompany = () => {
        UploadFileService.uploadImage(imageFile, "company", (resImage) => {
            AttributeServices.getMaxId({
                table: "company",
                column: "company_id"
            }).then((res) => {
                CompanyServices.addCompany({
                    company_id: res.maxId,
                    company_name: objectForm.company_name,
                    company_image: resImage.data.imagePath
                }).then((res) => {
                    console.log('addCompany => ', res.data)
                    setObjectForm({
                        company_name: "",
                        company_image: ""
                    })
                    setImageFile(null)
                    setModalOpen(false)
                    handleGetCompanyAll()
                })
            })
        })
    }

    const handleUpdateCompany = () => {
        if (imageFile.length > 0) {
            UploadFileService.uploadImage(imageFile, "company", (resImage) => {
                UploadFileService.deleteImage(objectForm.company_image).then((res) => {
                    CompanyServices.updateCompany({
                        id: objectForm.company_id,
                        company_name: objectForm.company_name,
                        company_image: resImage.data.imagePath
                    }).then((res) => {
                        console.log('updateCompany => ', res.data)
                        setObjectForm({
                            company_name: "",
                            company_image: ""
                        })
                        setImageFile(null)
                        setModalOpen(false)
                        handleGetCompanyAll()
                    })
                })
            })
        } else {
            CompanyServices.updateCompany({
                id: objectForm.company_id,
                company_name: objectForm.company_name,
                company_image: objectForm.company_image
            }).then((res) => {
                setObjectForm({
                    company_id: "",
                    company_name: "",
                    company_image: ""
                })
                setImageFile(null)
                setModalOpen(false)
                handleGetCompanyAll()
            })
        }
    }

    const handleDeleteCompany = (item) => {
        dialog.showModalWarning({
            title: "ลบบริษัท",
            message: "คุณต้องการลบบริษัทนี้ใช่หรือไม่?",
            icon: "warning",
            textSubmit: "ลบ",
            textCancel: "ยกเลิก",
            classNameBTN: "flex justify-center gap-3 mt-2",
            onSubmit: () => {
                CompanyServices.deleteCompany({ id: item.company_id, image: item.company_image }).then((res) => {
                    handleGetCompanyAll()
                })
            },
        })
    }

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
                                        <button
                                            onClick={() => {
                                                setModalOpen(true)
                                                setObjectForm({
                                                    company_name: "",
                                                    company_image: "",
                                                })
                                            }}
                                            className="bg-emerald-500 text-white px-4 py-0 my-0 h-[44px] rounded-md flex items-center gap-2"
                                        ><FiPlusCircle />เพิ่มบริษัท</button>
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
                                                            ลำดับ
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
                                                        <th
                                                            scope="col"
                                                            className="text-center font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >

                                                        </th>
                                                    </tr>
                                                </thead>
                                                {filteredData.length > 0 ?
                                                    <tbody className="bg-white divide-y divide-gray-200 text-[14px]">
                                                        {filteredData?.map((item, index) => {
                                                            return (
                                                                <tr
                                                                    key={item.company_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <td className="text-center py-4">
                                                                        {(index + 1)}
                                                                    </td>
                                                                    <td
                                                                        className="hover:text-emerald-500 hover:underline text-start"
                                                                        onClick={() => {
                                                                            setObjectForm({ ...objectForm, ...item })
                                                                            setModalOpen(true)
                                                                        }}
                                                                    >
                                                                        {item.company_name}
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex justify-center p-2">
                                                                            <img src={item.company_image} alt="icon" className="w-[50px] h-[50px]" onError={(e) => {
                                                                                e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                                                            }} />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            onClick={() => handleDeleteCompany(item)}
                                                                            className="flex justify-center hover:opacity-50"
                                                                        >
                                                                            <FiTrash2 size={20} className="text-red-500" />
                                                                        </div>
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
                                                                    <td className="flex justify-end items-center">
                                                                        <div
                                                                            onClick={() => handleDeleteCompany(item)}
                                                                            className="flex items-center gap-2"
                                                                        ><FiTrash2 /></div>
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

            <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
                        <div className="w-full p-5 md:p-8 text-left min-w-[50rem]">
                            <div className="text-2xl font-semibold mb-5">
                                เพิ่มบริษัท
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">ชื่อบริษัท</h1>
                                <input
                                    type="text"
                                    placeholder="ชื่อบริษัท"
                                    className="rounded-md w-full border-gray-300"
                                    value={objectForm.company_name}
                                    onChange={(e) => setObjectForm({ ...objectForm, company_name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">รูปภาพ</h1>
                                <Uploader imageUrl={objectForm.company_image} setImageFile={setImageFile} />
                                {objectForm.company_image && (
                                    <div className="border mt-[40px] p-2 rounded-md">
                                        <div className="text-[14px] text-gray-500 flex items-center gap-2">**โฟลเดอร์ที่เก็บรูปภาพ <span className="h-[5px] w-[5px] bg-green-500 rounded-full inline-block"></span>Server</div>
                                        <div className="text-[14px] text-gray-500">{objectForm.company_image}</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => objectForm.company_id ? handleUpdateCompany() : handleAddCompany()}
                                    className="bg-emerald-500 text-white px-4 py-0 my-0 h-[44px] rounded-md flex items-center gap-2"
                                >
                                    <FiSave /> บันทึก
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-0 my-0 h-[44px] rounded-md flex items-center gap-2"
                                >
                                    <FiXCircle /> ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainModal>
        </>
    );
};

export default MyOrders;
