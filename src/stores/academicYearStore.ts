import { create } from 'zustand';
import type { AcademicYear } from '../types/academicYear';

interface AcademicYearState {
  years: AcademicYear[];
  activeYear: AcademicYear | null;
  setYears: (years: AcademicYear[]) => void;
  updateYear: (year: AcademicYear) => void;
  getActiveYear: () => AcademicYear | null;
}

export const useAcademicYearStore = create<AcademicYearState>((set, get) => ({
  years: [],
  activeYear: null,
  setYears: (years) => {
    const activeYear = years.find((year) => year.isActive) || null;
    set({ years, activeYear });
  },
  updateYear: (updatedYear) => {
    set((state) => {
      const newYears = state.years.map((year) =>
        year.id === updatedYear.id ? updatedYear : year
      );
      const activeYear = newYears.find((year) => year.isActive) || null;
      return { years: newYears, activeYear };
    });
  },
  getActiveYear: () => get().activeYear,
}));