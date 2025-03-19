export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Lupa Password?</h1>
          <p className="mt-2 text-sm text-gray-500">Masukan alamat email untuk mereset password</p>
        </div>
        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kirimkan Link Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
