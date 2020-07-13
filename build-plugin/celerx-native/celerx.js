window["celerSDK"] = {
  onStateReceived: function (callback) {

  },
  onCourtModeStarted: function (callback) {

  },
  getMatch: function () {

  },
  showCourtModeDialog: function () {

  },
  start: function () {

  },
  sendState: function (arr) {

  },
  draw: function (arr) {

  },
  win: function (arr) {

  },
  lose: function (arr) {

  },
  surrender: function (arr) {
    return bridge.call("surrender", binary_to_base64(arr));
  },
  applyAction: function (arr, callback) {
    return bridge.call("applyAction", binary_to_base64(arr), callback);
  },
  getOnChainState: function (callback) {
    return bridge.call("getOnChainState", "123", function (base64) {
      var output = base64_decode(base64);
      return callback(new Uint8Array(output));
    });
  },
  getOnChainActionDeadline: function (callback) {
    return bridge.call("getOnChainActionDeadline", "123", callback);
  },
  getCurrentBlockNumber: function () {
    return bridge.call("getCurrentBlockNumber", "123");
  },
  finalizeOnChainGame: function (callback) {
    return bridge.call("finalizeOnChainGame", "123", callback);
  },
  submitScore: function (score) {
    return bridge.call("submitScore", score);
  },
  ready: function () {
    if (window.cc) {
      var takeImage = false;
      var canvas = document.getElementsByTagName("canvas")[0];
      cc.director.on(cc.Director.EVENT_AFTER_DRAW, function () {
        if (takeImage) {
          takeImage = false;
          celerSDK.didTakeSnapshot(canvas.toDataURL("image/jpeg", 0.1));
        }
      });
      celerSDK.provideCurrentFrameData(function () {
        takeImage = true;
      });
    }
    return bridge.call("ready");
  },
  onStart: function (callback) {
    return bridge.register("onStart", callback);
  },
  provideScore: function (callback) {
    return (provideScore = {
      callback: callback
    });
  },
  provideCurrentFrameData: function (callback) {
    return (provideCurrentFrameData = {
      callback: callback
    });
  },
  didTakeSnapshot: function (e) {
    if (
      window["webkit"] &&
      window["webkit"].messageHandlers &&
      window["webkit"].messageHandlers["celerSDK"] &&
      window["webkit"].messageHandlers["celerSDK"].postMessage
    ) {
      window["webkit"].messageHandlers["celerSDK"].postMessage({
        method: "didTakeSnapshot",
        args: e,
      });
    } else {
      return bridge.call("didTakeSnapshot", e);
    }
  },
  log: function (e) {
    if (
      window["webkit"] &&
      window["webkit"].messageHandlers &&
      window["webkit"].messageHandlers["celerSDK"] &&
      window.webkit.messageHandlers["celerSDK"].postMessage
    ) {
      window.webkit.messageHandlers["celerSDK"].postMessage({
        method: "log",
        args: e,
      });
    } else {
      return bridge.call("log", e);
    }
  },
  getGameScore: function () {
    if (
      !provideScore ||
      !provideScore.callback ||
      provideScore.callback() == ""
    ) {
      return 0;
    }
    return provideScore.callback();
  },
  switchSnapShotFlag: function () {
    if (
      !provideCurrentFrameData ||
      !provideCurrentFrameData.callback ||
      provideCurrentFrameData.callback() == ""
    ) {
      return 0;
    }
    return provideCurrentFrameData.callback();
  },
  onResume: function (callback) {

    return (onResume = {
      callback: callback
    });
  },
  onPause: function (callback) {

    return (onPause = {
      callback: callback
    });
  },
  triggerOnResumeInGame: function () {

    if (!onResume || !onResume.callback || onResume.callback() == "") {
      return 0;
    }
    return onResume.callback();
  },
  triggerOnPauseInGame: function () {

    if (!onPause || !onPause.callback || onPause.callback() == "") {
      return 0;
    }
    return onPause.callback();
  },
};