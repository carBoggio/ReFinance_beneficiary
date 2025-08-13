import { useState } from 'react';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    projectId: '',
    message: '',
    anonymous: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the donation
    console.log('Donation submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      amount: '',
      projectId: '',
      message: '',
      anonymous: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-terracotta-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiero Donar</h1>
          <p className="text-xl text-gray-600">Tu generosidad puede cambiar vidas en Argentina</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* How it works section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Cómo Funciona?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Explora Proyectos</h3>
                  <p className="text-gray-600">Navega por nuestra plataforma y encuentra proyectos que te interesen. Cada proyecto tiene información detallada sobre su objetivo, impacto y progreso.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Elige tu Donación</h3>
                  <p className="text-gray-600">Decide cuánto quieres donar y si quieres que sea anónima o no. Puedes donar a un proyecto específico o hacer una donación general.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Seguimiento del Impacto</h3>
                  <p className="text-gray-600">Recibe actualizaciones sobre el progreso del proyecto que apoyaste y ve cómo tu donación está haciendo la diferencia.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Transparencia Total</h3>
                  <p className="text-gray-600">Todas las donaciones se rastrean públicamente y puedes ver exactamente cómo se utiliza cada peso para asegurar la máxima transparencia.</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 p-6 bg-terracotta-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-4">Beneficios de Donar</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Recibo fiscal deducible de impuestos en Argentina</li>
                <li>• Seguimiento del impacto de tu donación</li>
                <li>• Participación en la comunidad ReFinance</li>
                <li>• Notificaciones de progreso del proyecto</li>
              </ul>
            </div>
          </div>

          {/* Donation Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Formulario de Donación</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto de donación *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proyecto específico (opcional)
                </label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                >
                  <option value="">Donación general</option>
                  <option value="1">Construcción de Escuela Rural</option>
                  <option value="2">Clínica Médica Móvil</option>
                  <option value="3">Sistema de Agua Potable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Comparte un mensaje de apoyo..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-refinance-blue border-gray-300 rounded focus:ring-refinance-blue"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                  Hacer donación anónima
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-refinance-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Procesar Donación
              </button>
            </form>

            {/* Security notice */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-800">
                  Todas las transacciones están protegidas con encriptación SSL de 256 bits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate; 