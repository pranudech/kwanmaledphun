import { useContext, useEffect, useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";

//internal import
import Dashboard from "@pages/system/dashboard";
import CategoryServices from "@services/CategoryServices";
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { FiSave, FiXCircle } from "react-icons/fi";
import Uploader from "@components/image-uploader/UploaderInternal";
import MainModal from "@components/modal/MainModal";
import { dialog } from "@components/sweetalert2";
import { FiPlusCircle } from "react-icons/fi";
import UploadFileService from "@services/UploadFileService";
import AttributeServices from "@services/AttributeServices";
import { FiTrash2 } from "react-icons/fi";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const MyOrders = () => {
    const { currentPage, handleChangePage, isLoading, setIsLoading } = useContext(SidebarContext);

    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenSub, setModalOpenSub] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [objectForm, setObjectForm] = useState({
        type_name: "",
        icon: "",
    });
    const [objectFormSub, setObjectFormSub] = useState({
        subtype_name: "",
    });
    const [isTabActive, setIsTabActive] = useState(0);
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const handleGetCustomerOrders = async () => {
            setLoading(true);
            try {
                const res = await CategoryServices.getShowingCategory({});
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
        return item.type_name.toLowerCase().includes(search.toLowerCase());
    });

    // ============================================================ CATEGORY ===========================================================

    const handleGetCategoryAll = async () => {
        const res = await CategoryServices.getCategoryAll({});
        setData(res);
        setLoading(false);
    }

    const handleAddCategory = () => {
        UploadFileService.uploadImage(imageFile, "productType", (resImage) => {
            AttributeServices.getMaxId({
                table: "product_type",
                column: "type_id"
            }).then((res) => {
                CategoryServices.addCategory({
                    type_id: res.maxId,
                    type_name: objectForm.type_name,
                    icon: resImage.data.imagePath
                }).then((res) => {
                    setObjectForm({
                        type_name: "",
                        icon: ""
                    })
                    setImageFile(null)
                    setModalOpen(false)
                    handleGetCategoryAll()
                })
            })
        })
    }

    const handleUpdateCategory = () => {
        if (imageFile.length > 0) {
            UploadFileService.uploadImage(imageFile, "productType", (resImage) => {
                UploadFileService.deleteImage(objectForm.icon).then((res) => {
                    CategoryServices.updateCategory({
                        id: objectForm.type_id,
                        type_name: objectForm.type_name,
                        icon: resImage.data.imagePath
                    }).then((res) => {
                        setObjectForm({
                            type_name: "",
                            icon: ""
                        })
                        setImageFile(null)
                        setModalOpen(false)
                        handleGetCategoryAll()
                    })
                })
            })
        } else {
            CategoryServices.updateCategory({
                id: objectForm.type_id,
                type_name: objectForm.type_name,
                icon: objectForm.icon
            }).then((res) => {
                setObjectForm({
                    type_id: "",
                    type_name: "",
                    icon: ""
                })
                setImageFile(null)
                setModalOpen(false)
                handleGetCategoryAll()
            })
        }
    }

    const handleDeleteCategory = (item) => {
        dialog.showModalWarning({
            title: "ลบประเภทสินค้า",
            message: "คุณต้องการลบประเภทสินค้านี้ใช่หรือไม่?",
            icon: "warning",
            textSubmit: "ลบ",
            textCancel: "ยกเลิก",
            classNameBTN: "flex justify-center gap-3 mt-2",
            onSubmit: () => {
                CategoryServices.deleteCategory({ id: item.type_id, image: item.icon }).then((res) => {
                    handleGetCategoryAll()
                })
            },
        })
    }

    // ========================================================= SUB CATEGORY =========================================================

    const handleGetSubCategoryAll = async (type_id) => {
        setLoading(true);
        const res = await CategoryServices.getSubType(type_id);
        setSubCategory(res);
        setLoading(false);
    }

    const handleAddSubCategory = () => {
        if (imageFile.length > 0) {
            UploadFileService.uploadImage(imageFile, "productSubType", (resImage) => {
                AttributeServices.getMaxId({
                    table: "product_subtype",
                    column: "subtype_id"
                }).then((res) => {
                    CategoryServices.addSubCategory({
                        subtype_id: res.maxId,
                        subtype_name: objectFormSub.subtype_name,
                        type_id: objectForm.type_id,
                        icon: resImage.data.imagePath
                    }).then((res) => {
                        setObjectFormSub({
                            subtype_id: "",
                            subtype_name: "",
                            type_id: "",
                            icon: ""
                        })
                        setModalOpenSub(false)
                        setModalOpen(true)
                        handleGetSubCategoryAll(objectForm.type_id)
                    })
                })
            })
        } else {
            AttributeServices.getMaxId({
                table: "product_subtype",
                column: "subtype_id"
            }).then((res) => {
                CategoryServices.addSubCategory({
                    subtype_id: res.maxId,
                    subtype_name: objectFormSub.subtype_name,
                    type_id: objectForm.type_id,
                    icon: ""
                }).then((res) => {
                    setObjectFormSub({
                        subtype_id: "",
                        subtype_name: "",
                        type_id: "",
                        icon: ""
                    })
                    setModalOpenSub(false)
                    setModalOpen(true)
                    handleGetSubCategoryAll(objectForm.type_id)
                })
            })
        }
    }

    const handleUpdateSubCategory = () => {
        if (imageFile.length > 0) {
            UploadFileService.uploadImage(imageFile, "productSubType", (resImage) => {
                UploadFileService.deleteImage(objectForm.icon).then((res) => {
                    CategoryServices.updateSubCategory({
                        id: objectFormSub.subtype_id,
                        subtype_name: objectFormSub.subtype_name,
                        type_id: objectForm.type_id,
                        icon: resImage.data.imagePath
                    }).then((res) => {
                        setObjectFormSub({
                            subtype_id: "",
                            subtype_name: "",
                            type_id: "",
                            icon: ""
                        })
                        setImageFile(null)
                        setModalOpenSub(false)
                        setTimeout(() => {
                            setModalOpen(true)
                            handleGetSubCategoryAll(objectForm.type_id)
                        }, 300);
                    })
                })
            })
        } else {
            CategoryServices.updateSubCategory({
                id: objectFormSub.subtype_id,
                subtype_name: objectFormSub.subtype_name,
                type_id: objectForm.type_id,
                icon: objectFormSub.icon
            }).then((res) => {
                setObjectFormSub({
                    subtype_id: "",
                    subtype_name: "",
                    type_id: "",
                    icon: ""
                })
                setImageFile(null)
                setModalOpenSub(false)
                setTimeout(() => {
                    setModalOpen(true)
                    handleGetSubCategoryAll(objectForm.type_id)
                }, 300);
            })
        }
    }

    const handleDeleteSubCategory = (item) => {
        dialog.showModalWarning({
            title: "ลบประเภทย่อยสินค้า",
            message: "คุณต้องการลบประเภทย่อยสินค้านี้ใช่หรือไม่?",
            icon: "warning",
            textSubmit: "ลบ",
            textCancel: "ยกเลิก",
            classNameBTN: "flex justify-center gap-3 mt-2",
            onSubmit: () => {
                CategoryServices.deleteSubCategory({ id: item.subtype_id, image: item.icon }).then((res) => {
                    handleGetSubCategoryAll(objectForm.type_id)
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
                    <div className="overflow-hidden rounded-md">
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
                                    {`รายการประเภทสินค้าทั้งหมด ${data?.length} รายการ`}
                                </h2>
                                <div className="my-2 flex justify-between">
                                    <div>
                                        <input type="text" placeholder="ค้นหาชื่อประเภทสินค้า" className="rounded-md w-[25rem] border-gray-300" onChange={(e) => setSearch(e.target.value)} />
                                    </div>
                                    <div className="">
                                        <button onClick={() => {
                                            setIsTabActive(0)
                                            setSubCategory([])
                                            setObjectForm({
                                                type_name: "",
                                                icon: "",
                                            })
                                            setObjectFormSub({
                                                subtype_name: "",
                                            })
                                            setModalOpen(true)
                                        }} className="bg-emerald-500 text-white px-4 py-0 my-0 h-[44px] rounded-md flex items-center gap-2">
                                            <FiPlusCircle />
                                            เพิ่มประเภทสินค้า
                                        </button>
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
                                                            ประเภทสินค้า
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
                                                                    key={item.type_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <td className="text-center py-4">
                                                                        {(index + 1)}
                                                                    </td>
                                                                    <td
                                                                        className="hover:text-emerald-500 hover:underline"
                                                                        onClick={() => {
                                                                            setIsTabActive(0)
                                                                            setObjectForm({ ...objectForm, ...item })
                                                                            setModalOpen(true)
                                                                            setSubCategory([])
                                                                        }}
                                                                    >
                                                                        {item.type_name}
                                                                    </td>
                                                                    <td className="flex justify-center">
                                                                        <img src={item.icon} alt="icon" className="w-[50px] h-[50px]" onError={(e) => {
                                                                            e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                                                        }} />
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            onClick={() => handleDeleteCategory(item)}
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
                            <div className="flex flex-row gap-5 mb-5">
                                <div className={`font-bold text-2xl cursor-pointer hover:text-emerald-500 ${isTabActive === 0 ? 'text-emerald-500' : 'text-gray-500'}`} onClick={() => setIsTabActive(0)}>
                                    ประเภทสินค้า
                                </div>
                                <div className={`font-bold text-2xl ${objectForm.type_id ? 'cursor-pointer hover:text-emerald-500' : 'cursor-not-allowed'} ${isTabActive === 1 && objectForm.type_id ? 'text-emerald-500' : 'text-gray-500'}`}
                                    onClick={() => {
                                        if (objectForm.type_id) {
                                            setIsTabActive(1)
                                            handleGetSubCategoryAll(objectForm.type_id)
                                        }
                                    }}
                                >
                                    ประเภทย่อยสินค้า
                                </div>
                            </div>

                            {isTabActive === 0 && (
                                <>
                                    <div className="mb-3">
                                        <h1 className="mb-2">ชื่อบริษัท</h1>
                                        <input
                                            type="text"
                                            placeholder="ชื่อบริษัท"
                                            className="rounded-md w-full border-gray-300"
                                            value={objectForm.type_name}
                                            onChange={(e) => setObjectForm({ ...objectForm, type_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h1 className="mb-2">รูปภาพ</h1>
                                        <Uploader imageUrl={objectForm.icon} setImageFile={setImageFile} />
                                        {objectForm.icon && (
                                            <div className="border mt-[40px] p-2 rounded-md">
                                                <div className="text-[14px] text-gray-500 flex items-center gap-2">**โฟลเดอร์ที่เก็บรูปภาพ <span className="h-[5px] w-[5px] bg-green-500 rounded-full inline-block"></span>Server</div>
                                                <div className="text-[14px] text-gray-500">{objectForm.icon}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => objectForm.type_id ? handleUpdateCategory() : handleAddCategory()}
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
                                </>
                            )}

                            {isTabActive === 1 && (
                                <>
                                    <div className="flex justify-end">
                                        <button onClick={() => {
                                            setObjectFormSub({
                                                subtype_name: "",
                                            })
                                            setModalOpenSub(true)
                                            setModalOpen(false)
                                        }} className="bg-emerald-500 text-white px-4 py-0 my-0 h-[44px] rounded-md flex items-center gap-2">
                                            <FiPlusCircle />
                                            เพิ่มประเภทย่อยสินค้า
                                        </button>
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
                                                                ประเภทย่อยสินค้า
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
                                                    <tbody className="bg-white divide-y divide-gray-200 text-[14px]">
                                                        {subCategory?.map((item, index) => {
                                                            return (
                                                                <tr
                                                                    key={item.type_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <td className="text-center py-4">
                                                                        {(index + 1)}
                                                                    </td>
                                                                    <td
                                                                        className="hover:text-emerald-500 hover:underline"
                                                                        onClick={() => {
                                                                            setObjectFormSub({ ...objectFormSub, ...item })
                                                                            setModalOpenSub(true)
                                                                        }}
                                                                    >
                                                                        {item.subtype_name}
                                                                    </td>
                                                                    <td className="flex justify-center">
                                                                        <img src={item.icon} alt="icon" className="w-[50px] h-[50px]" onError={(e) => {
                                                                            e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                                                        }} />
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            onClick={() => handleDeleteSubCategory(item)}
                                                                            className="flex justify-center hover:opacity-50"
                                                                        >
                                                                            <FiTrash2 size={20} className="text-red-500" />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </MainModal>

            <MainModal modalOpen={modalOpenSub} setModalOpen={setModalOpenSub}>
                <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
                        <div className="w-full p-5 md:p-8 text-left min-w-[50rem]">
                            <div className="text-2xl font-semibold mb-5">
                                เพิ่มประเภทย่อยสินค้า
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">ชื่อประเภทย่อยสินค้า</h1>
                                <input
                                    type="text"
                                    placeholder="ชื่อบริษัท"
                                    className="rounded-md w-full border-gray-300 z-40"
                                    value={objectFormSub.subtype_name}
                                    onChange={(e) => setObjectFormSub({ ...objectFormSub, subtype_name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">รูปภาพ</h1>
                                <Uploader imageUrl={objectFormSub.icon} setImageFile={setImageFile} />
                                {objectFormSub.icon && (
                                    <div className="border mt-[40px] p-2 rounded-md">
                                        <div className="text-[14px] text-gray-500 flex items-center gap-2">**โฟลเดอร์ที่เก็บรูปภาพ <span className="h-[5px] w-[5px] bg-green-500 rounded-full inline-block"></span>Server</div>
                                        <div className="text-[14px] text-gray-500">{objectFormSub.icon}</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => objectFormSub.subtype_id ? handleUpdateSubCategory() : handleAddSubCategory()}
                                    className="bg-emerald-500 text-white px-4 py-0 my-0 h-[44px] rounded-md flex items-center gap-2"
                                >
                                    <FiSave /> บันทึก
                                </button>
                                <button
                                    onClick={() => {
                                        setModalOpenSub(false)
                                        setModalOpen(true)
                                    }}
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
