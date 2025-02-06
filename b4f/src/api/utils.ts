/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../logger'
import jwkToPem from 'jwk-to-pem'
import jwt from 'jsonwebtoken'
import base64url from 'base64url'
import axios from './axiosKinde'

const JWKS_URL = '/.well-known/jwks.json'

const getUnverifiedHeader = (token: string): any => {
  try {
    const headerB64 = token.split('.')[0]
    const headerJson: string = base64url.decode(headerB64)
    return JSON.parse(headerJson)
  } catch (err) {
    const error = err instanceof Error
      ? new Error(`Error while parsing token header: ${err.message ?? ''}`)
      : new Error('Error while parsing token header: Unknown error')
    Logger.writeException(error, '001-Unknown', 'getUnverifiedHeader')
    throw error
  }
}

export const verifyAndDecodeToken = async (header: string | undefined): Promise<string> => {
  if (header?.split('Bearer ')[1] == null) {
    const error = new Error('Error while parsing token header: missing Auth header')
    Logger.writeException(error, '002-NullToken', 'verifyAndDecodeToken')
    throw error
  }
  const token = header.split('Bearer ')[1]

  try {
    const { data: jwks } = await axios.get(JWKS_URL)
    const unverifiedHeader = getUnverifiedHeader(token)

    if (isEmpty(unverifiedHeader)) {
      const error = new Error('Error while parsing token header: missing Auth header')
      Logger.writeException(error, '003-UnverifiedHeader', 'verifyAndDecodeToken')
      throw error
    }

    const rsaKey = jwks.keys.find((key: { kid: string }) => key.kid === unverifiedHeader.kid)

    if (isEmpty(rsaKey)) {
      const error = new Error('Error while parsing token header: missing Auth header')
      Logger.writeException(error, '004-EmptyRsaKey', 'verifyAndDecodeToken')
      throw error
    }
    const pemKey = jwkToPem(rsaKey as jwkToPem.JWK)
    const claims = jwt.verify(token, pemKey, { algorithms: ['RS256'] }) as jwt.JwtPayload
    if (claims.sub == null) {
      const error = new Error('Error while parsing token claims: missing sub claim')
      Logger.writeException(error, '007-MissingSubClaim', 'verifyAndDecodeToken')
      throw error
    }
    return claims.sub
  } catch (err) {
    const error = err instanceof jwt.JsonWebTokenError
      ? new Error(`Invalid JWT Token: ${err.message ?? ''}`)
      : new Error(`Error while token validation: ${err instanceof Error ? err.message : 'Unknown error'}`)
    Logger.writeException(error, err instanceof jwt.JsonWebTokenError ? '005-InvalidJWT' : '006-TokenValidation', 'verifyAndDecodeToken')
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const isEmpty = (obj: any): boolean => Object.keys(obj).length === 0
