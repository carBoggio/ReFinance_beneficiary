// Campaign and donation related actions

// Get campaign details - simplified for now
export const getCampaignDetails = async (campaignAddress) => {
  try {
    // For now, return mock data until Soroban contracts are fully integrated
    return {
      total_raised: 0,
      goal: 1000,
      supporters: 0,
      min_donation: 1
    };
  } catch (error) {
    console.error("Error getting campaign details:", error);
    throw error;
  }
};

// Get user contributions - simplified for now
export const getUserContributions = async (walletType, campaignAddress) => {
  try {
    // For now, return mock data until Soroban contracts are fully integrated
    return {
      amount: 0,
      campaign_address: campaignAddress,
      contributor: 'mock_address'
    };
  } catch (error) {
    console.error("Error getting user contributions:", error);
    throw error;
  }
};

// Get all campaigns
export const getAllCampaigns = async () => {
  try {
    // Mock data for now
    return [
      { 
        id: '1', 
        name: 'Construcción de Escuela Rural', 
        address: 'campaign_address_1',
        description: 'Construcción de una escuela rural para 100 niños',
        goal: 5000,
        total_raised: 1200,
        supporters: 45,
        min_donation: 1
      },
      { 
        id: '2', 
        name: 'Clínica Médica Móvil', 
        address: 'campaign_address_2',
        description: 'Clínica móvil para atención médica en zonas remotas',
        goal: 3000,
        total_raised: 800,
        supporters: 32,
        min_donation: 1
      },
      { 
        id: '3', 
        name: 'Sistema de Agua Potable', 
        address: 'campaign_address_3',
        description: 'Instalación de sistema de agua potable para comunidad rural',
        goal: 2500,
        total_raised: 600,
        supporters: 28,
        min_donation: 1
      }
    ];
  } catch (error) {
    console.error("Error getting all campaigns:", error);
    throw error;
  }
};

// Get campaign by ID
export const getCampaignById = async (campaignId) => {
  try {
    const campaigns = await getAllCampaigns();
    return campaigns.find(campaign => campaign.id === campaignId);
  } catch (error) {
    console.error("Error getting campaign by ID:", error);
    throw error;
  }
};

// Get campaign by address
export const getCampaignByAddress = async (campaignAddress) => {
  try {
    const campaigns = await getAllCampaigns();
    return campaigns.find(campaign => campaign.address === campaignAddress);
  } catch (error) {
    console.error("Error getting campaign by address:", error);
    throw error;
  }
}; 