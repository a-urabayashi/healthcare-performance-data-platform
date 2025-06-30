'use client';

import { useState, useEffect } from 'react';

interface RevenueData {
  month: string;
  revenue: number;
  patients: number;
  avgPerPatient: number;
}

interface DepartmentData {
  department: string;
  revenue: number;
  patients: number;
  percentage: number;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  totalSpent: number;
  status: 'active' | 'inactive' | 'new';
}

interface DashboardData {
  revenueData: RevenueData[];
  departmentData: DepartmentData[];
  patientData: PatientData[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: DashboardData = {
          revenueData: [
            { month: '2024-01', revenue: 2500000, patients: 450, avgPerPatient: 5556 },
            { month: '2024-02', revenue: 2800000, patients: 520, avgPerPatient: 5385 },
            { month: '2024-03', revenue: 3200000, patients: 580, avgPerPatient: 5517 },
            { month: '2024-04', revenue: 2900000, patients: 510, avgPerPatient: 5686 },
            { month: '2024-05', revenue: 3400000, patients: 620, avgPerPatient: 5484 },
            { month: '2024-06', revenue: 3600000, patients: 650, avgPerPatient: 5538 },
          ],
          departmentData: [
            { department: '内科', revenue: 8500000, patients: 1200, percentage: 35 },
            { department: '外科', revenue: 6200000, patients: 800, percentage: 26 },
            { department: '小児科', revenue: 4800000, patients: 950, percentage: 20 },
            { department: '整形外科', revenue: 2900000, patients: 420, percentage: 12 },
            { department: 'その他', revenue: 1600000, patients: 280, percentage: 7 },
          ],
          patientData: [
            { id: 'P001', name: '田中 太郎', age: 45, lastVisit: '2024-06-28', totalSpent: 125000, status: 'active' },
            { id: 'P002', name: '佐藤 花子', age: 32, lastVisit: '2024-06-27', totalSpent: 89000, status: 'active' },
            { id: 'P003', name: '鈴木 一郎', age: 67, lastVisit: '2024-06-25', totalSpent: 234000, status: 'active' },
            { id: 'P004', name: '高橋 美咲', age: 28, lastVisit: '2024-06-20', totalSpent: 45000, status: 'new' },
            { id: 'P005', name: '山田 健太', age: 55, lastVisit: '2024-05-15', totalSpent: 178000, status: 'inactive' },
          ],
        };
        
        setData(mockData);
        setError(null);
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch: () => fetchData() };
};