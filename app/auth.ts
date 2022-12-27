import type { Context } from './types'
import { AuthChecker } from 'type-graphql'

export const authChecker: AuthChecker<Context> = ({ context: { user } }) => {
  if (user) {
    return true
  }

  return false
}
