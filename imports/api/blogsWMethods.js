// IF I COME BACK
import {Meteor} from 'meteor/meteor';
import {Mongo}  from 'meteor/mongo' ;
export const Blogs = new Mongo.Collection('blogs' ) ;
import {Blog} from './blog.js';

if (Meteor.isServer) {
  Meteor.publish('blogs', function blogsPublication() {
    return Blogs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
/* IF I COME BACK TO THIS */
Meteor.methods({
  'blogs.insert'(title,date,content) {
    //check(text, String);
    check(title, String);
    check(content, String);
    // Make sure the user is logged in before inserting a blog
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Blogs.insert({
      title: title,
      content: content,
      createdOn: date,
      owner:Meteor.userId(),
      username:Meteor.user().username
      //owner: this.userId,
      //username: Meteor.users.findOne(this.userId).username,
    });
  },
  'blogs.remove'(blogId) {
    check(taskId, String);

      const task = Tasks.findOne(taskId);
      if (task.private && task.owner !== this.userId) {
        // If the task is private, make sure only the owner can delete it
        throw new Meteor.Error('not-authorized');
      }
    Blogs.remove(blogId);
  },
});
