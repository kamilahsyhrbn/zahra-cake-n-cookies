import { Link } from "react-router-dom";
import { TitleCard } from "../../../components/pages/admin/TitleCard";
import { Input } from "../../../components/pages/admin/Input";

export const AdminForm = () => {
  return (
    <div>
      <TitleCard title="Tambah Admin" />

      <form className="flex flex-col gap-4">
        <Input
          title={"Nama Admin"}
          type={"text"}
          name={"name"}
          id={"name"}
          placeholder={"Masukkan nama admin"}
        />

        <Input
          title={"Email"}
          type={"email"}
          name={"email"}
          id={"email"}
          placeholder={"Masukkan email admin"}
        />

        <Input
          title={"Kata Sandi"}
          type={"password"}
          name={"password"}
          id={"password"}
          placeholder={"Masukkan kata sandi admin"}
        />

        <div className="flex flex-row justify-end gap-4 items-center">
          <Link to="/admin/admins">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center cursor-pointer"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            className="bg-[#1D6F64] hover:bg-[#2a4d48] focus:ring-4 focus:outline-none focus:ring-[#2a4d48] transition-colors duration-300 font-medium rounded-xl w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer"
          >
            Tambah Admin
          </button>
        </div>
      </form>
    </div>
  );
};
