import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DonationForm from '../../components/DonationForm';
import { useWallet } from '../../hooks/useWallet';

const Donate = () => {
  const { walletAddress, selectedWallet, isConnected, connectWallet, disconnectWallet } = useWallet();
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Check if there's a selected project from navigation
  useEffect(() => {
    if (location.state?.selectedProject) {
      const { selectedProject } = location.state;
      // Find the campaign by address and preselect it
      const campaign = campaigns.find(c => c.address === selectedProject.address);
      if (campaign) {
        setSelectedCampaign(campaign.address);
      }
    }
  }, [location.state, campaigns]);

  // Load campaigns on mount
  useEffect(() => {
    // Mock campaigns data - in real app this would come from an API
    const mockCampaigns = [
      { 
        id: '1', 
        name: 'Construcción de Escuela Rural', 
        address: 'CDBWA6QGQZZR5XLFESB7ANVIP5O4IRF56X6VVLCVSE2B6YL7MNWCFKLV',
        description: 'Proyecto para construir una escuela rural en el norte de Argentina',
        goal: 50000,
        total_raised: 15000,
        min_donation: 10
      },
      { 
        id: '2', 
        name: 'Clínica Médica Móvil', 
        address: 'campaign_address_2',
        description: 'Clínica móvil para comunidades rurales',
        goal: 30000,
        total_raised: 8000,
        min_donation: 5
      },
      { 
        id: '3', 
        name: 'Sistema de Agua Potable', 
        address: 'campaign_address_3',
        description: 'Instalación de sistema de agua potable en comunidades rurales',
        goal: 75000,
        total_raised: 25000,
        min_donation: 15
      },
    ];
    setCampaigns(mockCampaigns);
  }, []);

  const handleWalletConnect = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleDonationComplete = (result) => {
    console.log('Donation completed:', result);
    // You can add additional logic here like showing success message, redirecting, etc.
  };

  // Check if there's a preselected project
  const preselectedProject = location.state?.selectedProject;

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-terracotta-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiero Donar</h1>
          <p className="text-xl text-gray-600">Tu generosidad puede cambiar vidas en Argentina</p>
          
          {/* Show preselected project info if available */}
          {preselectedProject && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
              <h3 className="font-semibold text-blue-800 mb-2">Proyecto Seleccionado</h3>
              <p className="text-blue-700 text-lg font-medium">{preselectedProject.name}</p>
              <p className="text-blue-600 text-sm mt-1">{preselectedProject.description}</p>
            </div>
          )}
        </div>

        {/* Donation Options */}
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
                  <h3 className="font-semibold text-gray-800 mb-2">Conecta tu Wallet</h3>
                  <p className="text-gray-600">Conecta tu wallet de Stellar (Freighter, xBull, o Albedo) para hacer donaciones en XLM de forma segura y transparente.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Elige tu Proyecto</h3>
                  <p className="text-gray-600">Selecciona el proyecto que quieres apoyar y decide cuánto quieres donar en XLM. Todas las transacciones se registran en la blockchain de Stellar.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Transacción Segura</h3>
                  <p className="text-gray-600">Tu donación se procesa a través de contratos inteligentes de Soroban en la red de Stellar, garantizando transparencia y seguridad.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-refinance-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Seguimiento del Impacto</h3>
                  <p className="text-gray-600">Recibe actualizaciones sobre el progreso del proyecto y ve cómo tu donación está haciendo la diferencia en tiempo real.</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 p-6 bg-terracotta-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-4">Beneficios de Donar con Stellar</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Transacciones instantáneas y de bajo costo</li>
                <li>• Transparencia total en la blockchain</li>
                <li>• Sin intermediarios bancarios</li>
                <li>• Seguridad criptográfica avanzada</li>
                <li>• Compatible con múltiples wallets</li>
              </ul>
            </div>

            {/* Network Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Red de Stellar</h4>
              <p className="text-sm text-blue-700">
                Actualmente conectado a la <strong>Testnet</strong> de Stellar para desarrollo y pruebas.
                Las transacciones en testnet no tienen valor real.
              </p>
            </div>
          </div>

          {/* Stellar Donation Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Donación con Stellar XLM</h2>
            
            {!isConnected() ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Conecta tu Wallet para Comenzar
                </h3>
                <p className="text-gray-600 mb-6">
                  Para hacer donaciones con Stellar, necesitas conectar tu wallet desde la barra de navegación.
                </p>
                <button
                  onClick={handleWalletConnect}
                  disabled={isLoading}
                  className="bg-refinance-blue hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Conectando...' : 'Conectar Wallet'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Campaign Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selecciona un Proyecto
                  </label>
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-refinance-blue"
                  >
                    <option value="">Selecciona un proyecto...</option>
                    {campaigns.map(campaign => (
                      <option key={campaign.id} value={campaign.address}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donation Form */}
                {selectedCampaign && (
                  <DonationForm
                    campaignAddress={selectedCampaign}
                    onDonationComplete={handleDonationComplete}
                  />
                )}

                {/* Wallet Status Info */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-green-800">Wallet Conectado</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Tu wallet <strong>{selectedWallet?.name || 'Unknown'}</strong> está conectado y listo para hacer donaciones.
                  </p>
                  <p className="text-green-600 text-xs break-all mt-1">
                    {walletAddress}
                  </p>
                </div>
              </div>
            )}

            {/* Security notice */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-800">
                  Todas las transacciones están protegidas con la tecnología blockchain de Stellar
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