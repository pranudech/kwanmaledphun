import requests from "./httpServices";
import product from "./json/product/product.json";
import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const UploadFileService = {
    uploadImage: async (imageFile, pathTypeUpload, callback) => {
        imageFile.forEach((file) => {
            const formData = new FormData();
            formData.append("file", file);
            axios({ 
                url: `http://localhost:3010/api/upload/image`,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "pathTypeUpload": pathTypeUpload, // Added header for fileType
                },
                data: formData,
            }).then((res) => {
                callback(res)
            }).catch((err) => console.log(err));
        });
    },
};

export default UploadFileService;
