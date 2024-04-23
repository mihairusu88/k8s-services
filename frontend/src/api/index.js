/* eslint-disable no-undef */
const baseUrl = 'http://localhost:30081'

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/products`)
    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: error
    }
  }
}

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/products/${id}`)
    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: error
    }
  }
}

export const getProductCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categories`)
    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: error
    }
  }
}

export const login = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
        expiresInMins: 30
      })
    })

    const data = await response.json()

    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: error
    }
  }
}

export const getUser = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: error
    }
  }
}
