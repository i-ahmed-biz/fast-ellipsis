# Fast Ellipsis

Fast-Ellipsis is a AngularJS library, it can be used to truncate the text displayed in the JavaScript container. It have the following feature:

  - Truncate the text.
  - Add symbol or text as the end to mark text truncated.
  - HTML/ normal text supported as main and symbol text.
### New Feature V0.1.3
  - Update version only in bower.json. 
  
### New Feature V0.1.2
  - Added demo example.
  
### New Feature V0.1.1
  - Added readme file.

### Installation



Install the library.

```sh
$ cd project_path
$ npm install fast-ellipsis
```
OR
```sh
$ cd project_path
$ bower install fast-ellipsis
```
### Source code modification
Add the library to main module.
```
angular.module('demoApp', ['thls.fast-ellipsis'])
```
Update the the HTML file:
```
<p fast-ellipsis ellipsis-text="HTML/normal text"></p>
<p fast-ellipsis ellipsis-text="HTML/normal text" ellipsis-truncate-text = "HTML/Text truncate texts."></p>
```

License
----

MIT



