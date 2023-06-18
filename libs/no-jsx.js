(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["react"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("React"));
  } else {
    const exports = factory(root.React);
    Object.keys(exports).forEach((key) => (root[key] = exports[key]));
  }
})(this, function (React) {
  // this is where I defined my module implementation

  const nojsx = (tag) => {
    let registeredProps = {};

    function Tag(...children) {
      const el = React.createElement(tag, registeredProps, ...children);
      registeredProps = {};
      return el;
    }
    Tag.props = function (props) {
      Object.assign(registeredProps, props);
      return this;
    };
    Tag.key = function (key) {
      registeredProps.key = key;
      return this;
    };
    Tag.id = function (id) {
      registeredProps.id = id;
      return this;
    };
    Tag.class = function (className) {
      registeredProps.className = className;
      return this;
    };
    Tag.style = function (style) {
      registeredProps.style = style;
      return this;
    };
    return Tag;
  };
  const tags = [
    "a",
    "abbr",
    "acronym",
    "address",
    "applet",
    "object",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "basefont",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "input",
    "dd",
    "dt",
    "dl",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "ul",
    "div",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frameset",
    "head",
    "header",
    "hgroup",
    "h1> to <h6",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noframes",
    "noscript",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "video",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "tt",
    "u",
    "var",
    "wbr",
  ];

  const elements = {};

  tags.forEach((tag) => (elements[tag] = nojsx(tag)));

  return {
    nojsx,
    ...elements,
  };
});
