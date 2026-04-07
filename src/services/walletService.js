import apiClient from "./apiClient";

export const walletService = {
  getUserWallet: async () => {
    try {
      const response = await apiClient.get("/wallet/user-wallet/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
