import { Category } from './Category';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { BaseEntityWithSerialPrimaryKey } from './BaseEntityWithSerialPrimaryKey';
import { Maybe, Scalar } from '@libs/constants/interfaces/scalar';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import { Role } from './Role';
import { Topic } from './Topic';
import { Course } from './Course';
import { Section } from './Section';
import { Lesson } from './Lesson';
import { CourseTopic } from './CourseTopic';
import { CategoryTopic } from './CategoryTopic';
import { Assignment } from './Assignment';
import { Discuss } from './Discuss';
import { TeachingRequest } from './TeachingRequest';
import { LearningRequest } from './LearningRequest';
import { CourseTeacher } from './CourseTeacher';
import { CourseStudent } from './CourseStudent';
import { NotificationSubscription } from './NotificationSubscription';
import { Notification } from './Notification';
import { Wallet } from './Wallet';
import { Transaction } from './Transaction';
import { WithdrawRequest } from './WithdrawRequest';
import { RatingCourse } from './RatingCourse';
import { WalletBalance } from './WalletBalance';

@Entity({ tableName: 'users' })
export class User extends BaseEntityWithSerialPrimaryKey<User, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'name',
      'email',
      'google_id',
      'role_id',
      'avatar_id',
      'phone',
      'facebook',
      'github',
      'twitter',
      'job',
      'description',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255 })
  email!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255, nullable: true })
  google_id!: Maybe<'varchar'>;

  @Property({ type: 'integer' })
  role_id!: Scalar['integer'];

  @Property({ type: 'uuid', nullable: true })
  avatar_id: Maybe<'uuid'>;

  @Property({ type: 'varchar', length: 15, nullable: true })
  phone!: Maybe<'varchar'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  facebook!: Maybe<'varchar'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  github!: Maybe<'varchar'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  twitter!: Maybe<'varchar'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  job!: Maybe<'varchar'>;

  @Property({ type: 'varchar', length: 255, nullable: true })
  description!: Maybe<'varchar'>;

  @ManyToOne({
    entity: () => Role,
    nullable: true,
    inversedBy: (role) => role.users,
    joinColumn: 'role_id',
  })
  role!: Role;

  @ManyToOne({
    entity: () => StoredFile,
    nullable: true,
    inversedBy: (storedFile) => storedFile.user_avatar,
    joinColumn: 'avatar_id',
  })
  avatar!: StoredFile;

  @OneToMany({
    entity: () => StoredFile,
    mappedBy: (storedFile) => storedFile.creator,
  })
  created_stored_files = new Collection<StoredFile>(this);

  @OneToMany({
    entity: () => StoredFile,
    mappedBy: (storedFile) => storedFile.updater,
  })
  updated_stored_files = new Collection<StoredFile>(this);

  @OneToMany({
    entity: () => Role,
    mappedBy: (role) => role.creator,
  })
  created_roles = new Collection<Role>(this);

  @OneToMany({
    entity: () => Role,
    mappedBy: (role) => role.updater,
  })
  updated_roles = new Collection<Role>(this);

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (User) => User.created_users,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (User) => User.updated_users,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @OneToMany({
    entity: () => User,
    mappedBy: (User) => User.creator,
  })
  created_users = new Collection<User>(this);

  @OneToMany({
    entity: () => User,
    mappedBy: (User) => User.updater,
  })
  updated_users = new Collection<User>(this);

  @OneToMany({
    entity: () => Category,
    mappedBy: (category) => category.creator,
  })
  created_categories = new Collection<Category>(this);

  @OneToMany({
    entity: () => Category,
    mappedBy: (category) => category.updater,
  })
  updated_categories = new Collection<Category>(this);

  @OneToMany({
    entity: () => Topic,
    mappedBy: (topic) => topic.creator,
  })
  created_topics = new Collection<Topic>(this);

  @OneToMany({
    entity: () => Topic,
    mappedBy: (topic) => topic.updater,
  })
  updated_topics = new Collection<Topic>(this);

  @OneToMany({
    entity: () => CategoryTopic,
    mappedBy: (category) => category.creator,
  })
  created_category_topics = new Collection<CategoryTopic>(this);

  @OneToMany({
    entity: () => CategoryTopic,
    mappedBy: (category) => category.updater,
  })
  updated_category_topics = new Collection<CategoryTopic>(this);

  @OneToMany({
    entity: () => Course,
    mappedBy: (course) => course.administrator,
  })
  administrator_courses = new Collection<Course>(this);

  @OneToMany({
    entity: () => Course,
    mappedBy: (course) => course.creator,
  })
  created_courses = new Collection<Course>(this);

  @OneToMany({
    entity: () => Course,
    mappedBy: (course) => course.updater,
  })
  updated_courses = new Collection<Course>(this);

  @OneToMany({
    entity: () => Section,
    mappedBy: (section) => section.creator,
  })
  created_sections = new Collection<Section>(this);

  @OneToMany({
    entity: () => Section,
    mappedBy: (section) => section.updater,
  })
  updated_sections = new Collection<Section>(this);

  @OneToMany({
    entity: () => Lesson,
    mappedBy: (lesson) => lesson.creator,
  })
  created_lessons = new Collection<Lesson>(this);

  @OneToMany({
    entity: () => Lesson,
    mappedBy: (lesson) => lesson.updater,
  })
  updated_lessons = new Collection<Lesson>(this);

  @OneToMany({
    entity: () => CourseTopic,
    mappedBy: (courseTopic) => courseTopic.creator,
  })
  created_course_topics = new Collection<CourseTopic>(this);

  @OneToMany({
    entity: () => CourseTopic,
    mappedBy: (courseTopic) => courseTopic.updater,
  })
  updated_course_topics = new Collection<CourseTopic>(this);

  @OneToMany({
    entity: () => TeachingRequest,
    mappedBy: (data) => data.requester,
  })
  teaching_requests = new Collection<TeachingRequest>(this);

  @OneToMany({
    entity: () => TeachingRequest,
    mappedBy: (data) => data.creator,
  })
  created_teaching_requests = new Collection<TeachingRequest>(this);

  @OneToMany({
    entity: () => TeachingRequest,
    mappedBy: (data) => data.updater,
  })
  updated_teaching_requests = new Collection<TeachingRequest>(this);

  @OneToMany({
    entity: () => Assignment,
    mappedBy: (assignment) => assignment.creator,
  })
  created_assignments = new Collection<Assignment>(this);

  @OneToMany({
    entity: () => Assignment,
    mappedBy: (assignment) => assignment.updater,
  })
  updated_assignments = new Collection<Assignment>(this);

  @OneToMany({
    entity: () => Discuss,
    mappedBy: (discuss) => discuss.creator,
  })
  created_discusses = new Collection<Discuss>(this);

  @OneToMany({
    entity: () => Discuss,
    mappedBy: (discuss) => discuss.updater,
  })
  updated_discusses = new Collection<Discuss>(this);

  @OneToMany({
    entity: () => LearningRequest,
    mappedBy: (data) => data.requester,
  })
  learning_requests = new Collection<LearningRequest>(this);

  @OneToMany({
    entity: () => LearningRequest,
    mappedBy: (data) => data.creator,
  })
  created_learning_requests = new Collection<LearningRequest>(this);

  @OneToMany({
    entity: () => LearningRequest,
    mappedBy: (data) => data.updater,
  })
  updated_learning_requests = new Collection<LearningRequest>(this);

  @OneToMany({
    entity: () => CourseTeacher,
    mappedBy: (data) => data.teacher,
  })
  course_teachers = new Collection<CourseTeacher>(this);

  @ManyToMany({
    entity: () => Course,
    inversedBy: 'teachers',
    pivotEntity: () => CourseTeacher,
  })
  course_manages = new Collection<Course>(this);

  @OneToMany({
    entity: () => CourseTeacher,
    mappedBy: (data) => data.creator,
  })
  created_course_teachers = new Collection<CourseTeacher>(this);

  @OneToMany({
    entity: () => CourseTeacher,
    mappedBy: (data) => data.updater,
  })
  updated_course_teachers = new Collection<CourseTeacher>(this);

  @OneToMany({
    entity: () => CourseStudent,
    mappedBy: (data) => data.student,
  })
  course_students = new Collection<CourseStudent>(this);

  @ManyToMany({
    entity: () => Course,
    inversedBy: 'students',
    pivotEntity: () => CourseStudent,
  })
  course_learnings = new Collection<Course>(this);

  @OneToMany({
    entity: () => CourseStudent,
    mappedBy: (data) => data.creator,
  })
  created_course_students = new Collection<CourseStudent>(this);

  @OneToMany({
    entity: () => CourseStudent,
    mappedBy: (data) => data.updater,
  })
  updated_course_students = new Collection<CourseStudent>(this);

  @OneToMany({
    entity: () => NotificationSubscription,
    mappedBy: (notificationSubscription) => notificationSubscription.user,
  })
  notification_subscriptions = new Collection<NotificationSubscription>(this);

  @OneToMany({
    entity: () => Notification,
    mappedBy: (notification) => notification.user,
  })
  notifications = new Collection<Notification>(this);

  @OneToOne({
    entity: () => Wallet,
    mappedBy: (wallet) => wallet.user,
  })
  wallet: Wallet;

  @OneToMany({
    entity: () => Transaction,
    mappedBy: (data) => data.creator,
  })
  created_transactions = new Collection<Transaction>(this);

  @OneToMany({
    entity: () => Transaction,
    mappedBy: (data) => data.updater,
  })
  updated_transactions = new Collection<Transaction>(this);

  @OneToMany({
    entity: () => WithdrawRequest,
    mappedBy: (data) => data.creator,
  })
  created_withdraw_requests = new Collection<WithdrawRequest>(this);

  @OneToMany({
    entity: () => WithdrawRequest,
    mappedBy: (data) => data.updater,
  })
  updated_withdraw_requests = new Collection<WithdrawRequest>(this);

  @OneToMany({
    entity: () => WithdrawRequest,
    mappedBy: (data) => data.acceptor,
  })
  accepted_withdraw_requests = new Collection<WithdrawRequest>(this);

  @OneToMany({
    entity: () => WithdrawRequest,
    mappedBy: (data) => data.requester,
  })
  requested_withdraw_requests = new Collection<WithdrawRequest>(this);

  @OneToMany({
    entity: () => RatingCourse,
    mappedBy: (ratingCourse) => ratingCourse.user,
  })
  rating_courses = new Collection<RatingCourse>(this);

  @OneToMany({
    entity: () => WalletBalance,
    mappedBy: (walletBalance) => walletBalance.creator,
  })
  created_wallet_balance = new Collection<WalletBalance>(this);

  @OneToMany({
    entity: () => WalletBalance,
    mappedBy: (walletBalance) => walletBalance.updater,
  })
  updated_wallet_balance = new Collection<WalletBalance>(this);
}
