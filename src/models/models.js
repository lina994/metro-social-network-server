import sequelize from '.././db'; 
import { DataTypes } from 'sequelize';


/* Model Definitions */

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false },
  lastLogin: { type: DataTypes.DATE, allowNull: false },
  accountStatus: { type: DataTypes.STRING, defaultValue: "active", allowNull: false },  // active, warning, restricted, disabled
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  imgUrl: { type: DataTypes.STRING },
  intro: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING }
});

// foreign keys : userId(User), interlocutorId(User)
const Conversation = sequelize.define('conversation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : conversationId(Conversation), senderId(User), receiverId(User)
const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  messageText: { type: DataTypes.STRING },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
});

// foreign keys : senderId(User), receiverId(User)
const UserPost = sequelize.define('user_post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  postText: { type: DataTypes.STRING }
});

// foreign keys : userPostId(UserPost), userId(User)
const UserPostLike = sequelize.define('user_post_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : userPostId(UserPost), userId(User)
const UserPostComment = sequelize.define('user_post_comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  commentText: { type: DataTypes.STRING }
});

// foreign keys : userPostCommentId(UserPostComment), userId(User)
const UserPostCommentLike = sequelize.define('user_post_comment_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

const Group = sequelize.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.STRING }
});

// foreign keys : groupId(Group), userId(User)
const GroupMember = sequelize.define('group_member', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "MEMBER", allowNull: false }
});

// foreign keys : groupId(Group), userId(User)
const GroupPost = sequelize.define('group_post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  postText: { type: DataTypes.STRING }
});

// foreign keys : groupPostId(GroupPost), userId(User)
const GroupPostLike = sequelize.define('group_post_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});

// foreign keys : groupPostId(GroupPost), userId(User)
const GroupPostComment = sequelize.define('group_post_comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  commentText: { type: DataTypes.STRING }
});

// foreign keys : groupPostCommentId(GroupPostComment), userId(User)
const GroupPostCommentLike = sequelize.define('group_post_comment_like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }
});


/* Associations */

User.hasMany(Conversation, { foreignKey: 'userId' });
Conversation.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(Conversation, { foreignKey: 'interlocutorId' });
Conversation.belongsTo(User, { as: 'interlocutor', foreignKey: 'interlocutorId' });

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

User.belongsToMany(User, { through: 'Friends', as: 'user', foreignKey: 'userId' } );
User.belongsToMany(User, { through: 'Friends',  as: 'friend', foreignKey: 'friendId' });

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


