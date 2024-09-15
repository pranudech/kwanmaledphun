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
import Uploader from "@components/image-uploader/UploaderInternalMain";
import MainCarousel from "@components/carousel/MainCarousel";
import MainImageServices from "@services/MainImageServices";
import UploadFileService from "@services/UploadFileService";
import { dialog } from "@components/sweetalert2";

const MyOrders = () => {
    const { currentPage, handleChangePage, isLoading, setIsLoading } = useContext(SidebarContext);

    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isTabActive, setIsTabActive] = useState(0);

    const [objectHomeForm, setObjectHomeForm] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
    });

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
        handleGetMainImage();
        return () => {
            isMounted = false; // Clean up the effect by setting isMounted to false
        };
    }, [currentPage]);

    const handleGetMainImage = async () => {
        setLoading(true);
        try {
            MainImageServices.getMainImageAll().then((res) => {
                console.log('res', res)
                setObjectHomeForm({
                    image1: res[0]?.image_path !== "" ? res[0]?.image_path : null,
                    image2: res[1]?.image_path !== "" ? res[1]?.image_path : null,
                    image3: res[2]?.image_path !== "" ? res[2]?.image_path : null,
                    image4: res[3]?.image_path !== "" ? res[3]?.image_path : null,
                    image5: res[4]?.image_path !== "" ? res[4]?.image_path : null,
                });
                setData(res)
                setLoading(false);
            })
        } catch (error) {
            console.log('error', error)
            if (isMounted) {
                setLoading(false);
                setError(error.message);
            }
        }
    };

    const handleImageUpload = async (files, name, id, flag = 1) => {
        UploadFileService.uploadImage2(files, "main_image", (img) => {
            MainImageServices.updateMainImage({
                image_path: img.data.imagePath,
                flag: flag,
                id: id
            }).then((res) => {
                setObjectHomeForm({
                    ...objectHomeForm,
                    [name]: img.data.imagePath,
                })
            })
        })
    }

    const handleDeleteImage = async (name, id, flag = 1) => {
        dialog.showModalWarning({
            title: "ต้องการลบรูปภาพหน้าแรกหรือไม่",
            message: "รูปภาพหน้าแรกจะถูกลบออกจากระบบ?",
            icon: "warning",
            textSubmit: "ลบ",
            textCancel: "ยกเลิก",
            classNameBTN: "flex justify-center gap-3 mt-2",
            onSubmit: () => {
                UploadFileService.deleteImage(objectHomeForm[name]).then((resDelete) => {
                    console.log('resDelete', resDelete)
                    MainImageServices.updateMainImage({
                        image_path: "",
                        flag: flag,
                        id: id
                    }).then((res) => {
                        setObjectHomeForm({
                            ...objectHomeForm,
                            [name]: null,
                        })

                    })
                })
            }
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
                                    ตั้งค่าระบบ
                                </h2>
                                <div className="flex flex-row gap-5">
                                    <div className={`cursor-pointer min-w-[170px] flex items-center justify-center ${isTabActive === 0 ? 'border-2 border-emerald-500 rounded-md p-2 text-emerald-500 font-semibold' : ''}`} onClick={() => setIsTabActive(0)}>ภาพหน้าแรก</div>
                                    <div className={`cursor-pointer min-w-[170px] flex items-center justify-center ${isTabActive === 1 ? 'border-2 border-emerald-500 rounded-md p-2 text-emerald-500 font-semibold' : ''}`} onClick={() => setIsTabActive(1)}>ภาพ landing page</div>
                                    <div className="cursor-not-allowed text-gray-400 min-w-[170px] flex items-center justify-center">Coming Soon</div>
                                </div>
                                {isTabActive === 0 &&
                                    <div>
                                        <div className="my-5">
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 1</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image1 !== "" ? objectHomeForm.image1 : null}
                                                    setImageFile={(files) => {
                                                        if (files.length > 0) {
                                                            handleImageUpload(files, "image1", 1)
                                                        }
                                                    }}
                                                    onDelete={() => handleDeleteImage("image1", 1)}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 2</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image2 !== "" ? objectHomeForm.image2 : null}
                                                    setImageFile={(files) => {
                                                        if (files.length > 0) {
                                                            handleImageUpload(files, "image2", 2)
                                                        }
                                                    }}
                                                    onDelete={() => handleDeleteImage("image2", 2)}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 3</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image3 !== "" ? objectHomeForm.image3 : null}
                                                    setImageFile={(files) => {
                                                        if (files.length > 0) {
                                                            handleImageUpload(files, "image3", 3)
                                                        }
                                                    }}
                                                    onDelete={() => handleDeleteImage("image3", 3)}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 4</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image4 !== "" ? objectHomeForm.image4 : null}
                                                    setImageFile={(files) => {
                                                        if (files.length > 0) {
                                                            handleImageUpload(files, "image4", 4)
                                                        }
                                                    }}
                                                    onDelete={() => handleDeleteImage("image4", 4)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            ตัวอย่างภาพหน้าแรก
                                            <div>
                                                <MainCarousel />
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    isTabActive === 1 &&
                                    <div className="flex items-center gap-5 justify-center">
                                        <div className="w-full mb-3">
                                            <h1 className="mb-2">รูปภาพ</h1>
                                            <Uploader
                                                imageUrl={objectHomeForm.image5}
                                                setImageFile={(files) => {
                                                    if (files.length > 0) {
                                                        handleImageUpload(files, "image5", 5, 100)
                                                    }
                                                }}
                                                onDelete={() => handleDeleteImage("image5", 5, 1)}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </Dashboard>
            )}
        </>
    );
};

export default MyOrders;
