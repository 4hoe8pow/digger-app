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
      assignments: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          role_id: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          role_id?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          role_id?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          code: string
          event: string | null
        }
        Insert: {
          code: string
          event?: string | null
        }
        Update: {
          code?: string
          event?: string | null
        }
        Relationships: []
      }
      history: {
        Row: {
          details: string | null
          event_code: string
          event_time: string | null
          id: string
          ticket_id: string
          username: string
        }
        Insert: {
          details?: string | null
          event_code: string
          event_time?: string | null
          id?: string
          ticket_id: string
          username: string
        }
        Update: {
          details?: string | null
          event_code?: string
          event_time?: string | null
          id?: string
          ticket_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_event_code_fkey"
            columns: ["event_code"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "history_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          title: string
        }
        Insert: {
          id?: string
          title: string
        }
        Update: {
          id?: string
          title?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string | null
          effort_estimate: number | null
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"] | null
          project_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at: string | null
          username: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          effort_estimate?: number | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          project_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at?: string | null
          username: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          effort_estimate?: number | null
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          project_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      ticket_priority: "low" | "medium" | "high"
      ticket_status: "open" | "cancel" | "closed"
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
