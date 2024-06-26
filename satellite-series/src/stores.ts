// src/stores.js
import { atom } from 'nanostores';

export const isModalOpen = atom(false);
export const selectedSeries = atom<any>(null);
