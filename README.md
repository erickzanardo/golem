# Golem
Golem is a static site genarator that can emulate sites with dynamic behaviour. It is meant to be used by programmer since it requires programming knowledge

## Install

```bash
npm install golem -g
```

## Command syntax

```bash
golem /PATH/TO/GENERATED_FILES
```

With this command, golem will process the files on your terminal current folder and use the path passed as argument to generate de processed files

## Golem project

A golem project is a simple folder on the filesystem, it process the files acoording to the file's parent folder, folders with '_' prefix means that golem does something with it, below there is a list of golem's behavior according to the folder name

### Unprefixed folder
Every file that is under unprefixed folders are just copied, so if we have the following structure:

```
project
  |- assets
  |    |- index.js
  |    |- style.css
  |- index.html
```

And run golem on this project folder, all the files will just be copied to the destination target

### _tasks
Tasks are the core of the 'dynamic behavior' to your site, they are javascript functions that are executed on the generation process of golem, following there is a simple task

```javascript
(function task(session, fileUtils, done) {
  fileUtils.makeFile('hello.html', '<strong>Hello World</strong>');
  done();
})
```

This is a very simple example of a task that generates an hello.html file. When declaring a task, it is not important the task name, but you __must wrap it in parenthesis__.

A task receives three arguments:

__session__: This object contains information about the other types o golem's prefixed folders, they can be json information, templates or markdowns, we will explain this better on the next sessions

__fileUtils__: This is an object to help you write files, its function makeFile always obey it's relative path, so if we have the following structure
```
project
  |- _tasks
  |    |- task1.js
  |- someFolder
  |    |- _tasks
  |         |-task2.js
  |- index.html
```

When golem is executed, assuming that task1.js and task2.js have the code from our hello example above, the following structure will be generated

```
project
  |- hello.html
  |- someFolder
  |    |- hello.html
  |- index.html
```

__done__: This is the callback that the task __must__ call when it has finished

### _entities

Entities are plain json data objects, every file on these folders are read and put in the session for tasks to use, see the following example

```
Entities files content
person1.json = {"name": "Jack"}
person2.json = {"name": "John"}

Strutucture
project
  |- _entities
  |      |- person1.json
  |- someFolder
  |    |- entities
  |         |- person2.json
  |- index.html
```

When a task is executed on this structure, you can retrive the person1.json and person2.json data using session as show below:

```javascript
  var person1 = session.getEntities('')[0];
  var person2 = session.getEntities('someFolder')[0];
```

### _templates
Templates are files that you use to merge html content with json data, golem uses doT.js, so if you have any doubt please refer to the doT.js page (https://github.com/olado/doT).

Bellow there is an example of tempaltes usagem in tasks
```javascript
// project/_templates/template1.html = <h1>Here is a sample template {{=it.foo}}</h1>
var templates = session.getTemplates('') // root;
templates.process('template1.html', {foo: 'Sir'}); // <h1>Here is another sample template Sir</h1>
```

### _mds
Those are simple markdowns files, they have a very similar usage to templates, see the following example
```javascript
// project/_mds/foo.md = I am using __markdown__.
var mds = session.getMds(''); // Root
mds.process('foo.md') // <p>I am using <strong>markdown</strong>.</p>\n
```
