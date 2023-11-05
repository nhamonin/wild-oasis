export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          cabin_id: number | null
          cabin_price: number | null
          created_at: string
          end_date: string | null
          extras_price: number | null
          guest_id: number | null
          has_breakfast: boolean | null
          id: number
          is_paid: boolean | null
          num_guests: number | null
          num_nights: number | null
          observations: string | null
          start_date: string | null
          status: string | null
          total_price: number | null
        }
        Insert: {
          cabin_id?: number | null
          cabin_price?: number | null
          created_at?: string
          end_date?: string | null
          extras_price?: number | null
          guest_id?: number | null
          has_breakfast?: boolean | null
          id?: number
          is_paid?: boolean | null
          num_guests?: number | null
          num_nights?: number | null
          observations?: string | null
          start_date?: string | null
          status?: string | null
          total_price?: number | null
        }
        Update: {
          cabin_id?: number | null
          cabin_price?: number | null
          created_at?: string
          end_date?: string | null
          extras_price?: number | null
          guest_id?: number | null
          has_breakfast?: boolean | null
          id?: number
          is_paid?: boolean | null
          num_guests?: number | null
          num_nights?: number | null
          observations?: string | null
          start_date?: string | null
          status?: string | null
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cabin_id_fkey"
            columns: ["cabin_id"]
            isOneToOne: false
            referencedRelation: "cabins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          }
        ]
      }
      cabins: {
        Row: {
          created_at: string
          description: string | null
          discount: number | null
          id: number
          image: string | null
          max_capacity: number | null
          name: string | null
          regular_price: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          max_capacity?: number | null
          name?: string | null
          regular_price?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          max_capacity?: number | null
          name?: string | null
          regular_price?: number | null
        }
        Relationships: []
      }
      guests: {
        Row: {
          country_flag: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: number
          national_id: string | null
          nationality: string | null
        }
        Insert: {
          country_flag?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Update: {
          country_flag?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          breakfast_price: number | null
          created_at: string
          id: number
          max_booking_length: number | null
          max_guests_per_booking: number | null
          min_booking_length: number | null
        }
        Insert: {
          breakfast_price?: number | null
          created_at?: string
          id?: number
          max_booking_length?: number | null
          max_guests_per_booking?: number | null
          min_booking_length?: number | null
        }
        Update: {
          breakfast_price?: number | null
          created_at?: string
          id?: number
          max_booking_length?: number | null
          max_guests_per_booking?: number | null
          min_booking_length?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
