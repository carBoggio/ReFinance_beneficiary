/**
 * Campaign interface structure
 * This defines the structure of a campaign object
 */
export class ICampaign {
  constructor(creator, goal, min_donation, total_raised, supporters) {
    this.creator = creator;
    this.goal = goal;
    this.min_donation = min_donation;
    this.total_raised = total_raised;
    this.supporters = supporters;
  }
}

// Example of how to create a campaign object
export const createCampaign = (creator, goal, min_donation, total_raised = 0, supporters = 0) => {
  return new ICampaign(creator, goal, min_donation, total_raised, supporters);
}; 