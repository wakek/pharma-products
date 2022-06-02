import React, { ReactNode } from 'react';
import { RootStore } from '../stores/domain/RootStore';

let store: RootStore;
const StoreContext = React.createContext<RootStore | undefined>(undefined);

export const useRootStore = () => {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return context;
};

export default function RootStoreProvider({ children }: { children: ReactNode }) {
    const root = store ?? new RootStore();

    return (
        <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
    );
}
