import '../imports/ui/bio.html';
import '../imports/ui/blog.html';
import '../imports/ui/header.html';
import '../imports/ui/skills.html';
import '../imports/ui/home.html';
import '../imports/ui/footer.html';
import './main.html';
/*import {Blogs} from '../imports/api/blogs.js';

Router.route('/blog/:_id', {
  name: 'blogItem',
  template: 'blog',
  data: function(){
    var currentBlog = this.params._id;
    return Blogs.findOne({_id:currrentBlog});
  }
})
*/

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'

});
Router.route('/bio', {
  name: 'bio',
  template: 'bio'

});

Router.route('/blog', {
  name: 'blog',
  template: 'blog'
});

Router.route('/skills', {
  name: 'skills',
  template: 'skills'
});
Router.route('/addBlog',{
  name: 'addBlog',
  template:'addBlog'
});
