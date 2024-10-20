// src/components/Layout.js
import Footer from './ui/Footer';
import Header from './ui/Header'; // Your Header component

const Layout = ({ children }) => {
  return (
    <div className="overflow-x-hidden bg-black-100 font-manrope">
      <Header />  
      <main className=''>{children}</main> 
      <Footer />
    </div>
  );
};

export default Layout;
