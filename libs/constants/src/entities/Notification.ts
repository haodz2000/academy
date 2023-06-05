export enum NotificationStatus {
  Pending = 0,
  Sent = 1,
}
export enum NotificationRead {
  UnRead = 0,
  Read = 1,
}
export enum NotificationType {
  Personal = 1,
}

export enum NotificationPayloadType {
  LearningRequest = 'learning-requests',
  TeachingRequest = 'teching-requests',
}
export interface NotificationPayload {
  data: unknown;
  type: NotificationPayloadType;
  to: number;
}
export enum AwardDecisionNotificationType {
  Created = 'created',
  StatusChanged = 'status_changed',
}

export interface NotificationRequestPayload extends NotificationPayload {
  data: {
    request_id: string;
  };
}
