import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import TransferRecord from "./pages/TransferRecord/TransferRecord";
import FamilyMemberDetail from "./pages/FamilyMemberDetail.tsx/FamilyMemberDetail";
import ShortsDetail from "./pages/ShortsDetail/ShortsDetail";
import TransferAmountInput from "./pages/TransferAmountInput/TransferAmountInput";
import TransferConfirm from "./pages/TransferConfirm/TransferConfirm";
import Index from "./pages/Index/Index";
import Home from "./pages/Home/Home";
import ShortsList from "./pages/ShortsList/ShortsList";
import ReceiveHeart from "./pages/ReceiveHeart/ReceiveHeart";
import ResponseRecord from "./pages/ResponseRecord/ResponseRecord";
import ResponseConfirm from "./pages/ResponseConfirm/ResponseConfirm";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/familymemberdetail" element={<FamilyMemberDetail />} />
          <Route path="/shortsdetail" element={<ShortsDetail />} />
          <Route path="/shortslist" element={<ShortsList />} />
          <Route
            path="/transferAmountinput"
            element={<TransferAmountInput />}
          />
          <Route path="/transferconfirm" element={<TransferConfirm />} />
          <Route path="/transferrecord" element={<TransferRecord />} />
          <Route path="/receiveheart" element={<ReceiveHeart />} />
          <Route path="/responserecord" element={<ResponseRecord />} />
          <Route path="/responseconfirm" element={<ResponseConfirm />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
