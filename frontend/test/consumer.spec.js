/* eslint-disable no-undef */
/* tslint:disable:no-unused-expression no-empty */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { PactV4, MatchersV3, SpecificationVersion } from '@pact-foundation/pact'
import {
  getAllProducts,
  getProduct,
  getProductCategories,
  login,
  getUser
} from '../src/api/index.js'
import {
  productContract,
  categoriesContract,
  userContract,
  userDetailsContract
} from './contracts.js'
import { describe, it } from 'mocha'

chai.use(chaiAsPromised)
const { expect } = chai

let token = ''

describe('The Service API', () => {
  const provider = new PactV4({
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
    consumer: 'Frontend',
    provider: 'API',
    logLevel: 'debug'
  })

  before(() => provider.setup())

  describe('GET /products', () => {
    before(() => {
      const interaction = {
        state: 'i have a list of products',
        uponReceiving: 'a request for all products',
        withRequest: {
          method: 'GET',
          path: '/products',
          headers: {
            Accept: ['application/problem+json', 'application/json', 'text/plain', '*/*']
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: MatchersV3.eachLike(productContract)
        },
        withResponseHeaders: {
          'Content-Type': 'application/json'
        }
      }
      return provider.addInteraction(interaction)
    })

    it('returns the correct response', async () => {
      const response = await getAllProducts()
      expect(response.data[0]).to.deep.eq(productContract)
    })
  })

  describe('GET /products/:id', () => {
    before(() => {
      const interaction = {
        state: 'i have a product',
        uponReceiving: 'a request for a product by id',
        withRequest: {
          method: 'GET',
          path: '/products/1',
          headers: {
            Accept: ['application/problem+json', 'application/json', 'text/plain', '*/*']
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: MatchersV3.like(productContract)
        },
        withResponseHeaders: {
          'Content-Type': 'application/json'
        }
      }
      return provider.addInteraction(interaction)
    })

    it('returns the correct response', async () => {
      const response = await getProduct(1)
      expect(response.data).to.deep.eq(productContract)
    })
  })

  describe('GET /api/products/categories', () => {
    before(() => {
      const interaction = {
        state: 'i have a list of categories',
        uponReceiving: 'a request for all categories',
        withRequest: {
          method: 'GET',
          path: '/api/products/categories',
          headers: {
            Accept: ['application/problem+json', 'application/json', 'text/plain', '*/*']
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: MatchersV3.arrayContaining(categoriesContract)
        },
        withResponseHeaders: {
          'Content-Type': 'application/json'
        }
      }
      return provider.addInteraction(interaction)
    })

    it('returns the correct response', async () => {
      const response = await getProductCategories()

      expect(JSON.stringify(response.data)).to.eq(JSON.stringify(categoriesContract))
    })
  })

  describe('POST /api/auth/login', () => {
    before(() => {
      const interaction = {
        state: 'i have a user to login',
        uponReceiving: 'a request to login',
        withRequest: {
          method: 'POST',
          path: '/api/auth/login',
          headers: {
            Accept: ['application/problem+json', 'application/json', 'text/plain', '*/*']
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: MatchersV3.like(userContract)
        },
        withResponseHeaders: {
          'Content-Type': 'application/json'
        }
      }
      return provider.addInteraction(interaction)
    })

    it('returns the correct response', async () => {
      const response = await login()

      expect(response.data).to.have.keys(userContract)
      token = response.data.token
    })
  })

  describe('GET /api/auth/user', () => {
    before(() => {
      const interaction = {
        state: 'i have a user to get details of itself',
        uponReceiving: 'a request to get details of user',
        withRequest: {
          method: 'GET',
          path: '/api/auth/user',
          headers: {
            Accept: ['application/problem+json', 'application/json', 'text/plain', '*/*'],
            Authorization: `Bearer ${token}`
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: MatchersV3.like(userDetailsContract)
        },
        withResponseHeaders: {
          'Content-Type': 'application/json'
        }
      }
      return provider.addInteraction(interaction)
    })

    it('returns the correct response', async () => {
      const response = await getUser(token)
      expect(response.data).to.deep.eq(userDetailsContract)

      token = ''
    })
  })
})
