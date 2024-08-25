import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FiSave, FiXCircle } from "react-icons/fi";

const swal = withReactContent(
  Swal.mixin({
    customClass: {
      confirmButton:
        "btn btn-primary btn-sm btn-rounded shadow-sm px-4 py-1 mr-2",
      cancelButton: "btn btn-dark btn-sm btn-rounded shadow-sm px-4 py-1",
    },
    buttonsStyling: false,
  })
);

const dialog = {

  showModalWarning({
    onSubmit = () => { },
    onCancel = () => { },
    title = "",
    subTitle = "",
    message = "",
    isShowCancel = true,
    t = () => { },
    textSubmit = "",
    titleStyle = {},
    subTitleStyle = {},
    buttonSubmitClassName = "",
    width = 400,
    allowOutsideClick = true,
    textCancel = "",
    classNameBTN = "flex justify-center items-center my-3 gap-3",
  }) {
    const html = (
      <div className="">
        {isShowCancel ? (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => {
                onCancel();
                swal.close();
              }}
              className="btn border-0 bg-transparent p-0 m-0"
            >
              <FiXCircle size={24} />
            </button>
          </div>
        ) : null}
        <div className="text-start mt-4">
          {title ? (
            <div className="text-[18px] font-bold text-start">
              {title}
            </div>
          ) : null}
          {message ? (
            <div className="m-0 text-start text-[16px]">
              {message}
            </div>
          ) : null}
          <div className={`${classNameBTN}`}>
            {textSubmit && (
              <button
                type="button"
                className="rounded-full h-[38px] bg-red-400 text-white w-[120px] font-bold"
                onClick={() => {
                  onSubmit();
                  swal.getConfirmButton().click();
                }}
              >
                {textSubmit}
              </button>
            )}
            {textCancel && (
              <button
                type="button"
                className="border-2 border-[#E5E5E5] rounded-full h-[38px] bg-white w-[120px] font-bold"
                onClick={() => {
                  onCancel();
                  swal.close();
                }}
              >
                {textCancel}
              </button>
            )}
          </div>
        </div>
      </div>
    );
    swal.fire({
      html,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: { container: "z-top" }, //z-index 9999
      width: width,
      allowOutsideClick: allowOutsideClick,

      // preConfirm: () => {
      //   // document.getElementById("sw-icon-loading").classList.remove("d-none");
      //   document.getElementById("sw-confirm-text").classList.add("d-none");
      //   document.getElementById("sw-btn-confirm").disabled = true;
      //   document.getElementById("sw-btn-cancel").disabled = true;
      //   return false;
      // },
    });
  },

};

export { dialog };
