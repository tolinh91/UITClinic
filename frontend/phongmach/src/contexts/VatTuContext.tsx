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
  {
    id: "VT000003",
    name: "Máy đo huyết áp điện tử",
    price: "850000",
    type: "Dụng cụ hỗ trợ khám",
    storage: "Tủ vật tư 3",
    dateImport: "05/03/2025",
    expiry: "05/03/2030",
    stock: "5",
    supplier: "Công ty Thiết bị Y tế C",
  },
  {
    id: "VT000004",
    name: "Khẩu trang 3 lớp",
    price: "3000",
    type: "Tiêu hao dùng 1 lần",
    storage: "Tủ vật tư 1",
    dateImport: "10/04/2025",
    expiry: "10/04/2027",
    stock: "500",
    supplier: "Công ty Vật tư D",
  },
  {
    id: "VT000005",
    name: "Nhiệt kế điện tử",
    price: "120000",
    type: "Dụng cụ hỗ trợ khám",
    storage: "Tủ vật tư 4",
    dateImport: "15/05/2025",
    expiry: "15/05/2028",
    stock: "15",
    supplier: "Công ty Thiết bị Y tế E",
  },
  {
    id: "VT000006",
    name: "Cồn 70 độ",
    price: "25000",
    type: "Tiêu hao nhiều lần",
    storage: "Tủ vật tư 2",
    dateImport: "20/06/2025",
    expiry: "20/06/2027",
    stock: "50",
    supplier: "Công ty Hóa chất F",
  },
  {
    id: "VT000007",
    name: "Máy in phiếu khám",
    price: "2500000",
    type: "Thiết bị văn phòng",
    storage: "Tủ vật tư 5",
    dateImport: "25/07/2025",
    expiry: "25/07/2030",
    stock: "2",
    supplier: "Công ty Thiết bị G",
  },
  {
    id: "VT000008",
    name: "Ống nghiệm máu",
    price: "8000",
    type: "Tiêu hao dùng 1 lần",
    storage: "Tủ vật tư 3",
    dateImport: "01/08/2025",
    expiry: "01/08/2027",
    stock: "200",
    supplier: "Công ty Vật tư H",
  },
  {
    id: "VT000009",
    name: "Ống nghe y tế 2 đầu",
    price: "450000",
    type: "Dụng cụ hỗ trợ khám",
    storage: "Tủ vật tư 4",
    dateImport: "05/08/2025",
    expiry: "05/08/2030",
    stock: "8",
    supplier: "Công ty Thiết bị Y tế I",
  },
  {
    id: "VT000010",
    name: "Giấy in toa thuốc",
    price: "150000",
    type: "Thiết bị văn phòng",
    storage: "Tủ vật tư 5",
    dateImport: "10/08/2025",
    expiry: "10/08/2027",
    stock: "30",
    supplier: "Công ty Văn phòng phẩm J",
  }
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
