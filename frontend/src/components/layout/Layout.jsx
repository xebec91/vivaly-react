import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;