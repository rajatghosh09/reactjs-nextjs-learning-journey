export type NotificationType = "success" | "failed" | "warning";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  time: number;
}

export interface NotificationState {
  count: number;
  items: NotificationItem[];
}