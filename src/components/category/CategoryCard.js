import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CategoryCard = ({ title, icon, nested, id }) => {
  const router = useRouter();
  const { closeCategoryDrawer, isLoading, setIsLoading } =
    useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  // react hook
  const [show, setShow] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState({
    id: "",
    show: false,
  });

  // handle show category
  const showCategory = (id, categoryName) => {
    setShow(!show);
    const url = `/search?type_name=${categoryName}&type_id=${id}`;
    router.push(url);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  // handle sub nested category
  const handleSubNestedCategory = (id, categoryName) => {
    console.log('sub nested category', categoryName)
    setShowSubCategory({ id: id, show: showSubCategory.show ? false : true });
    const url = `/search?type_name=${categoryName}&type_id=${id}`;
    router.push(url);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  const handleSubCategory = (subid, categoryName) => {
    console.log('type', categoryName)
    const url = `/search?category=${categoryName}&id=${subid}&type_id=${id}`;
    router.push(url);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  return (
    <>
      <a
        onClick={() => showCategory(id, title)}
        className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
        role="button"
      >
        {icon ? (
          <Image src={icon} width={18} height={18} alt="Category" />
        ) : (
          <Image
            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
            width={18}
            height={18}
            alt="category"
          />
        )}

        <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-emerald-600">
          {title}
          {nested?.length > 0 && (
            <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
              {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
            </span>
          )}
        </div>
      </a>
      {show && nested.length > 0 && (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {nested.map((children) => {
            return (
              <li key={children.subtype_id}>
                {children.length > 0 ? (
                  <a
                    onClick={() => handleSubNestedCategory(children.subtype_id, children.subtype_name)}
                    className="flex items-center font-serif pr-2 text-sm text-gray-600 hover:text-emerald-600 py-1 cursor-pointer"
                  >
                    <span className="text-xs text-gray-500">
                      <IoRemoveSharp />
                    </span>

                    <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-emerald-600">
                      {showingTranslateValue(children.name)}

                      {children.length > 0 ? (
                        <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
                          {showSubCategory.id === children.subtype_id &&
                            showSubCategory.show ? (
                            <IoChevronDownOutline />
                          ) : (
                            <IoChevronForwardOutline />
                          )}
                        </span>
                      ) : null}
                    </div>
                  </a>
                ) : (
                  <a
                    onClick={() =>
                      handleSubCategory(children.subtype_id, children.subtype_name)
                    }
                    className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
                  >
                    <span className="text-xs text-gray-500 pr-2">
                      <IoRemoveSharp />
                    </span>
                    {/* {showingTranslateValue(children.subtype_name)} */}
                    {children.subtype_name}
                  </a>
                )}

                {/* sub children category */}
                {/* {showSubCategory.id === children.subtype_id &&
                  showSubCategory.show === true ? (
                  <ul className="pl-6 pb-3">
                    {children.children.map((subChildren) => (
                      <li key={subChildren.subtype_id}>
                        <a
                          onClick={() =>
                            handleSubCategory(children.subtype_id, children.subtype_name)
                          }
                          className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
                        >
                          <span className="text-xs text-gray-500 pr-2">
                            <IoRemoveSharp />
                          </span>
                          {showingTranslateValue(subChildren?.name)}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null} */}
              </li>
            )
          })}
        </ul>
      )}
    </>
  );
};

export default CategoryCard;
