import React from "react";
import { Outlet } from "react-router-dom";
import CandidateNavbar from "../../components/ui/CandidateNavbar";

function CandidatePage() {
  return (
    <>
      <CandidateNavbar></CandidateNavbar>
      <Outlet />
    </>
  );
}

export default CandidatePage;
