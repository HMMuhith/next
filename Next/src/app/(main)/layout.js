'use client'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Providers from "../components/provider";

export default function MainLayout({ children }) {
  return (
  
<Providers>
        <Navbar/>
        {children}
        <Footer/>
        </Providers>

  );
}

