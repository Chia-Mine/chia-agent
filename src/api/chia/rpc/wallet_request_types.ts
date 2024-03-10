import {uint32} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {Notification} from "../wallet/notification_store";

export type GetNotifications = {
  ids?: bytes32[];
  start?: uint32;
  end?: uint32;
};

export type GetNotificationsResponse = {
  notifications: Notification[];
};