/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+bicep+css-extras+csv+docker+go+go-module+json+json5+log+makefile+markdown+mermaid+plant-uml+powershell+python+regex+shell-session+textile+vim+yaml&plugins=line-highlight+show-language+inline-color+toolbar+copy-to-clipboard+treeview */
var _self =
		'undefined' != typeof window
			? window
			: 'undefined' != typeof WorkerGlobalScope &&
			  self instanceof WorkerGlobalScope
			? self
			: {},
	Prism = (function (e) {
		var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
			t = 0,
			r = {},
			a = {
				manual: e.Prism && e.Prism.manual,
				disableWorkerMessageHandler:
					e.Prism && e.Prism.disableWorkerMessageHandler,
				util: {
					encode: function e(n) {
						return n instanceof i
							? new i(n.type, e(n.content), n.alias)
							: Array.isArray(n)
							? n.map(e)
							: n
									.replace(/&/g, '&amp;')
									.replace(/</g, '&lt;')
									.replace(/\u00a0/g, ' ');
					},
					type: function (e) {
						return Object.prototype.toString.call(e).slice(8, -1);
					},
					objId: function (e) {
						return (
							e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id
						);
					},
					clone: function e(n, t) {
						var r, i;
						switch (((t = t || {}), a.util.type(n))) {
							case 'Object':
								if (((i = a.util.objId(n)), t[i])) return t[i];
								for (var l in ((r = {}), (t[i] = r), n))
									n.hasOwnProperty(l) && (r[l] = e(n[l], t));
								return r;
							case 'Array':
								return (
									(i = a.util.objId(n)),
									t[i]
										? t[i]
										: ((r = []),
										  (t[i] = r),
										  n.forEach(function (n, a) {
												r[a] = e(n, t);
										  }),
										  r)
								);
							default:
								return n;
						}
					},
					getLanguage: function (e) {
						for (; e; ) {
							var t = n.exec(e.className);
							if (t) return t[1].toLowerCase();
							e = e.parentElement;
						}
						return 'none';
					},
					setLanguage: function (e, t) {
						(e.className = e.className.replace(RegExp(n, 'gi'), '')),
							e.classList.add('language-' + t);
					},
					currentScript: function () {
						if ('undefined' == typeof document) return null;
						if ('currentScript' in document) return document.currentScript;
						try {
							throw new Error();
						} catch (r) {
							var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) ||
								[])[1];
							if (e) {
								var n = document.getElementsByTagName('script');
								for (var t in n) if (n[t].src == e) return n[t];
							}
							return null;
						}
					},
					isActive: function (e, n, t) {
						for (var r = 'no-' + n; e; ) {
							var a = e.classList;
							if (a.contains(n)) return !0;
							if (a.contains(r)) return !1;
							e = e.parentElement;
						}
						return !!t;
					},
				},
				languages: {
					plain: r,
					plaintext: r,
					text: r,
					txt: r,
					extend: function (e, n) {
						var t = a.util.clone(a.languages[e]);
						for (var r in n) t[r] = n[r];
						return t;
					},
					insertBefore: function (e, n, t, r) {
						var i = (r = r || a.languages)[e],
							l = {};
						for (var o in i)
							if (i.hasOwnProperty(o)) {
								if (o == n)
									for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
								t.hasOwnProperty(o) || (l[o] = i[o]);
							}
						var u = r[e];
						return (
							(r[e] = l),
							a.languages.DFS(a.languages, function (n, t) {
								t === u && n != e && (this[n] = l);
							}),
							l
						);
					},
					DFS: function e(n, t, r, i) {
						i = i || {};
						var l = a.util.objId;
						for (var o in n)
							if (n.hasOwnProperty(o)) {
								t.call(n, o, n[o], r || o);
								var s = n[o],
									u = a.util.type(s);
								'Object' !== u || i[l(s)]
									? 'Array' !== u || i[l(s)] || ((i[l(s)] = !0), e(s, t, o, i))
									: ((i[l(s)] = !0), e(s, t, null, i));
							}
					},
				},
				plugins: {},
				highlightAll: function (e, n) {
					a.highlightAllUnder(document, e, n);
				},
				highlightAllUnder: function (e, n, t) {
					var r = {
						callback: t,
						container: e,
						selector:
							'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
					};
					a.hooks.run('before-highlightall', r),
						(r.elements = Array.prototype.slice.apply(
							r.container.querySelectorAll(r.selector)
						)),
						a.hooks.run('before-all-elements-highlight', r);
					for (var i, l = 0; (i = r.elements[l++]); )
						a.highlightElement(i, !0 === n, r.callback);
				},
				highlightElement: function (n, t, r) {
					var i = a.util.getLanguage(n),
						l = a.languages[i];
					a.util.setLanguage(n, i);
					var o = n.parentElement;
					o && 'pre' === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
					var s = { element: n, language: i, grammar: l, code: n.textContent };
					function u(e) {
						(s.highlightedCode = e),
							a.hooks.run('before-insert', s),
							(s.element.innerHTML = s.highlightedCode),
							a.hooks.run('after-highlight', s),
							a.hooks.run('complete', s),
							r && r.call(s.element);
					}
					if (
						(a.hooks.run('before-sanity-check', s),
						(o = s.element.parentElement) &&
							'pre' === o.nodeName.toLowerCase() &&
							!o.hasAttribute('tabindex') &&
							o.setAttribute('tabindex', '0'),
						!s.code)
					)
						return a.hooks.run('complete', s), void (r && r.call(s.element));
					if ((a.hooks.run('before-highlight', s), s.grammar))
						if (t && e.Worker) {
							var c = new Worker(a.filename);
							(c.onmessage = function (e) {
								u(e.data);
							}),
								c.postMessage(
									JSON.stringify({
										language: s.language,
										code: s.code,
										immediateClose: !0,
									})
								);
						} else u(a.highlight(s.code, s.grammar, s.language));
					else u(a.util.encode(s.code));
				},
				highlight: function (e, n, t) {
					var r = { code: e, grammar: n, language: t };
					if ((a.hooks.run('before-tokenize', r), !r.grammar))
						throw new Error(
							'The language "' + r.language + '" has no grammar.'
						);
					return (
						(r.tokens = a.tokenize(r.code, r.grammar)),
						a.hooks.run('after-tokenize', r),
						i.stringify(a.util.encode(r.tokens), r.language)
					);
				},
				tokenize: function (e, n) {
					var t = n.rest;
					if (t) {
						for (var r in t) n[r] = t[r];
						delete n.rest;
					}
					var a = new s();
					return (
						u(a, a.head, e),
						o(e, a, n, a.head, 0),
						(function (e) {
							for (var n = [], t = e.head.next; t !== e.tail; )
								n.push(t.value), (t = t.next);
							return n;
						})(a)
					);
				},
				hooks: {
					all: {},
					add: function (e, n) {
						var t = a.hooks.all;
						(t[e] = t[e] || []), t[e].push(n);
					},
					run: function (e, n) {
						var t = a.hooks.all[e];
						if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n);
					},
				},
				Token: i,
			};
		function i(e, n, t, r) {
			(this.type = e),
				(this.content = n),
				(this.alias = t),
				(this.length = 0 | (r || '').length);
		}
		function l(e, n, t, r) {
			e.lastIndex = n;
			var a = e.exec(t);
			if (a && r && a[1]) {
				var i = a[1].length;
				(a.index += i), (a[0] = a[0].slice(i));
			}
			return a;
		}
		function o(e, n, t, r, s, g) {
			for (var f in t)
				if (t.hasOwnProperty(f) && t[f]) {
					var h = t[f];
					h = Array.isArray(h) ? h : [h];
					for (var d = 0; d < h.length; ++d) {
						if (g && g.cause == f + ',' + d) return;
						var v = h[d],
							p = v.inside,
							m = !!v.lookbehind,
							y = !!v.greedy,
							k = v.alias;
						if (y && !v.pattern.global) {
							var x = v.pattern.toString().match(/[imsuy]*$/)[0];
							v.pattern = RegExp(v.pattern.source, x + 'g');
						}
						for (
							var b = v.pattern || v, w = r.next, A = s;
							w !== n.tail && !(g && A >= g.reach);
							A += w.value.length, w = w.next
						) {
							var E = w.value;
							if (n.length > e.length) return;
							if (!(E instanceof i)) {
								var P,
									L = 1;
								if (y) {
									if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
									var S = P.index,
										O = P.index + P[0].length,
										j = A;
									for (j += w.value.length; S >= j; )
										j += (w = w.next).value.length;
									if (((A = j -= w.value.length), w.value instanceof i))
										continue;
									for (
										var C = w;
										C !== n.tail && (j < O || 'string' == typeof C.value);
										C = C.next
									)
										L++, (j += C.value.length);
									L--, (E = e.slice(A, j)), (P.index -= A);
								} else if (!(P = l(b, 0, E, m))) continue;
								S = P.index;
								var N = P[0],
									_ = E.slice(0, S),
									M = E.slice(S + N.length),
									W = A + E.length;
								g && W > g.reach && (g.reach = W);
								var z = w.prev;
								if (
									(_ && ((z = u(n, z, _)), (A += _.length)),
									c(n, z, L),
									(w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N))),
									M && u(n, w, M),
									L > 1)
								) {
									var I = { cause: f + ',' + d, reach: W };
									o(e, n, t, w.prev, A, I),
										g && I.reach > g.reach && (g.reach = I.reach);
								}
							}
						}
					}
				}
		}
		function s() {
			var e = { value: null, prev: null, next: null },
				n = { value: null, prev: e, next: null };
			(e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
		}
		function u(e, n, t) {
			var r = n.next,
				a = { value: t, prev: n, next: r };
			return (n.next = a), (r.prev = a), e.length++, a;
		}
		function c(e, n, t) {
			for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
			(n.next = r), (r.prev = n), (e.length -= a);
		}
		if (
			((e.Prism = a),
			(i.stringify = function e(n, t) {
				if ('string' == typeof n) return n;
				if (Array.isArray(n)) {
					var r = '';
					return (
						n.forEach(function (n) {
							r += e(n, t);
						}),
						r
					);
				}
				var i = {
						type: n.type,
						content: e(n.content, t),
						tag: 'span',
						classes: ['token', n.type],
						attributes: {},
						language: t,
					},
					l = n.alias;
				l &&
					(Array.isArray(l)
						? Array.prototype.push.apply(i.classes, l)
						: i.classes.push(l)),
					a.hooks.run('wrap', i);
				var o = '';
				for (var s in i.attributes)
					o +=
						' ' +
						s +
						'="' +
						(i.attributes[s] || '').replace(/"/g, '&quot;') +
						'"';
				return (
					'<' +
					i.tag +
					' class="' +
					i.classes.join(' ') +
					'"' +
					o +
					'>' +
					i.content +
					'</' +
					i.tag +
					'>'
				);
			}),
			!e.document)
		)
			return e.addEventListener
				? (a.disableWorkerMessageHandler ||
						e.addEventListener(
							'message',
							function (n) {
								var t = JSON.parse(n.data),
									r = t.language,
									i = t.code,
									l = t.immediateClose;
								e.postMessage(a.highlight(i, a.languages[r], r)),
									l && e.close();
							},
							!1
						),
				  a)
				: a;
		var g = a.util.currentScript();
		function f() {
			a.manual || a.highlightAll();
		}
		if (
			(g &&
				((a.filename = g.src),
				g.hasAttribute('data-manual') && (a.manual = !0)),
			!a.manual)
		) {
			var h = document.readyState;
			'loading' === h || ('interactive' === h && g && g.defer)
				? document.addEventListener('DOMContentLoaded', f)
				: window.requestAnimationFrame
				? window.requestAnimationFrame(f)
				: window.setTimeout(f, 16);
		}
		return a;
	})(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism),
	'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
	comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
	prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
	doctype: {
		pattern:
			/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: !0,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: !0,
				greedy: !0,
				inside: null,
			},
			string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
			punctuation: /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			name: /[^\s<>'"]+/,
		},
	},
	cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
	tag: {
		pattern:
			/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: !0,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/,
				inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					punctuation: [
						{ pattern: /^=/, alias: 'attr-equals' },
						{ pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
					],
				},
			},
			punctuation: /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: { namespace: /^[^\s>\/:]+:/ },
			},
		},
	},
	entity: [
		{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
		/&#x?[\da-f]{1,8};/i,
	],
}),
	(Prism.languages.markup.tag.inside['attr-value'].inside.entity =
		Prism.languages.markup.entity),
	(Prism.languages.markup.doctype.inside['internal-subset'].inside =
		Prism.languages.markup),
	Prism.hooks.add('wrap', function (a) {
		'entity' === a.type &&
			(a.attributes.title = a.content.replace(/&amp;/, '&'));
	}),
	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		value: function (a, e) {
			var s = {};
			(s['language-' + e] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: !0,
				inside: Prism.languages[e],
			}),
				(s.cdata = /^<!\[CDATA\[|\]\]>$/i);
			var t = {
				'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
			};
			t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
			var n = {};
			(n[a] = {
				pattern: RegExp(
					'(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
						/__/g,
						function () {
							return a;
						}
					),
					'i'
				),
				lookbehind: !0,
				greedy: !0,
				inside: t,
			}),
				Prism.languages.insertBefore('markup', 'cdata', n);
		},
	}),
	Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
		value: function (a, e) {
			Prism.languages.markup.tag.inside['special-attr'].push({
				pattern: RegExp(
					'(^|["\'\\s])(?:' +
						a +
						')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))',
					'i'
				),
				lookbehind: !0,
				inside: {
					'attr-name': /^[^\s=]+/,
					'attr-value': {
						pattern: /=[\s\S]+/,
						inside: {
							value: {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: !0,
								alias: [e, 'language-' + e],
								inside: Prism.languages[e],
							},
							punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
						},
					},
				},
			});
		},
	}),
	(Prism.languages.html = Prism.languages.markup),
	(Prism.languages.mathml = Prism.languages.markup),
	(Prism.languages.svg = Prism.languages.markup),
	(Prism.languages.xml = Prism.languages.extend('markup', {})),
	(Prism.languages.ssml = Prism.languages.xml),
	(Prism.languages.atom = Prism.languages.xml),
	(Prism.languages.rss = Prism.languages.xml);
!(function (s) {
	var e =
		/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
	(s.languages.css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: {
			pattern: RegExp(
				'@[\\w-](?:[^;{\\s"\']|\\s+(?!\\s)|' + e.source + ')*?(?:;|(?=\\s*\\{))'
			),
			inside: {
				rule: /^@[\w-]+/,
				'selector-function-argument': {
					pattern:
						/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: !0,
					alias: 'selector',
				},
				keyword: {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: !0,
				},
			},
		},
		url: {
			pattern: RegExp(
				'\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)',
				'i'
			),
			greedy: !0,
			inside: {
				function: /^url/i,
				punctuation: /^\(|\)$/,
				string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
			},
		},
		selector: {
			pattern: RegExp(
				'(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
					e.source +
					')*(?=\\s*\\{)'
			),
			lookbehind: !0,
		},
		string: { pattern: e, greedy: !0 },
		property: {
			pattern:
				/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: !0,
		},
		important: /!important\b/i,
		function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
		punctuation: /[(){};:,]/,
	}),
		(s.languages.css.atrule.inside.rest = s.languages.css);
	var t = s.languages.markup;
	t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'));
})(Prism);
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
	],
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0,
	},
	'class-name': {
		pattern:
			/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ },
	},
	keyword:
		/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	boolean: /\b(?:false|true)\b/,
	function: /\b\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern:
				/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: !0,
		},
	],
	keyword: [
		{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
		{
			pattern:
				/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: !0,
		},
	],
	function:
		/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	number: {
		pattern: RegExp(
			'(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'
		),
		lookbehind: !0,
	},
	operator:
		/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
	(Prism.languages.javascript['class-name'][0].pattern =
		/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
	Prism.languages.insertBefore('javascript', 'keyword', {
		regex: {
			pattern: RegExp(
				'((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))'
			),
			lookbehind: !0,
			greedy: !0,
			inside: {
				'regex-source': {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: !0,
					alias: 'language-regex',
					inside: Prism.languages.regex,
				},
				'regex-delimiter': /^\/|\/$/,
				'regex-flags': /^[a-z]+$/,
			},
		},
		'function-variable': {
			pattern:
				/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: 'function',
		},
		parameter: [
			{
				pattern:
					/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern:
					/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern:
					/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
			{
				pattern:
					/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: !0,
				inside: Prism.languages.javascript,
			},
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
	}),
	Prism.languages.insertBefore('javascript', 'string', {
		hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
		'template-string': {
			pattern:
				/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: !0,
			inside: {
				'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
				interpolation: {
					pattern:
						/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: !0,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation',
						},
						rest: Prism.languages.javascript,
					},
				},
				string: /[\s\S]+/,
			},
		},
		'string-property': {
			pattern:
				/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: !0,
			greedy: !0,
			alias: 'property',
		},
	}),
	Prism.languages.insertBefore('javascript', 'operator', {
		'literal-property': {
			pattern:
				/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
			lookbehind: !0,
			alias: 'property',
		},
	}),
	Prism.languages.markup &&
		(Prism.languages.markup.tag.addInlined('script', 'javascript'),
		Prism.languages.markup.tag.addAttribute(
			'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
			'javascript'
		)),
	(Prism.languages.js = Prism.languages.javascript);
!(function (e) {
	var t =
			'\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
		a = {
			pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
			lookbehind: !0,
			alias: 'punctuation',
			inside: null,
		},
		n = {
			bash: a,
			environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
			variable: [
				{
					pattern: /\$?\(\([\s\S]+?\)\)/,
					greedy: !0,
					inside: {
						variable: [
							{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
							/^\$\(\(/,
						],
						number:
							/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
						operator:
							/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
						punctuation: /\(\(?|\)\)?|,|;/,
					},
				},
				{
					pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
					greedy: !0,
					inside: { variable: /^\$\(|^`|\)$|`$/ },
				},
				{
					pattern: /\$\{[^}]+\}/,
					greedy: !0,
					inside: {
						operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
						punctuation: /[\[\]]/,
						environment: {
							pattern: RegExp('(\\{)' + t),
							lookbehind: !0,
							alias: 'constant',
						},
					},
				},
				/\$(?:\w+|[#?*!@$])/,
			],
			entity:
				/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/,
		};
	(e.languages.bash = {
		shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
		comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
		'function-name': [
			{
				pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
				lookbehind: !0,
				alias: 'function',
			},
			{ pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
		],
		'for-or-select': {
			pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
			alias: 'variable',
			lookbehind: !0,
		},
		'assign-left': {
			pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
			inside: {
				environment: {
					pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
					lookbehind: !0,
					alias: 'constant',
				},
			},
			alias: 'variable',
			lookbehind: !0,
		},
		parameter: {
			pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
			alias: 'variable',
			lookbehind: !0,
		},
		string: [
			{
				pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
				lookbehind: !0,
				greedy: !0,
				inside: n,
			},
			{
				pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
				lookbehind: !0,
				greedy: !0,
				inside: { bash: a },
			},
			{
				pattern:
					/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
				lookbehind: !0,
				greedy: !0,
				inside: n,
			},
			{ pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
			{
				pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
				greedy: !0,
				inside: { entity: n.entity },
			},
		],
		environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
		variable: n.variable,
		function: {
			pattern:
				/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
			lookbehind: !0,
		},
		keyword: {
			pattern:
				/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
			lookbehind: !0,
		},
		builtin: {
			pattern:
				/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
			lookbehind: !0,
			alias: 'class-name',
		},
		boolean: {
			pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
			lookbehind: !0,
		},
		'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
		operator: {
			pattern:
				/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
			inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } },
		},
		punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
		number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
	}),
		(a.inside = e.languages.bash);
	for (
		var s = [
				'comment',
				'function-name',
				'for-or-select',
				'assign-left',
				'parameter',
				'string',
				'environment',
				'function',
				'keyword',
				'builtin',
				'boolean',
				'file-descriptor',
				'operator',
				'punctuation',
				'number',
			],
			o = n.variable[1].inside,
			i = 0;
		i < s.length;
		i++
	)
		o[s[i]] = e.languages.bash[s[i]];
	(e.languages.sh = e.languages.bash), (e.languages.shell = e.languages.bash);
})(Prism);
(Prism.languages.bicep = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
	],
	property: [
		{ pattern: /([\r\n][ \t]*)[a-z_]\w*(?=[ \t]*:)/i, lookbehind: !0 },
		{
			pattern: /([\r\n][ \t]*)'(?:\\.|\$(?!\{)|[^'\\\r\n$])*'(?=[ \t]*:)/,
			lookbehind: !0,
			greedy: !0,
		},
	],
	string: [
		{ pattern: /'''[^'][\s\S]*?'''/, greedy: !0 },
		{
			pattern: /(^|[^\\'])'(?:\\.|\$(?!\{)|[^'\\\r\n$])*'/,
			lookbehind: !0,
			greedy: !0,
		},
	],
	'interpolated-string': {
		pattern: /(^|[^\\'])'(?:\\.|\$(?:(?!\{)|\{[^{}\r\n]*\})|[^'\\\r\n$])*'/,
		lookbehind: !0,
		greedy: !0,
		inside: {
			interpolation: {
				pattern: /\$\{[^{}\r\n]*\}/,
				inside: {
					expression: { pattern: /(^\$\{)[\s\S]+(?=\}$)/, lookbehind: !0 },
					punctuation: /^\$\{|\}$/,
				},
			},
			string: /[\s\S]+/,
		},
	},
	datatype: {
		pattern: /(\b(?:output|param)\b[ \t]+\w+[ \t]+)\w+\b/,
		lookbehind: !0,
		alias: 'class-name',
	},
	boolean: /\b(?:false|true)\b/,
	keyword:
		/\b(?:existing|for|if|in|module|null|output|param|resource|targetScope|var)\b/,
	decorator: /@\w+\b/,
	function: /\b[a-z_]\w*(?=[ \t]*\()/i,
	number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
	operator:
		/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
	punctuation: /[{}[\];(),.:]/,
}),
	(Prism.languages.bicep[
		'interpolated-string'
	].inside.interpolation.inside.expression.inside = Prism.languages.bicep);
!(function (e) {
	var a,
		n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
	(e.languages.css.selector = {
		pattern: e.languages.css.selector.pattern,
		lookbehind: !0,
		inside: (a = {
			'pseudo-element':
				/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
			'pseudo-class': /:[-\w]+/,
			class: /\.[-\w]+/,
			id: /#[-\w]+/,
			attribute: {
				pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
				greedy: !0,
				inside: {
					punctuation: /^\[|\]$/,
					'case-sensitivity': {
						pattern: /(\s)[si]$/i,
						lookbehind: !0,
						alias: 'keyword',
					},
					namespace: {
						pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
						lookbehind: !0,
						inside: { punctuation: /\|$/ },
					},
					'attr-name': {
						pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
						lookbehind: !0,
					},
					'attr-value': [
						n,
						{
							pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
							lookbehind: !0,
						},
					],
					operator: /[|~*^$]?=/,
				},
			},
			'n-th': [
				{
					pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
					lookbehind: !0,
					inside: { number: /[\dn]+/, operator: /[+-]/ },
				},
				{ pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
			],
			combinator: />|\+|~|\|\|/,
			punctuation: /[(),]/,
		}),
	}),
		(e.languages.css.atrule.inside['selector-function-argument'].inside = a),
		e.languages.insertBefore('css', 'property', {
			variable: {
				pattern:
					/(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
				lookbehind: !0,
			},
		});
	var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
		i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
	e.languages.insertBefore('css', 'function', {
		operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
		hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: 'color' },
		color: [
			{
				pattern:
					/(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
				lookbehind: !0,
			},
			{
				pattern:
					/\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
				inside: {
					unit: r,
					number: i,
					function: /[\w-]+(?=\()/,
					punctuation: /[(),]/,
				},
			},
		],
		entity: /\\[\da-f]{1,8}/i,
		unit: r,
		number: i,
	});
})(Prism);
Prism.languages.csv = {
	value: /[^\r\n,"]+|"(?:[^"]|"")*"(?!")/,
	punctuation: /,/,
};
!(function (e) {
	var n = '(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)'.replace(
			/<SP_BS>/g,
			function () {
				return '\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])';
			}
		),
		r =
			'"(?:[^"\\\\\r\n]|\\\\(?:\r\n|[^]))*"|\'(?:[^\'\\\\\r\n]|\\\\(?:\r\n|[^]))*\'',
		t = '--[\\w-]+=(?:<STR>|(?!["\'])(?:[^\\s\\\\]|\\\\.)+)'.replace(
			/<STR>/g,
			function () {
				return r;
			}
		),
		o = { pattern: RegExp(r), greedy: !0 },
		i = { pattern: /(^[ \t]*)#.*/m, lookbehind: !0, greedy: !0 };
	function a(e, r) {
		return (
			(e = e
				.replace(/<OPT>/g, function () {
					return t;
				})
				.replace(/<SP>/g, function () {
					return n;
				})),
			RegExp(e, r)
		);
	}
	(e.languages.docker = {
		instruction: {
			pattern:
				/(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
			lookbehind: !0,
			greedy: !0,
			inside: {
				options: {
					pattern: a('(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*', 'i'),
					lookbehind: !0,
					greedy: !0,
					inside: {
						property: { pattern: /(^|\s)--[\w-]+/, lookbehind: !0 },
						string: [
							o,
							{ pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/, lookbehind: !0 },
						],
						operator: /\\$/m,
						punctuation: /=/,
					},
				},
				keyword: [
					{
						pattern: a(
							'(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b',
							'i'
						),
						lookbehind: !0,
						greedy: !0,
					},
					{
						pattern: a(
							'(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\\\]+<SP>)AS',
							'i'
						),
						lookbehind: !0,
						greedy: !0,
					},
					{ pattern: a('(^ONBUILD<SP>)\\w+', 'i'), lookbehind: !0, greedy: !0 },
					{ pattern: /^\w+/, greedy: !0 },
				],
				comment: i,
				string: o,
				variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
				operator: /\\$/m,
			},
		},
		comment: i,
	}),
		(e.languages.dockerfile = e.languages.docker);
})(Prism);
(Prism.languages.go = Prism.languages.extend('clike', {
	string: {
		pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
		lookbehind: !0,
		greedy: !0,
	},
	keyword:
		/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
	boolean: /\b(?:_|false|iota|nil|true)\b/,
	number: [
		/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
		/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
		/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i,
	],
	operator:
		/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
	builtin:
		/\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/,
})),
	Prism.languages.insertBefore('go', 'string', {
		char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 },
	}),
	delete Prism.languages.go['class-name'];
Prism.languages['go-mod'] = Prism.languages['go-module'] = {
	comment: { pattern: /\/\/.*/, greedy: !0 },
	version: {
		pattern: /(^|[\s()[\],])v\d+\.\d+\.\d+(?:[+-][-+.\w]*)?(?![^\s()[\],])/,
		lookbehind: !0,
		alias: 'number',
	},
	'go-version': {
		pattern: /((?:^|\s)go\s+)\d+(?:\.\d+){1,2}/,
		lookbehind: !0,
		alias: 'number',
	},
	keyword: {
		pattern: /^([ \t]*)(?:exclude|go|module|replace|require|retract)\b/m,
		lookbehind: !0,
	},
	operator: /=>/,
	punctuation: /[()[\],]/,
};
(Prism.languages.json = {
	property: {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
		lookbehind: !0,
		greedy: !0,
	},
	string: {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
		lookbehind: !0,
		greedy: !0,
	},
	comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
	number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	punctuation: /[{}[\],]/,
	operator: /:/,
	boolean: /\b(?:false|true)\b/,
	null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
	(Prism.languages.webmanifest = Prism.languages.json);
!(function (n) {
	var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
	n.languages.json5 = n.languages.extend('json', {
		property: [
			{ pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
			{
				pattern:
					/(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
				alias: 'unquoted',
			},
		],
		string: { pattern: e, greedy: !0 },
		number:
			/[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
	});
})(Prism);
Prism.languages.log = {
	string: {
		pattern: /"(?:[^"\\\r\n]|\\.)*"|'(?![st] | \w)(?:[^'\\\r\n]|\\.)*'/,
		greedy: !0,
	},
	exception: {
		pattern:
			/(^|[^\w.])[a-z][\w.]*(?:Error|Exception):.*(?:(?:\r\n?|\n)[ \t]*(?:at[ \t].+|\.{3}.*|Caused by:.*))+(?:(?:\r\n?|\n)[ \t]*\.\.\. .*)?/,
		lookbehind: !0,
		greedy: !0,
		alias: ['javastacktrace', 'language-javastacktrace'],
		inside: Prism.languages.javastacktrace || {
			keyword: /\bat\b/,
			function: /[a-z_][\w$]*(?=\()/,
			punctuation: /[.:()]/,
		},
	},
	level: [
		{
			pattern:
				/\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE)\b/,
			alias: ['error', 'important'],
		},
		{ pattern: /\b(?:WARN|WARNING|WRN)\b/, alias: ['warning', 'important'] },
		{
			pattern: /\b(?:DISPLAY|INF|INFO|NOTICE|STATUS)\b/,
			alias: ['info', 'keyword'],
		},
		{ pattern: /\b(?:DBG|DEBUG|FINE)\b/, alias: ['debug', 'keyword'] },
		{
			pattern: /\b(?:FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b/,
			alias: ['trace', 'comment'],
		},
	],
	property: {
		pattern:
			/((?:^|[\]|])[ \t]*)[a-z_](?:[\w-]|\b\/\b)*(?:[. ]\(?\w(?:[\w-]|\b\/\b)*\)?)*:(?=\s)/im,
		lookbehind: !0,
	},
	separator: {
		pattern: /(^|[^-+])-{3,}|={3,}|\*{3,}|- - /m,
		lookbehind: !0,
		alias: 'comment',
	},
	url: /\b(?:file|ftp|https?):\/\/[^\s|,;'"]*[^\s|,;'">.]/,
	email: {
		pattern: /(^|\s)[-\w+.]+@[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+(?=\s)/,
		lookbehind: !0,
		alias: 'url',
	},
	'ip-address': {
		pattern: /\b(?:\d{1,3}(?:\.\d{1,3}){3})\b/,
		alias: 'constant',
	},
	'mac-address': {
		pattern: /\b[a-f0-9]{2}(?::[a-f0-9]{2}){5}\b/i,
		alias: 'constant',
	},
	domain: {
		pattern:
			/(^|\s)[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)*\.[a-z][a-z0-9-]+(?=\s)/,
		lookbehind: !0,
		alias: 'constant',
	},
	uuid: {
		pattern:
			/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
		alias: 'constant',
	},
	hash: { pattern: /\b(?:[a-f0-9]{32}){1,2}\b/i, alias: 'constant' },
	'file-path': {
		pattern:
			/\b[a-z]:[\\/][^\s|,;:(){}\[\]"']+|(^|[\s:\[\](>|])\.{0,2}\/\w[^\s|,;:(){}\[\]"']*/i,
		lookbehind: !0,
		greedy: !0,
		alias: 'string',
	},
	date: {
		pattern: RegExp(
			'\\b\\d{4}[-/]\\d{2}[-/]\\d{2}(?:T(?=\\d{1,2}:)|(?=\\s\\d{1,2}:))|\\b\\d{1,4}[-/ ](?:\\d{1,2}|Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)[-/ ]\\d{2,4}T?\\b|\\b(?:(?:Fri|Mon|Sat|Sun|Thu|Tue|Wed)(?:\\s{1,2}(?:Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep))?|Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)\\s{1,2}\\d{1,2}\\b',
			'i'
		),
		alias: 'number',
	},
	time: {
		pattern:
			/\b\d{1,2}:\d{1,2}:\d{1,2}(?:[.,:]\d+)?(?:\s?[+-]\d{2}:?\d{2}|Z)?\b/,
		alias: 'number',
	},
	boolean: /\b(?:false|null|true)\b/i,
	number: {
		pattern:
			/(^|[^.\w])(?:0x[a-f0-9]+|0o[0-7]+|0b[01]+|v?\d[\da-f]*(?:\.\d+)*(?:e[+-]?\d+)?[a-z]{0,3}\b)\b(?!\.\w)/i,
		lookbehind: !0,
	},
	operator: /[;:?<=>~/@!$%&+\-|^(){}*#]/,
	punctuation: /[\[\].,]/,
};
Prism.languages.makefile = {
	comment: {
		pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
		lookbehind: !0,
	},
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0,
	},
	'builtin-target': {
		pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
		alias: 'builtin',
	},
	target: {
		pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
		alias: 'symbol',
		inside: { variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/ },
	},
	variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
	keyword:
		/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
	function: {
		pattern:
			/(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
		lookbehind: !0,
	},
	operator: /(?:::|[?:+!])?=|[|@]/,
	punctuation: /[:;(){}]/,
};
!(function (n) {
	function e(n) {
		return (
			(n = n.replace(/<inner>/g, function () {
				return '(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))';
			})),
			RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + n + ')')
		);
	}
	var t = '(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+',
		a = '\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))'.replace(
			/__/g,
			function () {
				return t;
			}
		),
		i =
			'\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)';
	(n.languages.markdown = n.languages.extend('markup', {})),
		n.languages.insertBefore('markdown', 'prolog', {
			'front-matter-block': {
				pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
				lookbehind: !0,
				greedy: !0,
				inside: {
					punctuation: /^---|---$/,
					'front-matter': {
						pattern: /\S+(?:\s+\S+)*/,
						alias: ['yaml', 'language-yaml'],
						inside: n.languages.yaml,
					},
				},
			},
			blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
			table: {
				pattern: RegExp('^' + a + i + '(?:' + a + ')*', 'm'),
				inside: {
					'table-data-rows': {
						pattern: RegExp('^(' + a + i + ')(?:' + a + ')*$'),
						lookbehind: !0,
						inside: {
							'table-data': {
								pattern: RegExp(t),
								inside: n.languages.markdown,
							},
							punctuation: /\|/,
						},
					},
					'table-line': {
						pattern: RegExp('^(' + a + ')' + i + '$'),
						lookbehind: !0,
						inside: { punctuation: /\||:?-{3,}:?/ },
					},
					'table-header-row': {
						pattern: RegExp('^' + a + '$'),
						inside: {
							'table-header': {
								pattern: RegExp(t),
								alias: 'important',
								inside: n.languages.markdown,
							},
							punctuation: /\|/,
						},
					},
				},
			},
			code: [
				{
					pattern:
						/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
					lookbehind: !0,
					alias: 'keyword',
				},
				{
					pattern: /^```[\s\S]*?^```$/m,
					greedy: !0,
					inside: {
						'code-block': {
							pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
							lookbehind: !0,
						},
						'code-language': { pattern: /^(```).+/, lookbehind: !0 },
						punctuation: /```/,
					},
				},
			],
			title: [
				{
					pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
					alias: 'important',
					inside: { punctuation: /==+$|--+$/ },
				},
				{
					pattern: /(^\s*)#.+/m,
					lookbehind: !0,
					alias: 'important',
					inside: { punctuation: /^#+|#+$/ },
				},
			],
			hr: {
				pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
				lookbehind: !0,
				alias: 'punctuation',
			},
			list: {
				pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
				lookbehind: !0,
				alias: 'punctuation',
			},
			'url-reference': {
				pattern:
					/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
				inside: {
					variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
					string:
						/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
					punctuation: /^[\[\]!:]|[<>]/,
				},
				alias: 'url',
			},
			bold: {
				pattern: e(
					'\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*'
				),
				lookbehind: !0,
				greedy: !0,
				inside: {
					content: {
						pattern: /(^..)[\s\S]+(?=..$)/,
						lookbehind: !0,
						inside: {},
					},
					punctuation: /\*\*|__/,
				},
			},
			italic: {
				pattern: e(
					'\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*'
				),
				lookbehind: !0,
				greedy: !0,
				inside: {
					content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} },
					punctuation: /[*_]/,
				},
			},
			strike: {
				pattern: e('(~~?)(?:(?!~)<inner>)+\\2'),
				lookbehind: !0,
				greedy: !0,
				inside: {
					content: {
						pattern: /(^~~?)[\s\S]+(?=\1$)/,
						lookbehind: !0,
						inside: {},
					},
					punctuation: /~~?/,
				},
			},
			'code-snippet': {
				pattern:
					/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
				lookbehind: !0,
				greedy: !0,
				alias: ['code', 'keyword'],
			},
			url: {
				pattern: e(
					'!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'
				),
				lookbehind: !0,
				greedy: !0,
				inside: {
					operator: /^!/,
					content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
					variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
					url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
					string: {
						pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
						lookbehind: !0,
					},
				},
			},
		}),
		['url', 'bold', 'italic', 'strike'].forEach(function (e) {
			['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (t) {
				e !== t &&
					(n.languages.markdown[e].inside.content.inside[t] =
						n.languages.markdown[t]);
			});
		}),
		n.hooks.add('after-tokenize', function (n) {
			('markdown' !== n.language && 'md' !== n.language) ||
				(function n(e) {
					if (e && 'string' != typeof e)
						for (var t = 0, a = e.length; t < a; t++) {
							var i = e[t];
							if ('code' === i.type) {
								var r = i.content[1],
									o = i.content[3];
								if (
									r &&
									o &&
									'code-language' === r.type &&
									'code-block' === o.type &&
									'string' == typeof r.content
								) {
									var l = r.content
											.replace(/\b#/g, 'sharp')
											.replace(/\b\+\+/g, 'pp'),
										s =
											'language-' +
											(l = (/[a-z][\w-]*/i.exec(l) || [''])[0].toLowerCase());
									o.alias
										? 'string' == typeof o.alias
											? (o.alias = [o.alias, s])
											: o.alias.push(s)
										: (o.alias = [s]);
								}
							} else n(i.content);
						}
				})(n.tokens);
		}),
		n.hooks.add('wrap', function (e) {
			if ('code-block' === e.type) {
				for (var t = '', a = 0, i = e.classes.length; a < i; a++) {
					var s = e.classes[a],
						d = /language-(.+)/.exec(s);
					if (d) {
						t = d[1];
						break;
					}
				}
				var p = n.languages[t];
				if (p)
					e.content = n.highlight(
						e.content
							.replace(r, '')
							.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (n, e) {
								var t;
								return '#' === (e = e.toLowerCase())[0]
									? ((t =
											'x' === e[1]
												? parseInt(e.slice(2), 16)
												: Number(e.slice(1))),
									  l(t))
									: o[e] || n;
							}),
						p,
						t
					);
				else if (t && 'none' !== t && n.plugins.autoloader) {
					var u =
						'md-' +
						new Date().valueOf() +
						'-' +
						Math.floor(1e16 * Math.random());
					(e.attributes.id = u),
						n.plugins.autoloader.loadLanguages(t, function () {
							var e = document.getElementById(u);
							e &&
								(e.innerHTML = n.highlight(e.textContent, n.languages[t], t));
						});
				}
			}
		});
	var r = RegExp(n.languages.markup.tag.pattern.source, 'gi'),
		o = { amp: '&', lt: '<', gt: '>', quot: '"' },
		l = String.fromCodePoint || String.fromCharCode;
	n.languages.md = n.languages.markdown;
})(Prism);
Prism.languages.mermaid = {
	comment: { pattern: /%%.*/, greedy: !0 },
	style: {
		pattern:
			/^([ \t]*(?:classDef|linkStyle|style)[ \t]+[\w$-]+[ \t]+)\w.*[^\s;]/m,
		lookbehind: !0,
		inside: {
			property: /\b\w[\w-]*(?=[ \t]*:)/,
			operator: /:/,
			punctuation: /,/,
		},
	},
	'inter-arrow-label': {
		pattern:
			/([^<>ox.=-])(?:-[-.]|==)(?![<>ox.=-])[ \t]*(?:"[^"\r\n]*"|[^\s".=-](?:[^\r\n.=-]*[^\s.=-])?)[ \t]*(?:\.+->?|--+[->]|==+[=>])(?![<>ox.=-])/,
		lookbehind: !0,
		greedy: !0,
		inside: {
			arrow: { pattern: /(?:\.+->?|--+[->]|==+[=>])$/, alias: 'operator' },
			label: {
				pattern: /^([\s\S]{2}[ \t]*)\S(?:[\s\S]*\S)?/,
				lookbehind: !0,
				alias: 'property',
			},
			'arrow-head': { pattern: /^\S+/, alias: ['arrow', 'operator'] },
		},
	},
	arrow: [
		{
			pattern: /(^|[^{}|o.-])[|}][|o](?:--|\.\.)[|o][|{](?![{}|o.-])/,
			lookbehind: !0,
			alias: 'operator',
		},
		{
			pattern:
				/(^|[^<>ox.=-])(?:[<ox](?:==+|--+|-\.*-)[>ox]?|(?:==+|--+|-\.*-)[>ox]|===+|---+|-\.+-)(?![<>ox.=-])/,
			lookbehind: !0,
			alias: 'operator',
		},
		{
			pattern:
				/(^|[^<>()x-])(?:--?(?:>>|[x>)])(?![<>()x])|(?:<<|[x<(])--?(?!-))/,
			lookbehind: !0,
			alias: 'operator',
		},
		{
			pattern:
				/(^|[^<>|*o.-])(?:[*o]--|--[*o]|<\|?(?:--|\.\.)|(?:--|\.\.)\|?>|--|\.\.)(?![<>|*o.-])/,
			lookbehind: !0,
			alias: 'operator',
		},
	],
	label: {
		pattern: /(^|[^|<])\|(?:[^\r\n"|]|"[^"\r\n]*")+\|/,
		lookbehind: !0,
		greedy: !0,
		alias: 'property',
	},
	text: {
		pattern: /(?:[(\[{]+|\b>)(?:[^\r\n"()\[\]{}]|"[^"\r\n]*")+(?:[)\]}]+|>)/,
		alias: 'string',
	},
	string: { pattern: /"[^"\r\n]*"/, greedy: !0 },
	annotation: {
		pattern:
			/<<(?:abstract|choice|enumeration|fork|interface|join|service)>>|\[\[(?:choice|fork|join)\]\]/i,
		alias: 'important',
	},
	keyword: [
		{
			pattern:
				/(^[ \t]*)(?:action|callback|class|classDef|classDiagram|click|direction|erDiagram|flowchart|gantt|gitGraph|graph|journey|link|linkStyle|pie|requirementDiagram|sequenceDiagram|stateDiagram|stateDiagram-v2|style|subgraph)(?![\w$-])/m,
			lookbehind: !0,
			greedy: !0,
		},
		{
			pattern:
				/(^[ \t]*)(?:activate|alt|and|as|autonumber|deactivate|else|end(?:[ \t]+note)?|loop|opt|par|participant|rect|state|note[ \t]+(?:over|(?:left|right)[ \t]+of))(?![\w$-])/im,
			lookbehind: !0,
			greedy: !0,
		},
	],
	entity: /#[a-z0-9]+;/,
	operator: { pattern: /(\w[ \t]*)&(?=[ \t]*\w)|:::|:/, lookbehind: !0 },
	punctuation: /[(){};]/,
};
!(function (e) {
	var t = /\$\w+|%[a-z]+%/;
	(e.languages['plant-uml'] = {
		comment: {
			pattern: /(^[ \t]*)(?:'.*|\/'[\s\S]*?'\/)/m,
			lookbehind: !0,
			greedy: !0,
		},
		preprocessor: {
			pattern: /(^[ \t]*)!.*/m,
			lookbehind: !0,
			greedy: !0,
			alias: 'property',
			inside: { variable: t },
		},
		delimiter: {
			pattern: /(^[ \t]*)@(?:end|start)uml\b/m,
			lookbehind: !0,
			greedy: !0,
			alias: 'punctuation',
		},
		arrow: {
			pattern: RegExp(
				'(^|[^-.<>?|\\\\[\\]ox])[[?]?[ox]?(?:(?:-+(?:[drlu]|do|down|le|left|ri|right|up)-+|\\.+(?:[drlu]|do|down|le|left|ri|right|up)\\.+|-+(?:\\[[^[\\]]*\\]-*)?|\\[[^[\\]]*\\]-+|\\.+(?:\\[[^[\\]]*\\]\\.*)?|\\[[^[\\]]*\\]\\.+)(?:>{1,2}|/{1,2}|\\\\{1,2}|\\|>|[#*^+{xo])|(?:<{1,2}|/{1,2}|\\\\{1,2}|<\\||[#*^+}xo])(?:-+(?:[drlu]|do|down|le|left|ri|right|up)-+|\\.+(?:[drlu]|do|down|le|left|ri|right|up)\\.+|-+(?:\\[[^[\\]]*\\]-*)?|\\[[^[\\]]*\\]-+|\\.+(?:\\[[^[\\]]*\\]\\.*)?|\\[[^[\\]]*\\]\\.+)(?:(?:>{1,2}|/{1,2}|\\\\{1,2}|\\|>|[#*^+{xo]))?)[ox]?[\\]?]?(?![-.<>?|\\\\\\]ox])'
			),
			lookbehind: !0,
			greedy: !0,
			alias: 'operator',
			inside: {
				expression: {
					pattern: /(\[)[^[\]]+(?=\])/,
					lookbehind: !0,
					inside: null,
				},
				punctuation: /\[(?=$|\])|^\]/,
			},
		},
		string: { pattern: /"[^"]*"/, greedy: !0 },
		text: {
			pattern: /(\[[ \t]*[\r\n]+(?![\r\n]))[^\]]*(?=\])/,
			lookbehind: !0,
			greedy: !0,
			alias: 'string',
		},
		keyword: [
			{
				pattern:
					/^([ \t]*)(?:abstract\s+class|end\s+(?:box|fork|group|merge|note|ref|split|title)|(?:fork|split)(?:\s+again)?|activate|actor|agent|alt|annotation|artifact|autoactivate|autonumber|backward|binary|boundary|box|break|caption|card|case|circle|class|clock|cloud|collections|component|concise|control|create|critical|database|deactivate|destroy|detach|diamond|else|elseif|end|end[hr]note|endif|endswitch|endwhile|entity|enum|file|folder|footer|frame|group|[hr]?note|header|hexagon|hide|if|interface|label|legend|loop|map|namespace|network|newpage|node|nwdiag|object|opt|package|page|par|participant|person|queue|rectangle|ref|remove|repeat|restore|return|robust|scale|set|show|skinparam|stack|start|state|stop|storage|switch|title|together|usecase|usecase\/|while)(?=\s|$)/m,
				lookbehind: !0,
				greedy: !0,
			},
			/\b(?:elseif|equals|not|while)(?=\s*\()/,
			/\b(?:as|is|then)\b/,
		],
		divider: { pattern: /^==.+==$/m, greedy: !0, alias: 'important' },
		time: {
			pattern: /@(?:\d+(?:[:/]\d+){2}|[+-]?\d+|:[a-z]\w*(?:[+-]\d+)?)\b/i,
			greedy: !0,
			alias: 'number',
		},
		color: { pattern: /#(?:[a-z_]+|[a-fA-F0-9]+)\b/, alias: 'symbol' },
		variable: t,
		punctuation: /[:,;()[\]{}]|\.{3}/,
	}),
		(e.languages['plant-uml'].arrow.inside.expression.inside =
			e.languages['plant-uml']),
		(e.languages.plantuml = e.languages['plant-uml']);
})(Prism);
!(function (e) {
	var i = (e.languages.powershell = {
		comment: [
			{ pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
			{ pattern: /(^|[^`])#.*/, lookbehind: !0 },
		],
		string: [
			{ pattern: /"(?:`[\s\S]|[^`"])*"/, greedy: !0, inside: null },
			{ pattern: /'(?:[^']|'')*'/, greedy: !0 },
		],
		namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
		boolean: /\$(?:false|true)\b/i,
		variable: /\$\w+\b/,
		function: [
			/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
			/\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
		],
		keyword:
			/\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
		operator: {
			pattern:
				/(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
			lookbehind: !0,
		},
		punctuation: /[|{}[\];(),.]/,
	});
	i.string[0].inside = {
		function: {
			pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
			lookbehind: !0,
			inside: i,
		},
		boolean: i.boolean,
		variable: i.variable,
	};
})(Prism);
(Prism.languages.python = {
	comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
	'string-interpolation': {
		pattern:
			/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: !0,
		inside: {
			interpolation: {
				pattern:
					/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: !0,
				inside: {
					'format-spec': { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 },
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation',
					},
					rest: null,
				},
			},
			string: /[\s\S]+/,
		},
	},
	'triple-quoted-string': {
		pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
		greedy: !0,
		alias: 'string',
	},
	string: {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: !0,
	},
	function: {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: !0,
	},
	'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
	decorator: {
		pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
		lookbehind: !0,
		alias: ['annotation', 'punctuation'],
		inside: { punctuation: /\./ },
	},
	keyword:
		/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	builtin:
		/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	boolean: /\b(?:False|None|True)\b/,
	number:
		/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
	operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	punctuation: /[{}[\];(),.:]/,
}),
	(Prism.languages.python[
		'string-interpolation'
	].inside.interpolation.inside.rest = Prism.languages.python),
	(Prism.languages.py = Prism.languages.python);
!(function (a) {
	var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' },
		n =
			/\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/,
		t = '(?:[^\\\\-]|' + n.source + ')',
		s = RegExp(t + '-' + t),
		i = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: 'variable' };
	a.languages.regex = {
		'char-class': {
			pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
			lookbehind: !0,
			inside: {
				'char-class-negation': {
					pattern: /(^\[)\^/,
					lookbehind: !0,
					alias: 'operator',
				},
				'char-class-punctuation': { pattern: /^\[|\]$/, alias: 'punctuation' },
				range: {
					pattern: s,
					inside: {
						escape: n,
						'range-punctuation': { pattern: /-/, alias: 'operator' },
					},
				},
				'special-escape': e,
				'char-set': { pattern: /\\[wsd]|\\p\{[^{}]+\}/i, alias: 'class-name' },
				escape: n,
			},
		},
		'special-escape': e,
		'char-set': { pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i, alias: 'class-name' },
		backreference: [
			{ pattern: /\\(?![123][0-7]{2})[1-9]/, alias: 'keyword' },
			{
				pattern: /\\k<[^<>']+>/,
				alias: 'keyword',
				inside: { 'group-name': i },
			},
		],
		anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: 'function' },
		escape: n,
		group: [
			{
				pattern:
					/\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
				alias: 'punctuation',
				inside: { 'group-name': i },
			},
			{ pattern: /\)/, alias: 'punctuation' },
		],
		quantifier: { pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/, alias: 'number' },
		alternation: { pattern: /\|/, alias: 'keyword' },
	};
})(Prism);
!(function (s) {
	var n = [
		'"(?:\\\\[^]|\\$\\([^)]+\\)|\\$(?!\\()|`[^`]+`|[^"\\\\`$])*"',
		"'[^']*'",
		"\\$'(?:[^'\\\\]|\\\\[^])*'",
		'<<-?\\s*(["\']?)(\\w+)\\1\\s[^]*?[\r\n]\\2',
	].join('|');
	(s.languages['shell-session'] = {
		command: {
			pattern: RegExp(
				'^(?:[^\\s@:$#%*!/\\\\]+@[^\r\n@:$#%*!/\\\\]+(?::[^\0-\\x1F$#%*?"<>:;|]+)?|[/~.][^\0-\\x1F$#%*?"<>@:;|]*)?[$#%](?=\\s)' +
					"(?:[^\\\\\r\n \t'\"<$]|[ \t](?:(?!#)|#.*$)|\\\\(?:[^\r]|\r\n?)|\\$(?!')|<(?!<)|<<str>>)+".replace(
						/<<str>>/g,
						function () {
							return n;
						}
					),
				'm'
			),
			greedy: !0,
			inside: {
				info: {
					pattern: /^[^#$%]+/,
					alias: 'punctuation',
					inside: {
						user: /^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,
						punctuation: /:/,
						path: /[\s\S]+/,
					},
				},
				bash: {
					pattern: /(^[$#%]\s*)\S[\s\S]*/,
					lookbehind: !0,
					alias: 'language-bash',
					inside: s.languages.bash,
				},
				'shell-symbol': { pattern: /^[$#%]/, alias: 'important' },
			},
		},
		output: /.(?:.*(?:[\r\n]|.$))*/,
	}),
		(s.languages['sh-session'] = s.languages.shellsession =
			s.languages['shell-session']);
})(Prism);
!(function (n) {
	function e(n, e) {
		return RegExp(
			n
				.replace(/<MOD>/g, function () {
					return '(?:\\([^|()\n]+\\)|\\[[^\\]\n]+\\]|\\{[^}\n]+\\})';
				})
				.replace(/<PAR>/g, function () {
					return '(?:\\)|\\((?![^|()\n]+\\)))';
				}),
			e || ''
		);
	}
	var i = {
			css: { pattern: /\{[^{}]+\}/, inside: { rest: n.languages.css } },
			'class-id': {
				pattern: /(\()[^()]+(?=\))/,
				lookbehind: !0,
				alias: 'attr-value',
			},
			lang: {
				pattern: /(\[)[^\[\]]+(?=\])/,
				lookbehind: !0,
				alias: 'attr-value',
			},
			punctuation: /[\\\/]\d+|\S/,
		},
		t = (n.languages.textile = n.languages.extend('markup', {
			phrase: {
				pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
				lookbehind: !0,
				inside: {
					'block-tag': {
						pattern: e('^[a-z]\\w*(?:<MOD>|<PAR>|[<>=])*\\.'),
						inside: {
							modifier: {
								pattern: e('(^[a-z]\\w*)(?:<MOD>|<PAR>|[<>=])+(?=\\.)'),
								lookbehind: !0,
								inside: i,
							},
							tag: /^[a-z]\w*/,
							punctuation: /\.$/,
						},
					},
					list: {
						pattern: e('^[*#]+<MOD>*\\s+\\S.*', 'm'),
						inside: {
							modifier: {
								pattern: e('(^[*#]+)<MOD>+'),
								lookbehind: !0,
								inside: i,
							},
							punctuation: /^[*#]+/,
						},
					},
					table: {
						pattern: e(
							'^(?:(?:<MOD>|<PAR>|[<>=^~])+\\.\\s*)?(?:\\|(?:(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+\\.|(?!(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+\\.))[^|]*)+\\|',
							'm'
						),
						inside: {
							modifier: {
								pattern: e(
									'(^|\\|(?:\r?\n|\r)?)(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+(?=\\.)'
								),
								lookbehind: !0,
								inside: i,
							},
							punctuation: /\||^\./,
						},
					},
					inline: {
						pattern: e(
							'(^|[^a-zA-Z\\d])(\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>*.+?\\2(?![a-zA-Z\\d])'
						),
						lookbehind: !0,
						inside: {
							bold: {
								pattern: e('(^(\\*\\*?)<MOD>*).+?(?=\\2)'),
								lookbehind: !0,
							},
							italic: {
								pattern: e('(^(__?)<MOD>*).+?(?=\\2)'),
								lookbehind: !0,
							},
							cite: {
								pattern: e('(^\\?\\?<MOD>*).+?(?=\\?\\?)'),
								lookbehind: !0,
								alias: 'string',
							},
							code: {
								pattern: e('(^@<MOD>*).+?(?=@)'),
								lookbehind: !0,
								alias: 'keyword',
							},
							inserted: {
								pattern: e('(^\\+<MOD>*).+?(?=\\+)'),
								lookbehind: !0,
							},
							deleted: { pattern: e('(^-<MOD>*).+?(?=-)'), lookbehind: !0 },
							span: { pattern: e('(^%<MOD>*).+?(?=%)'), lookbehind: !0 },
							modifier: {
								pattern: e('(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>+'),
								lookbehind: !0,
								inside: i,
							},
							punctuation: /[*_%?@+\-^~]+/,
						},
					},
					'link-ref': {
						pattern: /^\[[^\]]+\]\S+$/m,
						inside: {
							string: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0 },
							url: { pattern: /(^\])\S+$/, lookbehind: !0 },
							punctuation: /[\[\]]/,
						},
					},
					link: {
						pattern: e('"<MOD>*[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
						inside: {
							text: { pattern: e('(^"<MOD>*)[^"]+(?=")'), lookbehind: !0 },
							modifier: { pattern: e('(^")<MOD>+'), lookbehind: !0, inside: i },
							url: { pattern: /(:).+/, lookbehind: !0 },
							punctuation: /[":]/,
						},
					},
					image: {
						pattern: e(
							'!(?:<MOD>|<PAR>|[<>=])*(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?'
						),
						inside: {
							source: {
								pattern: e(
									'(^!(?:<MOD>|<PAR>|[<>=])*)(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?(?=!)'
								),
								lookbehind: !0,
								alias: 'url',
							},
							modifier: {
								pattern: e('(^!)(?:<MOD>|<PAR>|[<>=])+'),
								lookbehind: !0,
								inside: i,
							},
							url: { pattern: /(:).+/, lookbehind: !0 },
							punctuation: /[!:]/,
						},
					},
					footnote: {
						pattern: /\b\[\d+\]/,
						alias: 'comment',
						inside: { punctuation: /\[|\]/ },
					},
					acronym: {
						pattern: /\b[A-Z\d]+\([^)]+\)/,
						inside: {
							comment: { pattern: /(\()[^()]+(?=\))/, lookbehind: !0 },
							punctuation: /[()]/,
						},
					},
					mark: {
						pattern: /\b\((?:C|R|TM)\)/,
						alias: 'comment',
						inside: { punctuation: /[()]/ },
					},
				},
			},
		})),
		a = t.phrase.inside,
		o = {
			inline: a.inline,
			link: a.link,
			image: a.image,
			footnote: a.footnote,
			acronym: a.acronym,
			mark: a.mark,
		};
	t.tag.pattern =
		/<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;
	var r = a.inline.inside;
	(r.bold.inside = o),
		(r.italic.inside = o),
		(r.inserted.inside = o),
		(r.deleted.inside = o),
		(r.span.inside = o);
	var d = a.table.inside;
	(d.inline = o.inline),
		(d.link = o.link),
		(d.image = o.image),
		(d.footnote = o.footnote),
		(d.acronym = o.acronym),
		(d.mark = o.mark);
})(Prism);
Prism.languages.vim = {
	string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
	comment: /".*/,
	function: /\b\w+(?=\()/,
	keyword:
		/\b(?:N|Next|P|Print|X|XMLent|XMLns|ab|abbreviate|abc|abclear|abo|aboveleft|al|all|ar|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|args|argu|argument|as|ascii|b|bN|bNext|ba|bad|badd|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bo|botright|bp|bprevious|br|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|brewind|bro|browse|bufdo|buffer|buffers|bun|bunload|bw|bwipeout|c|cN|cNext|cNfcNfile|ca|cabbrev|cabc|cabclear|cad|caddb|caddbuffer|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cg|cgetb|cgetbuffer|cgete|cgetexpr|cgetfile|change|changes|chd|chdir|che|checkpath|checkt|checktime|cl|cla|clast|clist|clo|close|cmapc|cmapclear|cn|cnew|cnewer|cnext|cnf|cnfile|cnorea|cnoreabbrev|co|col|colder|colo|colorscheme|comc|comclear|comp|compiler|con|conf|confirm|continue|cope|copen|copy|cp|cpf|cpfile|cprevious|cq|cquit|cr|crewind|cu|cuna|cunabbrev|cunmap|cw|cwindow|d|debugg|debuggreedy|delc|delcommand|delete|delf|delfunction|delm|delmarks|di|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|e|earlier|echoe|echoerr|echom|echomsg|echon|edit|el|else|elsei|elseif|em|emenu|en|endf|endfo|endfor|endfun|endfunction|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fin|fina|finally|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|foldd|folddoc|folddoclosed|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|h|ha|hardcopy|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iu|iuna|iunabbrev|iunmap|j|join|ju|jumps|k|kee|keepalt|keepj|keepjumps|keepmarks|l|lN|lNext|lNf|lNfile|la|lad|laddb|laddbuffer|laddexpr|laddf|laddfile|lan|language|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|left|lefta|leftabove|let|lex|lexpr|lf|lfile|lfir|lfirst|lg|lgetb|lgetbuffer|lgete|lgetexpr|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|list|ll|lla|llast|lli|llist|lm|lmak|lmake|lmap|lmapc|lmapclear|ln|lne|lnew|lnewer|lnext|lnf|lnfile|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lp|lpf|lpfile|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|m|ma|mak|make|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkv|mkvie|mkview|mkvimrc|mod|mode|move|mz|mzf|mzfile|mzscheme|n|nbkey|new|next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|o|omapc|omapclear|on|only|open|opt|options|ou|ounmap|p|pc|pclose|pe|ped|pedit|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|print|prof|profd|profdel|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|ptN|ptNext|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|py|pyf|pyfile|python|q|qa|qall|quit|quita|quitall|r|read|rec|recover|red|redi|redir|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|ru|rub|ruby|rubyd|rubydo|rubyf|rubyfile|runtime|rv|rviminfo|sN|sNext|sa|sal|sall|san|sandbox|sargument|sav|saveas|sb|sbN|sbNext|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbp|sbprevious|sbr|sbrewind|sbuffer|scrip|scripte|scriptencoding|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sl|sla|slast|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|so|sor|sort|source|sp|spe|spelld|spelldump|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|split|spr|sprevious|sre|srewind|st|sta|stag|star|startg|startgreplace|startinsert|startr|startreplace|stj|stjump|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tN|tNext|ta|tab|tabN|tabNext|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabn|tabnew|tabnext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|u|una|unabbreviate|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|ve|verb|verbose|version|vert|vertical|vi|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|w|wN|wNext|wa|wall|wh|while|win|winc|wincmd|windo|winp|winpos|winsize|wn|wnext|wp|wprevious|wq|wqa|wqall|write|ws|wsverb|wv|wviminfo|x|xa|xall|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
	builtin:
		/\b(?:acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autocmd|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|t_AB|t_AF|t_AL|t_CS|t_CV|t_Ce|t_Co|t_Cs|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_IE|t_IS|t_K1|t_K3|t_K4|t_K5|t_K6|t_K7|t_K8|t_K9|t_KA|t_KB|t_KC|t_KD|t_KE|t_KF|t_KG|t_KH|t_KI|t_KJ|t_KK|t_KL|t_RI|t_RV|t_SI|t_Sb|t_Sf|t_WP|t_WS|t_ZH|t_ZR|t_al|t_bc|t_cd|t_ce|t_cl|t_cm|t_cs|t_da|t_db|t_dl|t_fs|t_k1|t_k2|t_k3|t_k4|t_k5|t_k6|t_k7|t_k8|t_k9|t_kB|t_kD|t_kI|t_kN|t_kP|t_kb|t_kd|t_ke|t_kh|t_kl|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_se|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_xs|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww)\b/,
	number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
	operator:
		/\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
	punctuation: /[{}[\](),;:]/,
};
!(function (e) {
	var n = /[*&][^\s[\]{},]+/,
		r =
			/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
		t =
			'(?:' +
			r.source +
			'(?:[ \t]+' +
			n.source +
			')?|' +
			n.source +
			'(?:[ \t]+' +
			r.source +
			')?)',
		a =
			'(?:[^\\s\\x00-\\x08\\x0e-\\x1f!"#%&\'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*'.replace(
				/<PLAIN>/g,
				function () {
					return '[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]';
				}
			),
		d = '"(?:[^"\\\\\r\n]|\\\\.)*"|\'(?:[^\'\\\\\r\n]|\\\\.)*\'';
	function o(e, n) {
		n = (n || '').replace(/m/g, '') + 'm';
		var r =
			'([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))'
				.replace(/<<prop>>/g, function () {
					return t;
				})
				.replace(/<<value>>/g, function () {
					return e;
				});
		return RegExp(r, n);
	}
	(e.languages.yaml = {
		scalar: {
			pattern: RegExp(
				'([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)'.replace(
					/<<prop>>/g,
					function () {
						return t;
					}
				)
			),
			lookbehind: !0,
			alias: 'string',
		},
		comment: /#.*/,
		key: {
			pattern: RegExp(
				'((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)'
					.replace(/<<prop>>/g, function () {
						return t;
					})
					.replace(/<<key>>/g, function () {
						return '(?:' + a + '|' + d + ')';
					})
			),
			lookbehind: !0,
			greedy: !0,
			alias: 'atrule',
		},
		directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
		datetime: {
			pattern: o(
				'\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?'
			),
			lookbehind: !0,
			alias: 'number',
		},
		boolean: {
			pattern: o('false|true', 'i'),
			lookbehind: !0,
			alias: 'important',
		},
		null: { pattern: o('null|~', 'i'), lookbehind: !0, alias: 'important' },
		string: { pattern: o(d), lookbehind: !0, greedy: !0 },
		number: {
			pattern: o(
				'[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)',
				'i'
			),
			lookbehind: !0,
		},
		tag: r,
		important: n,
		punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
	}),
		(e.languages.yml = e.languages.yaml);
})(Prism);
!(function () {
	if (
		'undefined' != typeof Prism &&
		'undefined' != typeof document &&
		document.querySelector
	) {
		var e,
			t = 'line-numbers',
			i = 'linkable-line-numbers',
			n = /\n(?!$)/g,
			r = !0;
		Prism.plugins.lineHighlight = {
			highlightLines: function (o, u, c) {
				var h = (u =
						'string' == typeof u ? u : o.getAttribute('data-line') || '')
						.replace(/\s+/g, '')
						.split(',')
						.filter(Boolean),
					d = +o.getAttribute('data-line-offset') || 0,
					f = (
						(function () {
							if (void 0 === e) {
								var t = document.createElement('div');
								(t.style.fontSize = '13px'),
									(t.style.lineHeight = '1.5'),
									(t.style.padding = '0'),
									(t.style.border = '0'),
									(t.innerHTML = '&nbsp;<br />&nbsp;'),
									document.body.appendChild(t),
									(e = 38 === t.offsetHeight),
									document.body.removeChild(t);
							}
							return e;
						})()
							? parseInt
							: parseFloat
					)(getComputedStyle(o).lineHeight),
					p = Prism.util.isActive(o, t),
					g = o.querySelector('code'),
					m = p ? o : g || o,
					v = [],
					y = g.textContent.match(n),
					b = y ? y.length + 1 : 1,
					A =
						g && m != g
							? (function (e, t) {
									var i = getComputedStyle(e),
										n = getComputedStyle(t);
									function r(e) {
										return +e.substr(0, e.length - 2);
									}
									return (
										t.offsetTop +
										r(n.borderTopWidth) +
										r(n.paddingTop) -
										r(i.paddingTop)
									);
							  })(o, g)
							: 0;
				h.forEach(function (e) {
					var t = e.split('-'),
						i = +t[0],
						n = +t[1] || i;
					if (!((n = Math.min(b + d, n)) < i)) {
						var r =
							o.querySelector('.line-highlight[data-range="' + e + '"]') ||
							document.createElement('div');
						if (
							(v.push(function () {
								r.setAttribute('aria-hidden', 'true'),
									r.setAttribute('data-range', e),
									(r.className = (c || '') + ' line-highlight');
							}),
							p && Prism.plugins.lineNumbers)
						) {
							var s = Prism.plugins.lineNumbers.getLine(o, i),
								l = Prism.plugins.lineNumbers.getLine(o, n);
							if (s) {
								var a = s.offsetTop + A + 'px';
								v.push(function () {
									r.style.top = a;
								});
							}
							if (l) {
								var u = l.offsetTop - s.offsetTop + l.offsetHeight + 'px';
								v.push(function () {
									r.style.height = u;
								});
							}
						} else
							v.push(function () {
								r.setAttribute('data-start', String(i)),
									n > i && r.setAttribute('data-end', String(n)),
									(r.style.top = (i - d - 1) * f + A + 'px'),
									(r.textContent = new Array(n - i + 2).join(' \n'));
							});
						v.push(function () {
							r.style.width = o.scrollWidth + 'px';
						}),
							v.push(function () {
								m.appendChild(r);
							});
					}
				});
				var P = o.id;
				if (p && Prism.util.isActive(o, i) && P) {
					l(o, i) ||
						v.push(function () {
							o.classList.add(i);
						});
					var E = parseInt(o.getAttribute('data-start') || '1');
					s('.line-numbers-rows > span', o).forEach(function (e, t) {
						var i = t + E;
						e.onclick = function () {
							var e = P + '.' + i;
							(r = !1),
								(location.hash = e),
								setTimeout(function () {
									r = !0;
								}, 1);
						};
					});
				}
				return function () {
					v.forEach(a);
				};
			},
		};
		var o = 0;
		Prism.hooks.add('before-sanity-check', function (e) {
			var t = e.element.parentElement;
			if (u(t)) {
				var i = 0;
				s('.line-highlight', t).forEach(function (e) {
					(i += e.textContent.length), e.parentNode.removeChild(e);
				}),
					i &&
						/^(?: \n)+$/.test(e.code.slice(-i)) &&
						(e.code = e.code.slice(0, -i));
			}
		}),
			Prism.hooks.add('complete', function e(i) {
				var n = i.element.parentElement;
				if (u(n)) {
					clearTimeout(o);
					var r = Prism.plugins.lineNumbers,
						s = i.plugins && i.plugins.lineNumbers;
					l(n, t) && r && !s
						? Prism.hooks.add('line-numbers', e)
						: (Prism.plugins.lineHighlight.highlightLines(n)(),
						  (o = setTimeout(c, 1)));
				}
			}),
			window.addEventListener('hashchange', c),
			window.addEventListener('resize', function () {
				s('pre')
					.filter(u)
					.map(function (e) {
						return Prism.plugins.lineHighlight.highlightLines(e);
					})
					.forEach(a);
			});
	}
	function s(e, t) {
		return Array.prototype.slice.call((t || document).querySelectorAll(e));
	}
	function l(e, t) {
		return e.classList.contains(t);
	}
	function a(e) {
		e();
	}
	function u(e) {
		return !!(
			e &&
			/pre/i.test(e.nodeName) &&
			(e.hasAttribute('data-line') || (e.id && Prism.util.isActive(e, i)))
		);
	}
	function c() {
		var e = location.hash.slice(1);
		s('.temporary.line-highlight').forEach(function (e) {
			e.parentNode.removeChild(e);
		});
		var t = (e.match(/\.([\d,-]+)$/) || [, ''])[1];
		if (t && !document.getElementById(e)) {
			var i = e.slice(0, e.lastIndexOf('.')),
				n = document.getElementById(i);
			n &&
				(n.hasAttribute('data-line') || n.setAttribute('data-line', ''),
				Prism.plugins.lineHighlight.highlightLines(n, t, 'temporary ')(),
				r &&
					document.querySelector('.temporary.line-highlight').scrollIntoView());
		}
	}
})();
!(function () {
	if ('undefined' != typeof Prism && 'undefined' != typeof document) {
		var e = [],
			t = {},
			n = function () {};
		Prism.plugins.toolbar = {};
		var a = (Prism.plugins.toolbar.registerButton = function (n, a) {
				var r;
				(r =
					'function' == typeof a
						? a
						: function (e) {
								var t;
								return (
									'function' == typeof a.onClick
										? (((t = document.createElement('button')).type = 'button'),
										  t.addEventListener('click', function () {
												a.onClick.call(this, e);
										  }))
										: 'string' == typeof a.url
										? ((t = document.createElement('a')).href = a.url)
										: (t = document.createElement('span')),
									a.className && t.classList.add(a.className),
									(t.textContent = a.text),
									t
								);
						  }),
					n in t
						? console.warn(
								'There is a button with the key "' + n + '" registered already.'
						  )
						: e.push((t[n] = r));
			}),
			r = (Prism.plugins.toolbar.hook = function (a) {
				var r = a.element.parentNode;
				if (
					r &&
					/pre/i.test(r.nodeName) &&
					!r.parentNode.classList.contains('code-toolbar')
				) {
					var o = document.createElement('div');
					o.classList.add('code-toolbar'),
						r.parentNode.insertBefore(o, r),
						o.appendChild(r);
					var i = document.createElement('div');
					i.classList.add('toolbar');
					var l = e,
						d = (function (e) {
							for (; e; ) {
								var t = e.getAttribute('data-toolbar-order');
								if (null != t)
									return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
								e = e.parentElement;
							}
						})(a.element);
					d &&
						(l = d.map(function (e) {
							return t[e] || n;
						})),
						l.forEach(function (e) {
							var t = e(a);
							if (t) {
								var n = document.createElement('div');
								n.classList.add('toolbar-item'),
									n.appendChild(t),
									i.appendChild(n);
							}
						}),
						o.appendChild(i);
				}
			});
		a('label', function (e) {
			var t = e.element.parentNode;
			if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
				var n,
					a,
					r = t.getAttribute('data-label');
				try {
					a = document.querySelector('template#' + r);
				} catch (e) {}
				return (
					a
						? (n = a.content)
						: (t.hasAttribute('data-url')
								? ((n = document.createElement('a')).href =
										t.getAttribute('data-url'))
								: (n = document.createElement('span')),
						  (n.textContent = r)),
					n
				);
			}
		}),
			Prism.hooks.add('complete', r);
	}
})();
!(function () {
	if ('undefined' != typeof Prism && 'undefined' != typeof document)
		if (Prism.plugins.toolbar) {
			var e = {
				none: 'Plain text',
				plain: 'Plain text',
				plaintext: 'Plain text',
				text: 'Plain text',
				txt: 'Plain text',
				html: 'HTML',
				xml: 'XML',
				svg: 'SVG',
				mathml: 'MathML',
				ssml: 'SSML',
				rss: 'RSS',
				css: 'CSS',
				clike: 'C-like',
				js: 'JavaScript',
				abap: 'ABAP',
				abnf: 'ABNF',
				al: 'AL',
				antlr4: 'ANTLR4',
				g4: 'ANTLR4',
				apacheconf: 'Apache Configuration',
				apl: 'APL',
				aql: 'AQL',
				ino: 'Arduino',
				arff: 'ARFF',
				armasm: 'ARM Assembly',
				'arm-asm': 'ARM Assembly',
				art: 'Arturo',
				asciidoc: 'AsciiDoc',
				adoc: 'AsciiDoc',
				aspnet: 'ASP.NET (C#)',
				asm6502: '6502 Assembly',
				asmatmel: 'Atmel AVR Assembly',
				autohotkey: 'AutoHotkey',
				autoit: 'AutoIt',
				avisynth: 'AviSynth',
				avs: 'AviSynth',
				'avro-idl': 'Avro IDL',
				avdl: 'Avro IDL',
				awk: 'AWK',
				gawk: 'GAWK',
				sh: 'Shell',
				basic: 'BASIC',
				bbcode: 'BBcode',
				bbj: 'BBj',
				bnf: 'BNF',
				rbnf: 'RBNF',
				bqn: 'BQN',
				bsl: 'BSL (1C:Enterprise)',
				oscript: 'OneScript',
				csharp: 'C#',
				cs: 'C#',
				dotnet: 'C#',
				cpp: 'C++',
				cfscript: 'CFScript',
				cfc: 'CFScript',
				cil: 'CIL',
				cilkc: 'Cilk/C',
				'cilk-c': 'Cilk/C',
				cilkcpp: 'Cilk/C++',
				'cilk-cpp': 'Cilk/C++',
				cilk: 'Cilk/C++',
				cmake: 'CMake',
				cobol: 'COBOL',
				coffee: 'CoffeeScript',
				conc: 'Concurnas',
				csp: 'Content-Security-Policy',
				'css-extras': 'CSS Extras',
				csv: 'CSV',
				cue: 'CUE',
				dataweave: 'DataWeave',
				dax: 'DAX',
				django: 'Django/Jinja2',
				jinja2: 'Django/Jinja2',
				'dns-zone-file': 'DNS zone file',
				'dns-zone': 'DNS zone file',
				dockerfile: 'Docker',
				dot: 'DOT (Graphviz)',
				gv: 'DOT (Graphviz)',
				ebnf: 'EBNF',
				editorconfig: 'EditorConfig',
				ejs: 'EJS',
				etlua: 'Embedded Lua templating',
				erb: 'ERB',
				'excel-formula': 'Excel Formula',
				xlsx: 'Excel Formula',
				xls: 'Excel Formula',
				fsharp: 'F#',
				'firestore-security-rules': 'Firestore security rules',
				ftl: 'FreeMarker Template Language',
				gml: 'GameMaker Language',
				gamemakerlanguage: 'GameMaker Language',
				gap: 'GAP (CAS)',
				gcode: 'G-code',
				gdscript: 'GDScript',
				gedcom: 'GEDCOM',
				gettext: 'gettext',
				po: 'gettext',
				glsl: 'GLSL',
				gn: 'GN',
				gni: 'GN',
				'linker-script': 'GNU Linker Script',
				ld: 'GNU Linker Script',
				'go-module': 'Go module',
				'go-mod': 'Go module',
				graphql: 'GraphQL',
				hbs: 'Handlebars',
				hs: 'Haskell',
				hcl: 'HCL',
				hlsl: 'HLSL',
				http: 'HTTP',
				hpkp: 'HTTP Public-Key-Pins',
				hsts: 'HTTP Strict-Transport-Security',
				ichigojam: 'IchigoJam',
				'icu-message-format': 'ICU Message Format',
				idr: 'Idris',
				ignore: '.ignore',
				gitignore: '.gitignore',
				hgignore: '.hgignore',
				npmignore: '.npmignore',
				inform7: 'Inform 7',
				javadoc: 'JavaDoc',
				javadoclike: 'JavaDoc-like',
				javastacktrace: 'Java stack trace',
				jq: 'JQ',
				jsdoc: 'JSDoc',
				'js-extras': 'JS Extras',
				json: 'JSON',
				webmanifest: 'Web App Manifest',
				json5: 'JSON5',
				jsonp: 'JSONP',
				jsstacktrace: 'JS stack trace',
				'js-templates': 'JS Templates',
				keepalived: 'Keepalived Configure',
				kts: 'Kotlin Script',
				kt: 'Kotlin',
				kumir: 'KuMir (КуМир)',
				kum: 'KuMir (КуМир)',
				latex: 'LaTeX',
				tex: 'TeX',
				context: 'ConTeXt',
				lilypond: 'LilyPond',
				ly: 'LilyPond',
				emacs: 'Lisp',
				elisp: 'Lisp',
				'emacs-lisp': 'Lisp',
				llvm: 'LLVM IR',
				log: 'Log file',
				lolcode: 'LOLCODE',
				magma: 'Magma (CAS)',
				md: 'Markdown',
				'markup-templating': 'Markup templating',
				matlab: 'MATLAB',
				maxscript: 'MAXScript',
				mel: 'MEL',
				metafont: 'METAFONT',
				mongodb: 'MongoDB',
				moon: 'MoonScript',
				n1ql: 'N1QL',
				n4js: 'N4JS',
				n4jsd: 'N4JS',
				'nand2tetris-hdl': 'Nand To Tetris HDL',
				naniscript: 'Naninovel Script',
				nani: 'Naninovel Script',
				nasm: 'NASM',
				neon: 'NEON',
				nginx: 'nginx',
				nsis: 'NSIS',
				objectivec: 'Objective-C',
				objc: 'Objective-C',
				ocaml: 'OCaml',
				opencl: 'OpenCL',
				openqasm: 'OpenQasm',
				qasm: 'OpenQasm',
				parigp: 'PARI/GP',
				objectpascal: 'Object Pascal',
				psl: 'PATROL Scripting Language',
				pcaxis: 'PC-Axis',
				px: 'PC-Axis',
				peoplecode: 'PeopleCode',
				pcode: 'PeopleCode',
				php: 'PHP',
				phpdoc: 'PHPDoc',
				'php-extras': 'PHP Extras',
				'plant-uml': 'PlantUML',
				plantuml: 'PlantUML',
				plsql: 'PL/SQL',
				powerquery: 'PowerQuery',
				pq: 'PowerQuery',
				mscript: 'PowerQuery',
				powershell: 'PowerShell',
				promql: 'PromQL',
				properties: '.properties',
				protobuf: 'Protocol Buffers',
				purebasic: 'PureBasic',
				pbfasm: 'PureBasic',
				purs: 'PureScript',
				py: 'Python',
				qsharp: 'Q#',
				qs: 'Q#',
				q: 'Q (kdb+ database)',
				qml: 'QML',
				rkt: 'Racket',
				cshtml: 'Razor C#',
				razor: 'Razor C#',
				jsx: 'React JSX',
				tsx: 'React TSX',
				renpy: "Ren'py",
				rpy: "Ren'py",
				res: 'ReScript',
				rest: 'reST (reStructuredText)',
				robotframework: 'Robot Framework',
				robot: 'Robot Framework',
				rb: 'Ruby',
				sas: 'SAS',
				sass: 'Sass (Sass)',
				scss: 'Sass (SCSS)',
				'shell-session': 'Shell session',
				'sh-session': 'Shell session',
				shellsession: 'Shell session',
				sml: 'SML',
				smlnj: 'SML/NJ',
				solidity: 'Solidity (Ethereum)',
				sol: 'Solidity (Ethereum)',
				'solution-file': 'Solution file',
				sln: 'Solution file',
				soy: 'Soy (Closure Template)',
				sparql: 'SPARQL',
				rq: 'SPARQL',
				'splunk-spl': 'Splunk SPL',
				sqf: 'SQF: Status Quo Function (Arma 3)',
				sql: 'SQL',
				stata: 'Stata Ado',
				iecst: 'Structured Text (IEC 61131-3)',
				supercollider: 'SuperCollider',
				sclang: 'SuperCollider',
				systemd: 'Systemd configuration file',
				't4-templating': 'T4 templating',
				't4-cs': 'T4 Text Templates (C#)',
				t4: 'T4 Text Templates (C#)',
				't4-vb': 'T4 Text Templates (VB)',
				tap: 'TAP',
				tt2: 'Template Toolkit 2',
				toml: 'TOML',
				trickle: 'trickle',
				troy: 'troy',
				trig: 'TriG',
				ts: 'TypeScript',
				tsconfig: 'TSConfig',
				uscript: 'UnrealScript',
				uc: 'UnrealScript',
				uorazor: 'UO Razor Script',
				uri: 'URI',
				url: 'URL',
				vbnet: 'VB.Net',
				vhdl: 'VHDL',
				vim: 'vim',
				'visual-basic': 'Visual Basic',
				vba: 'VBA',
				vb: 'Visual Basic',
				wasm: 'WebAssembly',
				'web-idl': 'Web IDL',
				webidl: 'Web IDL',
				wgsl: 'WGSL',
				wiki: 'Wiki markup',
				wolfram: 'Wolfram language',
				nb: 'Mathematica Notebook',
				wl: 'Wolfram language',
				xeoracube: 'XeoraCube',
				'xml-doc': 'XML doc (.net)',
				xojo: 'Xojo (REALbasic)',
				xquery: 'XQuery',
				yaml: 'YAML',
				yml: 'YAML',
				yang: 'YANG',
			};
			Prism.plugins.toolbar.registerButton('show-language', function (a) {
				var t = a.element.parentNode;
				if (t && /pre/i.test(t.nodeName)) {
					var o,
						i =
							t.getAttribute('data-language') ||
							e[a.language] ||
							((o = a.language)
								? (o.substring(0, 1).toUpperCase() + o.substring(1)).replace(
										/s(?=cript)/,
										'S'
								  )
								: o);
					if (i) {
						var s = document.createElement('span');
						return (s.textContent = i), s;
					}
				}
			});
		} else console.warn('Show Languages plugin loaded before Toolbar plugin.');
})();
!(function () {
	if ('undefined' != typeof Prism && 'undefined' != typeof document) {
		var n =
				/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
			r = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
			o = [
				function (n) {
					var o = r.exec(n);
					if (o) {
						for (
							var s = (n = o[1]).length >= 6 ? 2 : 1,
								e = n.length / s,
								t = 1 == s ? 1 / 15 : 1 / 255,
								i = [],
								a = 0;
							a < e;
							a++
						) {
							var c = parseInt(n.substr(a * s, s), 16);
							i.push(c * t);
						}
						return (
							3 == e && i.push(1),
							'rgba(' +
								i
									.slice(0, 3)
									.map(function (n) {
										return String(Math.round(255 * n));
									})
									.join(',') +
								',' +
								String(Number(i[3].toFixed(3))) +
								')'
						);
					}
				},
				function (n) {
					var r = new Option().style;
					return (r.color = n), r.color ? n : void 0;
				},
			];
		Prism.hooks.add('wrap', function (r) {
			if ('color' === r.type || r.classes.indexOf('color') >= 0) {
				for (
					var s, e = r.content, t = e.split(n).join(''), i = 0, a = o.length;
					i < a && !s;
					i++
				)
					s = o[i](t);
				if (!s) return;
				var c =
					'<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
					s +
					';"></span></span>';
				r.content = c + e;
			}
		});
	}
})();
!(function () {
	function t(t) {
		var e = document.createElement('textarea');
		(e.value = t.getText()),
			(e.style.top = '0'),
			(e.style.left = '0'),
			(e.style.position = 'fixed'),
			document.body.appendChild(e),
			e.focus(),
			e.select();
		try {
			var o = document.execCommand('copy');
			setTimeout(function () {
				o ? t.success() : t.error();
			}, 1);
		} catch (e) {
			setTimeout(function () {
				t.error(e);
			}, 1);
		}
		document.body.removeChild(e);
	}
	'undefined' != typeof Prism &&
		'undefined' != typeof document &&
		(Prism.plugins.toolbar
			? Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (e) {
					var o = e.element,
						n = (function (t) {
							var e = {
								copy: 'Copy',
								'copy-error': 'Press Ctrl+C to copy',
								'copy-success': 'Copied!',
								'copy-timeout': 5e3,
							};
							for (var o in e) {
								for (
									var n = 'data-prismjs-' + o, c = t;
									c && !c.hasAttribute(n);

								)
									c = c.parentElement;
								c && (e[o] = c.getAttribute(n));
							}
							return e;
						})(o),
						c = document.createElement('button');
					(c.className = 'copy-to-clipboard-button'),
						c.setAttribute('type', 'button');
					var r = document.createElement('span');
					return (
						c.appendChild(r),
						u('copy'),
						(function (e, o) {
							e.addEventListener('click', function () {
								!(function (e) {
									navigator.clipboard
										? navigator.clipboard
												.writeText(e.getText())
												.then(e.success, function () {
													t(e);
												})
										: t(e);
								})(o);
							});
						})(c, {
							getText: function () {
								return o.textContent;
							},
							success: function () {
								u('copy-success'), i();
							},
							error: function () {
								u('copy-error'),
									setTimeout(function () {
										!(function (t) {
											window.getSelection().selectAllChildren(t);
										})(o);
									}, 1),
									i();
							},
						}),
						c
					);
					function i() {
						setTimeout(function () {
							u('copy');
						}, n['copy-timeout']);
					}
					function u(t) {
						(r.textContent = n[t]), c.setAttribute('data-copy-state', t);
					}
			  })
			: console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.'));
})();
'undefined' != typeof Prism &&
	((Prism.languages.treeview = {
		'treeview-part': {
			pattern: /^.+/m,
			inside: {
				'entry-line': [
					{ pattern: /\|-- |├── /, alias: 'line-h' },
					{ pattern: /\| {3}|│ {3}/, alias: 'line-v' },
					{ pattern: /`-- |└── /, alias: 'line-v-last' },
					{ pattern: / {4}/, alias: 'line-v-gap' },
				],
				'entry-name': { pattern: /.*\S.*/, inside: { operator: / -> / } },
			},
		},
	}),
	Prism.hooks.add('wrap', function (e) {
		if ('treeview' === e.language && 'entry-name' === e.type) {
			var t = e.classes,
				n = /(^|[^\\])\/\s*$/;
			if (n.test(e.content))
				(e.content = e.content.replace(n, '$1')), t.push('dir');
			else {
				e.content = e.content.replace(/(^|[^\\])[=*|]\s*$/, '$1');
				for (
					var a = e.content.toLowerCase().replace(/\s+/g, '').split('.');
					a.length > 1;

				)
					a.shift(), t.push('ext-' + a.join('-'));
			}
			'.' === e.content[0] && t.push('dotfile');
		}
	}));
