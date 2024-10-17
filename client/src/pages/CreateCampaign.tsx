import React, { useState, useRef, ChangeEvent, FormEvent } from "react"
import { IoCloudUploadOutline } from "react-icons/io5"
import { MdLibraryAdd } from "react-icons/md"

const CreateCampaign = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [ownerName, setOwnerName] = useState<string>("")
  const [ownerAddress, setOwnerAddress] = useState<string>("")
  const [ownerProfile, setOwnerProfile] = useState<string>("")
  const [deadline, setDeadline] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
    }
  }

  const renderFilePreview = () => {
    if (!imageFile) return null

    const fileURL = URL.createObjectURL(imageFile)

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
      )
    }
    return <p className="text-gray-600 mt-2">Unsupported file type</p>
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission logic
  }

  return (
    <div className="relative mt-20">
      <div className="relative max-w-md mx-auto mr-5 sm:mr-0 p-2 bg-black bg-opacity-30 border-2 border-white rounded-lg sm:p-6 h-full overflow-y-auto scrollbar-hidden">
        <h1 className="my-2 text-xl font-extrabold text-white flex flex-row gap-2 sm:text-3xl">
          <MdLibraryAdd className="mt-1" />
          List your Property on Chain!!
        </h1>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm sm:text-base">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
            placeholder="Enter title"
          />
          {errors.title && <p className="text-red-500 mt-2">{errors.title}</p>}
        </div>

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
          {errors.image && <p className="text-red-500 mt-2">{errors.image}</p>}
          {renderFilePreview()}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm sm:text-base">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-red-500 mt-2">{errors.description}</p>
          )}
        </div>

        {/* Owner Name Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm sm:text-base">
            Owner Name
          </label>
          <input
            type="text"
            value={ownerName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOwnerName(e.target.value)
            }
            className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
            placeholder="Enter owner name"
          />
          {errors.ownerName && (
            <p className="text-red-500 mt-2">{errors.ownerName}</p>
          )}
        </div>

        {/* Owner Address Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm sm:text-base">
            Owner Address
          </label>
          <input
            type="text"
            value={ownerAddress}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOwnerAddress(e.target.value)
            }
            className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
            placeholder="Enter owner address"
          />
          {errors.ownerAddress && (
            <p className="text-red-500 mt-2">{errors.ownerAddress}</p>
          )}
        </div>

        {/* Owner Profile Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm sm:text-base">
            Owner Profile
          </label>
          <input
            type="text"
            value={ownerProfile}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOwnerProfile(e.target.value)
            }
            className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
            placeholder="Enter owner profile link"
          />
          {errors.ownerProfile && (
            <p className="text-red-500 mt-2">{errors.ownerProfile}</p>
          )}
        </div>

        {/* Deadline Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm sm:text-base">
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDeadline(e.target.value)
            }
            className="w-full border border-gray-800 text-black rounded-md p-2 text-sm sm:text-base"
          />
          {errors.deadline && (
            <p className="text-red-500 mt-2">{errors.deadline}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 w-full flex justify-center text-sm sm:text-base"
          onClick={handleSubmit}
        >
          <IoCloudUploadOutline className="text-xl sm:text-2xl mx-2 font-bold" />
          Create
        </button>
      </div>
    </div>
  )
}

export default CreateCampaign
