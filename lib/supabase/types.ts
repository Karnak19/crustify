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
          website_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          website_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          website_id?: number | null
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
      pizzas_ingredients: {
        Row: {
          created_at: string
          ingredient_id: number
          pizza_id: number
        }
        Insert: {
          created_at?: string
          ingredient_id: number
          pizza_id: number
        }
        Update: {
          created_at?: string
          ingredient_id?: number
          pizza_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pizzas_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pizzas_ingredients_pizza_id_fkey"
            columns: ["pizza_id"]
            isOneToOne: false
            referencedRelation: "pizzas"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          billing_address: Json | null
          created_at: string
          id: string
          payment_method: Json | null
          plan: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          id: string
          payment_method?: Json | null
          plan?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          id?: string
          payment_method?: Json | null
          plan?: string | null
          stripe_customer_id?: string | null
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
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          accent: string | null
          accent_foreground: string | null
          background: string
          border: string | null
          card: string | null
          card_foreground: string | null
          created_at: string
          destructive: string | null
          destructive_foreground: string | null
          foreground: string
          foreground_muted: string
          id: number
          input: string | null
          muted: string | null
          muted_foreground: string | null
          name: string
          popover: string | null
          popover_foreground: string | null
          primary_color: string
          primary_foreground: string | null
          radius: string | null
          ring: string | null
          secondary_color: string
          secondary_foreground: string | null
        }
        Insert: {
          accent?: string | null
          accent_foreground?: string | null
          background?: string
          border?: string | null
          card?: string | null
          card_foreground?: string | null
          created_at?: string
          destructive?: string | null
          destructive_foreground?: string | null
          foreground?: string
          foreground_muted: string
          id?: number
          input?: string | null
          muted?: string | null
          muted_foreground?: string | null
          name: string
          popover?: string | null
          popover_foreground?: string | null
          primary_color?: string
          primary_foreground?: string | null
          radius?: string | null
          ring?: string | null
          secondary_color?: string
          secondary_foreground?: string | null
        }
        Update: {
          accent?: string | null
          accent_foreground?: string | null
          background?: string
          border?: string | null
          card?: string | null
          card_foreground?: string | null
          created_at?: string
          destructive?: string | null
          destructive_foreground?: string | null
          foreground?: string
          foreground_muted?: string
          id?: number
          input?: string | null
          muted?: string | null
          muted_foreground?: string | null
          name?: string
          popover?: string | null
          popover_foreground?: string | null
          primary_color?: string
          primary_foreground?: string | null
          radius?: string | null
          ring?: string | null
          secondary_color?: string
          secondary_foreground?: string | null
        }
        Relationships: []
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
          theme_id: number
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
          theme_id?: number
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
          theme_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "websites_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
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
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      status: "draft" | "published"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
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
