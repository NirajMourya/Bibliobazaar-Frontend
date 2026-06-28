export const BASE_URL = process.env.REACT_APP_BASE_URL

// Authentication
export const signUpUrl = `${BASE_URL}/user/signUp`
export const loginUrl = `${BASE_URL}/user/login`

// Search
export const userSearch = `${BASE_URL}/library/search`

// User
export const accountUrl = `${BASE_URL}/user/account`
export const updateAccountUrl = `${BASE_URL}/user/updateAccount`
export const updateProfilePicture = `${BASE_URL}/user/updateProfilePicture`
export const addressListUrl = `${BASE_URL}/user/addressesList`
export const addToCartUrl = `${BASE_URL}/user/addToCart`
export const deleteFromCartUrl = `${BASE_URL}/user/deleteFromCart`
export const deleteAllFromCartUrl = `${BASE_URL}/user/deleteAllFromCart`
export const deleteAddressUrl = `${BASE_URL}/user/deleteAddress`
export const addAddressUrl = `${BASE_URL}/user/addAddress`
export const editAddressUrl = `${BASE_URL}/user/editAddress`

// Book
export const bookDetailUrl = `${BASE_URL}/library/details`

// Library
export const collectionUrl = `${BASE_URL}/library/collection`
export const findBookUrl = `${BASE_URL}/library/find`
export const addBookUrl = `${BASE_URL}/library/add`
export const editBookUrl = `${BASE_URL}/library/edit`
export const deleteBookUrl = `${BASE_URL}/library/remove`

//search
export const searchBookURL = `${BASE_URL}/search`

// File Upload
export const fileUploadUrl = `${BASE_URL}/upload`

// Checkout
export const checkout = `${BASE_URL}/payment/checkout`

// Payment Verification
export const paymentVerify = `${BASE_URL}/payment/verify`

// Rent History
export const completeOrderUrl = `${BASE_URL}/rent/add`
export const rentDetailsUrl = `${BASE_URL}/rent/details`
export const OfferedBooksUrl = `${BASE_URL}/rent/offered`
export const IssuedBooksUrl = `${BASE_URL}/rent/issued`