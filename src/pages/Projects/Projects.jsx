import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectTitle: '',
    description: '',
    amount: '',
    category: ''
  });
  const navigate = useNavigate();

  // Mock data for pending projects
  const pendingProjects = [
    {
      id: 1,
      title: "Construcción de Escuela Rural",
      description: "Proyecto para construir una escuela en comunidad rural de la Puna",
      amount: "$2,500,000",
      progress: 65,
      category: "Educación",
      image: "🏫",
      address: "campaign_address_1"
    },
    {
      id: 2,
      title: "Clínica Médica Móvil",
      description: "Unidad médica móvil para atención en comunidades remotas del norte",
      amount: "$1,850,000",
      progress: 40,
      category: "Salud",
      image: "🚑",
      address: "campaign_address_2"
    },
    {
      id: 3,
      title: "Sistema de Agua Potable",
      description: "Instalación de sistema de agua potable para 200 familias en Chaco",
      amount: "$3,200,000",
      progress: 80,
      category: "Infraestructura",
      image: "💧",
      address: "campaign_address_3"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectTitle: '',
      description: '',
      amount: '',
      category: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDonate = (project) => {
    // Navigate to donate page with the selected project
    navigate('/donate', { 
      state: { 
        selectedProject: {
          id: project.id,
          name: project.title,
          address: project.address,
          description: project.description,
          goal: 2500, // Mock goal amount
          total_raised: project.progress * 25, // Mock raised amount
          supporters: Math.floor(Math.random() * 100) + 20, // Mock supporters
          min_donation: 1
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-terracotta-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Proyectos</h1>
          <p className="text-xl text-gray-600">Descubre y apoya proyectos que cambian vidas en Argentina</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-refinance-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Agregar Propuesta
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-terracotta-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta-600 transition-colors"
          >
            Solicitar Ayuda
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Nueva Propuesta</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                  />
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder="Título del proyecto"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Educación">Educación</option>
                  <option value="Salud">Salud</option>
                  <option value="Infraestructura">Infraestructura</option>
                  <option value="Medio Ambiente">Medio Ambiente</option>
                  <option value="Arte y Cultura">Arte y Cultura</option>
                </select>
                <textarea
                  name="description"
                  placeholder="Descripción del proyecto"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Monto solicitado (ARS)"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                  required
                />
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-refinance-blue text-white rounded-lg hover:bg-blue-600"
                  >
                    Enviar Propuesta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pending Projects Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Proyectos Pendientes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{project.image}</div>
                <div className="mb-4">
                  <span className="inline-block bg-terracotta-100 text-terracotta-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Meta: {project.amount}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-refinance-blue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={`/project/${project.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center hover:bg-gray-200 transition-colors"
                  >
                    Ver Detalles
                  </Link>
                  <button
                    onClick={() => handleDonate(project)}
                    className="flex-1 bg-refinance-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Donar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 