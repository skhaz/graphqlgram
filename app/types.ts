import { User } from '~/entities/User'

export interface Context {
  user?: User
}

export interface JwtDecoded {
  id: string
}
