// src/components/Layout.js
import Header from './ui/Header'; // Your Header component

const Layout = ({ children }) => {
  return (
    <div className="overflow-x-hidden">
      <Header />  {/* The header will remain constant */}
      <main>{children}</main>  {/* This is where routed components will be rendered */}
    </div>
  );
};

export default Layout;
