import {Template} from 'meteor/templating';
import {Blogs} from './blogs.js';
import '../ui/blog.html';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';

//Template.addBlog.onCreated(function addBlogOnCreated() {
//  this.state = new ReactiveDict();
//  Meteor.subscribe('blogs');
//});

Template.addBlog.events({
    'submit form'(event){
    //'submit .new-blog'(event){
    event.preventDefault();
    //var blogName = $('[name=blogName]').val();
    const target = event.target;
    //security w methods
    let title = target.title.value;
    let content = target.content.value;
    let date = new Date();
    d = date.toDateString()
/*
    Blogs.insert({
      title: title,
      content: content,
      createdOn:date,
      created: d,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      superuser: 'dpark',
    });
    */
    // if I try again //Increasing security with Methods
    Meteor.call('blogs.insert', title,date,content);

    target.title.value = '';
    target.content.value = '';
    Router.go('blog');
  }
});

//Scripts for  'blog'
Template.blog.helpers({
  blog(){
    return Blogs.find({}, {sort: {createdOn: -1}});
  },
    blogCount(){
      return Blogs.find({}).count();
    },
  isOwner() {
    return this.owner === Meteor.userId();
  }
});


Template.blog.events({
  'click #newEntry'(){
    Router.go('addBlog');
  },
  'click #deleteAll'(){
    //superuser is 'dpark'
    if (Meteor.user().username==='dpark') {
      let blogs = Blogs.find({});
      blogs.forEach(function(blog) {
        Blogs.remove(blog._id);
      });
    }
  },
  'click #delete'() {
    //Blogs.remove(this._id);
    Meteor.call('blogs.remove', this._id)
  },

});
