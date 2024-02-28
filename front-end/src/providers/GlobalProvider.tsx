import { ConfigProvider } from 'antd'
import locale from 'antd/locale/en_US'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CurrentSongProvider } from 'src/components/contexts/CurrentSongContext'
export interface GlobalProviderProps {
    children: React.ReactElement
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <CurrentSongProvider>
                <ConfigProvider locale={locale}>{children}</ConfigProvider>
            </CurrentSongProvider>
        </QueryClientProvider>
    )
}
