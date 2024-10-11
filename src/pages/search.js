import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

//internal import
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import Card from "@components/cta-card/Card";
import ProductServices from "@services/ProductServices";
import CategoryServices from "@services/CategoryServices";
import ProductCard from "@components/product/ProductCard";
import CategoryCarousel from "@components/carousel/CategoryCarousel";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@components/preloader/Loading";
import AttributeServices from "@services/AttributeServices";

const Search = ({ products, attributes, type_name, type_id, subtypeList, query, category }) => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(18);

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const { setSortedField, productData } = useFilter(products);

  // console.log('category', category)

  return (
    <Layout title={`ค้นหา ${category}`} description={`ค้นหา ${category}`}>
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex">
          <div className="flex w-full">
            <div className="w-full mb-[30px]">
              {/* <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3">
                <Card />
              </div> */}
              {/* <div className={`relative ${query ? 'hidden' : ''}`}> */}
              <CategoryCarousel
                subtypeList={subtypeList}
                type_id={type_id}
                category={category}
              />
              {/* </div> */}
              {productData?.length === 0 ? (
                <div className="mx-auto p-5 my-5">
                  <Image
                    className="my-4 mx-auto"
                    src="/no-result.svg"
                    alt="no-result"
                    width={400}
                    height={380}
                  />
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                    {t("common:sorryText")} 😞
                  </h2>
                </div>
              ) : (
                <div className="flex justify-center mt-3 mb-4 bg-orange-100 border border-gray-100 rounded p-3">
                  <h6 className="text-[16px] font-serif">
                    <span className="font-bold mx-2 text-emerald-500">{type_name || query}</span>
                    {t("common:totalI")}{" "}
                    <span className="font-bold text-red-500">{productData?.length}</span>{" "}
                    {t("common:itemsFound")}
                  </h6>
                  {/* <span className="text-sm font-serif">
                    <select
                      onChange={(e) => setSortedField(e.target.value)}
                      className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0"
                    >
                      <option className="px-3" value="All" defaultValue hidden>
                        {t("common:sortByPrice")}
                      </option>
                      <option className="px-3" value="Low">
                        {t("common:lowToHigh")}
                      </option>
                      <option className="px-3" value="High">
                        {t("common:highToLow")}
                      </option>
                    </select>
                  </span> */}
                </div>
              )}

              {isLoading ? (
                <Loading loading={isLoading} />
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {productData?.slice(0, visibleProduct).map((product, i) => (
                      <ProductCard
                        key={i + 1}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>

                  {productData?.length > visibleProduct && (
                    <button
                      onClick={() => setVisibleProduct((pre) => pre + 12)}
                      className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-6 text-sm lg:text-sm"
                    >
                      {t("common:loadMoreBtn")}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { type_name, type_id, query, id, category } = context.query;
  console.log('getServerSideProps => ', context.query)
  const [data, attributes, subtypeList] = await Promise.all([
    ProductServices.getShowingStoreProducts({ type_name, query, id, category }),
    AttributeServices.getShowingAttributes({}),
    CategoryServices.getSubType(type_id)
  ]);

  return {
    props: {
      ...context.query,
      category: category || "",
      products: data,
      attributes,
      subtypeList
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;
//   const { Category } = context.query;
//   const { category } = context.query;
//   const data = await ProductServices.getShowingProducts();

//   let products = [];
//   //service filter with parent category
//   if (Category) {
//     products = data.filter(
//       (product) => product.parent.toLowerCase().replace("&", "").split(" ").join("-") === Category
//     );
//   }
//   //service filter with child category
//   if (category) {
//     products = data.filter(
//       (product) => product.children.toLowerCase().replace("&", "").split(" ").join("-") === category
//     );
//   }

//   //search result
//   if (query) {
//     products = data.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
//   }

//   return {
//     props: {
//       products,
//     },
//   };
// };
