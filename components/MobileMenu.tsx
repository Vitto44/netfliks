import { useRouter } from "next/router";
import { AiFillCloseCircle } from "react-icons/ai";

interface MobileMenuProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, setVisible }) => {
  const router = useRouter();
  return visible ? (
    <div className="bg-gray-700 w-56 absolute top-6 right-0 py-2 rounded-md">
      <div
        onClick={() => setVisible(false)}
        className="flex justify-end items-center text-white text-2xl mr-2"
      >
        <AiFillCloseCircle />
      </div>
      <div className="flex flex-col items-center -mt-5">
        <p
          onClick={() => router.push("/")}
          className="text-white text-sm text-center p-3"
        >
          {"Home"}
        </p>
        <p
          onClick={() => router.push("/series")}
          className="text-white text-sm text-center p-3"
        >
          {"Series"}
        </p>
        <p
          onClick={() => router.push("/films")}
          className="text-white text-sm text-center p-3"
        >
          {"Films"}
        </p>
        <p
          onClick={() => router.push("/new")}
          className="text-white text-sm text-center p-3"
        >
          {"New & Popular"}
        </p>
        <p
          onClick={() => router.push("/favorites")}
          className="text-white text-sm text-center p-3"
        >
          {"My List"}
        </p>
      </div>
    </div>
  ) : null;
};

export default MobileMenu;
