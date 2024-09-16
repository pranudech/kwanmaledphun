import React from "react";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const PrivacyPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  // console.log("data", storeCustomizationSetting);

  return (
    <Layout title="Privacy Policy" description="This is privacy policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.privacy_policy?.title
        )}
      />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          {/* <CMSkeleton
            html
            count={15}
            height={15}
            error={error}
            loading={loading}
            data={storeCustomizationSetting?.privacy_policy?.description}
          /> */}
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              นโยบายความเป็นส่วนตัว ขวัญเมล็ดพันธุ์
            </h2>
            <div className="font-sans leading-7">
              <p>เรามุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของคุณและใช้ข้อมูลที่เราเก็บรวบรวมอย่างมีความรับผิดชอบ นโยบายความเป็นส่วนตัวนี้อธิบายถึงข้อมูลที่เราเก็บรวบรวม วิธีการใช้ข้อมูล และสิทธิของคุณในการควบคุมข้อมูลของคุณ</p>
              
              <h3 className="font-semibold mt-4">ข้อมูลที่เราเก็บรวบรวม</h3>
              <p>เราอาจเก็บรวบรวมข้อมูลส่วนบุคคล เช่น ชื่อ ที่อยู่ อีเมล และหมายเลขโทรศัพท์ เมื่อคุณลงทะเบียนหรือทำการสั่งซื้อ</p>
              
              <h3 className="font-semibold mt-4">การใช้ข้อมูล</h3>
              <p>ข้อมูลที่เราเก็บรวบรวมจะถูกใช้เพื่อ:</p>
              <ol>
                <li>ปรับปรุงบริการของเรา</li>
                <li>ติดต่อคุณเกี่ยวกับคำสั่งซื้อหรือบริการ</li>
                <li>ส่งข้อมูลเกี่ยวกับโปรโมชั่นและข้อเสนอพิเศษ</li>
                <li>วิเคราะห์การใช้งานเว็บไซต์เพื่อปรับปรุงประสบการณ์ของผู้ใช้</li>
              </ol>
              
              <h3 className="font-semibold mt-4">การเปิดเผยข้อมูล</h3>
              <p>เราจะไม่ขายหรือเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ ยกเว้นในกรณีที่กฎหมายกำหนด หรือเมื่อจำเป็นต้องเปิดเผยข้อมูลเพื่อปกป้องสิทธิ์ของเรา</p>
              
              <h3 className="font-semibold mt-4">ความปลอดภัยของข้อมูล</h3>
              <p>เรามีมาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึง การใช้ หรือการเปิดเผยโดยไม่ได้รับอนุญาต</p>
              
              <h3 className="font-semibold mt-4">สิทธิของคุณ</h3>
              <p>คุณมีสิทธิในการเข้าถึง แก้ไข หรือขอให้ลบข้อมูลส่วนบุคคลของคุณได้ตลอดเวลา คุณสามารถติดต่อเราผ่านช่องทางที่ระบุไว้ในเว็บไซต์เพื่อดำเนินการตามสิทธิของคุณ</p>
              
              <h3 className="font-semibold mt-4">การเปลี่ยนแปลงนโยบาย</h3>
              <p>เราขอสงวนสิทธิ์ในการปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นระยะๆ โดยจะแจ้งให้คุณทราบเกี่ยวกับการเปลี่ยนแปลงที่สำคัญผ่านทางเว็บไซต์ของเรา</p>
              
              <h3 className="font-semibold mt-4">ติดต่อเรา</h3>
              <p>หากคุณมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเราที่:</p>
              <p>อีเมล: info@kwanmaledphun.com</p>
              <p>โทรศัพท์: 044-342371</p>
            </div>
          </div>
          <br />
          <CMSkeleton count={15} height={15} loading={loading} />
          <br />
          <CMSkeleton count={15} height={15} loading={loading} />
          {/* <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-consent")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-consent-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-information")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-information-docs1")}</p>
              <p>{t("common:privacy-policy-information-docs2")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-use-information")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-use-information-docs")}</p>

              <ol>
                <li>{t("common:privacy-policy-use-information-docs1")}</li>
                <li>{t("common:privacy-policy-use-information-docs2")}</li>
                <li>{t("common:privacy-policy-use-information-docs3")}</li>
                <li>{t("common:privacy-policy-use-information-docs4")}</li>
                <li>{t("common:privacy-policy-use-information-docs5")}</li>
                <li>{t("common:privacy-policy-use-information-docs6")}</li>
                <li>{t("common:privacy-policy-use-information-docs7")}</li>
              </ol>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-log-file")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-log-file-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-advertising")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-advertising-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-third-party")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-third-party-docs1")}</p>
              <p>{t("common:privacy-policy-third-party-docs2")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-ccpa-rights")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-ccpa-rights-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-children-information")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-children-information-docs1")}</p>
              <p>{t("common:privacy-policy-children-information-docs2")}</p>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
