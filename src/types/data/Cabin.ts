import { FieldValues } from 'react-hook-form';

import { Database } from '../supabase';

export type Cabin = Database['public']['Tables']['cabins']['Row'];
export type PartialCabin = Partial<Cabin>;
export type CabinCreation = Omit<Cabin, 'id'>;
export type CabinFormInputs = Cabin & FieldValues;
export type EditCabinArgs = {
  newCabinData: CabinFormInputs;
  id: number;
};
