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
import Uploader from "@components/image-uploader/UploaderInternal";
import MainCarousel from "@components/carousel/MainCarousel";

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
                                    ตั้งค่าระบบ
                                </h2>
                                <div className="flex flex-row gap-5">
                                    <div className="cursor-pointer" onClick={() => setIsTabActive(0)}>ภาพหน้าแรก</div>
                                    <div className="cursor-pointer" onClick={() => setIsTabActive(1)}>ภาพ landing page</div>
                                    <div className="cursor-not-allowed text-gray-400">Comming Soon</div>
                                </div>
                                {isTabActive === 0 &&
                                    <div>
                                        <div className="my-5">
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 1</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image1}
                                                    setImageFile={(file) => {
                                                        setObjectHomeForm({ ...objectHomeForm, image1: file })
                                                    }}
                                                    showImage={false}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 2</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image2}
                                                    setImageFile={(file) => {
                                                        setObjectHomeForm({ ...objectHomeForm, image2: file })
                                                    }}
                                                    showImage={false}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h1 className="mt-3">รูปภาพหน้าแรกที่ 3</h1>
                                                <Uploader
                                                    imageUrl={objectHomeForm.image3}
                                                    setImageFile={(file) => {
                                                        setObjectHomeForm({ ...objectHomeForm, image3: file })
                                                    }}
                                                    showImage={false}
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
                                            <Uploader imageUrl={objectHomeForm.image1} setImageFile={(file) => {
                                                setObjectHomeForm({ ...objectHomeForm, image1: file })
                                            }} />
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
