import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";

//internal import
import Dashboard from "@pages/system/dashboard";
import ProductServices from "@services/ProductServices";
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Uploader from "@components/image-uploader/UploaderInternal";
import { FiSave, FiPlusCircle, FiXCircle, FiTrash2 } from "react-icons/fi";
import MainModal from "@components/modal/MainModal";
import UploadFileService from "@services/UploadFileService";
import AttributeServices from "@services/AttributeServices";
import CompanyServices from "@services/CompanyServices";
import CategoryServices from "@services/CategoryServices";
import { dialog } from "@components/sweetalert2";

const MyOrders = () => {
    const { currentPage, handleChangePage, isLoading, setIsLoading } = useContext(SidebarContext);

    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();

    const [imageFile, setImageFile] = useState(null);

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [objectForm, setObjectForm] = useState({
        product_id: 0,
        product_name: "",
        price: 0,
        size_product: "",
        detail: "",
        company_id: 0,
        subtype_id: 0,
        type_id: 0,
        product_image1: "",
        product_image2: "",
        product_image3: "",
        recommended_product: 0,
    });
    const [companyData, setCompanyData] = useState([]);

    const [categoryList, setCategoryList] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

    const [filter, setFilter] = useState({
        subtype_id: -1,
        recommended_product: -1
    })

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const handleGetCustomerOrders = async () => {
            setLoading(true);
            try {
                const res = await ProductServices.getProductsAll({});
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
        handleGetCompanyAll();
        handleGetCategoryAll();
        handleGetSubCategoryAll()
    }, []);

    const filteredData = data?.filter((item) => {
        return item.product_name.toLowerCase().includes(search.toLowerCase());
    });

    const handleImageUpload = async (files, name) => {
        UploadFileService.uploadImage2(files, "product", (res) => {
            ProductServices.updateProduct({
                ...objectForm,
                [name]: res.data.imagePath,
                id: objectForm.product_id
            })
            setObjectForm({
                ...objectForm,
                [name]: res.data.imagePath,
            })
            handleGetProductAll()
        })
    }

    const handleGetCompanyAll = async () => {
        const res = await CompanyServices.getCompanyAll({});
        setCompanyData(res);
    }

    const handleGetCategoryAll = async () => {
        CategoryServices.getCategoryAll().then((res) => {
            setCategoryList(res);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleGetSubCategoryAll = async () => {
        CategoryServices.getSubCategoryAll().then((res) => {
            setSubCategory(res);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleGetSubType = async (type_id) => {
        const res = subCategory.filter((item) => parseInt(item.type_id) === parseInt(type_id));
        setSubCategoryList(res)
    }

    const handleGetProductAll = async () => {
        ProductServices.getProductsAll({}).then((res) => {
            setData(res)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleFilter = async (filter) => {
        setIsLoading(true)
        const res = await ProductServices.getProductsAll(filter)
        setFilter(filter)
        setData(res)
        setIsLoading(false)
    }

    const handleAddProduct = async () => {
        AttributeServices.getMaxId({
            table: "product",
            column: "product_id"
        }).then((res) => {
            ProductServices.addProduct({
                ...objectForm,
                price: parseInt(objectForm.price),
                company_id: parseInt(objectForm.company_id),
                subtype_id: parseInt(objectForm.subtype_id),
                product_id: res.maxId,
            }).then((res) => {
                setModalOpen(false)
                handleGetProductAll()
                setObjectForm({
                    product_id: 0,
                    product_name: "",
                    price: 0,
                    size_product: "",
                    detail: "",
                    company_id: 0,
                    subtype_id: 0,
                    product_image1: "",
                    product_image2: "",
                    product_image3: "",
                    recommended_product: 0,
                })
            })
        })
    }

    const handleUpdateProduct = async () => {
        setIsLoading(true)
        ProductServices.updateProduct({
            ...objectForm,
            id: objectForm.product_id
        }).then((res) => {
            handleGetProductAll()
            setModalOpen(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleDeleteProduct = async (product) => {
        console.log('product', product)
        dialog.showModalWarning({
            title: "ลบสินค้า",
            message: "คุณต้องการลบสินค้านี้ใช่หรือไม่?",
            icon: "warning",
            textSubmit: "ลบ",
            textCancel: "ยกเลิก",
            classNameBTN: "flex justify-center gap-3 mt-2",
            onSubmit: () => {
                ProductServices.deleteProduct({ product_id: product.product_id }).then((res) => {
                    handleGetProductAll()
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
                    <div className="overflow-hidden rounded-md font-serif relative">
                        <div className="">
                            <h2 className="text-xl font-serif font-semibold mb-5">
                                {`รายการสินค้าทั้งหมด ${data?.length} รายการ`}
                            </h2>
                            <div className="my-2 flex justify-between w-full gap-2">
                                <div className="w-full">
                                    <label htmlFor="">ค้นหา</label>
                                    <input type="text" placeholder="ค้นหาชื่อสินค้า" className="rounded-md w-full border-gray-300" onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="">ประเภทสินค้า</label>
                                    <select className="rounded-md w-full border-gray-300" value={filter.subtype_id} onChange={(e) => {
                                        handleFilter({ ...filter, subtype_id: e.target.value })
                                    }}>
                                        <option value={0}>ทั้งหมด</option>
                                        {subCategory?.map((item, index) => {
                                            return (
                                                <option value={item.subtype_id}>{item.subtype_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="">สินค้าที่แนะนำ</label>
                                    <select className="rounded-md w-full border-gray-300" value={filter.recommended_product} onChange={(e) => {
                                        handleFilter({ ...filter, recommended_product: e.target.value })
                                    }}>
                                        <option value={0}>ทั้งหมด</option>
                                        <option value={1}>สินค้าที่แนะนำ</option>
                                    </select>
                                </div>
                                <div className="min-w-[17rem] flex justify-end gap-3 pt-[23px]">
                                    <button onClick={() => {
                                        handleFilter({ ...filter, recommended_product: 0, subtype_id: 0 })
                                    }} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 max-h-[42px]">
                                        <FiXCircle />
                                        ล้างค้นหา
                                    </button>
                                    <button onClick={() => {
                                        setModalOpen(true)
                                        setObjectForm({
                                            product_id: 0,
                                            product_name: "",
                                            price: 0,
                                            size_product: "",
                                            detail: "",
                                            company_id: 0,
                                            subtype_id: 0,
                                            product_image1: "",
                                            product_image2: "",
                                            product_image3: "",
                                            recommended_product: 0,
                                        })
                                    }} className="bg-emerald-500 text-white px-4 py-2 rounded-md flex items-center gap-2 max-h-[42px]">
                                        <FiPlusCircle />
                                        เพิ่มสินค้า
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                    ไม่พบข้อมูล
                                </h2>
                            </div>
                        ) : (
                            <div className="flex flex-col">
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
                                                            ชื่อสินค้า
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-center font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >
                                                            บริษัท
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-center font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >
                                                            ประเภทสินค้าหลัก
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-center font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                                                        >
                                                            ประเภทสินค้าย่อย
                                                        </th>
                                                        <th className="px-6 py-2"></th>
                                                    </tr>
                                                </thead>
                                                {filteredData.length > 0 ?
                                                    <tbody className="bg-white divide-y divide-gray-200 text-[14px]">
                                                        {filteredData?.map((item, index) => {
                                                            return (
                                                                <tr
                                                                    key={item.product_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <td
                                                                        className="hover:text-emerald-500 hover:underline"
                                                                        onClick={() => {
                                                                            console.log('item', item)
                                                                            setObjectForm(item)
                                                                            setModalOpen(true)
                                                                            handleGetSubType(item.type_id)
                                                                        }}
                                                                    >
                                                                        <div className="flex items-center gap-2 p-2">
                                                                            <img
                                                                                src={item.product_image1}
                                                                                alt=""
                                                                                className="w-[60px] h-[60px]"
                                                                                onError={(e) => {
                                                                                    e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                                                                }}
                                                                            />
                                                                            <div>{item.product_name}</div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="">
                                                                        {item.company_name}
                                                                    </td>
                                                                    <td className="text-start">
                                                                        {`${item.type_name}`}
                                                                    </td>
                                                                    <td className="text-start">
                                                                        {`${item.subtype_name}`}
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            onClick={() => handleDeleteProduct(item)}
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
                                                                    key={item.product_id}
                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                    onClick={() => {
                                                                        console.log('item', item)
                                                                    }}
                                                                >
                                                                    <td className="text-center py-4">
                                                                        {item.product_id}
                                                                    </td>
                                                                    <td className="">
                                                                        {item.product_name}
                                                                    </td>
                                                                    <td className="">
                                                                        {item.company_name}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {`${item.type_name} / ${item.subtype_name}`}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {item.size_product}
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
                                เพิ่มสินค้า
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">ชื่อสินค้า</h1>
                                <input
                                    type="text"
                                    placeholder="ชื่อสินค้า"
                                    className="rounded-md w-full border-gray-300"
                                    value={objectForm.product_name}
                                    onChange={(e) => setObjectForm({ ...objectForm, product_name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">รายละเอียด</h1>
                                <textarea
                                    type="text"
                                    placeholder="ชื่อสินค้า"
                                    className="rounded-md w-full border-gray-300 h-[10rem]"
                                    value={objectForm.detail}
                                    onChange={(e) => setObjectForm({ ...objectForm, detail: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 w-full mb-3">
                                <div className="w-full">
                                    <h1 className="mb-2">ราคา</h1>
                                    <input
                                        type="text"
                                        placeholder="ราคา"
                                        className="rounded-md w-full border-gray-300"
                                        value={objectForm.price}
                                        onChange={(e) => setObjectForm({ ...objectForm, price: e.target.value })}
                                    />
                                </div>
                                <div className="w-full">
                                    <h1 className="mb-2">ขนาด</h1>
                                    <select className="rounded-md w-full border-gray-300" value={objectForm.size_product} onChange={(e) => setObjectForm({ ...objectForm, size_product: e.target.value })}>
                                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                                        <option value="ขนาดเล็ก">ขนาดเล็ก</option>
                                        <option value="ขนาดกลาง">ขนาดกลาง</option>
                                        <option value="ขนาดใหญ่">ขนาดใหญ่</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full mb-3">
                                <div className="w-full">
                                    <h1 className="mb-2">ประเภทสินค้า<span className="text-red-500">หลัก</span></h1>
                                    <select className="rounded-md w-full border-gray-300" value={objectForm.type_id}
                                        onChange={(e) => {
                                            setObjectForm({ ...objectForm, type_id: e.target.value })
                                            handleGetSubType(e.target.value)
                                        }}
                                    >
                                        <option value={0}>กรุณาเลือก</option>
                                        {categoryList?.map((item, index) => {
                                            return (
                                                <option value={item.type_id}>{item.type_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <h1 className="mb-2">ประเภทสินค้า<span className="text-blue-500">ย่อย</span></h1>
                                    <select className="rounded-md w-full border-gray-300" value={objectForm.subtype_id} onChange={(e) => setObjectForm({ ...objectForm, subtype_id: e.target.value })}>
                                        <option value={0}>กรุณาเลือก</option>
                                        {subCategoryList?.map((item, index) => {
                                            return (
                                                <option value={item.subtype_id}>{item.subtype_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="w-full">
                                <h1 className="mb-2">บริษัท</h1>
                                <select className="rounded-md w-full border-gray-300" value={objectForm.company_id} onChange={(e) => setObjectForm({ ...objectForm, company_id: e.target.value })}>
                                    <option value="ไม่ระบุ">ไม่ระบุ</option>
                                    {companyData?.map((item, index) => {
                                        return (
                                            <option value={item.company_id}>{item.company_name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="w-full flex items-center gap-2 my-5">
                                <h1 className="">สินค้าที่แนะนำ</h1>
                                <input
                                    type="checkbox"
                                    className="rounded-md border-gray-300"
                                    checked={objectForm.recommended_product === 1 ? true : false}
                                    onChange={(e) => setObjectForm({ ...objectForm, recommended_product: e.target.checked === true ? 1 : 0 })}
                                />
                                <span className="text-red-500">(สินค้าจะแสดงในหน้าหลัก)</span>
                            </div>
                            <hr className="my-5 border-gray-300" />
                            <div className="mb-3">
                                <h1 className="mb-2">รูปภาพ 1</h1>
                                <Uploader imageUrl={objectForm.product_image1} setImageFile={(files) => {
                                    if (files.length > 0) {
                                        handleImageUpload(files, "product_image1")
                                    }
                                }} />
                                {/* {objectForm.product_image1 && (
                                    <div className="border mt-[40px] p-2 rounded-md">
                                        <div className="text-[14px] text-gray-500 flex items-center gap-2">**โฟลเดอร์ที่เก็บรูปภาพ <span className="h-[5px] w-[5px] bg-green-500 rounded-full inline-block"></span>Server</div>
                                        <div className="text-[14px] text-gray-500">{objectForm.product_image1}</div>
                                    </div>
                                )} */}
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">รูปภาพ 2</h1>
                                <Uploader imageUrl={objectForm.product_image2} setImageFile={(files) => {
                                    if (files.length > 0) {
                                        handleImageUpload(files, "product_image2")
                                    }
                                }} />
                                {/* {objectForm.product_image2 && (
                                    <div className="border mt-[40px] p-2 rounded-md">
                                        <div className="text-[14px] text-gray-500 flex items-center gap-2">**โฟลเดอร์ที่เก็บรูปภาพ <span className="h-[5px] w-[5px] bg-green-500 rounded-full inline-block"></span>Server</div>
                                        <div className="text-[14px] text-gray-500">{objectForm.product_image2}</div>
                                    </div>
                                )} */}
                            </div>
                            <div className="mb-3">
                                <h1 className="mb-2">รูปภาพ 3</h1>
                                <Uploader imageUrl={objectForm.product_image3} setImageFile={(files) => {
                                    if (files.length > 0) {
                                        handleImageUpload(files, "product_image3")
                                    }
                                }} />
                                {/* {objectForm.product_image3 && (
                                    <div className="border mt-[40px] p-2 rounded-md">
                                        <div className="text-[14px] text-gray-500 flex items-center gap-2">**โฟลเดอร์ที่เก็บรูปภาพ <span className="h-[5px] w-[5px] bg-green-500 rounded-full inline-block"></span>Server</div>
                                        <div className="text-[14px] text-gray-500">{objectForm.product_image3}</div>
                                    </div>
                                )} */}
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => objectForm.product_id !== 0 ? handleUpdateProduct() : handleAddProduct()}
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
