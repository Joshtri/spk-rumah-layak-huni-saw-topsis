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
      <Card className="w-full max-w-md mx-4">
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="username"
                value="Username"
              />
            </div>
            <TextInput
              id="username"
              type="text"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="Password"
              />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <NavLink className="hover:underline">Lupa password?</NavLink>
          </div>
          <Button
            type="submit"
            className="hover:bg-white hover:text-black hover:font-bold"
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
