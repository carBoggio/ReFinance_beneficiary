import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-terracotta-100">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="mb-16">
          <div className="w-32 h-32 bg-refinance-blue rounded-full mx-auto flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-5xl">R</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mt-6">ReFinance</h1>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link 
            to="/projects" 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-20 h-20 bg-refinance-blue rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Necesito</h2>
            <p className="text-gray-600">Solicita ayuda o agrega tu propuesta para recibir financiamiento</p>
          </Link>

          <Link 
            to="/donate" 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-20 h-20 bg-refinance-blue rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiero Donar</h2>
            <p className="text-gray-600">Apoya proyectos y causas que te interesen</p>
          </Link>
        </div>

        {/* How it works section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo Funciona?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="w-12 h-12 bg-refinance-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Regístrate</h4>
              <p className="text-gray-600 text-sm">Crea tu cuenta en ReFinance de forma rápida y segura</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-refinance-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Explora</h4>
              <p className="text-gray-600 text-sm">Descubre proyectos que te interesen o crea tu propia propuesta</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-refinance-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Conecta</h4>
              <p className="text-gray-600 text-sm">Conecta con donantes o recibe financiamiento para tu proyecto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 