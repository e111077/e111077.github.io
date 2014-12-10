mediumToHtml = function(medium) {
  // get the template
  var mediaSource   = $('.hidden.templates .mediaTemplate').html();
  var mediaTemplate = Handlebars.compile(mediaSource);

  // create a hrefable unique string
  var punctuationAndSlashes = new RegExp("[\.\!/:\,]", "g");
  medium.linkableId = medium._id.replace(punctuationAndSlashes, "");
  // hacking so that fancybox will not crash becasue of template
  medium.fancybox   = "fancybox";

  // handlebars makes the html needed for the insertion
  return mediaTemplate(medium);
};

commentToHtml = function(comment) {
  // get the  comment template
  var commentSource   = $('.hidden.templates .commentTemplate').html();
  var commentTemplate = Handlebars.compile(commentSource);

  comment.owner = comment._owner.split('/')[2].split('.')[0];
  comment.timestamp = moment(comment._lastModified).fromNow();
  // get the comment html
  return commentTemplate(comment);
}