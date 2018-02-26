var jsonEditor = (function(){
  
  var JE = {};
  
  JE.init = function(){

    this.pre = document.querySelector("code.json");
    this.titleInput = document.querySelector(".title");
    this.contentInput = document.querySelector(".content");
    this.title = this.title || "Hello World";
    this.content = this.content || "<p>This is your first post, start writing in the editor to change it</p>";
    this.date = this.getDate();
    this.titleInput.value = this.title;
    this.contentInput.value = this.content;

    this.tinymce = this.runTinymce();
    this.binding();
    this.showJson();
    
 };

  JE.binding = function(){
    this.titleInput.addEventListener("keyup", this.titleChange);
    
  };
  
  // handler for title keyup
  JE.titleChange = function(){
     var that = JE;
     that.title = this.value;
     that.showJson();
     
  };
  
  // format a date like April 20, 2014 
  JE.getDate = function(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    return months[month] + " " + day + ", " + year;
  };
  
  // passing content from tinymce event
  JE.contentChange = function(content){
     this.content = content;
     this.showJson();
  };
  
  // updates json
  JE.showJson = function(){
    this.pre.innerHTML = this.makeJson();
  };
  
  
  JE.makeJson = function(){
    // replace brackets with entities
    this.content = this.content.replace(/<|>/g, function(chr){
        return chr == "<" ? "&lt;" : "&gt;";
    });
     // replace newline char with nothing
    this.content = this.content.replace(/\n/g, "");
    var json = JSON.stringify(this.makePost.call(this), null, " ");
     
    return json;
  
  };
  // make a post object
  JE.makePost = function(){
    var title = this.title;
    var content = this.content;
    var date = this.date;
    return {
      post: 
      {
        date: date,
        title: title,
        content: content
      }
    };
  };

  // run tinymce.
  JE.runTinymce = function(){
    var that = this;
    tinymce.init({
      selector: ".content",
      plugins: "code, link, fullscreen, preview",
      setup: function(ed){
        ed.on("keyup", function(){
          that.contentChange(this.getContent());
        });
      }
    });
    
    return tinymce;
  };

  return JE;
})();

jsonEditor.init();
