import { Injectable, Inject } from 'angular2/core';

// This service adapted from:
// https://github.com/IBM-Watson/wea-ui-accelerator
//    /app/modules/dialog/dialog-parser-service.js

@Injectable()
export class DialogParser {
  constructor() { }
  /**
   * @name DialogParser
   * @module dialog/parser
   * @description
   *
   * Translates the response from the backend (received via
   * {@link DialogService#query} to a format that can be rendered by
   *  the application.
   * Most often it achieves this by replacing the received markup with
   *    calls to our own directives.
   * For example, given a response markup such as
   *
   * ```html
   * <ul class="bubbles">
   *   <li>
   *     <mct:input>Yes</mct:input>
   *   </li>
   *   <li>
   *     <mct:input>No</mct:input>
   *   </li>
   * </ul>
   * ```
   *
   * `DialogParser` recognizes the `<mct:input>` elements and replaces them
   * with calls to our own <autoinput> directive:
   *
   * ```html
   * <ul class="bubbles">
   *   <li>
   *     <mct:input>Yes</mct:input>
   *   </li>
   *   <li>
   *     <mct:input>No</mct:input>
   *   </li>
   * </ul>
   * ```
   *
   * `DialogParser` also offers methods for extracting any pre-submit messages
   * or follow-up questions contained in the response and determining
   * the response template type.
   */


   parseNLSVisualTags(text: string): string {
     // visual_bar, visual_pie, visual_map, visual_list, visual_line, visual_column ....
    //  let result: string = text;
    //  let visualTypes: [string] = ['bar', 'pie', 'map', 'list', 'line', 'column' ];
    //  for ( let s in visualTypes ) {
    //    if (s !== '') {
    //
    //      result = text.replace(
    //        '<mct:hide>visual_' + s + '</mct:hide>',
    //        '<div class=\"VisualReference\">Please see the ' + s
    //          + ' visual to the right</div>' );
    //   }
    //  }

     return text.replace(
       /<mct\:hide>visual_([^]*?)<\/mct\:hide>/g,
       '<div class=\"VisualReference dialog watson\">Please see the $1 visual to the right</div>' );
   }

    parseMctInputTag(text: string): string {
      // the following is a hack to make the dynamic text clickable
      return text.replace(
        /<mct\:input>([^]*?)<\/mct\:input>/g,
        '<autoinput onclick=\"var el = document.querySelector(\'#chatInput\'); '
        + 'el.value=\'$1\'; var bu = document.querySelector(\'#chatButton\'); bu.click();\"> $1</autoinput>'
      );
    };

    parseMctSelectTag(text: string): string {
      let parseOptions = function (input) {
        let optionPattern = /<mct\:option>([^]*?)<\/mct:option>/g;
        let options = input.match(optionPattern);
        if (options) {
          options = options.map(function (option) {
            return option.replace(optionPattern, '$1');
          });
        }
        return options ? options : [];
      };
      return text
        .replace(
          /<mct\:select>[^]*<\/mct\:select>/g,
          '<autoselect data-options="' + parseOptions(text).join(';') + '"></autoselect>'
        );
    };

    parseMctDatetimeTag(text: string): string {
      return text.replace(
        /<mct\:datetime([^]*?)<\/mct\:datetime>/g,
        '<datetime$1</datetime>'
      );
    };

    parseMctAutolearnitemsTag(text: string): string {
      return text
        .replace(
          /<mct\:autolearnitems>([^]*?)<\/mct\:autolearnitems>/g,
          '<ul class="boxes didyoumean">$1</ul>'
        )
        .replace(
          /<mct\:item>([^]*?)<\/mct\:item>/g,
          '<li><autoinput onclick=\"var el = document.querySelector(\'#chatInput\'); '
          + 'el.value=\'$1\'; var bu = document.querySelector(\'#chatButton\'); bu.click();\"> $1</autoinput></li>'
        );

    };

    parseMctQuestionTag(text: string): string {
      return text
        .replace(
          /<mct\:question>([^]*?)<\/mct\:question>/g,
          '$1'
        );
    };

    parseMctAvatarTag(text: string): string {
      // console.log('parseMctAvatarTag(' + text + ')' );
      return text.replace(
        /<mct\:avatar([^]*?)<\/mct\:avatar>/g,
        '<watson-avatar ng-click="dialogCtrl.restart()"$1</watson-avatar>'
      );
    };

    parseMctFeedbackTag(text: string): string {
      return text.replace(
        /<mct\:feedback([^]*?)<\/mct\:feedback>/g,
        '<feedback$1</feedback>'
      );
    };

    removeBrsWithinTag(text: string, tagName: string): string {
      let tagContents: RegExp = new RegExp('(<' + tagName + '.*?>)' + '([^]*?)'
        + '(<\/' + tagName + '>)', 'g');
      return text
        .replace(tagContents, function (match, startTag, contents, endTag) {
          return startTag + contents.replace(/<br>/g, '') + endTag;
        });
    };

    removeBrsWithinUls(text: string): string {
      // console.log ('removeBrsWithinUls ' + this);
      return this.removeBrsWithinTag(text, 'ul');
    };

    replaceNewlines(text: string): string {
      return text.replace(/\n\n/g, '\n<br />');
    };

    addLinkTargets(text: string): string {
      return text.replace(
        /<a ([^]*?)<\/a>/g,
        '<a target="_blank" $1</a>'
      );
    };

    /**
     * Parses a response received from {@link DialogService#query}.
     *
     * @param {object} response - A response object received
     *    from {@link DialogService#query}.
     * @return {string} Markup ready to be rendered in the view.
     */
    parse(text: string): string {
      // console.log('parse(' + text + ')');
      let parsed: string = text;
      // console.log('  parsed=' + parsed );
      parsed = this.parseNLSVisualTags(parsed);
      parsed = this.parseMctAvatarTag(parsed);
      parsed = this.parseMctInputTag(parsed);
      // console.log('after parsing parseMctInputTag:\n' + parsed);
      parsed = this.parseMctSelectTag(parsed);
      parsed = this.parseMctDatetimeTag(parsed);
      parsed = this.parseMctAutolearnitemsTag(parsed);
      // console.log('after parseMctAutolearnitemsTag:\n' + parsed);
      parsed = this.parseMctQuestionTag(parsed);
      // console.log('after parseMctQuestionTag:\n' + parsed);
      parsed = this.parseMctFeedbackTag(parsed);
      parsed = this.replaceNewlines(parsed);
      parsed = this.removeBrsWithinUls(parsed);
      // console.log('after removeBrsWithinUls:\n' + parsed);
      parsed = this.addLinkTargets(parsed);
      console.log('after addLinkTargets:\n' + parsed);
      return parsed;
    };

    /**
     * Extracts a follow-up question from a response received from
     * {@link DialogService#query}. Looks for `<mct:question>` tags
     * in the response text and returns the text of the first one it finds.
     *
     * @param {object} response - A response object received
     *    from {@link DialogService#query}.
     * @return {string} Text of the first follow-up question found in the response.
     */
    parseFollowUpQuestion(text: string): string {
      let questionPattern = /<mct\:question>([^]*?)<\/mct:question>/g;
      let questions;
      questions = text.match(questionPattern);
      if (questions) {
        questions = questions.map(function (question) {
          return question.replace(questionPattern, '$1');
        });
      }
      return questions ? questions[0] : '';
    };

    /**
     * Extracts a preflight message from a response received from
     * {@link DialogService#query}. Looks for `<mct:pre-submit>` tags
     * in the response text and returns the text of the first one it finds.
     * Preflight messages are special messages that are intended to be sent
     * before any following user-generated messages.
     *
     * @param {object} response - A response object received
     *    from {@link DialogService#query}.
     * @return {string} Text of the first preflight message found in the response.
     */
    parsePreflight(text: string): string {
      let preflightPattern: RegExp = /<mct\:pre-submit>([^]*?)<\/mct:pre-submit>/g;
      let preflights;
      preflights = text.match(preflightPattern);
      if (preflights) {
        preflights = preflights.map(function (preflight) {
          return preflight.replace(preflightPattern, '$1');
        });
      }
      return preflights ? preflights[0] : '';
    };

    /**
     * Detects the response template type from a response received from
     * {@link DialogService#query}. Looks for known template types in class attributes
     * of any elements in response texts.
     *
     * @param {object} response - A response object received from
     *    {@link DialogService#query}.
     * @return {string} Detected response template type or `'default'` if not recognized.
     */
    // parseType(text: string): string {
    //   let knownTypes = [ 'summary', 'confirmation', 'transition' ];
    //   let parsedType = knownTypes.find(function (typeName) {
    //     let typePattern: RegExp = new RegExp('<div class="' + typeName + '(\\s|")');
    //     return typePattern.test(text);
    //   });
    //
    //   return parsedType || 'default';
    // };

    // return {
    //   'parse': parse,
    //   'parseFollowUpQuestion': parseFollowUpQuestion,
    //   'parsePreflight': parsePreflight,
    //   'parseType': parseType
    // };

}
