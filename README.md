# viewcontroller.js
Small ViewController in Jquery/js


Setup a structure as following
```
<div data-role="ViewController" data-name="FirstViewController" class="viewControllerClass">
<div class="navbarClass" data-role="NavigationBar">
</div>
<div class="navbuttons" data-role="NavigationButtons">

</div>
<div class="viewContainer">
    <div data-role="View" data-name="firstView" class="viewClass" style="background-color: greenyellow;">
            <h1 data-role="ViewTitle">This is the first view</h1>
            <button onclick="ShowChildView('secondView', 'FirstViewController');">Child</button>
    </div>
    <div data-role="View" data-name="secondView" data-parent="firstView" class="viewClass" style="background-color: firebrick;">
        <h2 data-role="ViewTitle">this is the second view</h2>
        <button onclick="ShowChildView('thirdView','FirstViewController');">Second Child</button>
    </div>
    <div data-role="View" data-name="thirdView" class="viewClass" data-parent="secondView" style="background-color: dodgerblue;">
            <h1 data-role="ViewTitle">This is the third view without a child</h1>
    </div>
      <div data-role="View" data-name="New Main" class="viewClass">
      <h1 data-role="ViewTitle">Without children</h1>
      </div>
    </div>
</div>
```

and then call
```
InitViewControllers();
```

A back button is added automatically for subchild navigation. To change the child view use 
```
function ShowChildView(viewName, viewController) {...}
```

where viewName is the name to change to and viewController represents the corresponding viewController.

To show a root view use 
```
function ShowRootView(viewName, viewController){...}
```
