import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, useRef } from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import {
    FiEye,
    FiGrid,
    FiHome,
    FiUsers,
    FiHardDrive,
    FiShoppingBag,
    FiInfo,
    FiSettings
} from "react-icons/fi";
import { signOut } from "next-auth/react";

//internal import
import Layout from "@layout/Layout";
import Card from "@components/order-card/Card";
import OrderServices from "@services/OrderServices";
import RecentOrder from "@pages/user/recent-order";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@components/preloader/Loading";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Dashboard = ({ title, description, children }) => {
    const router = useRouter();
    const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);

    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();

    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const handleGetCustomerOrders = async () => {
            setLoading(true);
            try {
                const res = await OrderServices.getOrderCustomer({
                    page: currentPage,
                    limit: 10,
                });
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

    const handleLogOut = () => {
        signOut();
        Cookies.remove("couponInfo");
        router.push("/");
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const userSidebar = [
        {
            title: "Dashboard",
            href: "/system/dashboard",
            icon: FiGrid,
        },
        {
            title: "ตั้งค่าระบบ",
            href: "/system/setting",
            icon: FiSettings,
        },
        {
            title: "สินค้า",
            href: "/system/product",
            icon: FiShoppingBag,
        },
        {
            title: "ประเภทสินค้า",
            href: "/system/category",
            icon: FiInfo,
        },
        {
            title: "บริษัท",
            href: "/system/company",
            icon: FiHome,
        },
    ];

    const handleToggleBars = color => {
        setData(prev => ({
            ...prev,
            [color]: {
                ...prev[color],
                isVisible: !prev[color].isVisible
            }
        }));
    };

    return (
        <>
            {isLoading ? (
                <Loading loading={isLoading} />
            ) : (
                <div className="bg-gray-100 h-full">
                    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                        <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
                            <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
                                <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky">
                                    {userSidebar?.map((item) => (
                                        <span
                                            key={item.title}
                                            className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                                        >
                                            <item.icon
                                                className="flex-shrink-0 h-4 w-4"
                                                aria-hidden="true"
                                            />
                                            <Link
                                                href={item.href}
                                                className="inline-flex items-center justify-between ml-2 font-medium w-full hover:text-emerald-600"
                                            >
                                                {item.title}
                                            </Link>
                                        </span>
                                    ))}
                                    <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                                        <span className="mr-2">
                                            <IoLockOpenOutline />
                                        </span>{" "}
                                        <button
                                            // onClick={handleLogOut}
                                            onClick={() => {
                                                router.push("/");
                                            }}
                                            className="inline-flex items-center justify-between font-medium w-full hover:text-emerald-600"
                                        >
                                            {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
                                {!children && (
                                    <div className="overflow-hidden">
                                        <h2 className="text-xl font-serif font-semibold mb-5">
                                            {showingTranslateValue(
                                                storeCustomizationSetting?.dashboard?.dashboard_title
                                            )}
                                        </h2>
                                        <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                            <Card
                                                title="จำนวนสิ้นค้าทั้งหมด"
                                                Icon={FiShoppingBag}
                                                quantity={493}
                                                className="text-emerald-600  bg-emerald-200"
                                            />
                                            <Card
                                                title="จำนวนผู้เข้าดูวันนี้"
                                                Icon={FiEye}
                                                quantity={324}
                                                className="text-orange-600 bg-orange-200"
                                            />
                                            <Card
                                                title="จำนวนผู้เข้าดูทั้งหมด"
                                                Icon={FiUsers}
                                                quantity={'23,423'}
                                                className="text-indigo-600 bg-indigo-200"
                                            />
                                            <Card
                                                title="ค่าใช้จ่าย Server"
                                                Icon={FiHardDrive}
                                                quantity={"none"}
                                                className="text-emerald-600 bg-emerald-200"
                                            />
                                        </div>
                                        {/* <RecentOrder data={data} loading={loading} error={error} /> */}
                                    </div>
                                )}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
