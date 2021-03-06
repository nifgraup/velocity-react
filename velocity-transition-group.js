'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _velocityAnimateShim = require('./lib/velocity-animate-shim');

var _velocityAnimateShim2 = _interopRequireDefault(_velocityAnimateShim);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015 Twitter, Inc. and other contributors
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Component to add Velocity animations around React transitions. Delegates to the React TransitionGroup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               addon.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Properties
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 enter: Animation to run on a child component being added
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 leave: Animation to run on a child component leaving
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 runOnMount: if true, runs the "enter" animation on the elements that exist as children when this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   component is mounted.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 enterHideStyle/enterShowStyle: see below.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Any additional properties (e.g. "className", "component") will be passed to the internal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               TransitionGroup.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               "enter" and "leave" should either be a string naming an animation, or a hash with an
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               "animation" key that can either be a string itself, or a hash of style attributes to animate (this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value is passed to Velocity its the first arg).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               If "enter" or "leave" is a hash, it can additionally have a "style" value that is applied the tick
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               before the Velocity animation starts. Use this for non-animating properties (like "position") that
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               are prerequisites for correct animation. The style value is applied using Velocity's JS -> CSS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               routines, which may differ from React's.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Any hash entries beyond "animation" and "style" are passed in an options hash to Velocity. Use this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               for options like "stagger", "reverse", &tc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               By default, this component will immediately hide all entering children with display: 'none', and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               unhide them one tick later with display: ''. This is done so that we can coalesce multiple enters
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               into a single animation, and we want to avoid any popping of elements in while they're collected. If
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               you prefer a different way of hiding these elements so that e.g. geometry can be immediately
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               calculated, use the enterHideStyle and enterShowStyle props to provide alternate style hashes for
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               hiding and revealing entering elements.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Statics
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 disabledForTest: Set this to true globally to turn off all custom animation logic. Instead, this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   component will behave like a vanilla TransitionGroup.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Inspired by https://gist.github.com/tkafka/0d94c6ec94297bb67091
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */
/* eslint react/no-find-dom-node: 0 */

// Shim requestAnimationFrame for browsers that don't support it, in particular IE 9.
var shimRequestAnimationFrame = typeof window !== 'undefined' && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 0);
});

// Fix 'Invalid calling object' error in IE
shimRequestAnimationFrame = typeof window !== 'undefined' && shimRequestAnimationFrame.bind(window);

var shimCancelAnimationFrame = typeof window !== 'undefined' && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (timeout) {
  window.clearTimeout(timeout);
});

shimCancelAnimationFrame = typeof window !== 'undefined' && shimCancelAnimationFrame.bind(window);

// Internal wrapper for the transitioned elements. Delegates all child lifecycle events to the
// parent VelocityTransitionGroup so that it can co-ordinate animating all of the elements at once.

var VelocityTransitionGroupChild = function (_React$Component) {
  _inherits(VelocityTransitionGroupChild, _React$Component);

  function VelocityTransitionGroupChild() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VelocityTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VelocityTransitionGroupChild.__proto__ || Object.getPrototypeOf(VelocityTransitionGroupChild)).call.apply(_ref, [this].concat(args))), _this), _this.lastState = 'appear', _this.componentWillEnter = function (node, appearing) {
      _this.lastState = appearing ? 'appear' : 'enter';
    }, _this.componentWillExit = function () {
      _this.lastState = 'exit';
    }, _this.endListener = function (node, done) {
      switch (_this.lastState) {
        case 'appear':
          _this.props.willAppearFunc(node, done);
          break;
        case 'enter':
          _this.props.willEnterFunc(node, done);
          break;
        case 'exit':
          _this.props.willLeaveFunc(node, done);
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We trigger our transitions out of endListener because that gives us access to the done callback
  // we can use to tell the Transition that the animation has completed.


  _createClass(VelocityTransitionGroupChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Clear references from velocity cache.
      _velocityAnimateShim2.default.Utilities.removeData(_reactDom2.default.findDOMNode(this), ['velocity', 'fxqueue']);
    }
  }, {
    key: 'render',
    value: function render() {
      var transitionProps = (0, _lodash.omit)(this.props, (0, _lodash.keys)(VelocityTransitionGroupChild.propTypes));

      return _react2.default.createElement(_Transition2.default, _extends({}, transitionProps, {
        timeout: null,
        addEndListener: this.endListener,
        appear: true,
        onEnter: this.componentWillEnter,
        onExit: this.componentWillExit
      }), this.props.children);
    }
  }]);

  return VelocityTransitionGroupChild;
}(_react2.default.Component);

exports.default = VelocityTransitionGroupChild;


VelocityTransitionGroupChild.propTypes = {
  children: _propTypes2.default.element.isRequired,
  willAppearFunc: _propTypes2.default.func.isRequired,
  willEnterFunc: _propTypes2.default.func.isRequired,
  willLeaveFunc: _propTypes2.default.func.isRequired
};

var VelocityTransitionGroup = function (_React$Component2) {
  _inherits(VelocityTransitionGroup, _React$Component2);

  function VelocityTransitionGroup(props) {
    _classCallCheck(this, VelocityTransitionGroup);

    var _this2 = _possibleConstructorReturn(this, (VelocityTransitionGroup.__proto__ || Object.getPrototypeOf(VelocityTransitionGroup)).call(this, props));

    _this2._scheduledAnimationFrame = null;
    _this2._scheduledAnimationRunFrames = [];
    _this2._entering = [];
    _this2._leaving = [];

    _this2._timers = [];
    _this2._unmounted = false;

    _this2.childWillAppear = _this2.childWillAppear.bind(_this2);
    _this2.childWillEnter = _this2.childWillEnter.bind(_this2);
    _this2.childWillLeave = _this2.childWillLeave.bind(_this2);

    _this2._runAnimations = _this2._runAnimations.bind(_this2);
    _this2._wrapChild = _this2._wrapChild.bind(_this2);
    return _this2;
  }

  _createClass(VelocityTransitionGroup, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._scheduledAnimationFrame) {
        shimCancelAnimationFrame(this._scheduledAnimationFrame);
      }

      (0, _lodash.forEach)(this._timers, function (timer) {
        clearTimeout(timer);
      });

      (0, _lodash.forEach)(this._scheduledAnimationRunFrames, function (frame) {
        shimCancelAnimationFrame(frame);
      });

      // We don't cancel all the in-process animations, so we use this to know if the component
      // is gone when an animation is over.
      this._unmounted = true;
    }
  }, {
    key: 'render',
    value: function render() {
      // Pass any props that are not our own on into the TransitionGroup delegate.
      var transitionGroupProps = (0, _lodash.omit)(this.props, (0, _lodash.keys)(VelocityTransitionGroup.propTypes));

      return _react2.default.createElement(_TransitionGroup2.default, transitionGroupProps, !this.constructor.disabledForTest && !_velocityAnimateShim2.default.velocityReactServerShim ? _react2.default.Children.map(this.props.children, this._wrapChild) : this.props.children);
    }
  }, {
    key: 'childWillAppear',
    value: function childWillAppear(node, doneFn) {
      var _this3 = this;

      if (this.props.runOnMount) {
        this.childWillEnter(node, doneFn);
      } else {
        this._finishAnimation(node, this.props.enter);

        // Important to tick over so that any callbacks due to finishing the animation complete first.
        //
        // Using setTimeout so that doneFn gets called even when the tab is hidden.
        var t = setTimeout(function () {
          var idx = _this3._timers.indexOf(t);
          if (idx >= 0) {
            _this3._timers.splice(idx, 1);
          }

          doneFn();
        }, 0);
        this._timers.push(t);
      }
    }
  }, {
    key: 'childWillEnter',
    value: function childWillEnter(node, doneFn) {
      if (this._shortCircuitAnimation(this.props.enter, doneFn)) return;

      // By finishing a "leave" on the element, we put it in the right state to be animated in. Useful
      // if "leave" includes a rotation or something that we'd like to have as our starting point, for
      // symmetry.
      // We use overrideOpts to prevent any "begin" or "complete" callback from triggering in this case, since
      // it doesn't make a ton of sense.
      this._finishAnimation(node, this.props.leave, {
        begin: undefined,
        complete: undefined
      });

      // We're not going to start the animation for a tick, so set the node's display to none (or any
      // custom "hide" style provided) so that it doesn't flash in.
      (0, _lodash.forEach)(this.props.enterHideStyle, function (val, key) {
        _velocityAnimateShim2.default.CSS.setPropertyValue(node, key, val);
      });

      this._entering.push({
        node: node,
        doneFn: doneFn
      });

      this._schedule();
    }
  }, {
    key: 'childWillLeave',
    value: function childWillLeave(node, doneFn) {
      if (this._shortCircuitAnimation(this.props.leave, doneFn)) return;

      this._leaving.push({
        node: node,
        doneFn: doneFn
      });

      this._schedule();
    }

    // document.hidden check is there because animation completion callbacks won't fire (due to
    // chaining off of rAF), which would prevent entering / leaving DOM nodes from being cleaned up
    // while the tab is hidden.
    //
    // Returns true if this did short circuit, false if lifecycle methods should continue with
    // their animations.

  }, {
    key: '_shortCircuitAnimation',
    value: function _shortCircuitAnimation(animationProp, doneFn) {
      if (document.hidden || this._parseAnimationProp(animationProp).animation == null) {
        doneFn();

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: '_schedule',
    value: function _schedule() {
      if (this._scheduledAnimationFrame) {
        return;
      }

      // Need rAF to make sure we're in the same event queue as Velocity from here out. Important
      // for avoiding getting wrong interleaving with Velocity callbacks.
      this._scheduledAnimationFrame = shimRequestAnimationFrame(this._runAnimations);
    }

    // arrow function because this is used as an rAF callback

  }, {
    key: '_runAnimations',
    value: function _runAnimations() {
      this._scheduledAnimationFrame = null;

      this._runAnimation(true, this._entering, this.props.enter);
      this._runAnimation(false, this._leaving, this.props.leave);

      this._entering = [];
      this._leaving = [];
    }

    // Used to parse out the 'enter' and 'leave' properties. Handles cases where they are omitted
    // as well as when they are just strings and not hashes of animation and options.

  }, {
    key: '_parseAnimationProp',
    value: function _parseAnimationProp(animationProp) {
      var animation, opts, style;

      if (typeof animationProp === 'string') {
        animation = animationProp;
        style = null;
        opts = {};
      } else {
        animation = animationProp != null ? animationProp.animation : null;
        style = animationProp != null ? animationProp.style : null;
        opts = (0, _lodash.omit)(animationProp, 'animation', 'style');
      }

      return {
        animation: animation,
        style: style,
        opts: opts
      };
    }
  }, {
    key: '_runAnimation',
    value: function _runAnimation(entering, queue, animationProp) {
      var _this4 = this;

      if (queue.length === 0) {
        return;
      }

      var nodes = (0, _lodash.map)(queue, 'node');
      var doneFns = (0, _lodash.map)(queue, 'doneFn');

      var parsedAnimation = this._parseAnimationProp(animationProp);
      var animation = parsedAnimation.animation;
      var style = parsedAnimation.style;
      var opts = parsedAnimation.opts;

      // Clearing display reverses the behavior from childWillAppear where all elements are added with
      // display: none to prevent them from flashing in before the animation starts. We don't do this
      // for the fade/slide animations or any animation that ends in "In," since Velocity will handle
      // it for us.
      //
      // If a custom "enterShowStyle" prop is passed, (i.e. not one that just reverses display: none)
      // we always run it, regardless of the animation, since it's probably doing something around
      // opacity or positioning that Velocity will not necessarily reset.
      if (entering) {
        if (!(0, _lodash.isEqual)(this.props.enterShowStyle, { display: '' }) || !(/^(fade|slide)/.test(animation) || /In$/.test(animation))) {
          style = (0, _lodash.extend)({}, this.props.enterShowStyle, style);
        }
      }

      // Because Safari can synchronously repaint when CSS "display" is reset, we set styles for all
      // browsers before the rAF tick below that starts the animation. This way you know in all
      // cases that you need to support your static styles being visible on the element before
      // the animation begins.
      if (style != null) {
        (0, _lodash.each)(style, function (value, key) {
          _velocityAnimateShim2.default.hook(nodes, key, value);
        });
      }

      var doneFn = function doneFn() {
        // calling doneFns after the parent has unmounted leads to errors
        if (_this4._unmounted) {
          return;
        }

        doneFns.map(function (doneFn) {
          doneFn();
        });
      };

      // For nodes that are entering, we tell the TransitionGroup that we're done with them
      // immediately. That way, they can be removed later before their entering animations complete.
      // If we're leaving, we stop current animations (which may be partially-completed enter
      // animations) so that we can then animate out. Velocity typically makes these transitions
      // very smooth, correctly animating from whatever state the element is currently in.
      if (entering) {
        doneFn();
        doneFn = null;
      } else {
        (0, _velocityAnimateShim2.default)(nodes, 'stop');
      }

      var combinedCompleteFn;
      if (doneFn && opts.complete) {
        var optsCompleteFn = opts.complete;
        combinedCompleteFn = function combinedCompleteFn() {
          doneFn();
          // preserve this / args from Velocity so the complete function has context for what completed
          optsCompleteFn.apply(this, arguments);
        };
      } else {
        // One or the other or neither.
        combinedCompleteFn = doneFn || opts.complete;
      }

      // Bit of a hack. Without this rAF, sometimes an enter animation doesn't start running, or is
      // stopped before getting anywhere. This should get us on the other side of both completeFn and
      // any _finishAnimation that's happening.
      var t = shimRequestAnimationFrame(function () {
        var idx = _this4._scheduledAnimationRunFrames.indexOf(t);
        if (idx >= 0) {
          _this4._scheduledAnimationRunFrames.splice(idx, 1);
        }

        (0, _velocityAnimateShim2.default)(nodes, animation, (0, _lodash.extend)({}, opts, {
          complete: combinedCompleteFn
        }));
      });

      this._scheduledAnimationRunFrames.push(t);
    }
  }, {
    key: '_finishAnimation',
    value: function _finishAnimation(node, animationProp, overrideOpts) {
      var parsedAnimation = this._parseAnimationProp(animationProp);
      var animation = parsedAnimation.animation;
      var style = parsedAnimation.style;
      var opts = (0, _lodash.extend)({}, parsedAnimation.opts, overrideOpts);

      if (style != null) {
        (0, _lodash.each)(style, function (value, key) {
          _velocityAnimateShim2.default.hook(node, key, value);
        });
      }

      if (animation != null) {
        // Opts are relevant even though we're immediately finishing, since things like "display"
        // can affect the animation outcome.

        (0, _velocityAnimateShim2.default)(node, animation, opts);
        (0, _velocityAnimateShim2.default)(node, 'finishAll', true);
      }
    }
  }, {
    key: '_wrapChild',
    value: function _wrapChild(child) {
      // Need to guard against falsey children, which React will sometimes pass
      // in.
      if (!child) {
        return null;
      }

      return _react2.default.createElement(VelocityTransitionGroupChild, {
        key: child.key,
        willAppearFunc: this.childWillAppear,
        willEnterFunc: this.childWillEnter,
        willLeaveFunc: this.childWillLeave
      }, child);
    }
  }]);

  return VelocityTransitionGroup;
}(_react2.default.Component);

VelocityTransitionGroup.disabledForTest = false; // global, mutable, for disabling animations during test

VelocityTransitionGroup.propTypes = {
  runOnMount: _propTypes2.default.bool,
  enter: _propTypes2.default.any,
  leave: _propTypes2.default.any,
  children: _propTypes2.default.any,
  enterHideStyle: _propTypes2.default.object,
  enterShowStyle: _propTypes2.default.object
};

VelocityTransitionGroup.defaultProps = {
  runOnMount: false,
  enter: null,
  leave: null,
  enterHideStyle: {
    display: 'none'
  },
  enterShowStyle: {
    display: ''
  }
};