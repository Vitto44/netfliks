import AccountPaper from "@/components/AccountPaper";
import FullSiteLoader from "@/components/FullSiteLoader";
import NavBar from "@/components/navBar";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

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

const Account = () => {
  const { isLoading, data } = useAuthenticatedUser();

  return (
    <>
      <FullSiteLoader isLoading={isLoading} />
      <NavBar isDashboard />
      <div className="grid h-screen place-items-center text-white">
        {data && <AccountPaper data={data} />}
      </div>
    </>
  );
};

export default Account;
