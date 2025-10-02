// Query keys for TanStack Query cache management
export const QUERY_KEYS = {
  // Chat queries
  CHATS: ["chats"] as const,
  CHAT: (chatId: string) => ["chats", chatId] as const,
  CHAT_MESSAGES: (chatId: string) => ["chats", chatId, "messages"] as const,

  // Agent queries
  AGENTS: ["agents"] as const,
  AGENT: (agentId: string) => ["agents", agentId] as const,

  // Authorization token queries
  AUTH_TOKENS: ["authorization-tokens"] as const,
  AUTH_TOKEN: (tokenId: string) => ["authorization-tokens", tokenId] as const,

  // OAuth queries
  OAUTH2_SERVERS: ["oauth2-servers"] as const,
  OAUTH2_SERVER: (serverId: string) => ["oauth2-servers", serverId] as const,

  // MCP Server queries
  MCP_SERVERS: ["mcp-servers"] as const,
  MCP_SERVER: (serverId: string) => ["mcp-servers", serverId] as const,
  MCP_CONFIGS: ["mcp-configs"] as const,
  MCP_CONFIG: (configId: string) => ["mcp-configs", configId] as const,

  // Backoffice queries
  BACKOFFICE_AGENTS: ["backoffice", "agents"] as const,
  BACKOFFICE_AUTH_TOKENS: ["backoffice", "authorization-tokens"] as const,
  BACKOFFICE_OAUTH2_SERVERS: ["backoffice", "oauth2-servers"] as const,
  BACKOFFICE_MCP_CONFIGS: ["backoffice", "mcp-configs"] as const,

  // KPI queries
  KPI_FILTERS_OPTIONS: ["kpi", "filters", "options"] as const,
  KPI_TIMEFRAMES: ["kpi", "timeframes"] as const,
  KPI_ALL: ["kpi"] as const, // For invalidating all KPI queries

  // Report queries
  REPORTS: ["reports"] as const,
  REPORT_SUMMARY: (kpi: number, filters?: any, includeBaseline?: boolean) => [
    "reports",
    "summary",
    kpi,
    filters ?? null,
    includeBaseline ?? false
  ] as const,
  REPORTS_ALL: ["reports"] as const, // For invalidating all report queries

  // Notification queries
  NOTIFICATIONS: ["notifications"] as const,
  NOTIFICATIONS_UNREAD_COUNT: ["notifications", "unread-count"] as const,
} as const;

// Helper function to create query keys with parameters
export const createQueryKey = <T extends readonly unknown[]>(key: T) => key;
