import { FieldValues } from 'react-hook-form';

import { Database } from '../supabase';

export type Cabin = Database['public']['Tables']['cabins']['Row'];
export type PartialCabin = Partial<Cabin>;
export type CabinCreation = Omit<Cabin, 'id' | 'created_at'>;
export type CabinFormInputs = Cabin & FieldValues;
export type UpdateCabinArgs = {
  newCabinData: CabinFormInputs;
  id: number;
};
