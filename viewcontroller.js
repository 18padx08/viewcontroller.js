function template(strings, ...keys) {
    return (function(...values)
    {
      var dict = values[values.length - 1] || {};
      var result = [strings[0]];
      keys.forEach(function(key, i) {
        var value = Number.isInteger(key) ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    });
}
var button = template`<button class="goback" onclick="GoBack('${0}');">${1}</button>`;
function InitViewControllers() {
    // get all viewcontroller classes
    var vcs = $('[data-role="ViewController"]');
    for (let vc of vcs) {
      // gather all views
      $(vc).data('history', []);
      $(vc).data('currentView', '');
      var views = $(vc).find('[data-role="View"]');
      var first = true;
      var navbar = $(vc).find('[data-role="NavigationBar"]')[0];
      $(navbar).empty();
      for (let view of views) {
        if (first) {
          $(view).show();
          var name = $(view).data('name');
          $(vc).data('currentView', name);
          var cv = $(vc).data('currentView');

        } else {
          $(view).hide();
        }
        var parent = $(view).data('parent');
        var isChild = $(view).data('parent') != '' &&
            typeof ($(view).data('parent')) != 'undefined';
        if (!isChild) {
          if (first) {
            $(navbar).append(
                $('<div class=\'link selected\' data-target="' +
                  $(view).data('name') + '"><span>' +
                  $(view).children('[data-role="ViewTitle"]').text() +
                  '</span></div>')
                    .click(handleClickEvent));
          } else {
            $(navbar).append(
                $('<div class=\'link\' data-target="' + $(view).data('name') +
                  '"><span>' +
                  $(view).children('[data-role="ViewTitle"]').text() +
                  '</span></div>')
                    .click(handleClickEvent));
          }
          first = false;
        }
      }
    }
}

function handleClickEvent(event) {
    var viewName = $(this).data('target');
    $(this).addClass('selected');
    ShowView(viewName, $(this));
}
function ShowView(viewName, callee) {
    var vc = $(callee).closest('[data-role=\'ViewController\']');
    var currentView = $(vc).data('currentView');
    if (currentView == viewName) return;
    $('.link[data-target="' + currentView + '"').removeClass('selected');
    $(vc)
        .find('[data-name="' + currentView + '"]')
        .addClass('view-transitions-zoom-out')
        .one('animationend', function(e) {
          $(vc)
              .find('[data-name="' + currentView + '"]')
              .removeClass('view-transitions-zoom-out');
          $(vc).find('[data-name="' + currentView + '"]').hide();
        })

    $(vc).data('currentView', viewName);
    var view = $(vc).find('[data-name="' + viewName + '"]')[0];
    $(view).show();
    $(view)
        .addClass('view-transitions-zoom-in')
        .one('animationend', function(e) {
          $(view).removeClass('view-transitions-zoom-in');
        });
    var history = [];
    $(vc).data('history', history);
}

function ShowRootView(viewName, viewController){
    var vc = $("[data-name=\"" + viewController+"\"]");
    var currentView = $(vc).data('currentView');
    if (currentView == viewName) return;
    $('.link[data-target="' + currentView + '"').removeClass('selected');
    $(vc)
        .find('[data-name="' + currentView + '"]')
        .addClass('view-transitions-zoom-out')
        .one('animationend', function(e) {
          $(vc)
              .find('[data-name="' + currentView + '"]')
              .removeClass('view-transitions-zoom-out');
          $(vc).find('[data-name="' + currentView + '"]').hide();
        })

    $(vc).data('currentView', viewName);
    var view = $(vc).find('[data-name="' + viewName + '"]')[0];
    $(view).show();
    $(view)
        .addClass('view-transitions-zoom-in')
        .one('animationend', function(e) {
          $(view).removeClass('view-transitions-zoom-in');
        });
    var history = [];
    $(vc).data('history', history);
}

function AddBackButton($viewController){
    var buttonbar = $($viewController).children('[data-role="NavigationButtons"]');
    if ($(buttonbar).children().length > 0) {
        $(buttonbar).empty();
    }
      $(buttonbar).append(button($($viewController).data("name"), $($viewController).data("history").join("/")));
    
}
function ShowChildView(viewName, viewController){
    var vc = $('[data-name="' + viewController + '"]');
    var currentView = $(vc).data('currentView');
    
    $(vc)
        .find('[data-name="' + currentView + '"]')
        .addClass('view-transitions-slide-out-forward')
        .one('animationend', function(e) {
          $(vc)
              .find('[data-name="' + currentView + '"]')
              .removeClass('view-transitions-slide-out-forward');
          $(vc).find('[data-name="' + currentView + '"]').hide();
        });
    $(vc).data('currentView', viewName);
    var view = $(vc).find('[data-name="' + viewName + '"]')[0];
    $(view).show();
    $(view).addClass('view-transitions-slide-in-forward')
    $(view).one('animationend', function(e) {
      $(view).removeClass('view-transitions-slide-in-forward');
    });
    var history = $(vc).data('history');
    history.push(currentView);
    $(vc).data('history', history);
    AddBackButton(vc);
}

function GoBack(viewcontroller){
    var vc = $('[data-name="' + viewcontroller + '"]');
    var history = $(vc).data('history');
    var ele = history.pop();
    $(vc).data(history);
    var currentView = $(vc).data('currentView');
    $(vc)
        .find('[data-name="' + currentView + '"]')
        .addClass('view-transitions-slide-in-forward-reverse')
        .one('animationend', function(e) {
          $(vc)
              .find('[data-name="' + currentView + '"]')
              .removeClass('view-transitions-slide-in-forward-reverse');
          $(vc).find('[data-name="' + currentView + '"]').hide();
        });

    $(vc).data('currentView', ele);
    var view = $(vc).find('[data-name="' + ele + '"]');
    if(typeof($(view).data("parent")) == "undefined"){
        $(vc).children('[data-role="NavigationButtons"]').empty();
    }
    else {
        AddBackButton(vc);
    }
    $(view).show();
    $(view)
        .addClass('view-transitions-slide-out-forward-reverse')
        .one('animationend', function(e) {
          $(view).removeClass('view-transitions-slide-out-forward-reverse');
        });
}

function UpdateNavBar(viewController) {
    var vc = $('[data-name="' + viewcontroller + '"]');
}