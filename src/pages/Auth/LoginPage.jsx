import { Button, Card, Label, TextInput } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // 🔥 Import hooks auth
import { useState } from "react";
import { toast } from "sonner"; // 🔥 Gunakan Sonner untuk notifikasi

function LoginPage() {
  const { login } = useAuth(); // 🔥 Ambil fungsi login dari hooks auth
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await login(data);
      console.log("✅ Token yang diterima:", response.token);
      
      localStorage.setItem("token", response.token);
      console.log("✅ Token yang disimpan di localStorage:", localStorage.getItem("token")); // Debug
  
      toast.success("Login berhasil!");
      window.location = "/dashboard"; // Redirect ke dashboard
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error("Login gagal, periksa email & password!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-slate-800 text-white h-screen grid grid-cols-1 lg:grid-cols-2 place-items-center">
      {/* Side Text */}
      <div className="text-center p-16 hidden lg:block bg-gray-200 h-screen">
        <h1 className="text-6xl font-bold mb-10">
          <span className="text-gray-600">Sistem Pendukung Keputusan</span>{" "}
          <br />
          <span className="text-slate-900">
            Pemberian Rumah Layak Huni
          </span>{" "}
          <br />
          <span className="text-blue-500">Desa Laka mola</span>
        </h1>
        <p className="text-3xl text-black font-bold">
          Menggunakan Metode Simple Additive Weighting (SAW) dan Technique for
          Order of Preference by Similarity to Ideal Solution (TOPSIS)
        </p>
      </div>

      {/* Login Form */}
      <Card className="w-full max-w-md mx-4 bg-gray-100 border-stone-900 border-2 shadow-lg rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Email"
                className="!text-black !text-lg"
              />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Masukkan email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Password"
                className="!text-black !text-lg"
              />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage