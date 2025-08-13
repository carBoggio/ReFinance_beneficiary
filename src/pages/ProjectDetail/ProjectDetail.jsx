import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);

  // Mock project data with tasks and updates
  const project = {
    id: id,
    title: "Construcción de Escuela Rural",
    description: "Este proyecto busca construir una escuela completa en la comunidad rural de la sierra, proporcionando educación de calidad a más de 150 niños que actualmente no tienen acceso a instalaciones educativas adecuadas. La escuela incluirá 6 aulas, una biblioteca, un comedor y áreas recreativas.",
    longDescription: "La comunidad de la sierra ha estado luchando por años para proporcionar educación de calidad a sus niños. Actualmente, los estudiantes deben caminar más de 2 horas para llegar a la escuela más cercana, lo que resulta en altas tasas de deserción escolar, especialmente durante la temporada de lluvias. Esta escuela no solo proporcionará acceso a la educación, sino que también servirá como un centro comunitario para actividades culturales y de desarrollo.",
    amount: 25000,
    raised: 16250,
    progress: 65,
    category: "Educación",
    location: "Sierra Norte, Argentina",
    organizer: "Fundación Educación para Todos",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    image: "🏫",
    
    // Tasks with completion status and progress
    tasks: [
      {
        id: 1,
        title: "Excavación y cimientos",
        description: "Preparación del terreno y construcción de cimientos",
        progress: 100,
        completed: true,
        completionDate: "2024-07-15",
        completionPercentage: 100
      },
      {
        id: 2,
        title: "Estructura principal",
        description: "Construcción de muros y estructura de hormigón",
        progress: 100,
        completed: true,
        completionDate: "2024-08-01",
        completionPercentage: 100
      },
      {
        id: 3,
        title: "Instalación eléctrica",
        description: "Cableado e instalación de sistemas eléctricos",
        progress: 75,
        completed: false,
        completionPercentage: 75
      },
      {
        id: 4,
        title: "Instalación de agua",
        description: "Sistema de agua potable y sanitarios",
        progress: 60,
        completed: false,
        completionPercentage: 60
      },
      {
        id: 5,
        title: "Acabados interiores",
        description: "Pintura, pisos y acabados finales",
        progress: 0,
        completed: false,
        completionPercentage: 0
      }
    ],
    
    updates: [
      {
        id: 1,
        date: "2024-08-01",
        title: "Cimientos completados",
        description: "Se han terminado los cimientos de la escuela. La estructura base está lista para continuar con la construcción.",
        stars: 5,
        auditors: 5,
        nftLink: "https://opensea.io/collection/refinance-updates/1",
        achievementPhoto: "🏗️",
        completed: true
      },
      {
        id: 2,
        date: "2024-07-15",
        title: "Materiales adquiridos",
        description: "Se han comprado todos los materiales necesarios para la construcción. El proyecto está en marcha.",
        stars: 4.5,
        auditors: 4,
        nftLink: "https://opensea.io/collection/refinance-updates/2",
        achievementPhoto: "📦",
        completed: true
      },
      {
        id: 3,
        date: "2024-07-01",
        title: "Estructura principal iniciada",
        description: "Se ha comenzado con la construcción de la estructura principal del edificio.",
        stars: 5,
        auditors: 3,
        nftLink: "https://opensea.io/collection/refinance-updates/3",
        achievementPhoto: "🏢",
        completed: true
      },
      {
        id: 4,
        date: "2024-06-15",
        title: "Instalación eléctrica en progreso",
        description: "Se está trabajando en la instalación del sistema eléctrico de la escuela.",
        stars: 3.5,
        auditors: 2,
        nftLink: "https://opensea.io/collection/refinance-updates/4",
        achievementPhoto: "⚡",
        completed: false
      }
    ]
  };

  const handleDonation = (e) => {
    e.preventDefault();
    console.log('Donation submitted:', { projectId: id, amount: donationAmount });
    setShowDonationForm(false);
    setDonationAmount('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  // Calculate average stars for completed tasks
  const completedUpdates = project.updates.filter(update => update.completed);
  const averageStars = completedUpdates.length > 0 
    ? (completedUpdates.reduce((sum, update) => sum + update.stars, 0) / completedUpdates.length).toFixed(1)
    : 0;

  // Calculate overall project completion percentage
  const overallCompletion = project.tasks.reduce((sum, task) => sum + task.completionPercentage, 0) / project.tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-terracotta-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/projects" className="text-refinance-blue hover:text-blue-600">
            ← Volver a Proyectos
          </Link>
        </nav>

        {/* Project Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{project.image}</span>
                <span className="bg-terracotta-100 text-terracotta-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h1>
              <p className="text-gray-600 mb-6">{project.description}</p>
              
              {/* Overall Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Recaudado: {formatCurrency(project.raised)}</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-refinance-blue h-3 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Meta: {formatCurrency(project.amount)}
                </p>
              </div>

              {/* Donate Button */}
              <button
                onClick={() => setShowDonationForm(true)}
                className="bg-refinance-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Donar Ahora
              </button>
            </div>

            {/* Project Stats */}
            <div className="space-y-4">
              <div className="bg-terracotta-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Información del Proyecto</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Ubicación:</span> {project.location}</p>
                  <p><span className="font-medium">Organizador:</span> {project.organizer}</p>
                  <p><span className="font-medium">Inicio:</span> {new Date(project.startDate).toLocaleDateString('es-AR')}</p>
                  <p><span className="font-medium">Finalización:</span> {new Date(project.endDate).toLocaleDateString('es-AR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Progress Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Progreso de Tareas</h2>
          <div className="space-y-6">
            {project.tasks.map((task) => (
              <div key={task.id} className="border-l-4 border-gray-200 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <div className="flex items-center gap-2">
                    {task.completed ? (
                      <span className="text-green-600 font-medium">✓ Completado</span>
                    ) : (
                      <span className="text-gray-500">{task.progress}%</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                
                {/* Task Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      task.completed ? 'bg-green-500' : 'bg-refinance-blue'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                
                {task.completed && (
                  <p className="text-xs text-gray-500">
                    Completado el {new Date(task.completionDate).toLocaleDateString('es-AR')}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          {/* Overall Completion */}
          <div className="mt-6 p-4 bg-terracotta-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">Progreso General del Proyecto</span>
              <span className="text-lg font-bold text-refinance-blue">{overallCompletion.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-refinance-blue h-3 rounded-full transition-all duration-300"
                style={{ width: `${overallCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre el Proyecto</h2>
              <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Project Updates with Stars */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Actualizaciones</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Promedio:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-yellow-500">{averageStars}</span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {project.updates.map((update) => (
                  <div key={update.id} className={`border-l-4 pl-4 ${
                    update.completed ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-500">
                            {new Date(update.date).toLocaleDateString('es-AR')}
                          </span>
                          {update.completed && (
                            <span className="text-green-600 text-sm font-medium">✓ Completado</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{update.title}</h3>
                        <p className="text-gray-600 mb-3">{update.description}</p>
                        
                        {/* Achievement Photo */}
                        <div className="mb-3">
                          <div className="text-4xl">{update.achievementPhoto}</div>
                        </div>
                        
                        {/* Stars and Auditors */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">Calificación:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-yellow-500">{update.stars}</span>
                              <span className="text-yellow-500">⭐</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">Auditores:</span>
                            <span className="font-semibold text-gray-800">{update.auditors}</span>
                          </div>
                        </div>
                        
                        {/* NFT Link */}
                        <a
                          href={update.nftLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-refinance-blue hover:text-blue-600 text-sm font-medium"
                        >
                          <span>🔗</span>
                          Ver NFT de la Actualización
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Compartir Proyecto</h3>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.235 1.264 8.485 3.515a11.985 11.985 0 013.514 8.486c-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.065 3.2-1.17 3.2-2.816 0-1.556-1.265-2.819-2.821-2.819-1.557 0-2.823 1.263-2.823 2.819 0 1.646 1.523 2.881 3.2 2.816zm6.43-2.891c-.033-.498-.366-.912-.795-1.07-.429-.158-.892-.037-1.21.254-.318.291-.423.754-.39 1.252.033.498.366.912.795 1.07.429.158.892.037 1.21-.254.318-.291.423-.754.39-1.252z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Modal */}
        {showDonationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Donar al Proyecto</h2>
                <button
                  onClick={() => setShowDonationForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleDonation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto de la donación
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDonationForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-refinance-blue text-white rounded-lg hover:bg-blue-600"
                  >
                    Donar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail; 