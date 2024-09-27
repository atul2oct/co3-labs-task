const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api/v1'

// ENDPOINTS
export const endpoints = {
    UPDATECOINS_API: BASE_URL + "/coin/update-coins",
    GETUSER_API: BASE_URL + "/coin//get-user-info",
}