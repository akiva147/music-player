import { ConfigProvider } from 'antd'
import locale from 'antd/locale/en_US'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export interface GlobalProviderProps {
    children: React.ReactElement
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={locale}>{children}</ConfigProvider>
        </QueryClientProvider>
    )
}
