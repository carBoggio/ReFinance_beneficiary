/**
 * Interface for the Crowdfunding Contract
 * This defines the structure and methods available in the Soroban contract
 */

export class ICrowdfundingContract {
  constructor(client) {
    this.client = client;
  }

  /**
   * Create a new campaign
   * @param {Object} params - Campaign creation parameters
   * @param {string} params.creator - Creator's public key
   * @param {number} params.goal - Campaign goal amount
   * @param {number} params.min_donation - Minimum donation amount
   * @returns {Promise<Object>} Transaction result
   */
  async create_campaign({ creator, goal, min_donation }) {
    try {
      const result = await this.client.call(
        'create_campaign',
        creator,
        goal,
        min_donation
      );
      return result;
    } catch (error) {
      console.error('Error calling create_campaign:', error);
      throw error;
    }
  }

  /**
   * Get campaign details
   * @param {Object} params - Campaign parameters
   * @param {string} params.campaign_address - Campaign's public key
   * @returns {Promise<Object>} Campaign details
   */
  async get_campaign({ campaign_address }) {
    try {
      const result = await this.client.call(
        'get_campaign',
        campaign_address
      );
      return result;
    } catch (error) {
      console.error('Error calling get_campaign:', error);
      throw error;
    }
  }

  /**
   * Contribute to a campaign
   * @param {Object} params - Contribution parameters
   * @param {string} params.contributor - Contributor's public key
   * @param {string} params.campaign_address - Campaign's public key
   * @param {number} params.amount - Amount to contribute in stroops
   * @returns {Promise<Object>} Transaction result
   */
  async contribute({ contributor, campaign_address, amount }) {
    try {
      const result = await this.client.call(
        'contribute',
        contributor,
        campaign_address,
        amount
      );
      return result;
    } catch (error) {
      console.error('Error calling contribute:', error);
      throw error;
    }
  }

  /**
   * Withdraw funds from a campaign (creator only)
   * @param {Object} params - Withdraw parameters
   * @param {string} params.creator - Creator's public key
   * @returns {Promise<Object>} Transaction result
   */
  async withdraw({ creator }) {
    try {
      const result = await this.client.call(
        'withdraw',
        creator
      );
      return result;
    } catch (error) {
      console.error('Error calling withdraw:', error);
      throw error;
    }
  }

  /**
   * Refund contribution from a campaign
   * @param {Object} params - Refund parameters
   * @param {string} params.contributor - Contributor's public key
   * @param {string} params.campaign_address - Campaign's public key
   * @returns {Promise<Object>} Transaction result
   */
  async refund({ contributor, campaign_address }) {
    try {
      const result = await this.client.call(
        'refund',
        contributor,
        campaign_address
      );
      return result;
    } catch (error) {
      console.error('Error calling refund:', error);
      throw error;
    }
  }
} 