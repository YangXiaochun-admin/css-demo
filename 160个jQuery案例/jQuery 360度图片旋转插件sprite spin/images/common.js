var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common                = WebDeveloper.Common || {};
WebDeveloper.Common.requestTimeout = 10000;

// Adds a class to an element
WebDeveloper.Common.addClass = function(element, className)
{
  // If the element and class name are set and the element does not already have this class
  if(element && className && !WebDeveloper.Common.hasClass(element, className))
  {
    element.className = (element.className + " " + className).trim();
  }
};

// Adjusts the position of the given element
WebDeveloper.Common.adjustElementPosition = function(element, xPosition, yPosition, offset)
{
  // If the element is set
  if(element)
  {
    var contentWindow = WebDeveloper.Common.getContentWindow();
    var innerHeight   = contentWindow.innerHeight;
    var innerWidth    = contentWindow.innerWidth;
    var offsetHeight  = element.offsetHeight;
    var offsetWidth   = element.offsetWidth;
    var offsetX       = contentWindow.pageXOffset;
    var offsetY       = contentWindow.pageYOffset;

    // If the x position is less than 0
    if(xPosition < 0)
    {
      xPosition = 0;
    }

    // If the y position is less than 0
    if(yPosition < 0)
    {
      yPosition = 0;
    }

    // If the element will fit at the x position
    if((xPosition + offsetWidth + offset + 5) < (innerWidth + offsetX))
    {
      element.style.left = xPosition + offset + "px";
    }
    else
    {
      element.style.left = (innerWidth + offsetX - offsetWidth - offset) + "px";
    }

    // If the element will fit at the y position
    if((yPosition + offsetHeight + offset + 5) < (innerHeight + offsetY))
    {
      element.style.top = yPosition + offset + "px";
    }
    else
    {
      element.style.top = (innerHeight + offsetY - offsetHeight - offset) + "px";
    }
  }
};

// Returns true if the array contains the element
WebDeveloper.Common.contains = function(array, element)
{
  // If the array and element are set
  if(array && element)
  {
    try
    {
      // If the element does not exist in the array
      if(array.indexOf(element) == -1)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    catch(exception)
    {
      // Loop through the array
      for(var i = 0, l = array.length; i < l; i++)
      {
        // If the element is found
        if(array[i] == element)
        {
          return true;
        }
      }
    }
  }

  return false;
};

// Removes all child elements from an element
WebDeveloper.Common.empty = function(element)
{
  // If the element is set
  if(element)
  {
    var childElements = element.childNodes;

    // Loop through the child elements
    while(childElements.length)
    {
      element.removeChild(childElements[0]);
    }
  }
};

// Returns true if a string ends with another string
WebDeveloper.Common.endsWith = function(string, endsWith)
{
  return new RegExp(endsWith + "$").test(string);
};

// Formats dimensions
WebDeveloper.Common.formatDimensions = function(width, height, locale)
{
  // If the width and height are set
  if(width && height)
  {
    return locale.width + " = " + width + "px " + locale.height + " = " + height + "px";
  }
  else if(width)
  {
    return locale.width + " = " + width + "px";
  }
  else if(height)
  {
    return locale.height + " = " + height + "px";
  }

  return "";
};

// Returns the document body element
WebDeveloper.Common.getDocumentBodyElement = function(contentDocument)
{
  // If there is a body element
  if(contentDocument.body)
  {
    return contentDocument.body;
  }
  else
  {
    var bodyElement = contentDocument.querySelector("body");

    // If there is a body element
    if(bodyElement)
    {
      return bodyElement;
    }
  }

  return contentDocument.documentElement;
};

// Returns the document head element
WebDeveloper.Common.getDocumentHeadElement = function(contentDocument)
{
  var headElement = contentDocument.querySelector("head");

  // If there is a head element
  if(headElement)
  {
    return headElement;
  }

  return contentDocument.documentElement;
};

// Returns all of the images in the document
WebDeveloper.Common.getDocumentImages = function(contentDocument)
{
  var uniqueImages = [];

  // If the content document is set
  if(contentDocument)
  {
    var computedStyle   = null;
    var cssURI          = CSSPrimitiveValue.CSS_URI;
    var image           = null;
    var images          = [];
    var node            = null;
    var styleImage      = null;
    var treeWalker      = contentDocument.createTreeWalker(contentDocument, NodeFilter.SHOW_ELEMENT, null, false);

    // While the tree walker has more nodes
    while((node = treeWalker.nextNode()) !== null)
    {
      // If this is an image element
      if(node.tagName.toLowerCase() == "img")
      {
        images.push(node);
      }
      else if(node.tagName.toLowerCase() == "input" && node.src && node.type && node.type.toLowerCase() == "image")
      {
        image     = new Image();
        image.src = node.src;

        // If this is not a chrome image
        if(image.src.indexOf("chrome://") !== 0)
        {
          images.push(image);
        }
      }
      else if(node.tagName.toLowerCase() == "link" && node.href && node.href.indexOf("chrome://") !== 0 && node.rel && node.rel.indexOf("icon") != -1)
      {
        image     = new Image();
        image.src = node.href;

        images.push(image);
      }
      else
      {
        computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);

        // If the computed style is set
        if(computedStyle)
        {
          styleImage = WebDeveloper.Common.getCSSProperty(computedStyle.getPropertyCSSValue("background-image"));

          // If this element has a background image and it is a URI
          if(styleImage && styleImage.primitiveType == cssURI)
          {
            image     = new Image();
            image.src = styleImage.getStringValue();

            // If this is not a chrome image
            if(image.src.indexOf("chrome://") !== 0)
            {
              images.push(image);
            }
          }

          styleImage = computedStyle.getPropertyCSSValue("list-style-image");

          // If this element has a background image and it is a URI
          if(styleImage && styleImage.primitiveType == cssURI)
          {
            image     = new Image();
            image.src = styleImage.getStringValue();

            // If this is not a chrome image
            if(image.src.indexOf("chrome://") !== 0)
            {
              images.push(image);
            }
          }
        }
      }
    }

    images.sort(WebDeveloper.Common.sortImages);

    // Loop through the images
    for(var i = 0, l = images.length; i < l; i++)
    {
      image = images[i];

      // If this is not the last image and the image is the same as the next image
      if(i + 1 < l && image.src == images[i + 1].src)
      {
        continue;
      }

      uniqueImages.push(image);
    }
  }

  return uniqueImages;
};

// Get the position of an element
WebDeveloper.Common.getElementPosition = function(element, xPosition)
{
  var position = 0;

  // If the element is set
  if(element)
  {
    var elementOffsetParent = element.offsetParent;

    // If the element has an offset parent
    if(elementOffsetParent)
    {
      // While there is an offset parent
      while((elementOffsetParent = element.offsetParent) !== null)
      {
        // If getting the x position
        if(xPosition)
        {
          position += element.offsetLeft;
        }
        else
        {
          position += element.offsetTop;
        }

        element = elementOffsetParent;
      }
    }
    else
    {
      // If getting the x position
      if(xPosition)
      {
        position = element.offsetLeft;
      }
      else
      {
        position = element.offsetTop;
      }
    }
  }

  return position;
};

// Get the x position of an element
WebDeveloper.Common.getElementPositionX = function(element)
{
  return WebDeveloper.Common.getElementPosition(element, true);
};

// Get the y position of an element
WebDeveloper.Common.getElementPositionY = function(element)
{
  return WebDeveloper.Common.getElementPosition(element, false);
};

// Returns the text from an element
WebDeveloper.Common.getElementText = function(element)
{
  var elementText = "";

  // If the element is set
  if(element)
  {
    var childNode     = null;
    var childNodes    = element.childNodes;
    var childNodeType = null;

    // Loop through the child nodes
    for(var i = 0, l = childNodes.length; i < l; i++)
    {
      childNode   = childNodes[i];
      childNodeType = childNode.nodeType;

      // If the child node type is an element
      if(childNodeType == Node.ELEMENT_NODE)
      {
        elementText += WebDeveloper.Common.getElementText(childNode);
      }
      else if(childNodeType == Node.TEXT_NODE)
      {
        elementText += childNode.nodeValue + " ";
      }
    }
  }

  return elementText;
};

// Returns the contents of the given URLs
WebDeveloper.Common.getURLContents = function(urlContentRequests, errorMessage, callback)
{
  var urlContentRequestsRemaining = urlContentRequests.length;
  var configuration               = { "callback": callback, "urlContentRequestsRemaining": urlContentRequestsRemaining };

  // Loop through the URL content requests
  for(var i = 0, l = urlContentRequests.length; i < l; i++)
  {
    WebDeveloper.Common.getURLContent(urlContentRequests[i], errorMessage, configuration);
  }
};

// Returns true if an element has the specified class
WebDeveloper.Common.hasClass = function(element, className)
{
  // If the element and class name are set
  if(element && className)
  {
    var classes = element.className.split(" ");

    // Loop through the classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      // If the classes match
      if(className == classes[i])
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if the item is in the array
WebDeveloper.Common.inArray = function(item, array)
{
  return WebDeveloper.Common.positionInArray(item, array) != -1;
};

// Includes JavaScript in a document
WebDeveloper.Common.includeJavaScript = function(url, contentDocument, callback)
{
  var scriptElement = contentDocument.createElement("script");

  // If a callback is set
  if(callback)
  {
    var load = (function(callbackFunction)
    {
      var handler = function()
      {
        callbackFunction();

        scriptElement.removeEventListener("load", handler, true);
      };

      return handler;
    })(callback);

    scriptElement.addEventListener("load", load, true);
  }

  scriptElement.setAttribute("src", WebDeveloper.Common.getChromeURL(url));
  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(scriptElement);
};

// Inserts the given child after the element
WebDeveloper.Common.insertAfter = function(child, after)
{
  // If the child and after are set
  if(child && after)
  {
    var nextSibling = after.nextSibling;
    var parent      = after.parentNode;

    // If the element has a next sibling
    if(nextSibling)
    {
      parent.insertBefore(child, nextSibling);
    }
    else
    {
      parent.appendChild(child);
    }
  }
};

// Inserts the given element as the first child of the element
WebDeveloper.Common.insertAsFirstChild = function(element, child)
{
  // If the element and child are set
  if(element && child)
  {
    // If the element has child nodes
    if(element.hasChildNodes())
    {
      element.insertBefore(child, element.firstChild);
    }
    else
    {
      element.appendChild(child);
    }
  }
};

// Returns true if the ancestor element is an ancestor of the element
WebDeveloper.Common.isAncestor = function(element, ancestorElement)
{
  // If the element and ancestor element are set
  if(element && ancestorElement)
  {
    var parentElement = null;

    // Loop through the parent elements
    while((parentElement = element.parentNode) !== null)
    {
      // If the parent element is the ancestor element
      if(parentElement == ancestorElement)
      {
        return true;
      }
      else
      {
        element = parentElement;
      }
    }
  }

  return false;
};

// Returns the position if the item is in the array or -1 if it is not
WebDeveloper.Common.positionInArray = function(item, array)
{
  // If the array is set
  if(array)
  {
    // Loop through the array
    for(var i = 0, l = array.length; i < l; i++)
    {
      // If the item is in the array
      if(array[i] == item)
      {
        return i;
      }
    }
  }

  return -1;
};

// Removes a class from an element
WebDeveloper.Common.removeClass = function(element, className)
{
  // If the element and class name are set
  if(element && className)
  {
    var classes = element.className.split(" ");

    // Loop through the classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      // If the classes match
      if(className == classes[i])
      {
        classes.splice(i, 1);

        element.className = classes.join(" ").trim();

        break;
      }
    }
  }
};

// Removes all matching elements from a document
WebDeveloper.Common.removeMatchingElements = function(selector, contentDocument)
{
  var matchingElement  = null;
  var matchingElements = contentDocument.querySelectorAll(selector);

  // Loop through the matching elements
  for(var i = 0, l = matchingElements.length; i < l; i++)
  {
    matchingElement = matchingElements[i];

    // If the matching element has a parent node
    if(matchingElement.parentNode)
    {
      matchingElement.parentNode.removeChild(matchingElement);
    }
  }
};

// Removes the reload parameter from a URL
WebDeveloper.Common.removeReloadParameterFromURL = function(url)
{
  // If the URL is set
  if(url)
  {
    return url.replace(/(&|\?)web-developer-reload=\d+/, "");
  }

  return null;
};

// Removes a substring from a string
WebDeveloper.Common.removeSubstring = function(string, substring)
{
  // If the string and substring are not empty
  if(string && substring)
  {
    var substringStart = string.indexOf(substring);

    // If the substring is found in the string
    if(substring && substringStart != -1)
    {
      return string.substring(0, substringStart) + string.substring(substringStart + substring.length, string.length);
    }

    return string;
  }

  return "";
};

// Sorts two images
WebDeveloper.Common.sortImages = function(imageOne, imageTwo)
{
  // If both images are set
  if(imageOne && imageTwo)
  {
    var imageOneSrc = imageOne.src;
    var imageTwoSrc = imageTwo.src;

    // If the images are equal
    if(imageOneSrc == imageTwoSrc)
    {
      return 0;
    }
    else if(imageOneSrc < imageTwoSrc)
    {
      return -1;
    }
  }

  return 1;
};

// Toggles a class on an element
WebDeveloper.Common.toggleClass = function(element, className, value)
{
  // If the value is set
  if(value)
  {
    WebDeveloper.Common.addClass(element, className);
  }
  else
  {
    WebDeveloper.Common.removeClass(element, className);
  }
};

// Toggles a style sheet in a document
WebDeveloper.Common.toggleStyleSheet = function(url, id, contentDocument, insertFirst)
{
  var styleSheet = contentDocument.getElementById(id);

  // If the style sheet is already in the document
  if(styleSheet)
  {
    WebDeveloper.Common.removeMatchingElements("#" + id, contentDocument);
  }
  else
  {
    var headElement = WebDeveloper.Common.getDocumentHeadElement(contentDocument);
    var firstChild  = headElement.firstChild;
    var linkElement = contentDocument.createElement("link");

    linkElement.setAttribute("href", WebDeveloper.Common.getChromeURL(url));
    linkElement.setAttribute("id", id);
    linkElement.setAttribute("rel", "stylesheet");

    // If there is a first child
    if(insertFirst && firstChild)
    {
      headElement.insertBefore(linkElement, firstChild);
    }
    else
    {
      headElement.appendChild(linkElement);
    }
  }
};

// Handles the completion of a URL content request
WebDeveloper.Common.urlContentRequestComplete = function(content, urlContentRequest, configuration)
{
  urlContentRequest.content = content;

  configuration.urlContentRequestsRemaining--;

  // If there are no URL content requests remaining
  if(configuration.urlContentRequestsRemaining === 0)
  {
    configuration.callback();
  }
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common = WebDeveloper.Common || {};

// Clears a notification
WebDeveloper.Common.clearNotification = function()
{
  var notificationBox      = WebDeveloper.Common.getTabBrowser().getNotificationBox();
  var existingNotification = notificationBox.getNotificationWithValue("web-developer-notification");

  // If there is an existing notification
  if(existingNotification)
  {
    notificationBox.removeNotification(existingNotification);
  }
};

// Configures the element with the given attribute and value
WebDeveloper.Common.configureElement = function(element, attribute, value)
{
  // If the element exists
  if(element)
  {
    element.setAttribute(attribute, value);
  }
};

// Converts a value to a boolean
WebDeveloper.Common.convertToBoolean = function(value)
{
  // If the value is false
  if(value == "false")
  {
    return false;
  }

  return Boolean(value).valueOf();
};

// Displays an error message
WebDeveloper.Common.displayError = function(title, message)
{
  Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService).alert(null, title, message);
};

// Displays a notification
WebDeveloper.Common.displayNotification = function(notification, substitutes)
{
  var message         = null;
  var notificationBox = WebDeveloper.Common.getTabBrowser().getNotificationBox();

  // If there are substitutes
  if(substitutes)
  {
    message = WebDeveloper.Locales.getFormattedString(notification, substitutes);
  }
  else
  {
    message = WebDeveloper.Locales.getString(notification);
  }

  WebDeveloper.Common.clearNotification();
  notificationBox.appendNotification(message, "web-developer-notification", "chrome://web-developer/skin/button.png", notificationBox.PRIORITY_INFO_HIGH, null);
};

// Displays a message with a URL
WebDeveloper.Common.displayURLMessage = function(message, url)
{
  window.openDialog("chrome://web-developer/content/dialogs/message.xul", "web-developer-message-dialog", "centerscreen,chrome,modal", message, url);
};

// Handles the completion of a file size request
WebDeveloper.Common.fileSizeRequestComplete = function(fileSize, fileSizeRequest, configuration)
{
  fileSizeRequest.fileObject.size = fileSize;

  configuration.fileSizeRequestsRemaining--;

  // If there are no file size requests remaining
  if(configuration.fileSizeRequestsRemaining === 0)
  {
    configuration.callback();
  }
};

// Formats a file size
WebDeveloper.Common.formatFileSize = function(fileSize, bytesLocale, kilobytesLocale)
{
  // If the file size is set
  if(fileSize)
  {
    // If the file size is greater than a kilobyte
    if(fileSize > 1024)
    {
      return Math.round(fileSize / 1024) + " " + kilobytesLocale;
    }
    else
    {
      return fileSize + " " + bytesLocale;
    }
  }
  else
  {
    return "";
  }
};

// Returns a chrome URL
WebDeveloper.Common.getChromeURL = function(url)
{
  return "chrome://web-developer/content/" + url;
};

// Returns the id for a command
WebDeveloper.Common.getCommandId = function(id)
{
  // If the id is set
  if(id)
  {
    return "web-developer-" + id + "-command";
  }

  return "";
};

// Returns the compressed file size
WebDeveloper.Common.getCompressedFileSize = function(fileSize, fileSizeRequest, configuration, callback)
{
  var url = fileSizeRequest.url;

  // Gets the file from the cache
  WebDeveloper.Common.getFileFromCache(url, function(file)
  {
    // If the file is set
    if(file)
    {
      fileSize.size = file.dataSize;

      callback(file);
    }
    else
    {
      // Try to download the file
      try
      {
        var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

        fileSize.size = ioService.newChannelFromURI(ioService.newURI(url, null, null)).open().available();
      }
      catch(exception)
      {
        fileSize.size = null;
      }

      callback();
    }
  });
};

// Returns the current content document
WebDeveloper.Common.getContentDocument = function()
{
  return WebDeveloper.Common.getSelectedBrowser().contentDocument;
};

// Returns the current content window
WebDeveloper.Common.getContentWindow = function()
{
  return WebDeveloper.Common.getSelectedBrowser().contentWindow;
};

// Returns a CSS property
WebDeveloper.Common.getCSSProperty = function(property)
{
  // If the property is set
  if(property)
  {
    return property[0];
  }

  return null;
};

// Returns the id for a feature
WebDeveloper.Common.getFeatureId = function(id)
{
  // If the id is set
  if(id)
  {
    return id.replace("web-developer-", "").replace("-command", "");
  }

  return "";
};

// Returns a file from the cache
WebDeveloper.Common.getFileFromCache = function(url, callback)
{
  var cacheSession = null;

  // Try to get the file from the cache
  try
  {
    cacheSession                      = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).createSession("HTTP", 0, true);
    cacheSession.doomEntriesIfExpired = false;

    // Open the cache entry asynchronously
    cacheSession.asyncOpenCacheEntry(url, Components.interfaces.nsICache.ACCESS_READ,
    {
      // Handles the cache entry being available
      onCacheEntryAvailable: function(descriptor, accessGranted, status)
      {
        callback(descriptor);
      }
    });
  }
  catch(exception)
  {
    callback();
  }
};

// Returns the size of a file
WebDeveloper.Common.getFileSize = function(fileSizeRequest, configuration)
{
  var fileSize = {};

  // Get the compressed file size
  WebDeveloper.Common.getCompressedFileSize(fileSize, fileSizeRequest, configuration, function(file)
  {
    // If including the uncompressed size and the file is compressed
    if(fileSizeRequest.includeUncompressed && WebDeveloper.Common.isFileCompressed(file))
    {
      WebDeveloper.Common.getUncompressedFileSize(fileSize, fileSizeRequest, configuration);
    }
    else
    {
      WebDeveloper.Common.fileSizeRequestComplete(fileSize, fileSizeRequest, configuration);
    }
  });
};

// Returns the file sizes of the given files
WebDeveloper.Common.getFileSizes = function(fileSizeRequests, callback)
{
  var fileSizeRequestsRemaining = fileSizeRequests.length;
  var configuration             = { "callback": callback, "fileSizeRequestsRemaining": fileSizeRequestsRemaining };

  // Loop through the file size requests
  for(var i = 0, l = fileSizeRequests.length; i < l; i++)
  {
    WebDeveloper.Common.getFileSize(fileSizeRequests[i], configuration);
  }
};

// Returns the main window
WebDeveloper.Common.getMainWindow = function()
{
  return Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
};

// Returns the selected browser
WebDeveloper.Common.getSelectedBrowser = function()
{
  return WebDeveloper.Common.getTabBrowser().selectedBrowser;
};

// Returns the tab browser
WebDeveloper.Common.getTabBrowser = function()
{
  return WebDeveloper.Common.getMainWindow().gBrowser;
};

// Returns the tab that contains the given document
WebDeveloper.Common.getTabForDocument = function(documentElement)
{
  var tabBrowser = WebDeveloper.Common.getTabBrowser();

  // If the tabs are set (requires Firefox 3.6)
  if(tabBrowser.tabs)
  {
    return tabBrowser.tabs[tabBrowser.getBrowserIndexForDocument(documentElement)];
  }
  else
  {
    return tabBrowser.tabContainer.getItemAtIndex(tabBrowser.getBrowserIndexForDocument(documentElement));
  }
};

// Gets the uncompressed size of a file
WebDeveloper.Common.getUncompressedFileSize = function(fileSize, fileSizeRequest, configuration)
{
  // Requests the URL content
  WebDeveloper.Common.requestURLContent(fileSizeRequest.url, "", function(urlContent)
  {
    // If the URL content is set and is larger than the compressed size
    if(urlContent && urlContent.length > fileSize.size)
    {
      fileSize.uncompressedSize = urlContent.length;
    }

    WebDeveloper.Common.fileSizeRequestComplete(fileSize, fileSizeRequest, configuration);
  });
};

// Gets the content from a URL
WebDeveloper.Common.getURLContent = function(urlContentRequest, errorMessage, configuration)
{
  var url = urlContentRequest.url;

  // If the URL is not entirely generated
  if(url.indexOf("wyciwyg://") !== 0)
  {
    var content = null;

    // Gets the file from the cache
    WebDeveloper.Common.getFileFromCache(url, function(file)
    {
      // If the file is set and is not compressed
      if(file && !WebDeveloper.Common.isFileCompressed(file))
      {
        // Try to load the content from the file
        try
        {
          var inputStream      = file.openInputStream(0);
          var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

          scriptableStream.init(inputStream);

          content = scriptableStream.read(scriptableStream.available());

          scriptableStream.close();
          inputStream.close();
        }
        catch(exception)
        {
          content = null;
        }
      }

      // If the content has been loaded
      if(content)
      {
        WebDeveloper.Common.urlContentRequestComplete(content, urlContentRequest, configuration);
      }
      else
      {
        // Requests the URL content
        WebDeveloper.Common.requestURLContent(url, errorMessage, function(urlContent)
        {
          WebDeveloper.Common.urlContentRequestComplete(urlContent, urlContentRequest, configuration);
        });
      }
    });
  }
};

// Returns true if the file is compressed
WebDeveloper.Common.isFileCompressed = function(file)
{
  // If there is a file
  if(file)
  {
    var encoding        = null;
    var responseHeaders = null;

    // Try to get the cache encoding
    try
    {
      // Specific case-sensitive required
      encoding = file.getMetaDataElement("request-Accept-Encoding");
    }
    catch(exception4)
    {
      encoding = null;

      // Try to get the response headers
      try
      {
        // Specific case-sensitive required
        responseHeaders = file.getMetaDataElement("response-head");
      }
      catch(exception5)
      {
        responseHeaders = null;
      }
    }

    // If the cache is not GZIP encoded
    if((!encoding || encoding.indexOf("gzip") == -1) && (!responseHeaders || (responseHeaders.indexOf("Content-Encoding: deflate") == -1 && responseHeaders.indexOf("Content-Encoding: gzip") == -1)))
    {
      return false;
    }
  }

  return true;
};

// Returns true if the extension is running on a Mac
WebDeveloper.Common.isMac = function()
{
  // If the OS is set to Darwin
  if(Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS == "Darwin")
  {
    return true;
  }

  return false;
};

// Logs a message
WebDeveloper.Common.log = function(message)
{
  // If the message is not set
  if(!message)
  {
    message = "null";
  }

  Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService).logStringMessage(message);
};

// Opens the URL in a new tab
WebDeveloper.Common.openURL = function(url)
{
  var tabBrowser = WebDeveloper.Common.getTabBrowser();
  var newTab     = tabBrowser.addTab(url);

  tabBrowser.selectedTab = newTab;

  return newTab;
};

// Returns true if the page has frames
WebDeveloper.Common.pageHasFrames = function()
{
  // If the content document has a frame element
  if(WebDeveloper.Common.getContentDocument().getElementsByTagName("frame").length > 0)
  {
    return true;
  }

  return false;
};

// Removes the given attribute from an element
WebDeveloper.Common.removeElementAttribute = function(element, attribute)
{
  // If the element exists
  if(element)
  {
    element.removeAttribute(attribute);
  }
};

// Requests the URL content
WebDeveloper.Common.requestURLContent = function(url, errorMessage, callback)
{
  // Try to request the URL
  try
  {
    var request = new XMLHttpRequest();

    request.timeout = WebDeveloper.Common.requestTimeout;

    request.onreadystatechange = function()
    {
      // If the request completed
      if(request.readyState == 4)
      {
        callback(request.responseText);
      }
    };

    request.ontimeout = function()
    {
      callback(errorMessage);
    };

    request.open("get", url);
    request.send(null);
  }
  catch(exception)
  {
    callback(errorMessage);
  }
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated                    = WebDeveloper.Generated || {};
WebDeveloper.Generated.animationSpeed     = 200;
WebDeveloper.Generated.maximumURLLength   = 100;
WebDeveloper.Generated.syntaxHighlighters = [];

// Adds a document
WebDeveloper.Generated.addDocument = function(documentURL, documentCount, itemDescription, itemCount)
{
  var childElement = document.createElement("a");
  var element      = document.createElement("h2");
  var fragment     = document.createDocumentFragment();

  childElement.appendChild(document.createTextNode(documentURL));

  childElement.setAttribute("href", documentURL);
  element.setAttribute("id", "document-" + (documentCount + 1));
  element.appendChild(childElement);
  fragment.appendChild(element);

  element      = document.createElement("li");
  childElement = document.createElement("a");

  childElement.appendChild(document.createTextNode(WebDeveloper.Generated.formatURL(documentURL)));
  childElement.setAttribute("href", "#document-" + (documentCount + 1));
  element.appendChild(childElement);
  $(".dropdown-menu", $("#documents-dropdown")).get(0).appendChild(element);

  // If the item description is set
  if(itemDescription)
  {
    element = document.createElement("h3");

    // If there are items
    if(itemCount !== 0)
    {
      childElement = document.createElement("i");

      childElement.setAttribute("class", "icon-caret-down");
      element.appendChild(childElement);
    }

    element.appendChild(document.createTextNode(itemCount + " " + itemDescription));
    fragment.appendChild(element);
  }

  document.getElementById("content").appendChild(fragment);
};

// Adds a separator
WebDeveloper.Generated.addSeparator = function()
{
  var separator = document.createElement("div");

  separator.setAttribute("class", "web-developer-separator");
  document.getElementById("content").appendChild(separator);
};

// Changes the syntax highlight theme
WebDeveloper.Generated.changeSyntaxHighlightTheme = function(event)
{
  var themeMenu = $(this);
  var themeIcon = $("i", themeMenu);

  // If this is not the current theme
  if(themeIcon.hasClass("icon-empty"))
  {
    var theme = themeMenu.attr("id").replace("web-developer-syntax-highlighting-", "");

    // If there is no theme
    if(theme == "none")
    {
      $(".CodeMirror").hide();
      $(".web-developer-syntax-highlight").show();
    }
    else if(WebDeveloper.Generated.syntaxHighlighters.length)
    {
      $(".CodeMirror").show();
      $(".web-developer-syntax-highlight").hide();

      // Loop through the syntax highlighters
      for(var i = 0, l = WebDeveloper.Generated.syntaxHighlighters.length; i < l; i++)
      {
        WebDeveloper.Generated.syntaxHighlighters[i].setOption("theme", theme);
      }
    }
    else
    {
      WebDeveloper.Generated.initializeSyntaxHighlight(theme);
    }

    $(".dropdown-menu .icon-ok", $("#web-developer-syntax-highlighting-dropdown")).removeClass("icon-ok").addClass("icon-empty");
    themeIcon.removeClass("icon-empty").addClass("icon-ok");
  }

  event.preventDefault();
};

// Collapses all the output
WebDeveloper.Generated.collapseAllOutput = function(event)
{
  // Loop through the output headers
  $("h3").each(function()
  {
    var header = $(this);

    $("i", header).removeClass("icon-caret-down").addClass("icon-caret-right");
    header.next().slideUp(WebDeveloper.Generated.animationSpeed);
  });

  event.preventDefault();
};

// Empties the content
WebDeveloper.Generated.emptyContent = function()
{
  $(".progress", $("#content")).remove();
};

// Expands all the output
WebDeveloper.Generated.expandAllOutput = function(event)
{
  // Loop through the output headers
  $("h3").each(function()
  {
    var header = $(this);

    $("i", header).removeClass("icon-caret-right").addClass("icon-caret-down");
    header.next().slideDown(WebDeveloper.Generated.animationSpeed);
  });

  // If the event is set
  if(event)
  {
    event.preventDefault();
  }
};

// Formats a URL
WebDeveloper.Generated.formatURL = function(url)
{
  // If the URL is set
  if(url && url.length > WebDeveloper.Generated.maximumURLLength)
  {
    var halfLength = WebDeveloper.Generated.maximumURLLength / 2;

    return url.substring(0, halfLength) + "..." + url.substr(-halfLength);
  }

  return url;
};

// Generates a document container
WebDeveloper.Generated.generateDocumentContainer = function()
{
  var documentContainer = document.createElement("div");

  documentContainer.setAttribute("class", "web-developer-document");

  return documentContainer;
};

// Initializes the common page elements
WebDeveloper.Generated.initializeCommonElements = function()
{
  $("i", $("h3")).on("click", WebDeveloper.Generated.toggleOutput);
  $("#web-developer-collapse-all").on("click", WebDeveloper.Generated.collapseAllOutput);
  $("#web-developer-expand-all").on("click", WebDeveloper.Generated.expandAllOutput);

  // If there is a nav bar
  if($(".navbar").length)
  {
    $(".dropdown-toggle").dropdown();
  }
};

// Initializes the syntax highlight functionality
WebDeveloper.Generated.initializeSyntaxHighlight = function(color, locale)
{
  // If the locale is set
  if(locale)
  {
    $(".dropdown-toggle", $("#web-developer-syntax-highlighting-dropdown")).prepend(locale.syntaxHighlighting);
    $("#web-developer-syntax-highlighting-dark").append(locale.dark);
    $("#web-developer-syntax-highlighting-light").append(locale.light);
    $("#web-developer-syntax-highlighting-none").append(locale.none);

    $(".dropdown-menu a", $("#web-developer-syntax-highlighting-dropdown")).on("click", WebDeveloper.Generated.changeSyntaxHighlightTheme);
    $("i", $("#web-developer-syntax-highlighting-" + color)).removeClass("icon-empty").addClass("icon-ok");
  }

  // If a color is set
  if(color != "none")
  {
    // Loop through the syntax highlight elements
    $(".web-developer-syntax-highlight").each(function()
    {
      var pre = $(this);

      window.setTimeout(function()
      {
        WebDeveloper.Generated.syntaxHighlighters.push(CodeMirror(function(element)
        {
          pre.after(element);
          pre.hide();
        },
        {
          lineNumbers: pre.data("line-numbers"),
          mode: pre.data("type"),
          readOnly: true,
          tabSize: 2,
          theme: color,
          value: pre.text()
        }));
      }, 0);
    });
  }
};

// Initializes the page with JSON data
WebDeveloper.Generated.initializeWithJSON = function(event)
{
  var eventTarget = event.target;

  WebDeveloper.Generated.initialize(JSON.parse(eventTarget.getAttribute("data-web-developer")), JSON.parse(eventTarget.getAttribute("data-web-developer-locale")));

  eventTarget.removeAttribute("data-web-developer");
  eventTarget.removeAttribute("data-web-developer-locale");

  window.removeEventListener("web-developer-generated-event", WebDeveloper.Generated.initializeWithJSON, false);
};

// Localizes the header
WebDeveloper.Generated.localizeHeader = function(locale)
{
  $("#web-developer-collapse-all").text(locale.collapseAll);
  $("#web-developer-expand-all").text(locale.expandAll);
  $(".dropdown-toggle", $("#documents-dropdown")).prepend(locale.documents);
  $("span.brand").text(locale.webDeveloper);
};

// Outputs content
WebDeveloper.Generated.output = function(title, url, anchor, type, outputOriginal)
{
  var childElement      = document.createElement("i");
  var container         = document.createElement("pre");
  var content           = document.getElementById("content");
  var documentContainer = WebDeveloper.Generated.generateDocumentContainer();
  var element           = document.createElement("h3");
  var outputContainers  = [];
  var outputTitle       = title;

  childElement.setAttribute("class", "icon-caret-down");
  element.appendChild(childElement);
  element.setAttribute("id", anchor);

  // If the URL is set
  if(url)
  {
    childElement = document.createElement("a");
    outputTitle  = WebDeveloper.Generated.formatURL(url);

    childElement.appendChild(document.createTextNode(outputTitle));
    childElement.setAttribute("href", url);
    element.appendChild(childElement);
  }
  else
  {
    element.appendChild(document.createTextNode(outputTitle));
  }

  content.appendChild(element);

  childElement = document.createElement("a");
  element      = document.createElement("li");

  childElement.appendChild(document.createTextNode(outputTitle));
  childElement.setAttribute("href", "#" + anchor);
  element.appendChild(childElement);
  $(".dropdown-menu", $("#files-dropdown")).get(0).appendChild(element);

  container.setAttribute("class", "web-developer-syntax-highlight");
  container.setAttribute("data-line-numbers", "true");
  container.setAttribute("data-type", type);
  documentContainer.appendChild(container);
  outputContainers.push($(container));

  // If the original should be output
  if(outputOriginal)
  {
    var originalContainer = document.createElement("pre");

    originalContainer.setAttribute("class", "web-developer-original");
    documentContainer.appendChild(originalContainer);
    outputContainers.push($(originalContainer));
  }

  content.appendChild(documentContainer);
  WebDeveloper.Generated.addSeparator();

  return outputContainers;
};

// Sets the page title
WebDeveloper.Generated.setPageTitle = function(type, data, locale)
{
  document.title = type + " " + locale.from.toLowerCase() + " " + WebDeveloper.Generated.formatURL(data.pageURL);

  $("a.brand", $(".navbar")).text(type);
};

// Toggles the collapsed state of an output
WebDeveloper.Generated.toggleOutput = function()
{
  $(this).toggleClass("icon-caret-down").toggleClass("icon-caret-right").parent().next().slideToggle(WebDeveloper.Generated.animationSpeed);
};

window.addEventListener("web-developer-generated-event", WebDeveloper.Generated.initializeWithJSON, false);
