import { Context } from './types'
import { AuthChecker } from 'type-graphql'

export const authChecker: AuthChecker<Context> = ({ user }) => {
  if (user) {
    return true
  }

  return false
}
