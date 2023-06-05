import {
  NotificationPayloadType,
  NotificationRequestPayload,
} from '@libs/constants/entities/Notification';
import {
  Message,
  TokenMessage,
} from 'firebase-admin/lib/messaging/messaging-api';
import { getMessaging } from 'firebase-admin/messaging';
import { NotificationQueueJob, QueueName } from '@libs/constants/queue';
import { LearningRequest } from '@libs/entities/entities/LearningRequest';
import { Notification } from '@libs/entities/entities/Notification';
import { User } from '@libs/entities/entities/User';
import { RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { StatusLearningRequest } from '@libs/constants/entities/LearningRequest';
import { TeachingRequest } from '@libs/entities/entities/TeachingRequest';
import { StatusTeachingRequest } from '@libs/constants/entities/TeachingRequest';

@Processor(QueueName.Notification)
export class NotificationConsumer {
  constructor(private readonly em: EntityManager) {}

  async getFirebaseMessageNotification(
    token: string,
    notification: Notification,
    em?: EntityManager
  ): Promise<TokenMessage> {
    const entityManager = em ?? this.em.fork();
    const learningRequestRepository =
      entityManager.getRepository(LearningRequest);
    const teachingRequestRepository =
      entityManager.getRepository(TeachingRequest);
    let message: Message = {
      token,
    };
    if (notification.payload.type === NotificationPayloadType.LearningRequest) {
      const payload = notification.payload as NotificationRequestPayload;
      const request = await learningRequestRepository.findOneOrFail(
        { id: payload.data.request_id },
        {
          populate: [
            'course.administrator',
            'course.cover',
            'requester.avatar',
          ],
        }
      );
      switch (request.status) {
        case StatusLearningRequest.Pending: {
          message = {
            ...message,
            notification: {
              title: 'Yêu cầu tham gia khóa học',
              body: `${request.requester.name} đã yêu cầu tham gia khóa học ${request.course.name}`,
              imageUrl: request.course.cover.path,
            },
            webpush: {
              fcmOptions: {
                link: `${process.env.NEXT_PUBLIC_BASE_URL}/learning-requests/${request.id}`,
              },
            },
          };
          break;
        }
        case StatusLearningRequest.Approve: {
          message = {
            ...message,
            notification: {
              title: 'Yêu cầu tham gia khóa học',
              body: `Yêu cầu tham gia khóa học ${request.course.name} đã được chấp thuận`,
              imageUrl: request.course.cover.path,
            },
            webpush: {
              fcmOptions: {
                link: `${process.env.NEXT_PUBLIC_BASE_URL}/learning-requests/${request.id}`,
              },
            },
          };
          break;
        }
        case StatusLearningRequest.Reject: {
          message = {
            ...message,
            notification: {
              title: 'Yêu cầu tham gia khóa học',
              body: `Yêu cầu tham gia khóa học ${request.course.name} đã bị từ chối`,
              imageUrl: request.course.cover.path,
            },
            webpush: {
              fcmOptions: {
                link: `${process.env.NEXT_PUBLIC_BASE_URL}/learning-requests/${request.id}`,
              },
            },
          };
          break;
        }
        default: {
          return;
        }
      }
    }
    if (notification.payload.type === NotificationPayloadType.TeachingRequest) {
      const payload = notification.payload as NotificationRequestPayload;
      const request = await teachingRequestRepository.findOneOrFail(
        { id: payload.data.request_id },
        {
          populate: [
            'course.administrator',
            'course.cover',
            'requester.avatar',
          ],
        }
      );
      switch (request.status) {
        case StatusTeachingRequest.Pending: {
          message = {
            ...message,
            notification: {
              title: 'Yêu cầu mở khóa học',
              body: `${request.requester.name} đã yêu cầu mở khóa học ${request.course.name}`,
              imageUrl: request.course.cover.path,
            },
            webpush: {
              fcmOptions: {
                link: `${process.env.NEXT_PUBLIC_BASE_URL}/manage/teaching-requests/${request.id}`,
              },
            },
          };
          break;
        }
        case StatusTeachingRequest.Approve: {
          message = {
            ...message,
            notification: {
              title: 'Yêu cầu mở khóa học',
              body: `Yêu cầu mở khóa học ${request.course.name} đã được chấp thuận`,
              imageUrl: request.course.cover.path,
            },
            webpush: {
              fcmOptions: {
                link: `${process.env.NEXT_PUBLIC_BASE_URL}/manage/teaching-requests/${request.id}`,
              },
            },
          };
          break;
        }
        case StatusTeachingRequest.Reject: {
          message = {
            ...message,
            notification: {
              title: 'Yêu cầu mở khóa học',
              body: `Yêu cầu mở khóa học ${request.course.name} đã bị từ chối`,
              imageUrl: request.course.cover.path,
            },
            webpush: {
              fcmOptions: {
                link: `${process.env.NEXT_PUBLIC_BASE_URL}/manage/teaching-requests/${request.id}`,
              },
            },
          };
          break;
        }
        default: {
          return;
        }
      }
    }
    return message;
  }

  @Process({ name: NotificationQueueJob.Send })
  async sendNotification(job: Job<RequiredEntityData<Notification>>) {
    const em = this.em.fork();
    try {
      const payload = job.data;
      const notification = await this.em.findOneOrFail(Notification, {
        id: payload.id,
      });
      const reciver = await this.em.findOneOrFail(
        User,
        { id: notification.payload.to },
        {
          populate: ['notification_subscriptions'],
        }
      );
      const subscriptions = reciver.notification_subscriptions.getItems();
      if (!subscriptions.length) {
        await job.moveToCompleted();
        return;
      }
      const fcmMessage = await this.getFirebaseMessageNotification(
        '',
        notification,
        this.em
      );
      notification.fcm_message = fcmMessage;
      const messages: Message[] = [];
      const message = fcmMessage;
      for (const subscription of subscriptions) {
        messages.push({
          ...message,
          token: subscription.token,
        });
      }
      const messaging = getMessaging();
      const responses = (await messaging.sendEach(messages)).responses;
      for (const [key, response] of Object.entries(responses)) {
        if (
          response.error &&
          ['messaging/invalid-argument', 'messaging/unregistered'].includes(
            response.error.code
          )
        ) {
          em.remove(subscriptions[key]);
        }
      }
      await em.persistAndFlush(notification);
      await em.flush();
      await job.moveToCompleted();
    } catch (error) {
      console.log(error);
      await job.moveToFailed(error.message);
    }
  }
}
