// IF I COME BACK import {Meteor} from 'meteor/meteor';
import {Mongo}  from 'meteor/mongo' ;
export const Blogs = new Mongo.Collection('blogs' ) ;


Meteor.methods({
  'blogs.insert'(title, date, content) {
    check(title, String);
    check(content, String);

    // Make sure the user is logged in before inserting a blog
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    //alert(title+":"+content);
    Blogs.insert({
      //PROBLEM HERE: TARGET IS NOT DEFINED. NEED TO SOMEHOW DEFINE FROM BLOG.JS
      title: title,
      content: content,
      createdOn: date,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  'blogs.remove'(blogId) {
    //check(blogId, String);
    
    Blogs.remove(blogId);
  }
});
