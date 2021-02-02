const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItMulticol = require("markdown-it-multicolumn").default;
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {
  // Output directory: _site

  // // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  let options = {
    html: true
  };
  let mapping = {
    table: 'table table-striped',
    img: 'markImg'
  }
  let markdownLib = markdownIt(options)
    .use(markdownItMulticol)
    .use(markdownItClass, mapping)
    .use(require('markdown-it-anchor'), {permalink: true})
    .use(markdownItAttrs);
  // markdownLib.renderer.rules.table_open = function(tokens, idx) {
  //   return '<table class="table table-striped">';
  // };

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "src"
    },
    pathPrefix: "/k8s-adventure/"
  }
};
