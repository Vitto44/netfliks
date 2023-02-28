import NavBar from "@/components/navBar";

import React, { useState } from "react";

const New = () => {
  const [modalData, setModalData] = useState<any | null>(null);

  return (
    <div>
      <NavBar isDashboard notFixed />
    </div>
  );
};

export default New;
