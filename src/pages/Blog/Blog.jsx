import { Link } from 'react-router-dom';

const Blog = () => {
  // Mock blog articles
  const blogArticles = [
    {
      id: 1,
      title: "Guía Completa: Cómo Donar de Forma Segura en ReFinance",
      excerpt: "Aprende todo lo que necesitas saber para hacer donaciones seguras y efectivas en nuestra plataforma. Desde la creación de tu cuenta hasta el seguimiento del impacto de tu donación.",
      author: "Equipo ReFinance",
      date: "2024-08-12",
      readTime: "5 min",
      category: "Guías",
      image: "📚",
      featured: true
    },
    {
      id: 2,
      title: "5 Razones por las que Deberías Donar a Proyectos Educativos",
      excerpt: "Descubre cómo tu donación puede transformar la vida de cientos de niños y jóvenes que no tienen acceso a una educación de calidad.",
      author: "María González",
      date: "2024-08-10",
      readTime: "3 min",
      category: "Educación",
      image: "🎓"
    },
    {
      id: 3,
      title: "Transparencia en las Donaciones: ¿Cómo Sabemos que tu Dinero Llega a su Destino?",
      excerpt: "Te explicamos nuestro sistema de transparencia y cómo cada peso de tu donación se rastrea y reporta públicamente.",
      author: "Carlos Mendoza",
      date: "2024-08-08",
      readTime: "4 min",
      category: "Transparencia",
      image: "🔍"
    },
    {
      id: 4,
      title: "Historias de Éxito: Proyectos Completados Gracias a tus Donaciones",
      excerpt: "Conoce las historias inspiradoras de proyectos que han sido exitosamente financiados y el impacto que han tenido en las comunidades.",
      author: "Ana Rodríguez",
      date: "2024-08-05",
      readTime: "6 min",
      category: "Historias",
      image: "🌟"
    },
    {
      id: 5,
      title: "Beneficios Fiscales de las Donaciones: Lo que Necesitas Saber",
      excerpt: "Información completa sobre cómo obtener beneficios fiscales por tus donaciones y qué documentos necesitas guardar.",
      author: "Lic. Roberto Silva",
      date: "2024-08-03",
      readTime: "4 min",
      category: "Fiscal",
      image: "📋"
    },
    {
      id: 6,
      title: "Donaciones Recurrentes vs. Únicas: ¿Cuál es Mejor para Ti?",
      excerpt: "Analizamos las ventajas de cada tipo de donación y te ayudamos a decidir cuál se adapta mejor a tus posibilidades y objetivos.",
      author: "Equipo ReFinance",
      date: "2024-08-01",
      readTime: "3 min",
      category: "Tips",
      image: "💡"
    }
  ];

  const categories = ["Todos", "Guías", "Educación", "Transparencia", "Historias", "Fiscal", "Tips"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-terracotta-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog ReFinance</h1>
          <p className="text-xl text-gray-600">Aprende más sobre cómo hacer donaciones efectivas y el impacto que generan</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-refinance-blue hover:text-white transition-colors shadow-md"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {blogArticles.filter(article => article.featured).map((article) => (
          <div key={article.id} className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-refinance-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime} de lectura</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>Por {article.author}</span>
                  <span>{new Date(article.date).toLocaleDateString('es-MX')}</span>
                </div>
                <button className="bg-refinance-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Leer Artículo Completo
                </button>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">{article.image}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.filter(article => !article.featured).map((article) => (
            <article key={article.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{article.image}</div>
                <span className="inline-block bg-terracotta-100 text-terracotta-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{article.readTime} de lectura</span>
                <span>{new Date(article.date).toLocaleDateString('es-MX')}</span>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                Por {article.author}
              </div>
              
              <button className="w-full bg-terracotta-100 text-terracotta-800 py-2 rounded-lg font-medium hover:bg-terracotta-200 transition-colors">
                Leer Más
              </button>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mantente Informado</h2>
          <p className="text-gray-600 mb-6">
            Suscríbete a nuestro boletín para recibir las últimas noticias sobre proyectos, 
            historias de impacto y consejos para donaciones efectivas.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
            />
            <button className="bg-refinance-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 