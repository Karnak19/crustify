export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ingredients: {
        Row: {
          created_at: string
          id: number
          name: string
          website_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          website_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          website_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      pizzas: {
        Row: {
          base: Database["public"]["Enums"]["pizza_base"]
          created_at: string
          description: string | null
          id: number
          name: string
          picture: string | null
          price: number
          status: Database["public"]["Enums"]["status"]
          website_id: number
        }
        Insert: {
          base?: Database["public"]["Enums"]["pizza_base"]
          created_at?: string
          description?: string | null
          id?: number
          name: string
          picture?: string | null
          price: number
          status?: Database["public"]["Enums"]["status"]
          website_id: number
        }
        Update: {
          base?: Database["public"]["Enums"]["pizza_base"]
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          picture?: string | null
          price?: number
          status?: Database["public"]["Enums"]["status"]
          website_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pizzas_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          plan: string | null
        }
        Insert: {
          created_at?: string
          id: string
          plan?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          plan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      websites: {
        Row: {
          address: string | null
          created_at: string
          id: number
          logo: string | null
          name: string | null
          phone: string | null
          plausible_shared_link: string | null
          subdomain: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          logo?: string | null
          name?: string | null
          phone?: string | null
          plausible_shared_link?: string | null
          subdomain: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          logo?: string | null
          name?: string | null
          phone?: string | null
          plausible_shared_link?: string | null
          subdomain?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "websites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pizza_base: "tomato" | "cream"
      status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
