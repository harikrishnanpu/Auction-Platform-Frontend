
'use client'
import { AppStore, makeStore } from '@/store'
import { Provider } from 'react-redux'
import { setupAxios } from '@/lib/axios'
import { useRef } from 'react'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined);

    if (!storeRef.current) {
        storeRef.current = makeStore()
        setupAxios(storeRef.current)
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}