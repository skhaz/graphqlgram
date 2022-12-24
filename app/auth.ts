import { AuthChecker } from 'type-graphql'
import type { Context } from '~/types'

export const authChecker: AuthChecker<Context> = ({ context: { user } }) => {
  if (user) {
    return true
  }

  return false
}
