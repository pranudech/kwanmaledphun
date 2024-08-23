import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

const Uploader = ({ setImageFile, imageFile }) => {
  const [files, setFiles] = useState([]);
  const uploadUrl = `http://localhost:3010/api/upload/image`; //process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: false,
    maxSize: 10000000, //the size of image,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer relative">
        <img
          className="inline-flex max-w-[350px]"
          src={file.preview}
          alt={file.name}
        />
        <div onClick={() => setFiles([])} className="absolute top-3 right-3"><FiXCircle size={30} className="text-gray-500" /></div>
      </div>
    </div>
  ));

  useEffect(() => {
    if (files) {
      setImageFile(files)
    }
  }, [files]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="w-full text-center">
      {files.length === 0 ?
        <div
          className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex justify-center">
            <FiUploadCloud className="text-3xl text-emerald-500" />
          </span>
          <p className="mt-2">ลากรูปภาพของคุณมาที่นี่</p>
          <em className="text-red-400">
            (เฉพาะ *.jpeg และ *.png เท่านั้น)
          </em>
        </div>
        : (
          thumbs
        )}
      {/* <div className="">
        {imageUrl ? (
          <img
            className="inline-flex rounded-md p-2"
            src={imageUrl}
            alt="product"
          />
        ) : (
          thumbs
        )}
      </div> */}
    </div>
  );
};

export default Uploader;
