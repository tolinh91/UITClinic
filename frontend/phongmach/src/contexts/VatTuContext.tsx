import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface VatTu {
  id: string;
  name: string;
  price: string;
  type: string;
  storage: string;
  dateImport: string;
  expiry: string;
  stock: string;
  supplier: string;
}

interface VatTuContextType {
  vatTuList: VatTu[];
  addVatTu: (vatTu: Omit<VatTu, 'id'>) => void;
  updateVatTu: (id: string, vatTu: Partial<VatTu>) => void;
  deleteVatTu: (id: string) => void;
}

const VatTuContext = createContext<VatTuContextType | undefined>(undefined);

const initialVatTuList: VatTu[] = [
  {
    id: "VT000001",
    name: "Bông y tế",
    price: "5000",
    type: "Tiêu hao dùng 1 lần",
    storage: "Tủ vật tư 1",
    dateImport: "01/01/2025",
    expiry: "10/10/2025",
    stock: "10",
    supplier: "Công ty Vật tư A",
  },
  {
    id: "VT000002",
    name: "Găng tay",
    price: "10000",
    type: "Tiêu hao nhiều lần",
    storage: "Tủ vật tư 2",
    dateImport: "15/02/2025",
    expiry: "20/12/2025",
    stock: "20",
    supplier: "Công ty Vật tư B",
  },
];

export const VatTuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vatTuList, setVatTuList] = useState<VatTu[]>(initialVatTuList);

  const generateId = () => {
    const maxId = Math.max(...vatTuList.map(vt => parseInt(vt.id.replace('VT', ''))), 0);
    return `VT${String(maxId + 1).padStart(6, '0')}`;
  };

  const addVatTu = (vatTu: Omit<VatTu, 'id'>) => {
    const newVatTu: VatTu = {
      ...vatTu,
      id: generateId()
    };
    setVatTuList(prev => [...prev, newVatTu]);
  };

  const updateVatTu = (id: string, updatedVatTu: Partial<VatTu>) => {
    setVatTuList(prev => 
      prev.map(vt => vt.id === id ? { ...vt, ...updatedVatTu } : vt)
    );
  };

  const deleteVatTu = (id: string) => {
    setVatTuList(prev => prev.filter(vt => vt.id !== id));
  };

  return (
    <VatTuContext.Provider value={{ vatTuList, addVatTu, updateVatTu, deleteVatTu }}>
      {children}
    </VatTuContext.Provider>
  );
};

export const useVatTu = () => {
  const context = useContext(VatTuContext);
  if (context === undefined) {
    throw new Error('useVatTu must be used within a VatTuProvider');
  }
  return context;
};

export type { VatTu };
