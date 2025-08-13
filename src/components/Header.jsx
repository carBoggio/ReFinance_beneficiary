import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

const Header = () => {
  const { isConnected, connectWallet, selectedWallet } = useWallet();

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-refinance-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-800">ReFinance</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-refinance-blue transition-colors">
              Inicio
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-refinance-blue transition-colors">
              Proyectos
            </Link>
            <Link to="/donate" className="text-gray-600 hover:text-refinance-blue transition-colors">
              Donar
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-refinance-blue transition-colors">
              Blog
            </Link>
          </nav>

          {/* Wallet Connection / Profile */}
          <div className="flex items-center space-x-4">
            {isConnected() ? (
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {selectedWallet?.name || 'Wallet'}
                </span>
              </div>
            ) : (
              <button
                onClick={handleWalletConnect}
                className="bg-refinance-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Conectar Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-refinance-blue">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 