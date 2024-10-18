import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdLibraryAdd } from "react-icons/md";

const CreateRWA = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [price, setPrice] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const documentInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const renderFilePreview = () => {
    if (!imageFile) return null;

    const fileURL = URL.createObjectURL(imageFile);

    if (imageFile.type.startsWith("image/")) {
      return (
        <div className="mt-4">
          <img
            src={fileURL}
            alt="Preview"
            className="max-w-full h-auto border border-gray-300 rounded-md"
          />
          <p className="text-gray-600 mt-2">{imageFile.name}</p>
        </div>
      );
    }
    return <p className="text-gray-600 mt-2">Unsupported file type</p>;
  };

  const renderDocumentPreview = () => {
    if (!documentFile) return null;

    return (
      <div className="mt-4">
        <p className="text-gray-600">{documentFile.name}</p>
      </div>
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="relative mt-20">
      <div className="relative max-w-md mx-auto mr-5 sm:mr-0 p-2 bg-black bg-opacity-30 border-2 border-white rounded-lg sm:p-6 h-full overflow-y-auto scrollbar-hidden">
        <div>
          <h1 className="my-2 text-xl font-extrabold text-white flex flex-row gap-2 sm:text-3xl">
            <MdLibraryAdd className="mt-1" />
            List your Property on Chain!!
          </h1>

          {/* Image Upload Input */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base">
              Upload Image
            </label>
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 w-full border border-gray-800 bg-zinc-950 text-white rounded-lg file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
            />
            {errors.image && (
              <p className="text-red-500 mt-2">{errors.image}</p>
            )}
            {renderFilePreview()}
          </div>

          {/* Document Upload Input */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm sm:text-base">
              Upload Document
            </label>
            <input
              type="file"
              ref={documentInputRef}
              onChange={handleDocumentChange}
              accept=".pdf,.doc,.docx,.txt"
              className="mt-1 w-full border border-gray-800 bg-zinc-950 text-white rounded-lg file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
            />
            {errors.document && (
              <p className="text-red-500 mt-2">{errors.document}</p>
            )}
            {renderDocumentPreview()}
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-300 mb-2 text-sm sm:text-base"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
              className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 mt-2">{errors.price}</p>
            )}
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-300 mb-2 text-sm sm:text-base"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
              className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 mt-2">{errors.location}</p>
            )}
          </div>

          {/* Size Input */}
          <div className="mb-4">
            <label
              htmlFor="size"
              className="block text-gray-300 mb-2 text-sm sm:text-base"
            >
              Size
            </label>
            <input
              type="text"
              id="size"
              value={size}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSize(e.target.value)
              }
              className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
              placeholder="Enter size"
            />
            {errors.size && <p className="text-red-500 mt-2">{errors.size}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 w-full flex justify-center text-sm sm:text-base"
          >
            <IoCloudUploadOutline className="text-xl sm:text-2xl mx-2 font-bold" />
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRWA;
