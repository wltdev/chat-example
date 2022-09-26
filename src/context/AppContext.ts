import { CombineContexts } from './CombineContexts'
import { AuthContextProvider } from './AuthContext'
import { ChatContextProvider } from './ChatContext'

const providers = [AuthContextProvider, ChatContextProvider]
export const AppContextProvider = CombineContexts({ components: providers })