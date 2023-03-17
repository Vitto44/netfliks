import Alert from "@/components/Alert";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Profiles = () => {
  const [show, setShow] = useState(false);
  const { data } = useAuthenticatedUser();
  const router = useRouter();

  return (
    <div className="absolute top-0 w-full">
      <div className="flex flex-col mt-44 lg:mt-60">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          {"Who's watching?"}
        </h1>
        <div className="flex items-start justify-center gap-11 mt-10 mb-10 flex-wrap">
          <div onClick={() => router.push("/")} className={cardStyle}>
            <div className="w-56 h-56 relative">
              <Image
                fill
                className="rounded-md"
                src="/images/face3.png"
                alt="profile"
              />
            </div>
            <p className="text-white text-lg">{data?.firstName}</p>
          </div>
          <div onClick={() => setShow(!show)} className={cardStyle}>
            <div className="w-56 h-56">
              <AiOutlinePlus className="w-56 h-56 bg-gray-700 rounded-md text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <Alert
        title="Absolutely Not!!!"
        description="No sharing! Not even home!!!"
        type="error"
        show={show}
        setShow={setShow}
      />
    </div>
  );
};

const cardStyle = `
    flex flex-col items-center px-6 py-4
    justify-center gap-3 cursor-pointer rounded-md
    hover:scale-105 
    transition-all duration-300
    hover:shadow-2xl hover:bg-gray-700
  `;

export default Profiles;
