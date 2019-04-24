"use strict";
/* global global: false */
var console = require("console");
var ko = require("knockout");
var $ = require("jquery");

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var ssLoader = function(template, metadata, emailProcessorBackend,boLink) {
    return {
      metadata: metadata,
      model: template,
      extension: ssCommandPluginFactory(metadata, emailProcessorBackend,boLink)
    };
};

var ssCommandPluginFactory = function(md, emailProcessorBackend,boLink) {
  var commandsPlugin = function(mdkey, mdname, viewModel) {


    var downloadCmd = {
      name: 'Save', // l10n happens in the template
      back_name: 'Back',
      back_url: boLink,
      enabled: ko.observable(true)
    };


    downloadCmd.back = function() {
      global.location = boLink + getParameterByName('template_id', global.location.href);
    };


    downloadCmd.execute = function() {
      downloadCmd.enabled(false);
      viewModel.notifier.info(viewModel.t("Saving..."));
      viewModel.exportHTMLtoTextarea('#downloadHtmlTextarea');
      var postUrl = emailProcessorBackend ? emailProcessorBackend : '/dl/';
    //  global.document.getElementById('downloadForm').setAttribute("action", postUrl);
    //  global.document.getElementById('downloadForm').submit();
var post = $.post(postUrl, {

  html: viewModel.exportHTML(),
  metadata: viewModel.exportMetadata(),
  json: viewModel.exportJSON(),
  template_id: getParameterByName('template_id', global.location.href),
  md: mdkey + " - " + mdname
}, null, 'html');
post.fail(function() {
  console.log("fail", arguments);
  viewModel.notifier.error(viewModel.t('Unexpected error talking to server: contact us!'));
});
post.success(function() {
      viewModel.notifier.success(viewModel.t("Stored in BO"));
});
post.always(function() {
  downloadCmd.enabled(true);
});




    };

    viewModel.download = downloadCmd;
  }.bind(undefined, md.key, md.name);

  return commandsPlugin;
};

module.exports = ssLoader;
