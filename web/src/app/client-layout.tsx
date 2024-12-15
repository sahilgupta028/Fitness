"use client";

import { Provider } from "react-redux";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { store } from "@/store";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        {children}
        <Footer />
      </Provider>
    </>
  );
}
