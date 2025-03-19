import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfileData() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  return (
    <>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {/* profile */}
      <div className="border-b border-gray-300 pb-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          {/* title */}
          <h1 className="text-2xl font-semibold text-gray-900">Profil</h1>

          {/* edit button */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg ${
                !isEditing ? "hidden" : ""
              }`}
            >
              Simpan
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 text-sm font-medium text-white ${
                isEditing ? "bg-red-500" : "bg-blue-500"
              } rounded-lg`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        {/* data textfield*/}
        <div className="grid grid-rows-2 gap-6">
          {/* username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <textarea
              id="username"
              rows="1"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border max-w-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
            ></textarea>
          </div>

          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <textarea
              id="email"
              rows="1"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border max-w-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            ></textarea>
          </div>
        </div>
      </div>

      {/* password */}
      <div className="flex justify-between items-center mb-2">
        {/* title */}
        <h1 className="text-2xl font-semibold text-gray-900">Password</h1>

        {/* change password button */}
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Ubah Password
        </button>
      </div>
    </>
  );
}
