import { Button, Card, Label, TextInput } from "flowbite-react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="bg-slate-800 text-white h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center">
      {/* texts */}
      <div className="text-center p-16 hidden lg:block bg-gray-200 h-screen">
        <h1 className="text-6xl font-bold mb-10">
          <span className="text-gray-600">Sistem Pendukung Keputusan</span> <br />
          <span className="text-slate-900">Pemberian Rumah Layak Huni</span> <br />
          <span className="text-blue-500">Desa Lakamola</span>
        </h1>
        <p className="text-3xl text-black font-bold">
          Menggunakan Metode Simple Additive Weighting (SAW) dan Technique for Order of Preference by Similarity to
          Ideal Solution (TOPSIS)
        </p>
      </div>

      {/* login form */}
      <Card
        className="w-full max-w-md mx-4"
        theme={{
          root: {
            base: "bg-gray-100 border-stone-900 border-2 shadow-lg rounded-lg",
          },
        }}
      >
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="username"
                value="Username"
                className="!text-black !text-lg"
              />
            </div>
            <TextInput
              id="username"
              type="text"
              required
              theme={{
                field: {
                  input: {
                    base: "block w-full h-8 border disabled:cursor-not-allowed disabled:opacity-50 !bg-gray-50 border-gray-300 !text-gray-900 focus:border-blue-500 focus:ring-blue-500 !px-3 !py-4 !text-lg",
                  },
                },
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Password"
                className="!text-black !text-lg"
              />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              theme={{
                field: {
                  input: {
                    base: "block w-full h-8 border disabled:cursor-not-allowed disabled:opacity-50 !bg-gray-50 border-gray-300 !text-gray-900 focus:border-blue-500 focus:ring-blue-500 !px-3 !py-4 !text-lg",
                  },
                },
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to={"/forgot-password"}
              className="hover:underline text-gray-900"
            >
              Lupa password?
            </NavLink>
          </div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white border-blue-500 hover:border-blue-700"
          >
            Masuk
          </Button>
        </form>
      </Card>
    </div>
  );
}
