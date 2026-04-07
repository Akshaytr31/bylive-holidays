import apiClient from "./apiClient";

export const authService = {
  login: async (userId, password) => {
    try {
      const response = await apiClient.post("/accounts/login/", {
        user_id: userId,
        password: password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await apiClient.post("/accounts/logout/", {
        refresh: refreshToken,
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await apiClient.post("/accounts/token/refresh/", {
        refresh: refreshToken,
      });
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getReferralLink: async () => {
    try {
      const response = await apiClient.get("/accounts/referral-link/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProfile: async () => {
    try {
      const response = await apiClient.get("/accounts/profile/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/accounts/profile/", profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDownlines: async () => {
    try {
      const response = await apiClient.get("/accounts/downline/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
