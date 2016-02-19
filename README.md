PiVas - JavaScript framework
=====

JavaScript framework for scalable web applications.

## Installing
``` bash
bower install pivas
```

Insert into head of html document.
``` html
<script type="text/javascript" src="/lib/PV.js"></script>
```

## Configure
``` javascript
PV.init({
  version : '1.0.2',
  languages : ['en'],
  preload : [
    '/lib/PV.Cookie.js',
    '/lib/PV.Dom.js',
    '/lib/PV.Animate.js',
    '/lib/PV.WebSocket.js',
    '/lib/PV.Language.js',
    '/lib/PV.Dom.Slider.js',
    '/lib/PV.Dom.Switch.js',
    '/lib/PV.Dom.Grid.js'
  ],
  descriptors : '/app/descriptors',
  locales : '/app/locales',
  modules : '/app/modules',
  templates : '/app/templates',
  views : '/app/views'
});
```

## Usage
``` javascript
PV.ready(function(){
  PV.Language.identify();
  PV.factoryModule('Example1');
});
```

## Difinition of module
The module may include the following entities:

### Descriptor
``` javascript
PV.declare('Example1', 'Descriptor', {
  module : 'Example1',
  locale : 'Example1',
  view : 'Example1',
  'import' : ['Example2message'],
  'export' : ['Example1message'],
  config : {
    example : 'Example1'
  }
});
```

### Module
``` javascript
PV.declare('Example1', 'Module', function(config){
  var self = this;

  this.view.events.on('send', function(text){
    self.emit('Example2message', text);
  });

  this.Example1message = function(text){
    self.view.events.trigger('message', text);
  };

  this.init = function(){
    
  };

  this.destroy = function(){
    
  };
});
```

### View
``` javascript
PV.declare('Example1', 'View', function(config){

  var self = this;
  var css = PV.Dom.css('app/templates/example1/style.css');
  var wrapper = document.getElementById('view1');

  var block = PV.Dom.block({
    container : {
      tag : 'div',
      attributes : {
        'class' : 'example1'
      }
    },
    title : {
      tag : 'h2',
      properties : {
        innerHTML : self.getText('title')
      },
      parent : 'container'
    },
    messages : {
      tag : 'ul',
      parent : 'container'
    },
    text : {
      tag : 'textarea',
      parent : 'container'
    },
    send : {
      tag : 'input',
      attributes : {
        type : 'button'
      },
      properties : {
        value : self.getText('send'),
        onclick: function(){
          self.events.trigger('send', block.text.value, self);
          block.text.value = '';
        }
      },
      parent : 'container'
    }
  });

  var onRender = function(){
    block.renderTo(wrapper);
  };

  this.events.on('message', function(text){
    block.messages.appendChild(PV.Dom.element('li', {}, {
      innerHTML : text
    }));
  });

  css.render(onRender, this);

  this.destroy = function(){
    onRender = null;
    css.remove();
    block.remove();
  };

});
```

### Locale
``` javascript
PV.declare('Example1', 'Locale', {
  en : {
    title : 'Example 1',
    send : 'Send message'
  }
});
```

### Template
- css files
- images
- /etc

