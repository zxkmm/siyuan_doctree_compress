/******** simple css injections **********/
export function disableDocumentButtonsPopup() {
  const css = `
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n:hover::after,
        .b3-list-item__action.b3-tooltips.b3-tooltips__nw:hover::after,
        .popover__block.b3-tooltips.b3-tooltips__nw:hover::after {
          display: none;
        }                    
       `;
  applyStyles(css);
}

export function displayIconButDisableIconClick() {
  const css = `
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n[aria-label="修改图标"],
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n[aria-label="Change icon"] {
        pointer-events: none;
        }
       `;
  applyStyles(css);
}

export function mouseOverReduceFontSize(_force_, _px_) {
  const css = _force_
    ? `
        .layout-tab-container .b3-list-item__text {
            transition: font-size 0.2s ease;
        }
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            font-size: ${_px_}px !important;
         }
         `
    : `
        .layout-tab-container .b3-list-item__text {
            transition: font-size 0.2s ease;
        }
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            font-size: ${_px_}px;
         }`;
  applyStyles(css);
}

export function mouseOverLineUnclamp(_force_) {
  const css = _force_
    ? `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            overflow:visible !important;
         -webkit-line-clamp: unset;
         }
         `
    : `
         .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            overflow:visible;
         -webkit-line-clamp: unset;
         }`;

  applyStyles(css);
}

export function hideContextualLabel() {
  const css = `
        .fn__flex-1.fn__flex-column.file-tree.sy__file .ariaLabel:hover {
            pointer-events: none;
          }                      
       `;

  applyStyles(css);
}

export function overloadLineHeight(_force_, _px_) {
  const css = _force_
    ? `
        .layout-tab-container .b3-list-item__text {
            line-height: ${_px_}px !important;
         }
         `
    : `
         .layout-tab-container .b3-list-item__text {
            line-height: ${_px_}px;
         }`;

  applyStyles(css);
}

export function addSeperateLine(_border_) {
  const css = `
        .layout-tab-container .b3-list-item__text {
            border-top: ${_border_}px solid #eaecef;
        }
        `;
  applyStyles(css);
}

export function addNotebookOutline(_mode_) {
  //by https://github.com/TCOTC aka @Jeffrey Chen
  const css_tight_ = `
        .sy__file ul.b3-list.b3-list--background {
            border-radius: 0.1em;
            margin: 7px 4px 7px 4px;
            outline: 1.9px solid var(--b3-theme-background-light);
            overflow: hidden;
        }
        `;
  const css_normal_ = `
        .sy__file ul.b3-list.b3-list--background {
            border-radius: 0.3em;
            margin: 7px 10px 6px 10px;
            outline: 2px solid var(--b3-theme-background-light);
            overflow: hidden;
        }
        `;

  const css_high_contrast_ = `
        .sy__file ul.b3-list.b3-list--background {
            border-radius: 0.3em;
            margin: 6px 10px 6px 12px;
            outline: 1.5px double #8e9ba3;
            overflow: hidden;
        }
        `;
  if (_mode_ == 1) {
    applyStyles(css_normal_);
  } else if (_mode_ == 2) {
    applyStyles(css_tight_);
  } else if (_mode_ == 3) {
    applyStyles(css_high_contrast_);
  }
}

export function rmvDoctreeIcons(_force_) {
  const css = _force_
    ? `
            .b3-list-item__icon {
                display: none !important;
            }
            `
    : `
            .b3-list-item__icon {
                display: none;
            }
            `;

  applyStyles(css);
}

export function overloadDoctreeFontSize(_force_, _px_) {
  const css =
    _force_ == true
      ? `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_px_}px !important;
        }
        `
      : `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_px_}px;
        }
        `;
  applyStyles(css);
}

/********** has script and injections *********/
export function addFrontLine(
  _implementation_,
  _line_location_,
  _padding_,
  _border_
) {
  console.log(_implementation_);

  if (Number(_padding_) >= Number(_line_location_)) {
    _padding_ = _line_location_;
  }

  var css;

  switch (_implementation_) {
    case "1":
      css = ` .b3-list ul {
                position: relative;
                }

                /* main */
                .b3-list ul::before {
                content: '';
                position: absolute;
                left: 20px;
                top: 0;
                height: 100%;
                border-left: ${_border_}px solid var(--b3-theme-background-light);
                z-index: 1;
                }

                .b3-list ul ul::before {
                left: 38px;
                }

                .b3-list ul ul ul::before {
                left: 56px;
                }

                .b3-list ul ul ul ul::before {
                left: 74px;
                }

                .b3-list ul ul ul ul ul::before {
                left: 92px;
                }

                .b3-list ul ul ul ul ul ul::before {
                left: 110px;
                }

                .b3-list ul ul ul ul ul ul ul::before {
                left: 128px;
                }

                .b3-list ul ul ul ul ul ul ul ul::before {
                left: 146px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul::before {
                left: 164px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul::before {
                left: 182px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 200px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 218px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 236px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 254px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 272px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 290px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 308px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 326px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 344px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 362px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 380px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 398px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 416px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 434px;
                }

                .b3-list ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul ul::before {
                left: 452px;
                }
                `;
      break;

    case "2":
      css = `
                .layout-tab-container .b3-list-item > .b3-list-item__toggle {
                    position: relative; 
                    padding-left: 4px !important;
                }
                
                .layout-tab-container ul ul::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: ${_line_location_}px;
                    border-left: ${_border_}px solid var(--b3-theme-background-light);
                }
                
                .layout-tab-container ul ul {
                    position: relative;
                    padding-left: ${_padding_}px;
                }
                
                .layout-tab-container ul ul::after {
                    content: "";
                    position: absolute;
                    left: ${_line_location_}px;
                    border-bottom: var(--custom-block-list-guides-line-width) solid var(--b3-theme-on-surface) !important;
                    width: 0px; //dunno what's this currently
                    height: 0;
                }
                
                .layout-tab-container ul ul::before {
                    content: "";
                    position: absolute;
                    top: 0px; // make the line go down for x px.
                    left: ${_line_location_}px;
                    border-top: var(--custom-block-list-guides-line-width) solid var(--b3-theme-on-surface);
                }
                
                `;
      break;

    case "3":
      css = `

                .layout-tab-container .b3-list-item > .b3-list-item__toggle {
                    padding-left: 4px !important;
                }
        
                .layout-tab-container ul ul:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: ${_line_location_}px;
                    border-left: ${_border_}px solid var(--b3-theme-background-light);
                }
                
                .layout-tab-container ul ul {
                    position: relative;
                    padding-left: ${_padding_}px;
                }
                
                `;

    case "4":
      css = `
                .layout-tab-container .b3-list-item > .b3-list-item__toggle {
                    padding-left: 4px !important;
                }
        
                .layout-tab-container ul ul:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: ${_line_location_}px;
                    border-left: ${_border_}px solid var(--b3-theme-background-light);
                }
                
                .layout-tab-container ul ul {
                    position: relative;
                    padding-left: ${_padding_}px;
                }
        
                .layout-tab-container ul ul:hover:before {
                    border-left-color: var(--b3-theme-on-primary);
                }
                `;
      break;
  }

  applyStyles(css);
}

export function mouseOverZeroPadding(_force_, _px_, _style_) {
  switch (_style_) {
    case "1":
      const css_padding_toggle = _force_
        ? `
                  .layout-tab-container .b3-list-item__toggle {
                      transition: padding-left 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                      padding-left: ${_px_}px !important;
                  }
                  `
        : `
                  .layout-tab-container .b3-list-item__toggle {
                      transition: padding-left 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                      padding-left: ${_px_}px;
                  }`;
      applyStyles(css_padding_toggle);
      break;

    case "2":
      const css_padding_icon = _force_
        ? `
                  .layout-tab-container .b3-list-item__icon {
                      transition: padding-left 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__icon {
                      padding-left: ${_px_}px !important;
                  }
                  `
        : `
                  .layout-tab-container .b3-list-item__icon {
                      transition: padding-left 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__icon {
                      padding-left: ${_px_}px;
                  }`;
      applyStyles(css_padding_icon);

      ///worker moving padding from toggle into icon
      function moving_padding_from_toggle_into_icon() {
        var toggles = document.getElementsByClassName("b3-list-item__toggle");
        for (var i = 0; i < toggles.length; i++) {
          var paddingLeft = window
            .getComputedStyle(toggles[i], null)
            .getPropertyValue("padding-left");
          var icon =
            toggles[i].parentNode.getElementsByClassName(
              "b3-list-item__icon"
            )[0];
          if (icon && paddingLeft !== _px_ + "px") {
            icon.style.paddingLeft = paddingLeft;
            toggles[i].style.paddingLeft = _px_ + "px"; // 将 padding-left 设为 0
          }
        }
      }

      moving_padding_from_toggle_into_icon();

      var observer = new MutationObserver(function (mutations) {
        moving_padding_from_toggle_into_icon();
      });

      var config = { childList: true, subtree: true };

      observer.observe(document, config);

      break;

    case "3":
      ///worker moving left padding of toggle into right

      function moving_left_padding_into_right() {
        var toggles = document.getElementsByClassName("b3-list-item__toggle");
        for (var i = 0; i < toggles.length; i++) {
          var paddingLeft = window
            .getComputedStyle(toggles[i], null)
            .getPropertyValue("padding-left");
          if (paddingLeft !== _px_ + "px") {
            toggles[i].style.paddingRight = paddingLeft;
            toggles[i].style.paddingLeft = _px_ + "px";
          }
        }
      }

      moving_left_padding_into_right();

      var observer = new MutationObserver(function (mutations) {
        moving_left_padding_into_right();
      });

      var config = { childList: true, subtree: true };

      observer.observe(document, config);

      const css_padding_icon_LR = _force_
        ? `
                  .layout-tab-container .b3-list-item__toggle {
                      transition: padding-right 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                      padding-right: ${_px_}px !important;
                  }
                  `
        : `
                  .layout-tab-container .b3-list-item__toggle {
                      transition: padding-right 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                      padding-right: ${_px_}px;
                  }`;
      applyStyles(css_padding_icon_LR);

      break;

    case "4":
      const css_padding_text = _force_
        ? `
                  .layout-tab-container .b3-list-item__text {
                      transition: padding-left 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                      padding-left: ${_px_}px !important;
                  }
                  `
        : `
                  .layout-tab-container .b3-list-item__text {
                      transition: padding-left 0.2s ease;
                  }
                  .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                      padding-left: ${_px_}px;
                  }`;
      applyStyles(css_padding_text);

      /// worker padding text

      function moving_padding_from_toggle_into_text() {
        var toggles = document.getElementsByClassName("b3-list-item__toggle");
        for (var i = 0; i < toggles.length; i++) {
          var paddingLeft = window
            .getComputedStyle(toggles[i], null)
            .getPropertyValue("padding-left");
          var text =
            toggles[i].parentNode.getElementsByClassName(
              "b3-list-item__text"
            )[0];
          if (text && paddingLeft !== _px_ + "px") {
            text.style.paddingLeft = paddingLeft;
            toggles[i].style.paddingLeft = _px_ + "px"; // 将 padding-left 设为 0
          }
        }
      }

      moving_padding_from_toggle_into_text();

      var observer = new MutationObserver(function (mutations) {
        moving_padding_from_toggle_into_text();
      });

      var config = { childList: true, subtree: true };

      observer.observe(document, config);
  }
}

/******** helpers ***********/
export function applyStyles(css) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}
