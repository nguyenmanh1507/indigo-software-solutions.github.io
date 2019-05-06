// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"bower_components/foundation/js/foundation/foundation.clearing.js":[function(require,module,exports) {
;

(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.clearing = {
    name: 'clearing',
    version: '5.5.3',
    settings: {
      templates: {
        viewing: '<a href="#" class="clearing-close">&times;</a>' + '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' + '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' + '<a href="#" class="clearing-main-next"><span></span></a></div>' + '<img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' + '<img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'
      },
      // comma delimited list of selectors that, on click, will close clearing,
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors: '.clearing-close, div.clearing-blackout',
      // Default to the entire li element.
      open_selectors: '',
      // Image will be skipped in carousel.
      skip_selector: '',
      touch_label: '',
      // event initializer and locks
      init: false,
      locked: false
    },
    init: function init(scope, method, options) {
      var self = this;
      Foundation.inherit(this, 'throttle image_loaded');
      this.bindings(method, options);

      if (self.S(this.scope).is('[' + this.attr_name() + ']')) {
        this.assemble(self.S('li', this.scope));
      } else {
        self.S('[' + this.attr_name() + ']', this.scope).each(function () {
          self.assemble(self.S('li', this));
        });
      }
    },
    events: function events(scope) {
      var self = this,
          S = self.S,
          $scroll_container = $('.scroll-container');

      if ($scroll_container.length > 0) {
        this.scope = $scroll_container;
      }

      S(this.scope).off('.clearing').on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li ' + this.settings.open_selectors, function (e, current, target) {
        var current = current || S(this),
            target = target || current,
            next = current.next('li'),
            settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init'),
            image = S(e.target);
        e.preventDefault();

        if (!settings) {
          self.init();
          settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
        } // if clearing is open and the current image is
        // clicked, go to the next image in sequence


        if (target.hasClass('visible') && current[0] === target[0] && next.length > 0 && self.is_open(current)) {
          target = next;
          image = S('img', target);
        } // set current and target to the clicked li if not otherwise defined.


        self.open(image, current, target);
        self.update_paddles(target);
      }).on('click.fndtn.clearing', '.clearing-main-next', function (e) {
        self.nav(e, 'next');
      }).on('click.fndtn.clearing', '.clearing-main-prev', function (e) {
        self.nav(e, 'prev');
      }).on('click.fndtn.clearing', this.settings.close_selectors, function (e) {
        Foundation.libs.clearing.close(e, this);
      });
      $(document).on('keydown.fndtn.clearing', function (e) {
        self.keydown(e);
      });
      S(window).off('.clearing').on('resize.fndtn.clearing', function () {
        self.resize();
      });
      this.swipe_events(scope);
    },
    swipe_events: function swipe_events(scope) {
      var self = this,
          S = self.S;
      S(this.scope).on('touchstart.fndtn.clearing', '.visible-img', function (e) {
        if (!e.touches) {
          e = e.originalEvent;
        }

        var data = {
          start_page_x: e.touches[0].pageX,
          start_page_y: e.touches[0].pageY,
          start_time: new Date().getTime(),
          delta_x: 0,
          is_scrolling: undefined
        };
        S(this).data('swipe-transition', data);
        e.stopPropagation();
      }).on('touchmove.fndtn.clearing', '.visible-img', function (e) {
        if (!e.touches) {
          e = e.originalEvent;
        } // Ignore pinch/zoom events


        if (e.touches.length > 1 || e.scale && e.scale !== 1) {
          return;
        }

        var data = S(this).data('swipe-transition');

        if (typeof data === 'undefined') {
          data = {};
        }

        data.delta_x = e.touches[0].pageX - data.start_page_x;

        if (Foundation.rtl) {
          data.delta_x = -data.delta_x;
        }

        if (typeof data.is_scrolling === 'undefined') {
          data.is_scrolling = !!(data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y));
        }

        if (!data.is_scrolling && !data.active) {
          e.preventDefault();
          var direction = data.delta_x < 0 ? 'next' : 'prev';
          data.active = true;
          self.nav(e, direction);
        }
      }).on('touchend.fndtn.clearing', '.visible-img', function (e) {
        S(this).data('swipe-transition', {});
        e.stopPropagation();
      });
    },
    assemble: function assemble($li) {
      var $el = $li.parent();

      if ($el.parent().hasClass('carousel')) {
        return;
      }

      $el.after('<div id="foundationClearingHolder"></div>');
      var grid = $el.detach(),
          grid_outerHTML = '';

      if (grid[0] == null) {
        return;
      } else {
        grid_outerHTML = grid[0].outerHTML;
      }

      var holder = this.S('#foundationClearingHolder'),
          settings = $el.data(this.attr_name(true) + '-init'),
          data = {
        grid: '<div class="carousel">' + grid_outerHTML + '</div>',
        viewing: settings.templates.viewing
      },
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing + data.grid + '</div></div>',
          touch_label = this.settings.touch_label;

      if (Modernizr.touch) {
        wrapper = $(wrapper).find('.clearing-touch-label').html(touch_label).end();
      }

      holder.after(wrapper).remove();
    },
    open: function open($image, current, target) {
      var self = this,
          body = $(document.body),
          root = target.closest('.clearing-assembled'),
          container = self.S('div', root).first(),
          visible_image = self.S('.visible-img', container),
          image = self.S('img', visible_image).not($image),
          label = self.S('.clearing-touch-label', container),
          error = false,
          loaded = {}; // Event to disable scrolling on touch devices when Clearing is activated

      $('body').on('touchmove', function (e) {
        e.preventDefault();
      });
      image.error(function () {
        error = true;
      });

      function startLoad() {
        setTimeout(function () {
          this.image_loaded(image, function () {
            if (image.outerWidth() === 1 && !error) {
              startLoad.call(this);
            } else {
              cb.call(this, image);
            }
          }.bind(this));
        }.bind(this), 100);
      }

      function cb(image) {
        var $image = $(image);
        $image.css('visibility', 'visible');
        $image.trigger('imageVisible'); // toggle the gallery

        body.css('overflow', 'hidden');
        root.addClass('clearing-blackout');
        container.addClass('clearing-container');
        visible_image.show();
        this.fix_height(target).caption(self.S('.clearing-caption', visible_image), self.S('img', target)).center_and_label(image, label).shift(current, target, function () {
          target.closest('li').siblings().removeClass('visible');
          target.closest('li').addClass('visible');
        });
        visible_image.trigger('opened.fndtn.clearing');
      }

      if (!this.locked()) {
        visible_image.trigger('open.fndtn.clearing'); // set the image to the selected thumbnail

        loaded = this.load($image);

        if (loaded.interchange) {
          image.attr('data-interchange', loaded.interchange).foundation('interchange', 'reflow');
        } else {
          image.attr('src', loaded.src).attr('data-interchange', '');
        }

        image.css('visibility', 'hidden');
        startLoad.call(this);
      }
    },
    close: function close(e, el) {
      e.preventDefault();

      var root = function (target) {
        if (/blackout/.test(target.selector)) {
          return target;
        } else {
          return target.closest('.clearing-blackout');
        }
      }($(el)),
          body = $(document.body),
          container,
          visible_image;

      if (el === e.target && root) {
        body.css('overflow', '');
        container = $('div', root).first();
        visible_image = $('.visible-img', container);
        visible_image.trigger('close.fndtn.clearing');
        this.settings.prev_index = 0;
        $('ul[' + this.attr_name() + ']', root).attr('style', '').closest('.clearing-blackout').removeClass('clearing-blackout');
        container.removeClass('clearing-container');
        visible_image.hide();
        visible_image.trigger('closed.fndtn.clearing');
      } // Event to re-enable scrolling on touch devices


      $('body').off('touchmove');
      return false;
    },
    is_open: function is_open(current) {
      return current.parent().prop('style').length > 0;
    },
    keydown: function keydown(e) {
      var clearing = $('.clearing-blackout ul[' + this.attr_name() + ']'),
          NEXT_KEY = this.rtl ? 37 : 39,
          PREV_KEY = this.rtl ? 39 : 37,
          ESC_KEY = 27;

      if (e.which === NEXT_KEY) {
        this.go(clearing, 'next');
      }

      if (e.which === PREV_KEY) {
        this.go(clearing, 'prev');
      }

      if (e.which === ESC_KEY) {
        this.S('a.clearing-close').trigger('click.fndtn.clearing');
      }
    },
    nav: function nav(e, direction) {
      var clearing = $('ul[' + this.attr_name() + ']', '.clearing-blackout');
      e.preventDefault();
      this.go(clearing, direction);
    },
    resize: function resize() {
      var image = $('img', '.clearing-blackout .visible-img'),
          label = $('.clearing-touch-label', '.clearing-blackout');

      if (image.length) {
        this.center_and_label(image, label);
        image.trigger('resized.fndtn.clearing');
      }
    },
    // visual adjustments
    fix_height: function fix_height(target) {
      var lis = target.parent().children(),
          self = this;
      lis.each(function () {
        var li = self.S(this),
            image = li.find('img');

        if (li.height() > image.outerHeight()) {
          li.addClass('fix-height');
        }
      }).closest('ul').width(lis.length * 100 + '%');
      return this;
    },
    update_paddles: function update_paddles(target) {
      target = target.closest('li');
      var visible_image = target.closest('.carousel').siblings('.visible-img');

      if (target.next().length > 0) {
        this.S('.clearing-main-next', visible_image).removeClass('disabled');
      } else {
        this.S('.clearing-main-next', visible_image).addClass('disabled');
      }

      if (target.prev().length > 0) {
        this.S('.clearing-main-prev', visible_image).removeClass('disabled');
      } else {
        this.S('.clearing-main-prev', visible_image).addClass('disabled');
      }
    },
    center_and_label: function center_and_label(target, label) {
      if (!this.rtl && label.length > 0) {
        label.css({
          marginLeft: -(label.outerWidth() / 2),
          marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10
        });
      } else {
        label.css({
          marginRight: -(label.outerWidth() / 2),
          marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10,
          left: 'auto',
          right: '50%'
        });
      }

      return this;
    },
    // image loading and preloading
    load: function load($image) {
      var href, interchange, closest_a;

      if ($image[0].nodeName === 'A') {
        href = $image.attr('href');
        interchange = $image.data('clearing-interchange');
      } else {
        closest_a = $image.closest('a');
        href = closest_a.attr('href');
        interchange = closest_a.data('clearing-interchange');
      }

      this.preload($image);
      return {
        'src': href ? href : $image.attr('src'),
        'interchange': href ? interchange : $image.data('clearing-interchange')
      };
    },
    preload: function preload($image) {
      this.img($image.closest('li').next(), 'next').img($image.closest('li').prev(), 'prev');
    },
    img: function img(_img, sibling_type) {
      if (_img.length) {
        var preload_img = $('.clearing-preload-' + sibling_type),
            new_a = this.S('a', _img),
            src,
            interchange,
            image;

        if (new_a.length) {
          src = new_a.attr('href');
          interchange = new_a.data('clearing-interchange');
        } else {
          image = this.S('img', _img);
          src = image.attr('src');
          interchange = image.data('clearing-interchange');
        }

        if (interchange) {
          preload_img.attr('data-interchange', interchange);
        } else {
          preload_img.attr('src', src);
          preload_img.attr('data-interchange', '');
        }
      }

      return this;
    },
    // image caption
    caption: function caption(container, $image) {
      var caption = $image.attr('data-caption');

      if (caption) {
        var containerPlain = container.get(0);
        containerPlain.innerHTML = caption;
        container.show();
      } else {
        container.text('').hide();
      }

      return this;
    },
    // directional methods
    go: function go($ul, direction) {
      var current = this.S('.visible', $ul),
          target = current[direction](); // Check for skip selector.

      if (this.settings.skip_selector && target.find(this.settings.skip_selector).length != 0) {
        target = target[direction]();
      }

      if (target.length) {
        this.S('img', target).trigger('click.fndtn.clearing', [current, target]).trigger('change.fndtn.clearing');
      }
    },
    shift: function shift(current, target, callback) {
      var clearing = target.parent(),
          old_index = this.settings.prev_index || target.index(),
          direction = this.direction(clearing, current, target),
          dir = this.rtl ? 'right' : 'left',
          left = parseInt(clearing.css('left'), 10),
          width = target.outerWidth(),
          skip_shift;
      var dir_obj = {}; // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      // needs support for RTL **

      if (target.index() !== old_index && !/skip/.test(direction)) {
        if (/left/.test(direction)) {
          this.lock();
          dir_obj[dir] = left + width;
          clearing.animate(dir_obj, 300, this.unlock());
        } else if (/right/.test(direction)) {
          this.lock();
          dir_obj[dir] = left - width;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      } else if (/skip/.test(direction)) {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index() - this.settings.up_count;
        this.lock();

        if (skip_shift > 0) {
          dir_obj[dir] = -(skip_shift * width);
          clearing.animate(dir_obj, 300, this.unlock());
        } else {
          dir_obj[dir] = 0;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      }

      callback();
    },
    direction: function direction($el, current, target) {
      var lis = this.S('li', $el),
          li_width = lis.outerWidth() + lis.outerWidth() / 4,
          up_count = Math.floor(this.S('.clearing-container').outerWidth() / li_width) - 1,
          target_index = lis.index(target),
          response;
      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index)) {
        if (target_index > up_count && target_index > this.settings.prev_index) {
          response = 'right';
        } else if (target_index > up_count - 1 && target_index <= this.settings.prev_index) {
          response = 'left';
        } else {
          response = false;
        }
      } else {
        response = 'skip';
      }

      this.settings.prev_index = target_index;
      return response;
    },
    adjacent: function adjacent(current_index, target_index) {
      for (var i = target_index + 1; i >= target_index - 1; i--) {
        if (i === current_index) {
          return true;
        }
      }

      return false;
    },
    // lock management
    lock: function lock() {
      this.settings.locked = true;
    },
    unlock: function unlock() {
      this.settings.locked = false;
    },
    locked: function locked() {
      return this.settings.locked;
    },
    off: function off() {
      this.S(this.scope).off('.fndtn.clearing');
      this.S(window).off('.fndtn.clearing');
    },
    reflow: function reflow() {
      this.init();
    }
  };
})(jQuery, window, window.document);
},{}],"../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58611" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bower_components/foundation/js/foundation/foundation.clearing.js"], null)
//# sourceMappingURL=/foundation.clearing.cab5a4c4.js.map