import sequelize from '.././db'; 
import { DataTypes } from 'sequelize';


/* Model Definitions */

export const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  lastLogin: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  accountStatus: { type: DataTypes.STRING, defaultValue: "active", allowNull: false },  // active, warning, restricted, disabled
  firstName: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  lastName: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  imgUrl: { type: DataTypes.STRING },
  intro: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  country: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  city: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
  gender: { type: DataTypes.STRING, defaultValue: "Not specified", allowNull: false }
});

// foreign keys : userId(User), friendId(User)
export const UsersFriend = sequelize.define('users_friend', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : userId(User), interlocutorId(User)
export const Conversation = sequelize.define('conversation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : conversationId(Conversation), senderId(User), receiverId(User)
export const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  messageText: { type: DataTypes.STRING },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
});

// foreign keys : senderId(User), receiverId(User)
export const UserPost = sequelize.define('user_post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  postText: { type: DataTypes.STRING }
});

// foreign keys : userPostId(UserPost), userId(User)
export const UserPostLike = sequelize.define('user_post_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : userPostId(UserPost), userId(User)
export const UserPostComment = sequelize.define('user_post_comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  commentText: { type: DataTypes.STRING }
});

// foreign keys : userPostCommentId(UserPostComment), userId(User)
export const UserPostCommentLike = sequelize.define('user_post_comment_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

export const Group = sequelize.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.STRING }
});

// foreign keys : groupId(Group), userId(User)
export const GroupMember = sequelize.define('group_member', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "MEMBER", allowNull: false }
});

// foreign keys : groupId(Group), userId(User)
export const GroupPost = sequelize.define('group_post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  postText: { type: DataTypes.STRING }
});

// foreign keys : groupPostId(GroupPost), userId(User)
export const GroupPostLike = sequelize.define('group_post_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : groupPostId(GroupPost), userId(User)
export const GroupPostComment = sequelize.define('group_post_comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  commentText: { type: DataTypes.STRING }
});

// foreign keys : groupPostCommentId(GroupPostComment), userId(User)
export const GroupPostCommentLike = sequelize.define('group_post_comment_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});


/* Associations */

User.belongsToMany(User, { through: UsersFriend, as: 'friends', foreignKey: 'userId' } );
User.belongsToMany(User, { through: UsersFriend,  as: 'users', foreignKey: 'friendId' });

User.hasMany(Conversation, { as: 'conversationUser', foreignKey: 'userId' });
Conversation.belongsTo(User, { as: 'conversationUser', foreignKey: 'userId' });
User.hasMany(Conversation, { as: 'conversationInterlocutor', foreignKey: 'interlocutorId' });
Conversation.belongsTo(User, { as: 'conversationInterlocutor', foreignKey: 'interlocutorId' });

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

User.hasMany(UserPost, { foreignKey: 'senderId' });
UserPost.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(UserPost, { foreignKey: 'receiverId' });
UserPost.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

UserPost.hasMany(UserPostLike);
UserPostLike.belongsTo(UserPost);

User.hasMany(UserPostLike);
UserPostLike.belongsTo(User);

UserPost.hasMany(UserPostComment);
UserPostComment.belongsTo(UserPost);

User.hasMany(UserPostComment);
UserPostComment.belongsTo(User);

UserPostComment.hasMany(UserPostCommentLike);
UserPostCommentLike.belongsTo(UserPostComment);

User.hasMany(UserPostCommentLike);
UserPostCommentLike.belongsTo(User);

User.belongsToMany(Group, { through: GroupMember } );
Group.belongsToMany(User, { through: GroupMember } );

Group.hasMany(GroupPost);
GroupPost.belongsTo(Group);

User.hasMany(GroupPost);
GroupPost.belongsTo(User);

GroupPost.hasMany(GroupPostLike);
GroupPostLike.belongsTo(GroupPost);

User.hasMany(GroupPostLike);
GroupPostLike.belongsTo(User);

GroupPost.hasMany(GroupPostComment);
GroupPostComment.belongsTo(GroupPost);

User.hasMany(GroupPostComment);
GroupPostComment.belongsTo(User);

GroupPostComment.hasMany(GroupPostCommentLike);
GroupPostCommentLike.belongsTo(GroupPostComment);

User.hasMany(GroupPostCommentLike);
GroupPostCommentLike.belongsTo(User);


export default {
  User, Conversation, Message, 
  UserPost, UserPostLike, UserPostComment, UserPostCommentLike, 
  Group, GroupMember, GroupPost, GroupPostLike, GroupPostComment, GroupPostCommentLike
};


