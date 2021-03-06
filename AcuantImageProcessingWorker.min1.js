var key, Module = void 0 !== Module ? Module : {},
    moduleOverrides = {};
for (key in Module) Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
var arguments_ = [],
    thisProgram = "./this.program",
    quit_ = function (e, t) {
        throw t
    },
    ENVIRONMENT_IS_WEB = !1,
    ENVIRONMENT_IS_WORKER = !1,
    ENVIRONMENT_IS_NODE = !1,
    ENVIRONMENT_IS_SHELL = !1;
if (ENVIRONMENT_IS_WEB = "object" == typeof window, ENVIRONMENT_IS_WORKER = "function" == typeof importScripts, ENVIRONMENT_IS_NODE = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER, Module.ENVIRONMENT) throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
var read_, readAsync, readBinary, setWindowTitle, nodeFS, nodePath, scriptDirectory = "";

function locateFile(e) {
    return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e
}
if (ENVIRONMENT_IS_NODE) scriptDirectory = ENVIRONMENT_IS_WORKER ? require("path").dirname(scriptDirectory) + "/" : __dirname + "/", read_ = function (e, t) {
    return nodeFS || (nodeFS = require("fs")), nodePath || (nodePath = require("path")), e = nodePath.normalize(e), nodeFS.readFileSync(e, t ? null : "utf8")
}, readBinary = function (e) {
    var t = read_(e, !0);
    return t.buffer || (t = new Uint8Array(t)), assert(t.buffer), t
}, process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), "undefined" != typeof module && (module.exports = Module), process.on("uncaughtException", (function (e) {
    if (!(e instanceof ExitStatus)) throw e
})), process.on("unhandledRejection", abort), quit_ = function (e) {
    process.exit(e)
}, Module.inspect = function () {
    return "[Emscripten Module object]"
};
else if (ENVIRONMENT_IS_SHELL) "undefined" != typeof read && (read_ = function (e) {
    return read(e)
}), readBinary = function (e) {
    var t;
    return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (assert("object" == typeof (t = read(e, "binary"))), t)
}, "undefined" != typeof scriptArgs ? arguments_ = scriptArgs : "undefined" != typeof arguments && (arguments_ = arguments), "function" == typeof quit && (quit_ = function (e) {
    quit(e)
}), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
else {
    if (!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) throw new Error("environment detection error");
    ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory = 0 !== scriptDirectory.indexOf("blob:") ? scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1) : "", read_ = function (e) {
        var t = new XMLHttpRequest;
        return t.open("GET", e, !1), t.send(null), t.responseText
    }, ENVIRONMENT_IS_WORKER && (readBinary = function (e) {
        var t = new XMLHttpRequest;
        return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response)
    }), readAsync = function (e, t, r) {
        var o = new XMLHttpRequest;
        o.open("GET", e, !0), o.responseType = "arraybuffer", o.onload = function () {
            200 == o.status || 0 == o.status && o.response ? t(o.response) : r()
        }, o.onerror = r, o.send(null)
    }, setWindowTitle = function (e) {
        document.title = e
    }
}
var out = Module.print || console.log.bind(console),
    err = Module.printErr || console.warn.bind(console);
for (key in moduleOverrides) moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Object.getOwnPropertyDescriptor(Module, "arguments") || Object.defineProperty(Module, "arguments", {
    configurable: !0,
    get: function () {
        abort("Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), Module.thisProgram && (thisProgram = Module.thisProgram), Object.getOwnPropertyDescriptor(Module, "thisProgram") || Object.defineProperty(Module, "thisProgram", {
    configurable: !0,
    get: function () {
        abort("Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), Module.quit && (quit_ = Module.quit), Object.getOwnPropertyDescriptor(Module, "quit") || Object.defineProperty(Module, "quit", {
    configurable: !0,
    get: function () {
        abort("Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), assert(void 0 === Module.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.read, "Module.read option was removed (modify read_ in JS)"), assert(void 0 === Module.readAsync, "Module.readAsync option was removed (modify readAsync in JS)"), assert(void 0 === Module.readBinary, "Module.readBinary option was removed (modify readBinary in JS)"), assert(void 0 === Module.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"), assert(void 0 === Module.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"), Object.getOwnPropertyDescriptor(Module, "read") || Object.defineProperty(Module, "read", {
    configurable: !0,
    get: function () {
        abort("Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), Object.getOwnPropertyDescriptor(Module, "readAsync") || Object.defineProperty(Module, "readAsync", {
    configurable: !0,
    get: function () {
        abort("Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), Object.getOwnPropertyDescriptor(Module, "readBinary") || Object.defineProperty(Module, "readBinary", {
    configurable: !0,
    get: function () {
        abort("Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), Object.getOwnPropertyDescriptor(Module, "setWindowTitle") || Object.defineProperty(Module, "setWindowTitle", {
    configurable: !0,
    get: function () {
        abort("Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
});
var IDBFS = "IDBFS is no longer included by default; build with -lidbfs.js",
    PROXYFS = "PROXYFS is no longer included by default; build with -lproxyfs.js",
    WORKERFS = "WORKERFS is no longer included by default; build with -lworkerfs.js",
    NODEFS = "NODEFS is no longer included by default; build with -lnodefs.js",
    STACK_ALIGN = 16;

function dynamicAlloc(e) {
    assert(DYNAMICTOP_PTR);
    var t = HEAP32[DYNAMICTOP_PTR >> 2],
        r = t + e + 15 & -16;
    return assert(r <= HEAP8.length, "failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly"), HEAP32[DYNAMICTOP_PTR >> 2] = r, t
}

function alignMemory(e, t) {
    return t || (t = STACK_ALIGN), Math.ceil(e / t) * t
}

function getNativeTypeSize(e) {
    switch (e) {
        case "i1":
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "i32":
            return 4;
        case "i64":
            return 8;
        case "float":
            return 4;
        case "double":
            return 8;
        default:
            if ("*" === e[e.length - 1]) return 4;
            if ("i" === e[0]) {
                var t = Number(e.substr(1));
                return assert(t % 8 == 0, "getNativeTypeSize invalid bits " + t + ", type " + e), t / 8
            }
            return 0
    }
}

function warnOnce(e) {
    warnOnce.shown || (warnOnce.shown = {}), warnOnce.shown[e] || (warnOnce.shown[e] = 1, err(e))
}

function convertJsFunctionToWasm(e, t) {
    if ("function" == typeof WebAssembly.Function) {
        for (var r = {
                i: "i32",
                j: "i64",
                f: "f32",
                d: "f64"
            }, o = {
                parameters: [],
                results: "v" == t[0] ? [] : [r[t[0]]]
            }, n = 1; n < t.length; ++n) o.parameters.push(r[t[n]]);
        return new WebAssembly.Function(o, e)
    }
    var i = [1, 0, 1, 96],
        a = t.slice(0, 1),
        s = t.slice(1),
        d = {
            i: 127,
            j: 126,
            f: 125,
            d: 124
        };
    i.push(s.length);
    for (n = 0; n < s.length; ++n) i.push(d[s[n]]);
    "v" == a ? i.push(0) : i = i.concat([1, d[a]]), i[1] = i.length - 2;
    var l = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(i, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0])),
        c = new WebAssembly.Module(l);
    return new WebAssembly.Instance(c, {
        e: {
            f: e
        }
    }).exports.f
}
var functionsInTableMap, freeTableIndexes = [];

function addFunctionWasm(e, t) {
    var r, o = wasmTable;
    if (!functionsInTableMap) {
        functionsInTableMap = new WeakMap;
        for (var n = 0; n < o.length; n++) {
            var i = o.get(n);
            i && functionsInTableMap.set(i, n)
        }
    }
    if (functionsInTableMap.has(e)) return functionsInTableMap.get(e);
    if (freeTableIndexes.length) r = freeTableIndexes.pop();
    else {
        r = o.length;
        try {
            o.grow(1)
        } catch (e) {
            if (!(e instanceof RangeError)) throw e;
            throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
        }
    }
    try {
        o.set(r, e)
    } catch (n) {
        if (!(n instanceof TypeError)) throw n;
        assert(void 0 !== t, "Missing signature argument to addFunction");
        var a = convertJsFunctionToWasm(e, t);
        o.set(r, a)
    }
    return functionsInTableMap.set(e, r), r
}

function removeFunctionWasm(e) {
    functionsInTableMap.delete(wasmTable.get(e)), freeTableIndexes.push(e)
}

function addFunction(e, t) {
    return assert(void 0 !== e), addFunctionWasm(e, t)
}

function removeFunction(e) {
    removeFunctionWasm(e)
}
var funcWrappers = {};

function getFuncWrapper(e, t) {
    if (e) {
        assert(t), funcWrappers[t] || (funcWrappers[t] = {});
        var r = funcWrappers[t];
        return r[e] || (1 === t.length ? r[e] = function () {
            return dynCall(t, e)
        } : 2 === t.length ? r[e] = function (r) {
            return dynCall(t, e, [r])
        } : r[e] = function () {
            return dynCall(t, e, Array.prototype.slice.call(arguments))
        }), r[e]
    }
}

function makeBigInt(e, t, r) {
    return r ? +(e >>> 0) + 4294967296 * +(t >>> 0) : +(e >>> 0) + 4294967296 * +(0 | t)
}

function dynCall(e, t, r) {
    return r && r.length ? (assert(r.length === e.substring(1).replace(/j/g, "--").length), assert("dynCall_" + e in Module, "bad function pointer type - no table for sig '" + e + "'"), Module["dynCall_" + e].apply(null, [t].concat(r))) : (assert(1 == e.length), assert("dynCall_" + e in Module, "bad function pointer type - no table for sig '" + e + "'"), Module["dynCall_" + e].call(null, t))
}
var tempRet0 = 0,
    setTempRet0 = function (e) {
        tempRet0 = e
    },
    getTempRet0 = function () {
        return tempRet0
    };

function getCompilerSetting(e) {
    throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work"
}
var wasmBinary, noExitRuntime, wasmMemory, GLOBAL_BASE = 1024;

function setValue(e, t, r, o) {
    switch ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"), r) {
        case "i1":
        case "i8":
            HEAP8[e >> 0] = t;
            break;
        case "i16":
            HEAP16[e >> 1] = t;
            break;
        case "i32":
            HEAP32[e >> 2] = t;
            break;
        case "i64":
            tempI64 = [t >>> 0, (tempDouble = t, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[e >> 2] = tempI64[0], HEAP32[e + 4 >> 2] = tempI64[1];
            break;
        case "float":
            HEAPF32[e >> 2] = t;
            break;
        case "double":
            HEAPF64[e >> 3] = t;
            break;
        default:
            abort("invalid type for setValue: " + r)
    }
}

function getValue(e, t, r) {
    switch ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"), t) {
        case "i1":
        case "i8":
            return HEAP8[e >> 0];
        case "i16":
            return HEAP16[e >> 1];
        case "i32":
        case "i64":
            return HEAP32[e >> 2];
        case "float":
            return HEAPF32[e >> 2];
        case "double":
            return HEAPF64[e >> 3];
        default:
            abort("invalid type for getValue: " + t)
    }
    return null
}
Module.wasmBinary && (wasmBinary = Module.wasmBinary), Object.getOwnPropertyDescriptor(Module, "wasmBinary") || Object.defineProperty(Module, "wasmBinary", {
    configurable: !0,
    get: function () {
        abort("Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), Module.noExitRuntime && (noExitRuntime = Module.noExitRuntime), Object.getOwnPropertyDescriptor(Module, "noExitRuntime") || Object.defineProperty(Module, "noExitRuntime", {
    configurable: !0,
    get: function () {
        abort("Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
    }
}), "object" != typeof WebAssembly && abort("no native wasm support detected");
var wasmTable = new WebAssembly.Table({
        initial: 655,
        maximum: 655,
        element: "anyfunc"
    }),
    ABORT = !1,
    EXITSTATUS = 0;

function assert(e, t) {
    e || abort("Assertion failed: " + t)
}

function getCFunc(e) {
    var t = Module["_" + e];
    return assert(t, "Cannot call unknown function " + e + ", make sure it is exported"), t
}

function ccall(e, t, r, o, n) {
    var i = {
        string: function (e) {
            var t = 0;
            if (null != e && 0 !== e) {
                var r = 1 + (e.length << 2);
                stringToUTF8(e, t = stackAlloc(r), r)
            }
            return t
        },
        array: function (e) {
            var t = stackAlloc(e.length);
            return writeArrayToMemory(e, t), t
        }
    };
    var a = getCFunc(e),
        s = [],
        d = 0;
    if (assert("array" !== t, 'Return type should not be "array".'), o)
        for (var l = 0; l < o.length; l++) {
            var c = i[r[l]];
            c ? (0 === d && (d = stackSave()), s[l] = c(o[l])) : s[l] = o[l]
        }
    var u = a.apply(null, s);
    return u = function (e) {
        return "string" === t ? UTF8ToString(e) : "boolean" === t ? Boolean(e) : e
    }(u), 0 !== d && stackRestore(d), u
}

function cwrap(e, t, r, o) {
    return function () {
        return ccall(e, t, r, arguments, o)
    }
}
var ALLOC_NORMAL = 0,
    ALLOC_STACK = 1,
    ALLOC_DYNAMIC = 2,
    ALLOC_NONE = 3;

function allocate(e, t, r, o) {
    var n, i;
    "number" == typeof e ? (n = !0, i = e) : (n = !1, i = e.length);
    var a, s = "string" == typeof t ? t : null;
    if (a = r == ALLOC_NONE ? o : [_malloc, stackAlloc, dynamicAlloc][r](Math.max(i, s ? 1 : t.length)), n) {
        var d;
        for (o = a, assert(0 == (3 & a)), d = a + (-4 & i); o < d; o += 4) HEAP32[o >> 2] = 0;
        for (d = a + i; o < d;) HEAP8[o++ >> 0] = 0;
        return a
    }
    if ("i8" === s) return e.subarray || e.slice ? HEAPU8.set(e, a) : HEAPU8.set(new Uint8Array(e), a), a;
    for (var l, c, u, _ = 0; _ < i;) {
        var p = e[_];
        0 !== (l = s || t[_]) ? (assert(l, "Must know what type to store in allocate!"), "i64" == l && (l = "i32"), setValue(a + _, p, l), u !== l && (c = getNativeTypeSize(l), u = l), _ += c) : _++
    }
    return a
}

function getMemory(e) {
    return runtimeInitialized ? _malloc(e) : dynamicAlloc(e)
}
var UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

function UTF8ArrayToString(e, t, r) {
    for (var o = t + r, n = t; e[n] && !(n >= o);) ++n;
    if (n - t > 16 && e.subarray && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, n));
    for (var i = ""; t < n;) {
        var a = e[t++];
        if (128 & a) {
            var s = 63 & e[t++];
            if (192 != (224 & a)) {
                var d = 63 & e[t++];
                if (224 == (240 & a) ? a = (15 & a) << 12 | s << 6 | d : (240 != (248 & a) && warnOnce("Invalid UTF-8 leading byte 0x" + a.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"), a = (7 & a) << 18 | s << 12 | d << 6 | 63 & e[t++]), a < 65536) i += String.fromCharCode(a);
                else {
                    var l = a - 65536;
                    i += String.fromCharCode(55296 | l >> 10, 56320 | 1023 & l)
                }
            } else i += String.fromCharCode((31 & a) << 6 | s)
        } else i += String.fromCharCode(a)
    }
    return i
}

function UTF8ToString(e, t) {
    return e ? UTF8ArrayToString(HEAPU8, e, t) : ""
}

function stringToUTF8Array(e, t, r, o) {
    if (!(o > 0)) return 0;
    for (var n = r, i = r + o - 1, a = 0; a < e.length; ++a) {
        var s = e.charCodeAt(a);
        if (s >= 55296 && s <= 57343) s = 65536 + ((1023 & s) << 10) | 1023 & e.charCodeAt(++a);
        if (s <= 127) {
            if (r >= i) break;
            t[r++] = s
        } else if (s <= 2047) {
            if (r + 1 >= i) break;
            t[r++] = 192 | s >> 6, t[r++] = 128 | 63 & s
        } else if (s <= 65535) {
            if (r + 2 >= i) break;
            t[r++] = 224 | s >> 12, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | 63 & s
        } else {
            if (r + 3 >= i) break;
            s >= 2097152 && warnOnce("Invalid Unicode code point 0x" + s.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF)."), t[r++] = 240 | s >> 18, t[r++] = 128 | s >> 12 & 63, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | 63 & s
        }
    }
    return t[r] = 0, r - n
}

function stringToUTF8(e, t, r) {
    return assert("number" == typeof r, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), stringToUTF8Array(e, HEAPU8, t, r)
}

function lengthBytesUTF8(e) {
    for (var t = 0, r = 0; r < e.length; ++r) {
        var o = e.charCodeAt(r);
        o >= 55296 && o <= 57343 && (o = 65536 + ((1023 & o) << 10) | 1023 & e.charCodeAt(++r)), o <= 127 ? ++t : t += o <= 2047 ? 2 : o <= 65535 ? 3 : 4
    }
    return t
}

function AsciiToString(e) {
    for (var t = "";;) {
        var r = HEAPU8[e++ >> 0];
        if (!r) return t;
        t += String.fromCharCode(r)
    }
}

function stringToAscii(e, t) {
    return writeAsciiToMemory(e, t, !1)
}
var UTF16Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

function UTF16ToString(e, t) {
    assert(e % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
    for (var r = e, o = r >> 1, n = o + t / 2; !(o >= n) && HEAPU16[o];) ++o;
    if ((r = o << 1) - e > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(e, r));
    for (var i = 0, a = "";;) {
        var s = HEAP16[e + 2 * i >> 1];
        if (0 == s || i == t / 2) return a;
        ++i, a += String.fromCharCode(s)
    }
}

function stringToUTF16(e, t, r) {
    if (assert(t % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!"), assert("number" == typeof r, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), void 0 === r && (r = 2147483647), r < 2) return 0;
    for (var o = t, n = (r -= 2) < 2 * e.length ? r / 2 : e.length, i = 0; i < n; ++i) {
        var a = e.charCodeAt(i);
        HEAP16[t >> 1] = a, t += 2
    }
    return HEAP16[t >> 1] = 0, t - o
}

function lengthBytesUTF16(e) {
    return 2 * e.length
}

function UTF32ToString(e, t) {
    assert(e % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
    for (var r = 0, o = ""; !(r >= t / 4);) {
        var n = HEAP32[e + 4 * r >> 2];
        if (0 == n) break;
        if (++r, n >= 65536) {
            var i = n - 65536;
            o += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
        } else o += String.fromCharCode(n)
    }
    return o
}

function stringToUTF32(e, t, r) {
    if (assert(t % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!"), assert("number" == typeof r, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), void 0 === r && (r = 2147483647), r < 4) return 0;
    for (var o = t, n = o + r - 4, i = 0; i < e.length; ++i) {
        var a = e.charCodeAt(i);
        if (a >= 55296 && a <= 57343) a = 65536 + ((1023 & a) << 10) | 1023 & e.charCodeAt(++i);
        if (HEAP32[t >> 2] = a, (t += 4) + 4 > n) break
    }
    return HEAP32[t >> 2] = 0, t - o
}

function lengthBytesUTF32(e) {
    for (var t = 0, r = 0; r < e.length; ++r) {
        var o = e.charCodeAt(r);
        o >= 55296 && o <= 57343 && ++r, t += 4
    }
    return t
}

function allocateUTF8(e) {
    var t = lengthBytesUTF8(e) + 1,
        r = _malloc(t);
    return r && stringToUTF8Array(e, HEAP8, r, t), r
}

function allocateUTF8OnStack(e) {
    var t = lengthBytesUTF8(e) + 1,
        r = stackAlloc(t);
    return stringToUTF8Array(e, HEAP8, r, t), r
}

function writeStringToMemory(e, t, r) {
    var o, n;
    warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!"), r && (n = t + lengthBytesUTF8(e), o = HEAP8[n]), stringToUTF8(e, t, 1 / 0), r && (HEAP8[n] = o)
}

function writeArrayToMemory(e, t) {
    assert(e.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)"), HEAP8.set(e, t)
}

function writeAsciiToMemory(e, t, r) {
    for (var o = 0; o < e.length; ++o) assert(e.charCodeAt(o) == e.charCodeAt(o) & 255), HEAP8[t++ >> 0] = e.charCodeAt(o);
    r || (HEAP8[t >> 0] = 0)
}
var HEAP, buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64, PAGE_SIZE = 16384,
    WASM_PAGE_SIZE = 65536,
    ASMJS_PAGE_SIZE = 16777216;

function alignUp(e, t) {
    return e % t > 0 && (e += t - e % t), e
}

function updateGlobalBufferAndViews(e) {
    buffer = e, Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = HEAPU16 = new Uint16Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = HEAPF32 = new Float32Array(e), Module.HEAPF64 = HEAPF64 = new Float64Array(e)
}
var STATIC_BASE = 1024,
    STACK_BASE = 5809984,
    STACKTOP = STACK_BASE,
    STACK_MAX = 567104,
    DYNAMIC_BASE = 5809984,
    DYNAMICTOP_PTR = 566928;
assert(STACK_BASE % 16 == 0, "stack must start aligned"), assert(DYNAMIC_BASE % 16 == 0, "heap must start aligned");
var TOTAL_STACK = 5242880;
Module.TOTAL_STACK && assert(TOTAL_STACK === Module.TOTAL_STACK, "the stack size can no longer be determined at runtime");
var INITIAL_INITIAL_MEMORY = Module.INITIAL_MEMORY || 94633984;

function writeStackCookie() {
    assert(0 == (3 & STACK_MAX)), HEAPU32[1 + (STACK_MAX >> 2)] = 34821223, HEAPU32[2 + (STACK_MAX >> 2)] = 2310721022, HEAP32[0] = 1668509029
}

function checkStackCookie() {
    var e = HEAPU32[1 + (STACK_MAX >> 2)],
        t = HEAPU32[2 + (STACK_MAX >> 2)];
    34821223 == e && 2310721022 == t || abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + t.toString(16) + " " + e.toString(16)), 1668509029 !== HEAP32[0] && abort("Runtime error: The application has corrupted its heap memory area (address zero)!")
}

function abortFnPtrError(e, t) {
    abort("Invalid function pointer " + e + " called with signature '" + t + "'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this). Build with ASSERTIONS=2 for more info.")
}

function callRuntimeCallbacks(e) {
    for (; e.length > 0;) {
        var t = e.shift();
        if ("function" != typeof t) {
            var r = t.func;
            "number" == typeof r ? void 0 === t.arg ? Module.dynCall_v(r) : Module.dynCall_vi(r, t.arg) : r(void 0 === t.arg ? null : t.arg)
        } else t(Module)
    }
}
Object.getOwnPropertyDescriptor(Module, "INITIAL_MEMORY") || Object.defineProperty(Module, "INITIAL_MEMORY", {
        configurable: !0,
        get: function () {
            abort("Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_INITIAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")"), assert("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"), (wasmMemory = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({
        initial: INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
        maximum: 2147483648 / WASM_PAGE_SIZE
    })) && (buffer = wasmMemory.buffer), assert((INITIAL_INITIAL_MEMORY = buffer.byteLength) % WASM_PAGE_SIZE == 0), assert(65536 % WASM_PAGE_SIZE == 0), updateGlobalBufferAndViews(buffer), HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE,
    function () {
        var e = new Int16Array(1),
            t = new Int8Array(e.buffer);
        if (e[0] = 25459, 115 !== t[0] || 99 !== t[1]) throw "Runtime error: expected the system to be little-endian!"
    }();
var __ATPRERUN__ = [],
    __ATINIT__ = [],
    __ATMAIN__ = [],
    __ATEXIT__ = [],
    __ATPOSTRUN__ = [],
    runtimeInitialized = !1,
    runtimeExited = !1;

function preRun() {
    if (Module.preRun)
        for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;) addOnPreRun(Module.preRun.shift());
    callRuntimeCallbacks(__ATPRERUN__)
}

function initRuntime() {
    checkStackCookie(), assert(!runtimeInitialized), runtimeInitialized = !0, Module.noFSInit || FS.init.initialized || FS.init(), TTY.init(), callRuntimeCallbacks(__ATINIT__)
}

function preMain() {
    checkStackCookie(), FS.ignorePermissions = !1, callRuntimeCallbacks(__ATMAIN__)
}

function exitRuntime() {
    checkStackCookie(), runtimeExited = !0
}

function postRun() {
    if (checkStackCookie(), Module.postRun)
        for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;) addOnPostRun(Module.postRun.shift());
    callRuntimeCallbacks(__ATPOSTRUN__)
}

function addOnPreRun(e) {
    __ATPRERUN__.unshift(e)
}

function addOnInit(e) {
    __ATINIT__.unshift(e)
}

function addOnPreMain(e) {
    __ATMAIN__.unshift(e)
}

function addOnExit(e) {}

function addOnPostRun(e) {
    __ATPOSTRUN__.unshift(e)
}

function unSign(e, t, r) {
    return e >= 0 ? e : t <= 32 ? 2 * Math.abs(1 << t - 1) + e : Math.pow(2, t) + e
}

function reSign(e, t, r) {
    if (e <= 0) return e;
    var o = t <= 32 ? Math.abs(1 << t - 1) : Math.pow(2, t - 1);
    return e >= o && (t <= 32 || e > o) && (e = -2 * o + e), e
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var Math_abs = Math.abs,
    Math_cos = Math.cos,
    Math_sin = Math.sin,
    Math_tan = Math.tan,
    Math_acos = Math.acos,
    Math_asin = Math.asin,
    Math_atan = Math.atan,
    Math_atan2 = Math.atan2,
    Math_exp = Math.exp,
    Math_log = Math.log,
    Math_sqrt = Math.sqrt,
    Math_ceil = Math.ceil,
    Math_floor = Math.floor,
    Math_pow = Math.pow,
    Math_imul = Math.imul,
    Math_fround = Math.fround,
    Math_round = Math.round,
    Math_min = Math.min,
    Math_max = Math.max,
    Math_clz32 = Math.clz32,
    Math_trunc = Math.trunc,
    runDependencies = 0,
    runDependencyWatcher = null,
    dependenciesFulfilled = null,
    runDependencyTracking = {};

function getUniqueRunDependency(e) {
    for (var t = e;;) {
        if (!runDependencyTracking[e]) return e;
        e = t + Math.random()
    }
}

function addRunDependency(e) {
    runDependencies++, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), e ? (assert(!runDependencyTracking[e]), runDependencyTracking[e] = 1, null === runDependencyWatcher && "undefined" != typeof setInterval && (runDependencyWatcher = setInterval((function () {
        if (ABORT) return clearInterval(runDependencyWatcher), void(runDependencyWatcher = null);
        var e = !1;
        for (var t in runDependencyTracking) e || (e = !0, err("still waiting on run dependencies:")), err("dependency: " + t);
        e && err("(end of list)")
    }), 1e4))) : err("warning: run dependency added without ID")
}

function removeRunDependency(e) {
    if (runDependencies--, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), e ? (assert(runDependencyTracking[e]), delete runDependencyTracking[e]) : err("warning: run dependency removed without ID"), 0 == runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher), runDependencyWatcher = null), dependenciesFulfilled)) {
        var t = dependenciesFulfilled;
        dependenciesFulfilled = null, t()
    }
}

function abort(e) {
    throw Module.onAbort && Module.onAbort(e), out(e += ""), err(e), ABORT = !0, EXITSTATUS = 1, e = "abort(" + e + ") at " + stackTrace(), new WebAssembly.RuntimeError(e)
}
Module.preloadedImages = {}, Module.preloadedAudios = {};
var memoryInitializer = null;

function hasPrefix(e, t) {
    return String.prototype.startsWith ? e.startsWith(t) : 0 === e.indexOf(t)
}
var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(e) {
    return hasPrefix(e, dataURIPrefix)
}
var fileURIPrefix = "file://";

function isFileURI(e) {
    return hasPrefix(e, fileURIPrefix)
}

function createExportWrapper(e, t) {
    return function () {
        var r = e,
            o = t;
        return t || (o = Module.asm), assert(runtimeInitialized, "native function `" + r + "` called before runtime initialization"), assert(!runtimeExited, "native function `" + r + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), o[e] || assert(o[e], "exported native function `" + r + "` not found"), o[e].apply(null, arguments)
    }
}
console.log("WASM ORIGIN: " + self.origin);
var tempDouble, tempI64, wasmBinaryFile = scriptDirectory + "/AcuantImageProcessingWorker.wasm";

function getBinary() {
    try {
        if (wasmBinary) return new Uint8Array(wasmBinary);
        if (readBinary) return readBinary(wasmBinaryFile);
        throw "both async and sync fetching of the wasm failed"
    } catch (e) {
        abort(e)
    }
}

function getBinaryPromise() {
    return wasmBinary || !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER || "function" != typeof fetch || isFileURI(wasmBinaryFile) ? new Promise((function (e, t) {
        e(getBinary())
    })) : fetch(wasmBinaryFile, {
        credentials: "same-origin"
    }).then((function (e) {
        if (!e.ok) throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
        return e.arrayBuffer()
    })).catch((function () {
        return getBinary()
    }))
}

function createWasm() {
    var e = {
        env: asmLibraryArg,
        wasi_snapshot_preview1: asmLibraryArg
    };

    function t(e, t) {
        var r = e.exports;
        Module.asm = r, removeRunDependency("wasm-instantiate")
    }
    addRunDependency("wasm-instantiate");
    var r = Module;

    function o(e) {
        assert(Module === r, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), r = null, t(e.instance)
    }

    function n(t) {
        return getBinaryPromise().then((function (t) {
            return WebAssembly.instantiate(t, e)
        })).then(t, (function (e) {
            err("failed to asynchronously prepare wasm: " + e), abort(e)
        }))
    }
    if (Module.instantiateWasm) try {
        return Module.instantiateWasm(e, t)
    } catch (e) {
        return err("Module.instantiateWasm callback failed with error: " + e), !1
    }
    return function () {
        if (wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || isDataURI(wasmBinaryFile) || isFileURI(wasmBinaryFile) || "function" != typeof fetch) return n(o);
        fetch(wasmBinaryFile, {
            credentials: "same-origin"
        }).then((function (t) {
            return WebAssembly.instantiateStreaming(t, e).then(o, (function (e) {
                return err("wasm streaming compile failed: " + e), err("falling back to ArrayBuffer instantiation"), n(o)
            }))
        }))
    }(), {}
}
isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile));
var ASM_CONSTS = {};

function call_validate(e) {
    let t = function (e) {
            try {
                return JSON.parse(e)
            } catch (e) {
                return
            }
        },
        r = function (e) {
            let r = e.split(".");
            if (3 == r.length) {
                let e = t(atob(r[0])),
                    o = t(atob(r[1])),
                    n = r[2];
                if (e && o && n && e.kid && e.alg && o.sub && o.iss && o.exp && o.iat) {
                    let t = Math.floor((new Date).getTime() / 1e3);
                    "string" == typeof e.kid && "string" == typeof e.alg && "string" == typeof o.sub && o.sub.length > 0 && "string" == typeof o.iss && "number" == typeof o.exp && o.exp > t && "number" == typeof o.iat ? Module.sdvcvzdsvdsdfff344344514sdf(!0, -1) : Module.sdvcvzdsvdsdfff344344514sdf(!1, 5)
                } else Module.sdvcvzdsvdsdfff344344514sdf(!1, 4)
            } else Module.sdvcvzdsvdsdfff344344514sdf(!1, 3)
        };
    var o = Module.getToken(),
        n = Module.getOauthToken(),
        i = Module.getEndpoint(),
        a = new XMLHttpRequest;
    if (n) r(n);
    else {
        a.open("POST", i + UTF8ToString(e), !0), a.setRequestHeader("Authorization", "Basic " + o), a.setRequestHeader("Content-type", "application/json");
        a.responseType = "text", a.send(JSON.stringify({
            grant_type: "client_credentials"
        })), a.onreadystatechange = function () {
            if (4 === a.readyState)
                if (200 === a.status || 204 === a.status) {
                    let e = t(a.responseText);
                    e && e.hasOwnProperty("access_token") ? r(e.access_token) : Module.sdvcvzdsvdsdfff344344514sdf(!1, 2)
                } else Module.sdvcvzdsvdsdfff344344514sdf(!1, a.status)
        }
    }
}

function abortStackOverflow(e) {
    abort("Stack overflow! Attempted to allocate " + e + " bytes on the stack, but stack has only " + (STACK_MAX - stackSave() + e) + " bytes available!")
}

function demangle(e) {
    return warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), e
}

function demangleAll(e) {
    return e.replace(/\b_Z[\w\d_]+/g, (function (e) {
        var t = demangle(e);
        return e === t ? e : t + " [" + e + "]"
    }))
}

function jsStackTrace() {
    var e = new Error;
    if (!e.stack) {
        try {
            throw new Error
        } catch (t) {
            e = t
        }
        if (!e.stack) return "(no stack trace available)"
    }
    return e.stack.toString()
}

function stackTrace() {
    var e = jsStackTrace();
    return Module.extraStackTrace && (e += "\n" + Module.extraStackTrace()), demangleAll(e)
}

function ___assert_fail(e, t, r, o) {
    abort("Assertion failed: " + UTF8ToString(e) + ", at: " + [t ? UTF8ToString(t) : "unknown filename", r, o ? UTF8ToString(o) : "unknown function"])
}

function ___cxa_allocate_exception(e) {
    return _malloc(e)
}

function _atexit(e, t) {
    warnOnce("atexit() called, but EXIT_RUNTIME is not set, so atexits() will not be called. set EXIT_RUNTIME to 1 (see the FAQ)")
}

function ___cxa_atexit(e, t) {
    return _atexit(e, t)
}
__ATINIT__.push({
    func: function () {
        ___wasm_call_ctors()
    }
}), Module.abortStackOverflow = abortStackOverflow, Module.demangle = demangle, Module.demangleAll = demangleAll, Module.jsStackTrace = jsStackTrace, Module.stackTrace = stackTrace, Module.___assert_fail = ___assert_fail, Module.___cxa_allocate_exception = ___cxa_allocate_exception, Module._atexit = _atexit, Module.___cxa_atexit = ___cxa_atexit;
var ___exception_infos = {};
Module.___exception_infos = ___exception_infos;
var ___exception_caught = [];

function ___exception_addRef(e) {
    e && ___exception_infos[e].refcount++
}

function ___exception_deAdjust(e) {
    if (!e || ___exception_infos[e]) return e;
    for (var t in ___exception_infos)
        for (var r = +t, o = ___exception_infos[r].adjusted, n = o.length, i = 0; i < n; i++)
            if (o[i] === e) return r;
    return e
}

function ___cxa_begin_catch(e) {
    var t = ___exception_infos[e];
    return t && !t.caught && (t.caught = !0, __ZSt18uncaught_exceptionv.uncaught_exceptions--), t && (t.rethrown = !1), ___exception_caught.push(e), ___exception_addRef(___exception_deAdjust(e)), e
}
Module.___exception_caught = ___exception_caught, Module.___exception_addRef = ___exception_addRef, Module.___exception_deAdjust = ___exception_deAdjust, Module.___cxa_begin_catch = ___cxa_begin_catch;
var ___exception_last = 0;

function ___cxa_free_exception(e) {
    try {
        return _free(e)
    } catch (e) {
        err("exception during cxa_free_exception: " + e)
    }
}

function ___exception_decRef(e) {
    if (e) {
        var t = ___exception_infos[e];
        assert(t.refcount > 0), t.refcount--, 0 !== t.refcount || t.rethrown || (t.destructor && Module.dynCall_ii(t.destructor, e), delete ___exception_infos[e], ___cxa_free_exception(e))
    }
}

function ___cxa_end_catch() {
    _setThrew(0);
    var e = ___exception_caught.pop();
    e && (___exception_decRef(___exception_deAdjust(e)), ___exception_last = 0)
}

function ___cxa_find_matching_catch_2() {
    var e = ___exception_last;
    if (!e) return 0 | (setTempRet0(0), 0);
    var t = ___exception_infos[e],
        r = t.type;
    if (!r) return 0 | (setTempRet0(0), e);
    var o = Array.prototype.slice.call(arguments),
        n = (___cxa_is_pointer_type(r), 567088);
    HEAP32[n >> 2] = e, e = n;
    for (var i = 0; i < o.length; i++)
        if (o[i] && ___cxa_can_catch(o[i], r, e)) return e = HEAP32[e >> 2], t.adjusted.push(e), 0 | (setTempRet0(o[i]), e);
    return e = HEAP32[e >> 2], 0 | (setTempRet0(r), e)
}

function ___cxa_find_matching_catch_3() {
    var e = ___exception_last;
    if (!e) return 0 | (setTempRet0(0), 0);
    var t = ___exception_infos[e],
        r = t.type;
    if (!r) return 0 | (setTempRet0(0), e);
    var o = Array.prototype.slice.call(arguments),
        n = (___cxa_is_pointer_type(r), 567088);
    HEAP32[n >> 2] = e, e = n;
    for (var i = 0; i < o.length; i++)
        if (o[i] && ___cxa_can_catch(o[i], r, e)) return e = HEAP32[e >> 2], t.adjusted.push(e), 0 | (setTempRet0(o[i]), e);
    return e = HEAP32[e >> 2], 0 | (setTempRet0(r), e)
}

function ___cxa_find_matching_catch_4() {
    var e = ___exception_last;
    if (!e) return 0 | (setTempRet0(0), 0);
    var t = ___exception_infos[e],
        r = t.type;
    if (!r) return 0 | (setTempRet0(0), e);
    var o = Array.prototype.slice.call(arguments),
        n = (___cxa_is_pointer_type(r), 567088);
    HEAP32[n >> 2] = e, e = n;
    for (var i = 0; i < o.length; i++)
        if (o[i] && ___cxa_can_catch(o[i], r, e)) return e = HEAP32[e >> 2], t.adjusted.push(e), 0 | (setTempRet0(o[i]), e);
    return e = HEAP32[e >> 2], 0 | (setTempRet0(r), e)
}

function ___cxa_throw(e, t, r) {
    throw ___exception_infos[e] = {
        ptr: e,
        adjusted: [e],
        type: t,
        destructor: r,
        refcount: 0,
        caught: !1,
        rethrown: !1
    }, ___exception_last = e, "uncaught_exception" in __ZSt18uncaught_exceptionv ? __ZSt18uncaught_exceptionv.uncaught_exceptions++ : __ZSt18uncaught_exceptionv.uncaught_exceptions = 1, e
}

function ___cxa_uncaught_exceptions() {
    return __ZSt18uncaught_exceptionv.uncaught_exceptions
}

function ___handle_stack_overflow() {
    abort("stack overflow")
}

function ___resumeException(e) {
    throw ___exception_last || (___exception_last = e), e
}

function setErrNo(e) {
    return HEAP32[___errno_location() >> 2] = e, e
}
Module.___exception_last = ___exception_last, Module.___cxa_free_exception = ___cxa_free_exception, Module.___exception_decRef = ___exception_decRef, Module.___cxa_end_catch = ___cxa_end_catch, Module.___cxa_find_matching_catch_2 = ___cxa_find_matching_catch_2, Module.___cxa_find_matching_catch_3 = ___cxa_find_matching_catch_3, Module.___cxa_find_matching_catch_4 = ___cxa_find_matching_catch_4, Module.___cxa_throw = ___cxa_throw, Module.___cxa_uncaught_exceptions = ___cxa_uncaught_exceptions, Module.___handle_stack_overflow = ___handle_stack_overflow, Module.___resumeException = ___resumeException, Module.setErrNo = setErrNo;
var PATH = {
    splitPath: function (e) {
        return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1)
    },
    normalizeArray: function (e, t) {
        for (var r = 0, o = e.length - 1; o >= 0; o--) {
            var n = e[o];
            "." === n ? e.splice(o, 1) : ".." === n ? (e.splice(o, 1), r++) : r && (e.splice(o, 1), r--)
        }
        if (t)
            for (; r; r--) e.unshift("..");
        return e
    },
    normalize: function (e) {
        var t = "/" === e.charAt(0),
            r = "/" === e.substr(-1);
        return (e = PATH.normalizeArray(e.split("/").filter((function (e) {
            return !!e
        })), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e
    },
    dirname: function (e) {
        var t = PATH.splitPath(e),
            r = t[0],
            o = t[1];
        return r || o ? (o && (o = o.substr(0, o.length - 1)), r + o) : "."
    },
    basename: function (e) {
        if ("/" === e) return "/";
        var t = e.lastIndexOf("/");
        return -1 === t ? e : e.substr(t + 1)
    },
    extname: function (e) {
        return PATH.splitPath(e)[3]
    },
    join: function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(e.join("/"))
    },
    join2: function (e, t) {
        return PATH.normalize(e + "/" + t)
    }
};
Module.PATH = PATH;
var PATH_FS = {
    resolve: function () {
        for (var e = "", t = !1, r = arguments.length - 1; r >= -1 && !t; r--) {
            var o = r >= 0 ? arguments[r] : FS.cwd();
            if ("string" != typeof o) throw new TypeError("Arguments to path.resolve must be strings");
            if (!o) return "";
            e = o + "/" + e, t = "/" === o.charAt(0)
        }
        return (t ? "/" : "") + (e = PATH.normalizeArray(e.split("/").filter((function (e) {
            return !!e
        })), !t).join("/")) || "."
    },
    relative: function (e, t) {
        function r(e) {
            for (var t = 0; t < e.length && "" === e[t]; t++);
            for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
            return t > r ? [] : e.slice(t, r - t + 1)
        }
        e = PATH_FS.resolve(e).substr(1), t = PATH_FS.resolve(t).substr(1);
        for (var o = r(e.split("/")), n = r(t.split("/")), i = Math.min(o.length, n.length), a = i, s = 0; s < i; s++)
            if (o[s] !== n[s]) {
                a = s;
                break
            } var d = [];
        for (s = a; s < o.length; s++) d.push("..");
        return (d = d.concat(n.slice(a))).join("/")
    }
};
Module.PATH_FS = PATH_FS;
var TTY = {
    ttys: [],
    init: function () {},
    shutdown: function () {},
    register: function (e, t) {
        TTY.ttys[e] = {
            input: [],
            output: [],
            ops: t
        }, FS.registerDevice(e, TTY.stream_ops)
    },
    stream_ops: {
        open: function (e) {
            var t = TTY.ttys[e.node.rdev];
            if (!t) throw new FS.ErrnoError(43);
            e.tty = t, e.seekable = !1
        },
        close: function (e) {
            e.tty.ops.flush(e.tty)
        },
        flush: function (e) {
            e.tty.ops.flush(e.tty)
        },
        read: function (e, t, r, o, n) {
            if (!e.tty || !e.tty.ops.get_char) throw new FS.ErrnoError(60);
            for (var i = 0, a = 0; a < o; a++) {
                var s;
                try {
                    s = e.tty.ops.get_char(e.tty)
                } catch (e) {
                    throw new FS.ErrnoError(29)
                }
                if (void 0 === s && 0 === i) throw new FS.ErrnoError(6);
                if (null == s) break;
                i++, t[r + a] = s
            }
            return i && (e.node.timestamp = Date.now()), i
        },
        write: function (e, t, r, o, n) {
            if (!e.tty || !e.tty.ops.put_char) throw new FS.ErrnoError(60);
            try {
                for (var i = 0; i < o; i++) e.tty.ops.put_char(e.tty, t[r + i])
            } catch (e) {
                throw new FS.ErrnoError(29)
            }
            return o && (e.node.timestamp = Date.now()), i
        }
    },
    default_tty_ops: {
        get_char: function (e) {
            if (!e.input.length) {
                var t = null;
                if (ENVIRONMENT_IS_NODE) {
                    var r = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256),
                        o = 0;
                    try {
                        o = nodeFS.readSync(process.stdin.fd, r, 0, 256, null)
                    } catch (e) {
                        if (-1 == e.toString().indexOf("EOF")) throw e;
                        o = 0
                    }
                    t = o > 0 ? r.slice(0, o).toString("utf-8") : null
                } else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (t = window.prompt("Input: ")) && (t += "\n") : "function" == typeof readline && null !== (t = readline()) && (t += "\n");
                if (!t) return null;
                e.input = intArrayFromString(t, !0)
            }
            return e.input.shift()
        },
        put_char: function (e, t) {
            null === t || 10 === t ? (out(UTF8ArrayToString(e.output, 0)), e.output = []) : 0 != t && e.output.push(t)
        },
        flush: function (e) {
            e.output && e.output.length > 0 && (out(UTF8ArrayToString(e.output, 0)), e.output = [])
        }
    },
    default_tty1_ops: {
        put_char: function (e, t) {
            null === t || 10 === t ? (err(UTF8ArrayToString(e.output, 0)), e.output = []) : 0 != t && e.output.push(t)
        },
        flush: function (e) {
            e.output && e.output.length > 0 && (err(UTF8ArrayToString(e.output, 0)), e.output = [])
        }
    }
};
Module.TTY = TTY;
var MEMFS = {
    ops_table: null,
    mount: function (e) {
        return MEMFS.createNode(null, "/", 16895, 0)
    },
    createNode: function (e, t, r, o) {
        if (FS.isBlkdev(r) || FS.isFIFO(r)) throw new FS.ErrnoError(63);
        MEMFS.ops_table || (MEMFS.ops_table = {
            dir: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                    lookup: MEMFS.node_ops.lookup,
                    mknod: MEMFS.node_ops.mknod,
                    rename: MEMFS.node_ops.rename,
                    unlink: MEMFS.node_ops.unlink,
                    rmdir: MEMFS.node_ops.rmdir,
                    readdir: MEMFS.node_ops.readdir,
                    symlink: MEMFS.node_ops.symlink
                },
                stream: {
                    llseek: MEMFS.stream_ops.llseek
                }
            },
            file: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr
                },
                stream: {
                    llseek: MEMFS.stream_ops.llseek,
                    read: MEMFS.stream_ops.read,
                    write: MEMFS.stream_ops.write,
                    allocate: MEMFS.stream_ops.allocate,
                    mmap: MEMFS.stream_ops.mmap,
                    msync: MEMFS.stream_ops.msync
                }
            },
            link: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                    readlink: MEMFS.node_ops.readlink
                },
                stream: {}
            },
            chrdev: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr
                },
                stream: FS.chrdev_stream_ops
            }
        });
        var n = FS.createNode(e, t, r, o);
        return FS.isDir(n.mode) ? (n.node_ops = MEMFS.ops_table.dir.node, n.stream_ops = MEMFS.ops_table.dir.stream, n.contents = {}) : FS.isFile(n.mode) ? (n.node_ops = MEMFS.ops_table.file.node, n.stream_ops = MEMFS.ops_table.file.stream, n.usedBytes = 0, n.contents = null) : FS.isLink(n.mode) ? (n.node_ops = MEMFS.ops_table.link.node, n.stream_ops = MEMFS.ops_table.link.stream) : FS.isChrdev(n.mode) && (n.node_ops = MEMFS.ops_table.chrdev.node, n.stream_ops = MEMFS.ops_table.chrdev.stream), n.timestamp = Date.now(), e && (e.contents[t] = n), n
    },
    getFileDataAsRegularArray: function (e) {
        if (e.contents && e.contents.subarray) {
            for (var t = [], r = 0; r < e.usedBytes; ++r) t.push(e.contents[r]);
            return t
        }
        return e.contents
    },
    getFileDataAsTypedArray: function (e) {
        return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0)
    },
    expandFileStorage: function (e, t) {
        var r = e.contents ? e.contents.length : 0;
        if (!(r >= t)) {
            t = Math.max(t, r * (r < 1048576 ? 2 : 1.125) >>> 0), 0 != r && (t = Math.max(t, 256));
            var o = e.contents;
            e.contents = new Uint8Array(t), e.usedBytes > 0 && e.contents.set(o.subarray(0, e.usedBytes), 0)
        }
    },
    resizeFileStorage: function (e, t) {
        if (e.usedBytes != t) {
            if (0 == t) return e.contents = null, void(e.usedBytes = 0);
            if (!e.contents || e.contents.subarray) {
                var r = e.contents;
                return e.contents = new Uint8Array(t), r && e.contents.set(r.subarray(0, Math.min(t, e.usedBytes))), void(e.usedBytes = t)
            }
            if (e.contents || (e.contents = []), e.contents.length > t) e.contents.length = t;
            else
                for (; e.contents.length < t;) e.contents.push(0);
            e.usedBytes = t
        }
    },
    node_ops: {
        getattr: function (e) {
            var t = {};
            return t.dev = FS.isChrdev(e.mode) ? e.id : 1, t.ino = e.id, t.mode = e.mode, t.nlink = 1, t.uid = 0, t.gid = 0, t.rdev = e.rdev, FS.isDir(e.mode) ? t.size = 4096 : FS.isFile(e.mode) ? t.size = e.usedBytes : FS.isLink(e.mode) ? t.size = e.link.length : t.size = 0, t.atime = new Date(e.timestamp), t.mtime = new Date(e.timestamp), t.ctime = new Date(e.timestamp), t.blksize = 4096, t.blocks = Math.ceil(t.size / t.blksize), t
        },
        setattr: function (e, t) {
            void 0 !== t.mode && (e.mode = t.mode), void 0 !== t.timestamp && (e.timestamp = t.timestamp), void 0 !== t.size && MEMFS.resizeFileStorage(e, t.size)
        },
        lookup: function (e, t) {
            throw FS.genericErrors[44]
        },
        mknod: function (e, t, r, o) {
            return MEMFS.createNode(e, t, r, o)
        },
        rename: function (e, t, r) {
            if (FS.isDir(e.mode)) {
                var o;
                try {
                    o = FS.lookupNode(t, r)
                } catch (e) {}
                if (o)
                    for (var n in o.contents) throw new FS.ErrnoError(55)
            }
            delete e.parent.contents[e.name], e.name = r, t.contents[r] = e, e.parent = t
        },
        unlink: function (e, t) {
            delete e.contents[t]
        },
        rmdir: function (e, t) {
            var r = FS.lookupNode(e, t);
            for (var o in r.contents) throw new FS.ErrnoError(55);
            delete e.contents[t]
        },
        readdir: function (e) {
            var t = [".", ".."];
            for (var r in e.contents) e.contents.hasOwnProperty(r) && t.push(r);
            return t
        },
        symlink: function (e, t, r) {
            var o = MEMFS.createNode(e, t, 41471, 0);
            return o.link = r, o
        },
        readlink: function (e) {
            if (!FS.isLink(e.mode)) throw new FS.ErrnoError(28);
            return e.link
        }
    },
    stream_ops: {
        read: function (e, t, r, o, n) {
            var i = e.node.contents;
            if (n >= e.node.usedBytes) return 0;
            var a = Math.min(e.node.usedBytes - n, o);
            if (assert(a >= 0), a > 8 && i.subarray) t.set(i.subarray(n, n + a), r);
            else
                for (var s = 0; s < a; s++) t[r + s] = i[n + s];
            return a
        },
        write: function (e, t, r, o, n, i) {
            if (assert(!(t instanceof ArrayBuffer)), t.buffer === HEAP8.buffer && (i && warnOnce("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)"), i = !1), !o) return 0;
            var a = e.node;
            if (a.timestamp = Date.now(), t.subarray && (!a.contents || a.contents.subarray)) {
                if (i) return assert(0 === n, "canOwn must imply no weird position inside the file"), a.contents = t.subarray(r, r + o), a.usedBytes = o, o;
                if (0 === a.usedBytes && 0 === n) return a.contents = t.slice(r, r + o), a.usedBytes = o, o;
                if (n + o <= a.usedBytes) return a.contents.set(t.subarray(r, r + o), n), o
            }
            if (MEMFS.expandFileStorage(a, n + o), a.contents.subarray && t.subarray) a.contents.set(t.subarray(r, r + o), n);
            else
                for (var s = 0; s < o; s++) a.contents[n + s] = t[r + s];
            return a.usedBytes = Math.max(a.usedBytes, n + o), o
        },
        llseek: function (e, t, r) {
            var o = t;
            if (1 === r ? o += e.position : 2 === r && FS.isFile(e.node.mode) && (o += e.node.usedBytes), o < 0) throw new FS.ErrnoError(28);
            return o
        },
        allocate: function (e, t, r) {
            MEMFS.expandFileStorage(e.node, t + r), e.node.usedBytes = Math.max(e.node.usedBytes, t + r)
        },
        mmap: function (e, t, r, o, n, i) {
            if (assert(0 === t), !FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
            var a, s, d = e.node.contents;
            if (2 & i || d.buffer !== buffer) {
                if ((o > 0 || o + r < d.length) && (d = d.subarray ? d.subarray(o, o + r) : Array.prototype.slice.call(d, o, o + r)), s = !0, !(a = _malloc(r))) throw new FS.ErrnoError(48);
                HEAP8.set(d, a)
            } else s = !1, a = d.byteOffset;
            return {
                ptr: a,
                allocated: s
            }
        },
        msync: function (e, t, r, o, n) {
            if (!FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
            if (2 & n) return 0;
            MEMFS.stream_ops.write(e, t, 0, o, r, !1);
            return 0
        }
    }
};
Module.MEMFS = MEMFS;
var ERRNO_MESSAGES = {
    0: "Success",
    1: "Arg list too long",
    2: "Permission denied",
    3: "Address already in use",
    4: "Address not available",
    5: "Address family not supported by protocol family",
    6: "No more processes",
    7: "Socket already connected",
    8: "Bad file number",
    9: "Trying to read unreadable message",
    10: "Mount device busy",
    11: "Operation canceled",
    12: "No children",
    13: "Connection aborted",
    14: "Connection refused",
    15: "Connection reset by peer",
    16: "File locking deadlock error",
    17: "Destination address required",
    18: "Math arg out of domain of func",
    19: "Quota exceeded",
    20: "File exists",
    21: "Bad address",
    22: "File too large",
    23: "Host is unreachable",
    24: "Identifier removed",
    25: "Illegal byte sequence",
    26: "Connection already in progress",
    27: "Interrupted system call",
    28: "Invalid argument",
    29: "I/O error",
    30: "Socket is already connected",
    31: "Is a directory",
    32: "Too many symbolic links",
    33: "Too many open files",
    34: "Too many links",
    35: "Message too long",
    36: "Multihop attempted",
    37: "File or path name too long",
    38: "Network interface is not configured",
    39: "Connection reset by network",
    40: "Network is unreachable",
    41: "Too many open files in system",
    42: "No buffer space available",
    43: "No such device",
    44: "No such file or directory",
    45: "Exec format error",
    46: "No record locks available",
    47: "The link has been severed",
    48: "Not enough core",
    49: "No message of desired type",
    50: "Protocol not available",
    51: "No space left on device",
    52: "Function not implemented",
    53: "Socket is not connected",
    54: "Not a directory",
    55: "Directory not empty",
    56: "State not recoverable",
    57: "Socket operation on non-socket",
    59: "Not a typewriter",
    60: "No such device or address",
    61: "Value too large for defined data type",
    62: "Previous owner died",
    63: "Not super-user",
    64: "Broken pipe",
    65: "Protocol error",
    66: "Unknown protocol",
    67: "Protocol wrong type for socket",
    68: "Math result not representable",
    69: "Read only file system",
    70: "Illegal seek",
    71: "No such process",
    72: "Stale file handle",
    73: "Connection timed out",
    74: "Text file busy",
    75: "Cross-device link",
    100: "Device not a stream",
    101: "Bad font file fmt",
    102: "Invalid slot",
    103: "Invalid request code",
    104: "No anode",
    105: "Block device required",
    106: "Channel number out of range",
    107: "Level 3 halted",
    108: "Level 3 reset",
    109: "Link number out of range",
    110: "Protocol driver not attached",
    111: "No CSI structure available",
    112: "Level 2 halted",
    113: "Invalid exchange",
    114: "Invalid request descriptor",
    115: "Exchange full",
    116: "No data (for no delay io)",
    117: "Timer expired",
    118: "Out of streams resources",
    119: "Machine is not on the network",
    120: "Package not installed",
    121: "The object is remote",
    122: "Advertise error",
    123: "Srmount error",
    124: "Communication error on send",
    125: "Cross mount point (not really error)",
    126: "Given log. name not unique",
    127: "f.d. invalid for this operation",
    128: "Remote address changed",
    129: "Can   access a needed shared lib",
    130: "Accessing a corrupted shared lib",
    131: ".lib section in a.out corrupted",
    132: "Attempting to link in too many libs",
    133: "Attempting to exec a shared library",
    135: "Streams pipe error",
    136: "Too many users",
    137: "Socket type not supported",
    138: "Not supported",
    139: "Protocol family not supported",
    140: "Can't send after socket shutdown",
    141: "Too many references",
    142: "Host is down",
    148: "No medium (in tape drive)",
    156: "Level 2 not synchronized"
};
Module.ERRNO_MESSAGES = ERRNO_MESSAGES;
var ERRNO_CODES = {
    EPERM: 63,
    ENOENT: 44,
    ESRCH: 71,
    EINTR: 27,
    EIO: 29,
    ENXIO: 60,
    E2BIG: 1,
    ENOEXEC: 45,
    EBADF: 8,
    ECHILD: 12,
    EAGAIN: 6,
    EWOULDBLOCK: 6,
    ENOMEM: 48,
    EACCES: 2,
    EFAULT: 21,
    ENOTBLK: 105,
    EBUSY: 10,
    EEXIST: 20,
    EXDEV: 75,
    ENODEV: 43,
    ENOTDIR: 54,
    EISDIR: 31,
    EINVAL: 28,
    ENFILE: 41,
    EMFILE: 33,
    ENOTTY: 59,
    ETXTBSY: 74,
    EFBIG: 22,
    ENOSPC: 51,
    ESPIPE: 70,
    EROFS: 69,
    EMLINK: 34,
    EPIPE: 64,
    EDOM: 18,
    ERANGE: 68,
    ENOMSG: 49,
    EIDRM: 24,
    ECHRNG: 106,
    EL2NSYNC: 156,
    EL3HLT: 107,
    EL3RST: 108,
    ELNRNG: 109,
    EUNATCH: 110,
    ENOCSI: 111,
    EL2HLT: 112,
    EDEADLK: 16,
    ENOLCK: 46,
    EBADE: 113,
    EBADR: 114,
    EXFULL: 115,
    ENOANO: 104,
    EBADRQC: 103,
    EBADSLT: 102,
    EDEADLOCK: 16,
    EBFONT: 101,
    ENOSTR: 100,
    ENODATA: 116,
    ETIME: 117,
    ENOSR: 118,
    ENONET: 119,
    ENOPKG: 120,
    EREMOTE: 121,
    ENOLINK: 47,
    EADV: 122,
    ESRMNT: 123,
    ECOMM: 124,
    EPROTO: 65,
    EMULTIHOP: 36,
    EDOTDOT: 125,
    EBADMSG: 9,
    ENOTUNIQ: 126,
    EBADFD: 127,
    EREMCHG: 128,
    ELIBACC: 129,
    ELIBBAD: 130,
    ELIBSCN: 131,
    ELIBMAX: 132,
    ELIBEXEC: 133,
    ENOSYS: 52,
    ENOTEMPTY: 55,
    ENAMETOOLONG: 37,
    ELOOP: 32,
    EOPNOTSUPP: 138,
    EPFNOSUPPORT: 139,
    ECONNRESET: 15,
    ENOBUFS: 42,
    EAFNOSUPPORT: 5,
    EPROTOTYPE: 67,
    ENOTSOCK: 57,
    ENOPROTOOPT: 50,
    ESHUTDOWN: 140,
    ECONNREFUSED: 14,
    EADDRINUSE: 3,
    ECONNABORTED: 13,
    ENETUNREACH: 40,
    ENETDOWN: 38,
    ETIMEDOUT: 73,
    EHOSTDOWN: 142,
    EHOSTUNREACH: 23,
    EINPROGRESS: 26,
    EALREADY: 7,
    EDESTADDRREQ: 17,
    EMSGSIZE: 35,
    EPROTONOSUPPORT: 66,
    ESOCKTNOSUPPORT: 137,
    EADDRNOTAVAIL: 4,
    ENETRESET: 39,
    EISCONN: 30,
    ENOTCONN: 53,
    ETOOMANYREFS: 141,
    EUSERS: 136,
    EDQUOT: 19,
    ESTALE: 72,
    ENOTSUP: 138,
    ENOMEDIUM: 148,
    EILSEQ: 25,
    EOVERFLOW: 61,
    ECANCELED: 11,
    ENOTRECOVERABLE: 56,
    EOWNERDEAD: 62,
    ESTRPIPE: 135
};
Module.ERRNO_CODES = ERRNO_CODES;
var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: "/",
    initialized: !1,
    ignorePermissions: !0,
    trackingDelegate: {},
    tracking: {
        openFlags: {
            READ: 1,
            WRITE: 2
        }
    },
    ErrnoError: null,
    genericErrors: {},
    filesystems: null,
    syncFSRequests: 0,
    handleFSError: function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
        return setErrNo(e.errno)
    },
    lookupPath: function (e, t) {
        if (t = t || {}, !(e = PATH_FS.resolve(FS.cwd(), e))) return {
            path: "",
            node: null
        };
        var r = {
            follow_mount: !0,
            recurse_count: 0
        };
        for (var o in r) void 0 === t[o] && (t[o] = r[o]);
        if (t.recurse_count > 8) throw new FS.ErrnoError(32);
        for (var n = PATH.normalizeArray(e.split("/").filter((function (e) {
                return !!e
            })), !1), i = FS.root, a = "/", s = 0; s < n.length; s++) {
            var d = s === n.length - 1;
            if (d && t.parent) break;
            if (i = FS.lookupNode(i, n[s]), a = PATH.join2(a, n[s]), FS.isMountpoint(i) && (!d || d && t.follow_mount) && (i = i.mounted.root), !d || t.follow)
                for (var l = 0; FS.isLink(i.mode);) {
                    var c = FS.readlink(a);
                    if (a = PATH_FS.resolve(PATH.dirname(a), c), i = FS.lookupPath(a, {
                            recurse_count: t.recurse_count
                        }).node, l++ > 40) throw new FS.ErrnoError(32)
                }
        }
        return {
            path: a,
            node: i
        }
    },
    getPath: function (e) {
        for (var t;;) {
            if (FS.isRoot(e)) {
                var r = e.mount.mountpoint;
                return t ? "/" !== r[r.length - 1] ? r + "/" + t : r + t : r
            }
            t = t ? e.name + "/" + t : e.name, e = e.parent
        }
    },
    hashName: function (e, t) {
        for (var r = 0, o = 0; o < t.length; o++) r = (r << 5) - r + t.charCodeAt(o) | 0;
        return (e + r >>> 0) % FS.nameTable.length
    },
    hashAddNode: function (e) {
        var t = FS.hashName(e.parent.id, e.name);
        e.name_next = FS.nameTable[t], FS.nameTable[t] = e
    },
    hashRemoveNode: function (e) {
        var t = FS.hashName(e.parent.id, e.name);
        if (FS.nameTable[t] === e) FS.nameTable[t] = e.name_next;
        else
            for (var r = FS.nameTable[t]; r;) {
                if (r.name_next === e) {
                    r.name_next = e.name_next;
                    break
                }
                r = r.name_next
            }
    },
    lookupNode: function (e, t) {
        var r = FS.mayLookup(e);
        if (r) throw new FS.ErrnoError(r, e);
        for (var o = FS.hashName(e.id, t), n = FS.nameTable[o]; n; n = n.name_next) {
            var i = n.name;
            if (n.parent.id === e.id && i === t) return n
        }
        return FS.lookup(e, t)
    },
    createNode: function (e, t, r, o) {
        var n = new FS.FSNode(e, t, r, o);
        return FS.hashAddNode(n), n
    },
    destroyNode: function (e) {
        FS.hashRemoveNode(e)
    },
    isRoot: function (e) {
        return e === e.parent
    },
    isMountpoint: function (e) {
        return !!e.mounted
    },
    isFile: function (e) {
        return 32768 == (61440 & e)
    },
    isDir: function (e) {
        return 16384 == (61440 & e)
    },
    isLink: function (e) {
        return 40960 == (61440 & e)
    },
    isChrdev: function (e) {
        return 8192 == (61440 & e)
    },
    isBlkdev: function (e) {
        return 24576 == (61440 & e)
    },
    isFIFO: function (e) {
        return 4096 == (61440 & e)
    },
    isSocket: function (e) {
        return 49152 == (49152 & e)
    },
    flagModes: {
        r: 0,
        rs: 1052672,
        "r+": 2,
        w: 577,
        wx: 705,
        xw: 705,
        "w+": 578,
        "wx+": 706,
        "xw+": 706,
        a: 1089,
        ax: 1217,
        xa: 1217,
        "a+": 1090,
        "ax+": 1218,
        "xa+": 1218
    },
    modeStringToFlags: function (e) {
        var t = FS.flagModes[e];
        if (void 0 === t) throw new Error("Unknown file open mode: " + e);
        return t
    },
    flagsToPermissionString: function (e) {
        var t = ["r", "w", "rw"][3 & e];
        return 512 & e && (t += "w"), t
    },
    nodePermissions: function (e, t) {
        return FS.ignorePermissions || (-1 === t.indexOf("r") || 292 & e.mode) && (-1 === t.indexOf("w") || 146 & e.mode) && (-1 === t.indexOf("x") || 73 & e.mode) ? 0 : 2
    },
    mayLookup: function (e) {
        var t = FS.nodePermissions(e, "x");
        return t || (e.node_ops.lookup ? 0 : 2)
    },
    mayCreate: function (e, t) {
        try {
            FS.lookupNode(e, t);
            return 20
        } catch (e) {}
        return FS.nodePermissions(e, "wx")
    },
    mayDelete: function (e, t, r) {
        var o;
        try {
            o = FS.lookupNode(e, t)
        } catch (e) {
            return e.errno
        }
        var n = FS.nodePermissions(e, "wx");
        if (n) return n;
        if (r) {
            if (!FS.isDir(o.mode)) return 54;
            if (FS.isRoot(o) || FS.getPath(o) === FS.cwd()) return 10
        } else if (FS.isDir(o.mode)) return 31;
        return 0
    },
    mayOpen: function (e, t) {
        return e ? FS.isLink(e.mode) ? 32 : FS.isDir(e.mode) && ("r" !== FS.flagsToPermissionString(t) || 512 & t) ? 31 : FS.nodePermissions(e, FS.flagsToPermissionString(t)) : 44
    },
    MAX_OPEN_FDS: 4096,
    nextfd: function (e, t) {
        e = e || 0, t = t || FS.MAX_OPEN_FDS;
        for (var r = e; r <= t; r++)
            if (!FS.streams[r]) return r;
        throw new FS.ErrnoError(33)
    },
    getStream: function (e) {
        return FS.streams[e]
    },
    createStream: function (e, t, r) {
        FS.FSStream || (FS.FSStream = function () {}, FS.FSStream.prototype = {
            object: {
                get: function () {
                    return this.node
                },
                set: function (e) {
                    this.node = e
                }
            },
            isRead: {
                get: function () {
                    return 1 != (2097155 & this.flags)
                }
            },
            isWrite: {
                get: function () {
                    return 0 != (2097155 & this.flags)
                }
            },
            isAppend: {
                get: function () {
                    return 1024 & this.flags
                }
            }
        });
        var o = new FS.FSStream;
        for (var n in e) o[n] = e[n];
        e = o;
        var i = FS.nextfd(t, r);
        return e.fd = i, FS.streams[i] = e, e
    },
    closeStream: function (e) {
        FS.streams[e] = null
    },
    chrdev_stream_ops: {
        open: function (e) {
            var t = FS.getDevice(e.node.rdev);
            e.stream_ops = t.stream_ops, e.stream_ops.open && e.stream_ops.open(e)
        },
        llseek: function () {
            throw new FS.ErrnoError(70)
        }
    },
    major: function (e) {
        return e >> 8
    },
    minor: function (e) {
        return 255 & e
    },
    makedev: function (e, t) {
        return e << 8 | t
    },
    registerDevice: function (e, t) {
        FS.devices[e] = {
            stream_ops: t
        }
    },
    getDevice: function (e) {
        return FS.devices[e]
    },
    getMounts: function (e) {
        for (var t = [], r = [e]; r.length;) {
            var o = r.pop();
            t.push(o), r.push.apply(r, o.mounts)
        }
        return t
    },
    syncfs: function (e, t) {
        "function" == typeof e && (t = e, e = !1), FS.syncFSRequests++, FS.syncFSRequests > 1 && err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
        var r = FS.getMounts(FS.root.mount),
            o = 0;

        function n(e) {
            return assert(FS.syncFSRequests > 0), FS.syncFSRequests--, t(e)
        }

        function i(e) {
            if (e) return i.errored ? void 0 : (i.errored = !0, n(e));
            ++o >= r.length && n(null)
        }
        r.forEach((function (t) {
            if (!t.type.syncfs) return i(null);
            t.type.syncfs(t, e, i)
        }))
    },
    mount: function (e, t, r) {
        if ("string" == typeof e) throw e;
        var o, n = "/" === r,
            i = !r;
        if (n && FS.root) throw new FS.ErrnoError(10);
        if (!n && !i) {
            var a = FS.lookupPath(r, {
                follow_mount: !1
            });
            if (r = a.path, o = a.node, FS.isMountpoint(o)) throw new FS.ErrnoError(10);
            if (!FS.isDir(o.mode)) throw new FS.ErrnoError(54)
        }
        var s = {
                type: e,
                opts: t,
                mountpoint: r,
                mounts: []
            },
            d = e.mount(s);
        return d.mount = s, s.root = d, n ? FS.root = d : o && (o.mounted = s, o.mount && o.mount.mounts.push(s)), d
    },
    unmount: function (e) {
        var t = FS.lookupPath(e, {
            follow_mount: !1
        });
        if (!FS.isMountpoint(t.node)) throw new FS.ErrnoError(28);
        var r = t.node,
            o = r.mounted,
            n = FS.getMounts(o);
        Object.keys(FS.nameTable).forEach((function (e) {
            for (var t = FS.nameTable[e]; t;) {
                var r = t.name_next; - 1 !== n.indexOf(t.mount) && FS.destroyNode(t), t = r
            }
        })), r.mounted = null;
        var i = r.mount.mounts.indexOf(o);
        assert(-1 !== i), r.mount.mounts.splice(i, 1)
    },
    lookup: function (e, t) {
        return e.node_ops.lookup(e, t)
    },
    mknod: function (e, t, r) {
        var o = FS.lookupPath(e, {
                parent: !0
            }).node,
            n = PATH.basename(e);
        if (!n || "." === n || ".." === n) throw new FS.ErrnoError(28);
        var i = FS.mayCreate(o, n);
        if (i) throw new FS.ErrnoError(i);
        if (!o.node_ops.mknod) throw new FS.ErrnoError(63);
        return o.node_ops.mknod(o, n, t, r)
    },
    create: function (e, t) {
        return t = void 0 !== t ? t : 438, t &= 4095, t |= 32768, FS.mknod(e, t, 0)
    },
    mkdir: function (e, t) {
        return t = void 0 !== t ? t : 511, t &= 1023, t |= 16384, FS.mknod(e, t, 0)
    },
    mkdirTree: function (e, t) {
        for (var r = e.split("/"), o = "", n = 0; n < r.length; ++n)
            if (r[n]) {
                o += "/" + r[n];
                try {
                    FS.mkdir(o, t)
                } catch (e) {
                    if (20 != e.errno) throw e
                }
            }
    },
    mkdev: function (e, t, r) {
        return void 0 === r && (r = t, t = 438), t |= 8192, FS.mknod(e, t, r)
    },
    symlink: function (e, t) {
        if (!PATH_FS.resolve(e)) throw new FS.ErrnoError(44);
        var r = FS.lookupPath(t, {
            parent: !0
        }).node;
        if (!r) throw new FS.ErrnoError(44);
        var o = PATH.basename(t),
            n = FS.mayCreate(r, o);
        if (n) throw new FS.ErrnoError(n);
        if (!r.node_ops.symlink) throw new FS.ErrnoError(63);
        return r.node_ops.symlink(r, o, e)
    },
    rename: function (e, t) {
        var r, o, n = PATH.dirname(e),
            i = PATH.dirname(t),
            a = PATH.basename(e),
            s = PATH.basename(t);
        try {
            r = FS.lookupPath(e, {
                parent: !0
            }).node, o = FS.lookupPath(t, {
                parent: !0
            }).node
        } catch (e) {
            throw new FS.ErrnoError(10)
        }
        if (!r || !o) throw new FS.ErrnoError(44);
        if (r.mount !== o.mount) throw new FS.ErrnoError(75);
        var d, l = FS.lookupNode(r, a),
            c = PATH_FS.relative(e, i);
        if ("." !== c.charAt(0)) throw new FS.ErrnoError(28);
        if ("." !== (c = PATH_FS.relative(t, n)).charAt(0)) throw new FS.ErrnoError(55);
        try {
            d = FS.lookupNode(o, s)
        } catch (e) {}
        if (l !== d) {
            var u = FS.isDir(l.mode),
                _ = FS.mayDelete(r, a, u);
            if (_) throw new FS.ErrnoError(_);
            if (_ = d ? FS.mayDelete(o, s, u) : FS.mayCreate(o, s)) throw new FS.ErrnoError(_);
            if (!r.node_ops.rename) throw new FS.ErrnoError(63);
            if (FS.isMountpoint(l) || d && FS.isMountpoint(d)) throw new FS.ErrnoError(10);
            if (o !== r && (_ = FS.nodePermissions(r, "w"))) throw new FS.ErrnoError(_);
            try {
                FS.trackingDelegate.willMovePath && FS.trackingDelegate.willMovePath(e, t)
            } catch (r) {
                err("FS.trackingDelegate['willMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message)
            }
            FS.hashRemoveNode(l);
            try {
                r.node_ops.rename(l, o, s)
            } catch (e) {
                throw e
            } finally {
                FS.hashAddNode(l)
            }
            try {
                FS.trackingDelegate.onMovePath && FS.trackingDelegate.onMovePath(e, t)
            } catch (r) {
                err("FS.trackingDelegate['onMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message)
            }
        }
    },
    rmdir: function (e) {
        var t = FS.lookupPath(e, {
                parent: !0
            }).node,
            r = PATH.basename(e),
            o = FS.lookupNode(t, r),
            n = FS.mayDelete(t, r, !0);
        if (n) throw new FS.ErrnoError(n);
        if (!t.node_ops.rmdir) throw new FS.ErrnoError(63);
        if (FS.isMountpoint(o)) throw new FS.ErrnoError(10);
        try {
            FS.trackingDelegate.willDeletePath && FS.trackingDelegate.willDeletePath(e)
        } catch (t) {
            err("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message)
        }
        t.node_ops.rmdir(t, r), FS.destroyNode(o);
        try {
            FS.trackingDelegate.onDeletePath && FS.trackingDelegate.onDeletePath(e)
        } catch (t) {
            err("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message)
        }
    },
    readdir: function (e) {
        var t = FS.lookupPath(e, {
            follow: !0
        }).node;
        if (!t.node_ops.readdir) throw new FS.ErrnoError(54);
        return t.node_ops.readdir(t)
    },
    unlink: function (e) {
        var t = FS.lookupPath(e, {
                parent: !0
            }).node,
            r = PATH.basename(e),
            o = FS.lookupNode(t, r),
            n = FS.mayDelete(t, r, !1);
        if (n) throw new FS.ErrnoError(n);
        if (!t.node_ops.unlink) throw new FS.ErrnoError(63);
        if (FS.isMountpoint(o)) throw new FS.ErrnoError(10);
        try {
            FS.trackingDelegate.willDeletePath && FS.trackingDelegate.willDeletePath(e)
        } catch (t) {
            err("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message)
        }
        t.node_ops.unlink(t, r), FS.destroyNode(o);
        try {
            FS.trackingDelegate.onDeletePath && FS.trackingDelegate.onDeletePath(e)
        } catch (t) {
            err("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message)
        }
    },
    readlink: function (e) {
        var t = FS.lookupPath(e).node;
        if (!t) throw new FS.ErrnoError(44);
        if (!t.node_ops.readlink) throw new FS.ErrnoError(28);
        return PATH_FS.resolve(FS.getPath(t.parent), t.node_ops.readlink(t))
    },
    stat: function (e, t) {
        var r = FS.lookupPath(e, {
            follow: !t
        }).node;
        if (!r) throw new FS.ErrnoError(44);
        if (!r.node_ops.getattr) throw new FS.ErrnoError(63);
        return r.node_ops.getattr(r)
    },
    lstat: function (e) {
        return FS.stat(e, !0)
    },
    chmod: function (e, t, r) {
        var o;
        "string" == typeof e ? o = FS.lookupPath(e, {
            follow: !r
        }).node : o = e;
        if (!o.node_ops.setattr) throw new FS.ErrnoError(63);
        o.node_ops.setattr(o, {
            mode: 4095 & t | -4096 & o.mode,
            timestamp: Date.now()
        })
    },
    lchmod: function (e, t) {
        FS.chmod(e, t, !0)
    },
    fchmod: function (e, t) {
        var r = FS.getStream(e);
        if (!r) throw new FS.ErrnoError(8);
        FS.chmod(r.node, t)
    },
    chown: function (e, t, r, o) {
        var n;
        "string" == typeof e ? n = FS.lookupPath(e, {
            follow: !o
        }).node : n = e;
        if (!n.node_ops.setattr) throw new FS.ErrnoError(63);
        n.node_ops.setattr(n, {
            timestamp: Date.now()
        })
    },
    lchown: function (e, t, r) {
        FS.chown(e, t, r, !0)
    },
    fchown: function (e, t, r) {
        var o = FS.getStream(e);
        if (!o) throw new FS.ErrnoError(8);
        FS.chown(o.node, t, r)
    },
    truncate: function (e, t) {
        if (t < 0) throw new FS.ErrnoError(28);
        var r;
        "string" == typeof e ? r = FS.lookupPath(e, {
            follow: !0
        }).node : r = e;
        if (!r.node_ops.setattr) throw new FS.ErrnoError(63);
        if (FS.isDir(r.mode)) throw new FS.ErrnoError(31);
        if (!FS.isFile(r.mode)) throw new FS.ErrnoError(28);
        var o = FS.nodePermissions(r, "w");
        if (o) throw new FS.ErrnoError(o);
        r.node_ops.setattr(r, {
            size: t,
            timestamp: Date.now()
        })
    },
    ftruncate: function (e, t) {
        var r = FS.getStream(e);
        if (!r) throw new FS.ErrnoError(8);
        if (0 == (2097155 & r.flags)) throw new FS.ErrnoError(28);
        FS.truncate(r.node, t)
    },
    utime: function (e, t, r) {
        var o = FS.lookupPath(e, {
            follow: !0
        }).node;
        o.node_ops.setattr(o, {
            timestamp: Math.max(t, r)
        })
    },
    open: function (e, t, r, o, n) {
        if ("" === e) throw new FS.ErrnoError(44);
        var i;
        if (r = void 0 === r ? 438 : r, r = 64 & (t = "string" == typeof t ? FS.modeStringToFlags(t) : t) ? 4095 & r | 32768 : 0, "object" == typeof e) i = e;
        else {
            e = PATH.normalize(e);
            try {
                i = FS.lookupPath(e, {
                    follow: !(131072 & t)
                }).node
            } catch (e) {}
        }
        var a = !1;
        if (64 & t)
            if (i) {
                if (128 & t) throw new FS.ErrnoError(20)
            } else i = FS.mknod(e, r, 0), a = !0;
        if (!i) throw new FS.ErrnoError(44);
        if (FS.isChrdev(i.mode) && (t &= -513), 65536 & t && !FS.isDir(i.mode)) throw new FS.ErrnoError(54);
        if (!a) {
            var s = FS.mayOpen(i, t);
            if (s) throw new FS.ErrnoError(s)
        }
        512 & t && FS.truncate(i, 0), t &= -131713;
        var d = FS.createStream({
            node: i,
            path: FS.getPath(i),
            flags: t,
            seekable: !0,
            position: 0,
            stream_ops: i.stream_ops,
            ungotten: [],
            error: !1
        }, o, n);
        d.stream_ops.open && d.stream_ops.open(d), !Module.logReadFiles || 1 & t || (FS.readFiles || (FS.readFiles = {}), e in FS.readFiles || (FS.readFiles[e] = 1, err("FS.trackingDelegate error on read file: " + e)));
        try {
            if (FS.trackingDelegate.onOpenFile) {
                var l = 0;
                1 != (2097155 & t) && (l |= FS.tracking.openFlags.READ), 0 != (2097155 & t) && (l |= FS.tracking.openFlags.WRITE), FS.trackingDelegate.onOpenFile(e, l)
            }
        } catch (t) {
            err("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + t.message)
        }
        return d
    },
    close: function (e) {
        if (FS.isClosed(e)) throw new FS.ErrnoError(8);
        e.getdents && (e.getdents = null);
        try {
            e.stream_ops.close && e.stream_ops.close(e)
        } catch (e) {
            throw e
        } finally {
            FS.closeStream(e.fd)
        }
        e.fd = null
    },
    isClosed: function (e) {
        return null === e.fd
    },
    llseek: function (e, t, r) {
        if (FS.isClosed(e)) throw new FS.ErrnoError(8);
        if (!e.seekable || !e.stream_ops.llseek) throw new FS.ErrnoError(70);
        if (0 != r && 1 != r && 2 != r) throw new FS.ErrnoError(28);
        return e.position = e.stream_ops.llseek(e, t, r), e.ungotten = [], e.position
    },
    read: function (e, t, r, o, n) {
        if (o < 0 || n < 0) throw new FS.ErrnoError(28);
        if (FS.isClosed(e)) throw new FS.ErrnoError(8);
        if (1 == (2097155 & e.flags)) throw new FS.ErrnoError(8);
        if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
        if (!e.stream_ops.read) throw new FS.ErrnoError(28);
        var i = void 0 !== n;
        if (i) {
            if (!e.seekable) throw new FS.ErrnoError(70)
        } else n = e.position;
        var a = e.stream_ops.read(e, t, r, o, n);
        return i || (e.position += a), a
    },
    write: function (e, t, r, o, n, i) {
        if (o < 0 || n < 0) throw new FS.ErrnoError(28);
        if (FS.isClosed(e)) throw new FS.ErrnoError(8);
        if (0 == (2097155 & e.flags)) throw new FS.ErrnoError(8);
        if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
        if (!e.stream_ops.write) throw new FS.ErrnoError(28);
        e.seekable && 1024 & e.flags && FS.llseek(e, 0, 2);
        var a = void 0 !== n;
        if (a) {
            if (!e.seekable) throw new FS.ErrnoError(70)
        } else n = e.position;
        var s = e.stream_ops.write(e, t, r, o, n, i);
        a || (e.position += s);
        try {
            e.path && FS.trackingDelegate.onWriteToFile && FS.trackingDelegate.onWriteToFile(e.path)
        } catch (t) {
            err("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + t.message)
        }
        return s
    },
    allocate: function (e, t, r) {
        if (FS.isClosed(e)) throw new FS.ErrnoError(8);
        if (t < 0 || r <= 0) throw new FS.ErrnoError(28);
        if (0 == (2097155 & e.flags)) throw new FS.ErrnoError(8);
        if (!FS.isFile(e.node.mode) && !FS.isDir(e.node.mode)) throw new FS.ErrnoError(43);
        if (!e.stream_ops.allocate) throw new FS.ErrnoError(138);
        e.stream_ops.allocate(e, t, r)
    },
    mmap: function (e, t, r, o, n, i) {
        if (0 != (2 & n) && 0 == (2 & i) && 2 != (2097155 & e.flags)) throw new FS.ErrnoError(2);
        if (1 == (2097155 & e.flags)) throw new FS.ErrnoError(2);
        if (!e.stream_ops.mmap) throw new FS.ErrnoError(43);
        return e.stream_ops.mmap(e, t, r, o, n, i)
    },
    msync: function (e, t, r, o, n) {
        return e && e.stream_ops.msync ? e.stream_ops.msync(e, t, r, o, n) : 0
    },
    munmap: function (e) {
        return 0
    },
    ioctl: function (e, t, r) {
        if (!e.stream_ops.ioctl) throw new FS.ErrnoError(59);
        return e.stream_ops.ioctl(e, t, r)
    },
    readFile: function (e, t) {
        if ((t = t || {}).flags = t.flags || "r", t.encoding = t.encoding || "binary", "utf8" !== t.encoding && "binary" !== t.encoding) throw new Error('Invalid encoding type "' + t.encoding + '"');
        var r, o = FS.open(e, t.flags),
            n = FS.stat(e).size,
            i = new Uint8Array(n);
        return FS.read(o, i, 0, n, 0), "utf8" === t.encoding ? r = UTF8ArrayToString(i, 0) : "binary" === t.encoding && (r = i), FS.close(o), r
    },
    writeFile: function (e, t, r) {
        (r = r || {}).flags = r.flags || "w";
        var o = FS.open(e, r.flags, r.mode);
        if ("string" == typeof t) {
            var n = new Uint8Array(lengthBytesUTF8(t) + 1),
                i = stringToUTF8Array(t, n, 0, n.length);
            FS.write(o, n, 0, i, void 0, r.canOwn)
        } else {
            if (!ArrayBuffer.isView(t)) throw new Error("Unsupported data type");
            FS.write(o, t, 0, t.byteLength, void 0, r.canOwn)
        }
        FS.close(o)
    },
    cwd: function () {
        return FS.currentPath
    },
    chdir: function (e) {
        var t = FS.lookupPath(e, {
            follow: !0
        });
        if (null === t.node) throw new FS.ErrnoError(44);
        if (!FS.isDir(t.node.mode)) throw new FS.ErrnoError(54);
        var r = FS.nodePermissions(t.node, "x");
        if (r) throw new FS.ErrnoError(r);
        FS.currentPath = t.path
    },
    createDefaultDirectories: function () {
        FS.mkdir("/tmp"), FS.mkdir("/home"), FS.mkdir("/home/web_user")
    },
    createDefaultDevices: function () {
        var e;
        if (FS.mkdir("/dev"), FS.registerDevice(FS.makedev(1, 3), {
                read: function () {
                    return 0
                },
                write: function (e, t, r, o, n) {
                    return o
                }
            }), FS.mkdev("/dev/null", FS.makedev(1, 3)), TTY.register(FS.makedev(5, 0), TTY.default_tty_ops), TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops), FS.mkdev("/dev/tty", FS.makedev(5, 0)), FS.mkdev("/dev/tty1", FS.makedev(6, 0)), "object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
            var t = new Uint8Array(1);
            e = function () {
                return crypto.getRandomValues(t), t[0]
            }
        } else if (ENVIRONMENT_IS_NODE) try {
            var r = require("crypto");
            e = function () {
                return r.randomBytes(1)[0]
            }
        } catch (e) {}
        e || (e = function () {
            abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };")
        }), FS.createDevice("/dev", "random", e), FS.createDevice("/dev", "urandom", e), FS.mkdir("/dev/shm"), FS.mkdir("/dev/shm/tmp")
    },
    createSpecialDirectories: function () {
        FS.mkdir("/proc"), FS.mkdir("/proc/self"), FS.mkdir("/proc/self/fd"), FS.mount({
            mount: function () {
                var e = FS.createNode("/proc/self", "fd", 16895, 73);
                return e.node_ops = {
                    lookup: function (e, t) {
                        var r = +t,
                            o = FS.getStream(r);
                        if (!o) throw new FS.ErrnoError(8);
                        var n = {
                            parent: null,
                            mount: {
                                mountpoint: "fake"
                            },
                            node_ops: {
                                readlink: function () {
                                    return o.path
                                }
                            }
                        };
                        return n.parent = n, n
                    }
                }, e
            }
        }, {}, "/proc/self/fd")
    },
    createStandardStreams: function () {
        Module.stdin ? FS.createDevice("/dev", "stdin", Module.stdin) : FS.symlink("/dev/tty", "/dev/stdin"), Module.stdout ? FS.createDevice("/dev", "stdout", null, Module.stdout) : FS.symlink("/dev/tty", "/dev/stdout"), Module.stderr ? FS.createDevice("/dev", "stderr", null, Module.stderr) : FS.symlink("/dev/tty1", "/dev/stderr");
        var e = FS.open("/dev/stdin", "r"),
            t = FS.open("/dev/stdout", "w"),
            r = FS.open("/dev/stderr", "w");
        assert(0 === e.fd, "invalid handle for stdin (" + e.fd + ")"), assert(1 === t.fd, "invalid handle for stdout (" + t.fd + ")"), assert(2 === r.fd, "invalid handle for stderr (" + r.fd + ")")
    },
    ensureErrnoError: function () {
        FS.ErrnoError || (FS.ErrnoError = function (e, t) {
            this.node = t, this.setErrno = function (e) {
                for (var t in this.errno = e, ERRNO_CODES)
                    if (ERRNO_CODES[t] === e) {
                        this.code = t;
                        break
                    }
            }, this.setErrno(e), this.message = ERRNO_MESSAGES[e], this.stack && (Object.defineProperty(this, "stack", {
                value: (new Error).stack,
                writable: !0
            }), this.stack = demangleAll(this.stack))
        }, FS.ErrnoError.prototype = new Error, FS.ErrnoError.prototype.constructor = FS.ErrnoError, [44].forEach((function (e) {
            FS.genericErrors[e] = new FS.ErrnoError(e), FS.genericErrors[e].stack = "<generic error, no stack>"
        })))
    },
    staticInit: function () {
        FS.ensureErrnoError(), FS.nameTable = new Array(4096), FS.mount(MEMFS, {}, "/"), FS.createDefaultDirectories(), FS.createDefaultDevices(), FS.createSpecialDirectories(), FS.filesystems = {
            MEMFS: MEMFS
        }
    },
    init: function (e, t, r) {
        assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), FS.init.initialized = !0, FS.ensureErrnoError(), Module.stdin = e || Module.stdin, Module.stdout = t || Module.stdout, Module.stderr = r || Module.stderr, FS.createStandardStreams()
    },
    quit: function () {
        FS.init.initialized = !1;
        var e = Module._fflush;
        e && e(0);
        for (var t = 0; t < FS.streams.length; t++) {
            var r = FS.streams[t];
            r && FS.close(r)
        }
    },
    getMode: function (e, t) {
        var r = 0;
        return e && (r |= 365), t && (r |= 146), r
    },
    joinPath: function (e, t) {
        var r = PATH.join.apply(null, e);
        return t && "/" == r[0] && (r = r.substr(1)), r
    },
    absolutePath: function (e, t) {
        return PATH_FS.resolve(t, e)
    },
    standardizePath: function (e) {
        return PATH.normalize(e)
    },
    findObject: function (e, t) {
        var r = FS.analyzePath(e, t);
        return r.exists ? r.object : (setErrNo(r.error), null)
    },
    analyzePath: function (e, t) {
        try {
            e = (o = FS.lookupPath(e, {
                follow: !t
            })).path
        } catch (e) {}
        var r = {
            isRoot: !1,
            exists: !1,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: !1,
            parentPath: null,
            parentObject: null
        };
        try {
            var o = FS.lookupPath(e, {
                parent: !0
            });
            r.parentExists = !0, r.parentPath = o.path, r.parentObject = o.node, r.name = PATH.basename(e), o = FS.lookupPath(e, {
                follow: !t
            }), r.exists = !0, r.path = o.path, r.object = o.node, r.name = o.node.name, r.isRoot = "/" === o.path
        } catch (e) {
            r.error = e.errno
        }
        return r
    },
    createFolder: function (e, t, r, o) {
        var n = PATH.join2("string" == typeof e ? e : FS.getPath(e), t),
            i = FS.getMode(r, o);
        return FS.mkdir(n, i)
    },
    createPath: function (e, t, r, o) {
        e = "string" == typeof e ? e : FS.getPath(e);
        for (var n = t.split("/").reverse(); n.length;) {
            var i = n.pop();
            if (i) {
                var a = PATH.join2(e, i);
                try {
                    FS.mkdir(a)
                } catch (e) {}
                e = a
            }
        }
        return a
    },
    createFile: function (e, t, r, o, n) {
        var i = PATH.join2("string" == typeof e ? e : FS.getPath(e), t),
            a = FS.getMode(o, n);
        return FS.create(i, a)
    },
    createDataFile: function (e, t, r, o, n, i) {
        var a = t ? PATH.join2("string" == typeof e ? e : FS.getPath(e), t) : e,
            s = FS.getMode(o, n),
            d = FS.create(a, s);
        if (r) {
            if ("string" == typeof r) {
                for (var l = new Array(r.length), c = 0, u = r.length; c < u; ++c) l[c] = r.charCodeAt(c);
                r = l
            }
            FS.chmod(d, 146 | s);
            var _ = FS.open(d, "w");
            FS.write(_, r, 0, r.length, 0, i), FS.close(_), FS.chmod(d, s)
        }
        return d
    },
    createDevice: function (e, t, r, o) {
        var n = PATH.join2("string" == typeof e ? e : FS.getPath(e), t),
            i = FS.getMode(!!r, !!o);
        FS.createDevice.major || (FS.createDevice.major = 64);
        var a = FS.makedev(FS.createDevice.major++, 0);
        return FS.registerDevice(a, {
            open: function (e) {
                e.seekable = !1
            },
            close: function (e) {
                o && o.buffer && o.buffer.length && o(10)
            },
            read: function (e, t, o, n, i) {
                for (var a = 0, s = 0; s < n; s++) {
                    var d;
                    try {
                        d = r()
                    } catch (e) {
                        throw new FS.ErrnoError(29)
                    }
                    if (void 0 === d && 0 === a) throw new FS.ErrnoError(6);
                    if (null == d) break;
                    a++, t[o + s] = d
                }
                return a && (e.node.timestamp = Date.now()), a
            },
            write: function (e, t, r, n, i) {
                for (var a = 0; a < n; a++) try {
                    o(t[r + a])
                } catch (e) {
                    throw new FS.ErrnoError(29)
                }
                return n && (e.node.timestamp = Date.now()), a
            }
        }), FS.mkdev(n, i, a)
    },
    createLink: function (e, t, r, o, n) {
        var i = PATH.join2("string" == typeof e ? e : FS.getPath(e), t);
        return FS.symlink(r, i)
    },
    forceLoadFile: function (e) {
        if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
        var t = !0;
        if ("undefined" != typeof XMLHttpRequest) throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        if (!read_) throw new Error("Cannot load without read() or XMLHttpRequest.");
        try {
            e.contents = intArrayFromString(read_(e.url), !0), e.usedBytes = e.contents.length
        } catch (e) {
            t = !1
        }
        return t || setErrNo(29), t
    },
    createLazyFile: function (e, t, r, o, n) {
        function i() {
            this.lengthKnown = !1, this.chunks = []
        }
        if (i.prototype.get = function (e) {
                if (!(e > this.length - 1 || e < 0)) {
                    var t = e % this.chunkSize,
                        r = e / this.chunkSize | 0;
                    return this.getter(r)[t]
                }
            }, i.prototype.setDataGetter = function (e) {
                this.getter = e
            }, i.prototype.cacheLength = function () {
                var e = new XMLHttpRequest;
                if (e.open("HEAD", r, !1), e.send(null), !(e.status >= 200 && e.status < 300 || 304 === e.status)) throw new Error("Couldn't load " + r + ". Status: " + e.status);
                var t, o = Number(e.getResponseHeader("Content-length")),
                    n = (t = e.getResponseHeader("Accept-Ranges")) && "bytes" === t,
                    i = (t = e.getResponseHeader("Content-Encoding")) && "gzip" === t,
                    a = 1048576;
                n || (a = o);
                var s = this;
                s.setDataGetter((function (e) {
                    var t = e * a,
                        n = (e + 1) * a - 1;
                    if (n = Math.min(n, o - 1), void 0 === s.chunks[e] && (s.chunks[e] = function (e, t) {
                            if (e > t) throw new Error("invalid range (" + e + ", " + t + ") or no bytes requested!");
                            if (t > o - 1) throw new Error("only " + o + " bytes available! programmer error!");
                            var n = new XMLHttpRequest;
                            if (n.open("GET", r, !1), o !== a && n.setRequestHeader("Range", "bytes=" + e + "-" + t), "undefined" != typeof Uint8Array && (n.responseType = "arraybuffer"), n.overrideMimeType && n.overrideMimeType("text/plain; charset=x-user-defined"), n.send(null), !(n.status >= 200 && n.status < 300 || 304 === n.status)) throw new Error("Couldn't load " + r + ". Status: " + n.status);
                            return void 0 !== n.response ? new Uint8Array(n.response || []) : intArrayFromString(n.responseText || "", !0)
                        }(t, n)), void 0 === s.chunks[e]) throw new Error("doXHR failed!");
                    return s.chunks[e]
                })), !i && o || (a = o = 1, o = this.getter(0).length, a = o, out("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = o, this._chunkSize = a, this.lengthKnown = !0
            }, "undefined" != typeof XMLHttpRequest) {
            if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var a = new i;
            Object.defineProperties(a, {
                length: {
                    get: function () {
                        return this.lengthKnown || this.cacheLength(), this._length
                    }
                },
                chunkSize: {
                    get: function () {
                        return this.lengthKnown || this.cacheLength(), this._chunkSize
                    }
                }
            });
            var s = {
                isDevice: !1,
                contents: a
            }
        } else s = {
            isDevice: !1,
            url: r
        };
        var d = FS.createFile(e, t, s, o, n);
        s.contents ? d.contents = s.contents : s.url && (d.contents = null, d.url = s.url), Object.defineProperties(d, {
            usedBytes: {
                get: function () {
                    return this.contents.length
                }
            }
        });
        var l = {};
        return Object.keys(d.stream_ops).forEach((function (e) {
            var t = d.stream_ops[e];
            l[e] = function () {
                if (!FS.forceLoadFile(d)) throw new FS.ErrnoError(29);
                return t.apply(null, arguments)
            }
        })), l.read = function (e, t, r, o, n) {
            if (!FS.forceLoadFile(d)) throw new FS.ErrnoError(29);
            var i = e.node.contents;
            if (n >= i.length) return 0;
            var a = Math.min(i.length - n, o);
            if (assert(a >= 0), i.slice)
                for (var s = 0; s < a; s++) t[r + s] = i[n + s];
            else
                for (s = 0; s < a; s++) t[r + s] = i.get(n + s);
            return a
        }, d.stream_ops = l, d
    },
    createPreloadedFile: function (e, t, r, o, n, i, a, s, d, l) {
        Browser.init();
        var c = t ? PATH_FS.resolve(PATH.join2(e, t)) : e,
            u = getUniqueRunDependency("cp " + c);

        function _(r) {
            function _(r) {
                l && l(), s || FS.createDataFile(e, t, r, o, n, d), i && i(), removeRunDependency(u)
            }
            var p = !1;
            Module.preloadPlugins.forEach((function (e) {
                p || e.canHandle(c) && (e.handle(r, c, _, (function () {
                    a && a(), removeRunDependency(u)
                })), p = !0)
            })), p || _(r)
        }
        addRunDependency(u), "string" == typeof r ? Browser.asyncLoad(r, (function (e) {
            _(e)
        }), a) : _(r)
    },
    indexedDB: function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    },
    DB_NAME: function () {
        return "EM_FS_" + window.location.pathname
    },
    DB_VERSION: 20,
    DB_STORE_NAME: "FILE_DATA",
    saveFilesToDB: function (e, t, r) {
        t = t || function () {}, r = r || function () {};
        var o = FS.indexedDB();
        try {
            var n = o.open(FS.DB_NAME(), FS.DB_VERSION)
        } catch (e) {
            return r(e)
        }
        n.onupgradeneeded = function () {
            out("creating db"), n.result.createObjectStore(FS.DB_STORE_NAME)
        }, n.onsuccess = function () {
            var o = n.result.transaction([FS.DB_STORE_NAME], "readwrite"),
                i = o.objectStore(FS.DB_STORE_NAME),
                a = 0,
                s = 0,
                d = e.length;

            function l() {
                0 == s ? t() : r()
            }
            e.forEach((function (e) {
                var t = i.put(FS.analyzePath(e).object.contents, e);
                t.onsuccess = function () {
                    ++a + s == d && l()
                }, t.onerror = function () {
                    s++, a + s == d && l()
                }
            })), o.onerror = r
        }, n.onerror = r
    },
    loadFilesFromDB: function (e, t, r) {
        t = t || function () {}, r = r || function () {};
        var o = FS.indexedDB();
        try {
            var n = o.open(FS.DB_NAME(), FS.DB_VERSION)
        } catch (e) {
            return r(e)
        }
        n.onupgradeneeded = r, n.onsuccess = function () {
            var o = n.result;
            try {
                var i = o.transaction([FS.DB_STORE_NAME], "readonly")
            } catch (e) {
                return void r(e)
            }
            var a = i.objectStore(FS.DB_STORE_NAME),
                s = 0,
                d = 0,
                l = e.length;

            function c() {
                0 == d ? t() : r()
            }
            e.forEach((function (e) {
                var t = a.get(e);
                t.onsuccess = function () {
                    FS.analyzePath(e).exists && FS.unlink(e), FS.createDataFile(PATH.dirname(e), PATH.basename(e), t.result, !0, !0, !0), ++s + d == l && c()
                }, t.onerror = function () {
                    d++, s + d == l && c()
                }
            })), i.onerror = r
        }, n.onerror = r
    }
};
Module.FS = FS;
var SYSCALLS = {
    mappings: {},
    DEFAULT_POLLMASK: 5,
    umask: 511,
    calculateAt: function (e, t) {
        if ("/" !== t[0]) {
            var r;
            if (-100 === e) r = FS.cwd();
            else {
                var o = FS.getStream(e);
                if (!o) throw new FS.ErrnoError(8);
                r = o.path
            }
            t = PATH.join2(r, t)
        }
        return t
    },
    doStat: function (e, t, r) {
        try {
            var o = e(t)
        } catch (e) {
            if (e && e.node && PATH.normalize(t) !== PATH.normalize(FS.getPath(e.node))) return -54;
            throw e
        }
        return HEAP32[r >> 2] = o.dev, HEAP32[r + 4 >> 2] = 0, HEAP32[r + 8 >> 2] = o.ino, HEAP32[r + 12 >> 2] = o.mode, HEAP32[r + 16 >> 2] = o.nlink, HEAP32[r + 20 >> 2] = o.uid, HEAP32[r + 24 >> 2] = o.gid, HEAP32[r + 28 >> 2] = o.rdev, HEAP32[r + 32 >> 2] = 0, tempI64 = [o.size >>> 0, (tempDouble = o.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 40 >> 2] = tempI64[0], HEAP32[r + 44 >> 2] = tempI64[1], HEAP32[r + 48 >> 2] = 4096, HEAP32[r + 52 >> 2] = o.blocks, HEAP32[r + 56 >> 2] = o.atime.getTime() / 1e3 | 0, HEAP32[r + 60 >> 2] = 0, HEAP32[r + 64 >> 2] = o.mtime.getTime() / 1e3 | 0, HEAP32[r + 68 >> 2] = 0, HEAP32[r + 72 >> 2] = o.ctime.getTime() / 1e3 | 0, HEAP32[r + 76 >> 2] = 0, tempI64 = [o.ino >>> 0, (tempDouble = o.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 80 >> 2] = tempI64[0], HEAP32[r + 84 >> 2] = tempI64[1], 0
    },
    doMsync: function (e, t, r, o, n) {
        var i = HEAPU8.slice(e, e + r);
        FS.msync(t, i, n, r, o)
    },
    doMkdir: function (e, t) {
        return "/" === (e = PATH.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), FS.mkdir(e, t, 0), 0
    },
    doMknod: function (e, t, r) {
        switch (61440 & t) {
            case 32768:
            case 8192:
            case 24576:
            case 4096:
            case 49152:
                break;
            default:
                return -28
        }
        return FS.mknod(e, t, r), 0
    },
    doReadlink: function (e, t, r) {
        if (r <= 0) return -28;
        var o = FS.readlink(e),
            n = Math.min(r, lengthBytesUTF8(o)),
            i = HEAP8[t + n];
        return stringToUTF8(o, t, r + 1), HEAP8[t + n] = i, n
    },
    doAccess: function (e, t) {
        if (-8 & t) return -28;
        var r;
        if (!(r = FS.lookupPath(e, {
                follow: !0
            }).node)) return -44;
        var o = "";
        return 4 & t && (o += "r"), 2 & t && (o += "w"), 1 & t && (o += "x"), o && FS.nodePermissions(r, o) ? -2 : 0
    },
    doDup: function (e, t, r) {
        var o = FS.getStream(r);
        return o && FS.close(o), FS.open(e, t, 0, r, r).fd
    },
    doReadv: function (e, t, r, o) {
        for (var n = 0, i = 0; i < r; i++) {
            var a = HEAP32[t + 8 * i >> 2],
                s = HEAP32[t + (8 * i + 4) >> 2],
                d = FS.read(e, HEAP8, a, s, o);
            if (d < 0) return -1;
            if (n += d, d < s) break
        }
        return n
    },
    doWritev: function (e, t, r, o) {
        for (var n = 0, i = 0; i < r; i++) {
            var a = HEAP32[t + 8 * i >> 2],
                s = HEAP32[t + (8 * i + 4) >> 2],
                d = FS.write(e, HEAP8, a, s, o);
            if (d < 0) return -1;
            n += d
        }
        return n
    },
    varargs: void 0,
    get: function () {
        return assert(null != SYSCALLS.varargs), SYSCALLS.varargs += 4, HEAP32[SYSCALLS.varargs - 4 >> 2]
    },
    getStr: function (e) {
        return UTF8ToString(e)
    },
    getStreamFromFD: function (e) {
        var t = FS.getStream(e);
        if (!t) throw new FS.ErrnoError(8);
        return t
    },
    get64: function (e, t) {
        return assert(e >= 0 ? 0 === t : -1 === t), e
    }
};

function ___sys_fcntl64(e, t, r) {
    SYSCALLS.varargs = r;
    try {
        var o = SYSCALLS.getStreamFromFD(e);
        switch (t) {
            case 0:
                return (n = SYSCALLS.get()) < 0 ? -28 : FS.open(o.path, o.flags, 0, n).fd;
            case 1:
            case 2:
                return 0;
            case 3:
                return o.flags;
            case 4:
                var n = SYSCALLS.get();
                return o.flags |= n, 0;
            case 12:
                n = SYSCALLS.get();
                return HEAP16[n + 0 >> 1] = 2, 0;
            case 13:
            case 14:
                return 0;
            case 16:
            case 8:
                return -28;
            case 9:
                return setErrNo(28), -1;
            default:
                return -28
        }
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
    }
}

function ___sys_ioctl(e, t, r) {
    SYSCALLS.varargs = r;
    try {
        var o = SYSCALLS.getStreamFromFD(e);
        switch (t) {
            case 21509:
            case 21505:
                return o.tty ? 0 : -59;
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508:
                return o.tty ? 0 : -59;
            case 21519:
                if (!o.tty) return -59;
                var n = SYSCALLS.get();
                return HEAP32[n >> 2] = 0, 0;
            case 21520:
                return o.tty ? -28 : -59;
            case 21531:
                n = SYSCALLS.get();
                return FS.ioctl(o, t, n);
            case 21523:
            case 21524:
                return o.tty ? 0 : -59;
            default:
                abort("bad ioctl syscall " + t)
        }
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
    }
}

function ___sys_open(e, t, r) {
    SYSCALLS.varargs = r;
    try {
        var o = SYSCALLS.getStr(e),
            n = SYSCALLS.get();
        return FS.open(o, t, n).fd
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
    }
}

function getShiftFromSize(e) {
    switch (e) {
        case 1:
            return 0;
        case 2:
            return 1;
        case 4:
            return 2;
        case 8:
            return 3;
        default:
            throw new TypeError("Unknown type size: " + e)
    }
}

function embind_init_charCodes() {
    for (var e = new Array(256), t = 0; t < 256; ++t) e[t] = String.fromCharCode(t);
    embind_charCodes = e
}
Module.SYSCALLS = SYSCALLS, Module.___sys_fcntl64 = ___sys_fcntl64, Module.___sys_ioctl = ___sys_ioctl, Module.___sys_open = ___sys_open, Module.getShiftFromSize = getShiftFromSize, Module.embind_init_charCodes = embind_init_charCodes;
var embind_charCodes = void 0;

function readLatin1String(e) {
    for (var t = "", r = e; HEAPU8[r];) t += embind_charCodes[HEAPU8[r++]];
    return t
}
Module.embind_charCodes = embind_charCodes, Module.readLatin1String = readLatin1String;
var awaitingDependencies = {};
Module.awaitingDependencies = awaitingDependencies;
var registeredTypes = {};
Module.registeredTypes = registeredTypes;
var typeDependencies = {};
Module.typeDependencies = typeDependencies;
var char_0 = 48;
Module.char_0 = char_0;
var char_9 = 57;

function makeLegalFunctionName(e) {
    if (void 0 === e) return "_unknown";
    var t = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
    return t >= char_0 && t <= char_9 ? "_" + e : e
}

function createNamedFunction(e, t) {
    return e = makeLegalFunctionName(e), new Function("body", "return function " + e + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(t)
}

function extendError(e, t) {
    var r = createNamedFunction(t, (function (e) {
        this.name = t, this.message = e;
        var r = new Error(e).stack;
        void 0 !== r && (this.stack = this.toString() + "\n" + r.replace(/^Error(:[^\n]*)?\n/, ""))
    }));
    return r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r.prototype.toString = function () {
        return void 0 === this.message ? this.name : this.name + ": " + this.message
    }, r
}
Module.char_9 = char_9, Module.makeLegalFunctionName = makeLegalFunctionName, Module.createNamedFunction = createNamedFunction, Module.extendError = extendError;
var BindingError = void 0;

function throwBindingError(e) {
    throw new BindingError(e)
}
Module.BindingError = BindingError, Module.throwBindingError = throwBindingError;
var InternalError = void 0;

function throwInternalError(e) {
    throw new InternalError(e)
}

function whenDependentTypesAreResolved(e, t, r) {
    function o(t) {
        var o = r(t);
        o.length !== e.length && throwInternalError("Mismatched type converter count");
        for (var n = 0; n < e.length; ++n) registerType(e[n], o[n])
    }
    e.forEach((function (e) {
        typeDependencies[e] = t
    }));
    var n = new Array(t.length),
        i = [],
        a = 0;
    t.forEach((function (e, t) {
        registeredTypes.hasOwnProperty(e) ? n[t] = registeredTypes[e] : (i.push(e), awaitingDependencies.hasOwnProperty(e) || (awaitingDependencies[e] = []), awaitingDependencies[e].push((function () {
            n[t] = registeredTypes[e], ++a === i.length && o(n)
        })))
    })), 0 === i.length && o(n)
}

function registerType(e, t, r) {
    if (r = r || {}, !("argPackAdvance" in t)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var o = t.name;
    if (e || throwBindingError('type "' + o + '" must have a positive integer typeid pointer'), registeredTypes.hasOwnProperty(e)) {
        if (r.ignoreDuplicateRegistrations) return;
        throwBindingError("Cannot register type '" + o + "' twice")
    }
    if (registeredTypes[e] = t, delete typeDependencies[e], awaitingDependencies.hasOwnProperty(e)) {
        var n = awaitingDependencies[e];
        delete awaitingDependencies[e], n.forEach((function (e) {
            e()
        }))
    }
}

function __embind_register_bool(e, t, r, o, n) {
    var i = getShiftFromSize(r);
    registerType(e, {
        name: t = readLatin1String(t),
        fromWireType: function (e) {
            return !!e
        },
        toWireType: function (e, t) {
            return t ? o : n
        },
        argPackAdvance: 8,
        readValueFromPointer: function (e) {
            var o;
            if (1 === r) o = HEAP8;
            else if (2 === r) o = HEAP16;
            else {
                if (4 !== r) throw new TypeError("Unknown boolean type size: " + t);
                o = HEAP32
            }
            return this.fromWireType(o[e >> i])
        },
        destructorFunction: null
    })
}
Module.InternalError = InternalError, Module.throwInternalError = throwInternalError, Module.whenDependentTypesAreResolved = whenDependentTypesAreResolved, Module.registerType = registerType, Module.__embind_register_bool = __embind_register_bool;
var emval_free_list = [];
Module.emval_free_list = emval_free_list;
var emval_handle_array = [{}, {
    value: void 0
}, {
    value: null
}, {
    value: !0
}, {
    value: !1
}];

function __emval_decref(e) {
    e > 4 && 0 == --emval_handle_array[e].refcount && (emval_handle_array[e] = void 0, emval_free_list.push(e))
}

function count_emval_handles() {
    for (var e = 0, t = 5; t < emval_handle_array.length; ++t) void 0 !== emval_handle_array[t] && ++e;
    return e
}

function get_first_emval() {
    for (var e = 5; e < emval_handle_array.length; ++e)
        if (void 0 !== emval_handle_array[e]) return emval_handle_array[e];
    return null
}

function init_emval() {
    Module.count_emval_handles = count_emval_handles, Module.get_first_emval = get_first_emval
}

function __emval_register(e) {
    switch (e) {
        case void 0:
            return 1;
        case null:
            return 2;
        case !0:
            return 3;
        case !1:
            return 4;
        default:
            var t = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            return emval_handle_array[t] = {
                refcount: 1,
                value: e
            }, t
    }
}

function simpleReadValueFromPointer(e) {
    return this.fromWireType(HEAPU32[e >> 2])
}

function __embind_register_emval(e, t) {
    registerType(e, {
        name: t = readLatin1String(t),
        fromWireType: function (e) {
            var t = emval_handle_array[e].value;
            return __emval_decref(e), t
        },
        toWireType: function (e, t) {
            return __emval_register(t)
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: null
    })
}

function _embind_repr(e) {
    if (null === e) return "null";
    var t = typeof e;
    return "object" === t || "array" === t || "function" === t ? e.toString() : "" + e
}

function floatReadValueFromPointer(e, t) {
    switch (t) {
        case 2:
            return function (e) {
                return this.fromWireType(HEAPF32[e >> 2])
            };
        case 3:
            return function (e) {
                return this.fromWireType(HEAPF64[e >> 3])
            };
        default:
            throw new TypeError("Unknown float type: " + e)
    }
}

function __embind_register_float(e, t, r) {
    var o = getShiftFromSize(r);
    registerType(e, {
        name: t = readLatin1String(t),
        fromWireType: function (e) {
            return e
        },
        toWireType: function (e, t) {
            if ("number" != typeof t && "boolean" != typeof t) throw new TypeError('Cannot convert "' + _embind_repr(t) + '" to ' + this.name);
            return t
        },
        argPackAdvance: 8,
        readValueFromPointer: floatReadValueFromPointer(t, o),
        destructorFunction: null
    })
}

function new_(e, t) {
    if (!(e instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof e + " which is not a function");
    var r = createNamedFunction(e.name || "unknownFunctionName", (function () {}));
    r.prototype = e.prototype;
    var o = new r,
        n = e.apply(o, t);
    return n instanceof Object ? n : o
}

function runDestructors(e) {
    for (; e.length;) {
        var t = e.pop();
        e.pop()(t)
    }
}

function craftInvokerFunction(e, t, r, o, n) {
    var i = t.length;
    i < 2 && throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var a = null !== t[1] && null !== r, s = !1, d = 1; d < t.length; ++d)
        if (null !== t[d] && void 0 === t[d].destructorFunction) {
            s = !0;
            break
        } var l = "void" !== t[0].name,
        c = "",
        u = "";
    for (d = 0; d < i - 2; ++d) c += (0 !== d ? ", " : "") + "arg" + d, u += (0 !== d ? ", " : "") + "arg" + d + "Wired";
    var _ = "return function " + makeLegalFunctionName(e) + "(" + c + ") {\nif (arguments.length !== " + (i - 2) + ") {\nthrowBindingError('function " + e + " called with ' + arguments.length + ' arguments, expected " + (i - 2) + " args!');\n}\n";
    s && (_ += "var destructors = [];\n");
    var p = s ? "destructors" : "null",
        f = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"],
        E = [throwBindingError, o, n, runDestructors, t[0], t[1]];
    a && (_ += "var thisWired = classParam.toWireType(" + p + ", this);\n");
    for (d = 0; d < i - 2; ++d) _ += "var arg" + d + "Wired = argType" + d + ".toWireType(" + p + ", arg" + d + "); // " + t[d + 2].name + "\n", f.push("argType" + d), E.push(t[d + 2]);
    if (a && (u = "thisWired" + (u.length > 0 ? ", " : "") + u), _ += (l ? "var rv = " : "") + "invoker(fn" + (u.length > 0 ? ", " : "") + u + ");\n", s) _ += "runDestructors(destructors);\n";
    else
        for (d = a ? 1 : 2; d < t.length; ++d) {
            var m = 1 === d ? "thisWired" : "arg" + (d - 2) + "Wired";
            null !== t[d].destructorFunction && (_ += m + "_dtor(" + m + "); // " + t[d].name + "\n", f.push(m + "_dtor"), E.push(t[d].destructorFunction))
        }
    return l && (_ += "var ret = retType.fromWireType(rv);\nreturn ret;\n"), _ += "}\n", f.push(_), new_(Function, f).apply(null, E)
}

function ensureOverloadTable(e, t, r) {
    if (void 0 === e[t].overloadTable) {
        var o = e[t];
        e[t] = function () {
            return e[t].overloadTable.hasOwnProperty(arguments.length) || throwBindingError("Function '" + r + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + e[t].overloadTable + ")!"), e[t].overloadTable[arguments.length].apply(this, arguments)
        }, e[t].overloadTable = [], e[t].overloadTable[o.argCount] = o
    }
}

function exposePublicSymbol(e, t, r) {
    Module.hasOwnProperty(e) ? ((void 0 === r || void 0 !== Module[e].overloadTable && void 0 !== Module[e].overloadTable[r]) && throwBindingError("Cannot register public name '" + e + "' twice"), ensureOverloadTable(Module, e, e), Module.hasOwnProperty(r) && throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + r + ")!"), Module[e].overloadTable[r] = t) : (Module[e] = t, void 0 !== r && (Module[e].numArguments = r))
}

function heap32VectorToArray(e, t) {
    for (var r = [], o = 0; o < e; o++) r.push(HEAP32[(t >> 2) + o]);
    return r
}

function replacePublicSymbol(e, t, r) {
    Module.hasOwnProperty(e) || throwInternalError("Replacing nonexistant public symbol"), void 0 !== Module[e].overloadTable && void 0 !== r ? Module[e].overloadTable[r] = t : (Module[e] = t, Module[e].argCount = r)
}

function embind__requireFunction(e, t) {
    e = readLatin1String(e);
    var r = function (r) {
        for (var o = [], n = 1; n < e.length; ++n) o.push("a" + n);
        var i = "return function " + ("dynCall_" + e + "_" + t) + "(" + o.join(", ") + ") {\n";
        return i += "    return dynCall(rawFunction" + (o.length ? ", " : "") + o.join(", ") + ");\n", i += "};\n", new Function("dynCall", "rawFunction", i)(r, t)
    }(Module["dynCall_" + e]);
    return "function" != typeof r && throwBindingError("unknown function pointer with signature " + e + ": " + t), r
}
Module.emval_handle_array = emval_handle_array, Module.__emval_decref = __emval_decref, Module.count_emval_handles = count_emval_handles, Module.get_first_emval = get_first_emval, Module.init_emval = init_emval, Module.__emval_register = __emval_register, Module.simpleReadValueFromPointer = simpleReadValueFromPointer, Module.__embind_register_emval = __embind_register_emval, Module._embind_repr = _embind_repr, Module.floatReadValueFromPointer = floatReadValueFromPointer, Module.__embind_register_float = __embind_register_float, Module.new_ = new_, Module.runDestructors = runDestructors, Module.craftInvokerFunction = craftInvokerFunction, Module.ensureOverloadTable = ensureOverloadTable, Module.exposePublicSymbol = exposePublicSymbol, Module.heap32VectorToArray = heap32VectorToArray, Module.replacePublicSymbol = replacePublicSymbol, Module.embind__requireFunction = embind__requireFunction;
var UnboundTypeError = void 0;

function getTypeName(e) {
    var t = ___getTypeName(e),
        r = readLatin1String(t);
    return _free(t), r
}

function throwUnboundTypeError(e, t) {
    var r = [],
        o = {};
    throw t.forEach((function e(t) {
        o[t] || registeredTypes[t] || (typeDependencies[t] ? typeDependencies[t].forEach(e) : (r.push(t), o[t] = !0))
    })), new UnboundTypeError(e + ": " + r.map(getTypeName).join([", "]))
}

function __embind_register_function(e, t, r, o, n, i) {
    var a = heap32VectorToArray(t, r);
    e = readLatin1String(e), n = embind__requireFunction(o, n), exposePublicSymbol(e, (function () {
        throwUnboundTypeError("Cannot call " + e + " due to unbound types", a)
    }), t - 1), whenDependentTypesAreResolved([], a, (function (r) {
        var o = [r[0], null].concat(r.slice(1));
        return replacePublicSymbol(e, craftInvokerFunction(e, o, null, n, i), t - 1), []
    }))
}

function integerReadValueFromPointer(e, t, r) {
    switch (t) {
        case 0:
            return r ? function (e) {
                return HEAP8[e]
            } : function (e) {
                return HEAPU8[e]
            };
        case 1:
            return r ? function (e) {
                return HEAP16[e >> 1]
            } : function (e) {
                return HEAPU16[e >> 1]
            };
        case 2:
            return r ? function (e) {
                return HEAP32[e >> 2]
            } : function (e) {
                return HEAPU32[e >> 2]
            };
        default:
            throw new TypeError("Unknown integer type: " + e)
    }
}

function __embind_register_integer(e, t, r, o, n) {
    t = readLatin1String(t), -1 === n && (n = 4294967295);
    var i = getShiftFromSize(r),
        a = function (e) {
            return e
        };
    if (0 === o) {
        var s = 32 - 8 * r;
        a = function (e) {
            return e << s >>> s
        }
    }
    var d = -1 != t.indexOf("unsigned");
    registerType(e, {
        name: t,
        fromWireType: a,
        toWireType: function (e, r) {
            if ("number" != typeof r && "boolean" != typeof r) throw new TypeError('Cannot convert "' + _embind_repr(r) + '" to ' + this.name);
            if (r < o || r > n) throw new TypeError('Passing a number "' + _embind_repr(r) + '" from JS side to C/C++ side to an argument of type "' + t + '", which is outside the valid range [' + o + ", " + n + "]!");
            return d ? r >>> 0 : 0 | r
        },
        argPackAdvance: 8,
        readValueFromPointer: integerReadValueFromPointer(t, i, 0 !== o),
        destructorFunction: null
    })
}

function __embind_register_memory_view(e, t, r) {
    var o = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][t];

    function n(e) {
        var t = HEAPU32,
            r = t[e >>= 2],
            n = t[e + 1];
        return new o(buffer, n, r)
    }
    registerType(e, {
        name: r = readLatin1String(r),
        fromWireType: n,
        argPackAdvance: 8,
        readValueFromPointer: n
    }, {
        ignoreDuplicateRegistrations: !0
    })
}

function __embind_register_std_string(e, t) {
    var r = "std::string" === (t = readLatin1String(t));
    registerType(e, {
        name: t,
        fromWireType: function (e) {
            var t, o = HEAPU32[e >> 2];
            if (r)
                for (var n = e + 4, i = 0; i <= o; ++i) {
                    var a = e + 4 + i;
                    if (0 == HEAPU8[a] || i == o) {
                        var s = UTF8ToString(n, a - n);
                        void 0 === t ? t = s : (t += String.fromCharCode(0), t += s), n = a + 1
                    }
                } else {
                    var d = new Array(o);
                    for (i = 0; i < o; ++i) d[i] = String.fromCharCode(HEAPU8[e + 4 + i]);
                    t = d.join("")
                }
            return _free(e), t
        },
        toWireType: function (e, t) {
            t instanceof ArrayBuffer && (t = new Uint8Array(t));
            var o = "string" == typeof t;
            o || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int8Array || throwBindingError("Cannot pass non-string to std::string");
            var n = (r && o ? function () {
                    return lengthBytesUTF8(t)
                } : function () {
                    return t.length
                })(),
                i = _malloc(4 + n + 1);
            if (HEAPU32[i >> 2] = n, r && o) stringToUTF8(t, i + 4, n + 1);
            else if (o)
                for (var a = 0; a < n; ++a) {
                    var s = t.charCodeAt(a);
                    s > 255 && (_free(i), throwBindingError("String has UTF-16 code units that do not fit in 8 bits")), HEAPU8[i + 4 + a] = s
                } else
                    for (a = 0; a < n; ++a) HEAPU8[i + 4 + a] = t[a];
            return null !== e && e.push(_free, i), i
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (e) {
            _free(e)
        }
    })
}

function __embind_register_std_wstring(e, t, r) {
    var o, n, i, a, s;
    r = readLatin1String(r), 2 === t ? (o = UTF16ToString, n = stringToUTF16, a = lengthBytesUTF16, i = function () {
        return HEAPU16
    }, s = 1) : 4 === t && (o = UTF32ToString, n = stringToUTF32, a = lengthBytesUTF32, i = function () {
        return HEAPU32
    }, s = 2), registerType(e, {
        name: r,
        fromWireType: function (e) {
            for (var r, n = HEAPU32[e >> 2], a = i(), d = e + 4, l = 0; l <= n; ++l) {
                var c = e + 4 + l * t;
                if (0 == a[c >> s] || l == n) {
                    var u = o(d, c - d);
                    void 0 === r ? r = u : (r += String.fromCharCode(0), r += u), d = c + t
                }
            }
            return _free(e), r
        },
        toWireType: function (e, o) {
            "string" != typeof o && throwBindingError("Cannot pass non-string to C++ string type " + r);
            var i = a(o),
                d = _malloc(4 + i + t);
            return HEAPU32[d >> 2] = i >> s, n(o, d + 4, i + t), null !== e && e.push(_free, d), d
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (e) {
            _free(e)
        }
    })
}

function __embind_register_void(e, t) {
    registerType(e, {
        isVoid: !0,
        name: t = readLatin1String(t),
        argPackAdvance: 0,
        fromWireType: function () {},
        toWireType: function (e, t) {}
    })
}

function __emval_incref(e) {
    e > 4 && (emval_handle_array[e].refcount += 1)
}

function requireRegisteredType(e, t) {
    var r = registeredTypes[e];
    return void 0 === r && throwBindingError(t + " has unknown type " + getTypeName(e)), r
}

function __emval_take_value(e, t) {
    return __emval_register((e = requireRegisteredType(e, "_emval_take_value")).readValueFromPointer(t))
}
Module.UnboundTypeError = UnboundTypeError, Module.getTypeName = getTypeName, Module.throwUnboundTypeError = throwUnboundTypeError, Module.__embind_register_function = __embind_register_function, Module.integerReadValueFromPointer = integerReadValueFromPointer, Module.__embind_register_integer = __embind_register_integer, Module.__embind_register_memory_view = __embind_register_memory_view, Module.__embind_register_std_string = __embind_register_std_string, Module.__embind_register_std_wstring = __embind_register_std_wstring, Module.__embind_register_void = __embind_register_void, Module.__emval_incref = __emval_incref, Module.requireRegisteredType = requireRegisteredType, Module.__emval_take_value = __emval_take_value;
var _emscripten_get_now, _abs = Math_abs;

function _clock() {
    return void 0 === _clock.start && (_clock.start = Date.now()), 1e3 * (Date.now() - _clock.start) | 0
}

function _emscripten_get_sbrk_ptr() {
    return 566928
}

function _emscripten_memcpy_big(e, t, r) {
    HEAPU8.copyWithin(e, t, t + r)
}

function _emscripten_get_heap_size() {
    return HEAPU8.length
}

function emscripten_realloc_buffer(e) {
    try {
        return wasmMemory.grow(e - buffer.byteLength + 65535 >>> 16), updateGlobalBufferAndViews(wasmMemory.buffer), 1
    } catch (t) {
        console.error("emscripten_realloc_buffer: Attempted to grow heap from " + buffer.byteLength + " bytes to " + e + " bytes, but got error: " + t)
    }
}

function _emscripten_resize_heap(e) {
    e >>>= 0;
    var t = _emscripten_get_heap_size();
    assert(e > t);
    var r = 2147483648;
    if (e > r) return err("Cannot enlarge memory, asked to go up to " + e + " bytes, but the limit is " + "2147483648 bytes!"), !1;
    for (var o = 1; o <= 4; o *= 2) {
        var n = t * (1 + .2 / o);
        n = Math.min(n, e + 100663296);
        var i = Math.min(r, alignUp(Math.max(16777216, e, n), 65536));
        if (emscripten_realloc_buffer(i)) return !0
    }
    return err("Failed to grow the heap from " + t + " bytes to " + i + " bytes, not enough memory!"), !1
}

function _emscripten_set_main_loop_timing(e, t) {
    if (Browser.mainLoop.timingMode = e, Browser.mainLoop.timingValue = t, !Browser.mainLoop.func) return console.error("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up."), 1;
    if (0 == e) Browser.mainLoop.scheduler = function () {
        var e = 0 | Math.max(0, Browser.mainLoop.tickStartTime + t - _emscripten_get_now());
        setTimeout(Browser.mainLoop.runner, e)
    }, Browser.mainLoop.method = "timeout";
    else if (1 == e) Browser.mainLoop.scheduler = function () {
        Browser.requestAnimationFrame(Browser.mainLoop.runner)
    }, Browser.mainLoop.method = "rAF";
    else if (2 == e) {
        if ("undefined" == typeof setImmediate) {
            var r = [],
                o = "setimmediate";
            addEventListener("message", (function (e) {
                e.data !== o && e.data.target !== o || (e.stopPropagation(), r.shift()())
            }), !0), setImmediate = function (e) {
                r.push(e), ENVIRONMENT_IS_WORKER ? (void 0 === Module.setImmediates && (Module.setImmediates = []), Module.setImmediates.push(e), postMessage({
                    target: o
                })) : postMessage(o, "*")
            }
        }
        Browser.mainLoop.scheduler = function () {
            setImmediate(Browser.mainLoop.runner)
        }, Browser.mainLoop.method = "immediate"
    }
    return 0
}

function _emscripten_set_main_loop(e, t, r, o, n) {
    var i;
    noExitRuntime = !0, assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."), Browser.mainLoop.func = e, Browser.mainLoop.arg = o, i = void 0 !== o ? function () {
        Module.dynCall_vi(e, o)
    } : function () {
        Module.dynCall_v(e)
    };
    var a = Browser.mainLoop.currentlyRunningMainloop;
    if (Browser.mainLoop.runner = function () {
            if (!ABORT)
                if (Browser.mainLoop.queue.length > 0) {
                    var e = Date.now(),
                        t = Browser.mainLoop.queue.shift();
                    if (t.func(t.arg), Browser.mainLoop.remainingBlockers) {
                        var r = Browser.mainLoop.remainingBlockers,
                            o = r % 1 == 0 ? r - 1 : Math.floor(r);
                        t.counted ? Browser.mainLoop.remainingBlockers = o : (o += .5, Browser.mainLoop.remainingBlockers = (8 * r + o) / 9)
                    }
                    if (console.log('main loop blocker "' + t.name + '" took ' + (Date.now() - e) + " ms"), Browser.mainLoop.updateStatus(), a < Browser.mainLoop.currentlyRunningMainloop) return;
                    setTimeout(Browser.mainLoop.runner, 0)
                } else a < Browser.mainLoop.currentlyRunningMainloop || (Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0, 1 == Browser.mainLoop.timingMode && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0 ? Browser.mainLoop.scheduler() : (0 == Browser.mainLoop.timingMode && (Browser.mainLoop.tickStartTime = _emscripten_get_now()), "timeout" === Browser.mainLoop.method && Module.ctx && (warnOnce("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), Browser.mainLoop.method = ""), Browser.mainLoop.runIter(i), checkStackCookie(), a < Browser.mainLoop.currentlyRunningMainloop || ("object" == typeof SDL && SDL.audio && SDL.audio.queueNewAudioData && SDL.audio.queueNewAudioData(), Browser.mainLoop.scheduler())))
        }, n || (t && t > 0 ? _emscripten_set_main_loop_timing(0, 1e3 / t) : _emscripten_set_main_loop_timing(1, 1), Browser.mainLoop.scheduler()), r) throw "unwind"
}
Module._abs = _abs, Module._clock = _clock, Module._emscripten_get_sbrk_ptr = _emscripten_get_sbrk_ptr, Module._emscripten_memcpy_big = _emscripten_memcpy_big, Module._emscripten_get_heap_size = _emscripten_get_heap_size, Module.emscripten_realloc_buffer = emscripten_realloc_buffer, Module._emscripten_resize_heap = _emscripten_resize_heap, Module._emscripten_set_main_loop_timing = _emscripten_set_main_loop_timing, _emscripten_get_now = ENVIRONMENT_IS_NODE ? function () {
    var e = process.hrtime();
    return 1e3 * e[0] + e[1] / 1e6
} : "undefined" != typeof dateNow ? dateNow : function () {
    return performance.now()
}, Module._emscripten_get_now = _emscripten_get_now, Module._emscripten_set_main_loop = _emscripten_set_main_loop;
var Browser = {
    mainLoop: {
        scheduler: null,
        method: "",
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        pause: function () {
            Browser.mainLoop.scheduler = null, Browser.mainLoop.currentlyRunningMainloop++
        },
        resume: function () {
            Browser.mainLoop.currentlyRunningMainloop++;
            var e = Browser.mainLoop.timingMode,
                t = Browser.mainLoop.timingValue,
                r = Browser.mainLoop.func;
            Browser.mainLoop.func = null, _emscripten_set_main_loop(r, 0, !1, Browser.mainLoop.arg, !0), _emscripten_set_main_loop_timing(e, t), Browser.mainLoop.scheduler()
        },
        updateStatus: function () {
            if (Module.setStatus) {
                var e = Module.statusMessage || "Please wait...",
                    t = Browser.mainLoop.remainingBlockers,
                    r = Browser.mainLoop.expectedBlockers;
                t ? t < r ? Module.setStatus(e + " (" + (r - t) + "/" + r + ")") : Module.setStatus(e) : Module.setStatus("")
            }
        },
        runIter: function (e) {
            if (!ABORT) {
                if (Module.preMainLoop)
                    if (!1 === Module.preMainLoop()) return;
                try {
                    e()
                } catch (e) {
                    if (e instanceof ExitStatus) return;
                    throw e && "object" == typeof e && e.stack && err("exception thrown: " + [e, e.stack]), e
                }
                Module.postMainLoop && Module.postMainLoop()
            }
        }
    },
    isFullscreen: !1,
    pointerLock: !1,
    moduleContextCreatedCallbacks: [],
    workers: [],
    init: function () {
        if (Module.preloadPlugins || (Module.preloadPlugins = []), !Browser.initted) {
            Browser.initted = !0;
            try {
                new Blob, Browser.hasBlobConstructor = !0
            } catch (e) {
                Browser.hasBlobConstructor = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
            }
            Browser.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Browser.hasBlobConstructor ? null : console.log("warning: no BlobBuilder"), Browser.URLObject = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0, Module.noImageDecoding || void 0 !== Browser.URLObject || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), Module.noImageDecoding = !0);
            var e = {
                canHandle: function (e) {
                    return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e)
                },
                handle: function (e, t, r, o) {
                    var n = null;
                    if (Browser.hasBlobConstructor) try {
                        (n = new Blob([e], {
                            type: Browser.getMimetype(t)
                        })).size !== e.length && (n = new Blob([new Uint8Array(e).buffer], {
                            type: Browser.getMimetype(t)
                        }))
                    } catch (e) {
                        warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
                    }
                    if (!n) {
                        var i = new Browser.BlobBuilder;
                        i.append(new Uint8Array(e).buffer), n = i.getBlob()
                    }
                    var a = Browser.URLObject.createObjectURL(n);
                    assert("string" == typeof a, "createObjectURL must return a url as a string");
                    var s = new Image;
                    s.onload = function () {
                        assert(s.complete, "Image " + t + " could not be decoded");
                        var o = document.createElement("canvas");
                        o.width = s.width, o.height = s.height, o.getContext("2d").drawImage(s, 0, 0), Module.preloadedImages[t] = o, Browser.URLObject.revokeObjectURL(a), r && r(e)
                    }, s.onerror = function (e) {
                        console.log("Image " + a + " could not be decoded"), o && o()
                    }, s.src = a
                }
            };
            Module.preloadPlugins.push(e);
            var t = {
                canHandle: function (e) {
                    return !Module.noAudioDecoding && e.substr(-4) in {
                        ".ogg": 1,
                        ".wav": 1,
                        ".mp3": 1
                    }
                },
                handle: function (e, t, r, o) {
                    var n = !1;

                    function i(o) {
                        n || (n = !0, Module.preloadedAudios[t] = o, r && r(e))
                    }

                    function a() {
                        n || (n = !0, Module.preloadedAudios[t] = new Audio, o && o())
                    }
                    if (!Browser.hasBlobConstructor) return a();
                    try {
                        var s = new Blob([e], {
                            type: Browser.getMimetype(t)
                        })
                    } catch (e) {
                        return a()
                    }
                    var d = Browser.URLObject.createObjectURL(s);
                    assert("string" == typeof d, "createObjectURL must return a url as a string");
                    var l = new Audio;
                    l.addEventListener("canplaythrough", (function () {
                        i(l)
                    }), !1), l.onerror = function (r) {
                        n || (console.log("warning: browser could not fully decode audio " + t + ", trying slower base64 approach"), l.src = "data:audio/x-" + t.substr(-3) + ";base64," + function (e) {
                            for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = "", o = 0, n = 0, i = 0; i < e.length; i++)
                                for (o = o << 8 | e[i], n += 8; n >= 6;) {
                                    var a = o >> n - 6 & 63;
                                    n -= 6, r += t[a]
                                }
                            return 2 == n ? (r += t[(3 & o) << 4], r += "==") : 4 == n && (r += t[(15 & o) << 2], r += "="), r
                        }(e), i(l))
                    }, l.src = d, Browser.safeSetTimeout((function () {
                        i(l)
                    }), 1e4)
                }
            };
            Module.preloadPlugins.push(t);
            var r = Module.canvas;
            r && (r.requestPointerLock = r.requestPointerLock || r.mozRequestPointerLock || r.webkitRequestPointerLock || r.msRequestPointerLock || function () {}, r.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function () {}, r.exitPointerLock = r.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", o, !1), document.addEventListener("mozpointerlockchange", o, !1), document.addEventListener("webkitpointerlockchange", o, !1), document.addEventListener("mspointerlockchange", o, !1), Module.elementPointerLock && r.addEventListener("click", (function (e) {
                !Browser.pointerLock && Module.canvas.requestPointerLock && (Module.canvas.requestPointerLock(), e.preventDefault())
            }), !1))
        }

        function o() {
            Browser.pointerLock = document.pointerLockElement === Module.canvas || document.mozPointerLockElement === Module.canvas || document.webkitPointerLockElement === Module.canvas || document.msPointerLockElement === Module.canvas
        }
    },
    createContext: function (e, t, r, o) {
        if (t && Module.ctx && e == Module.canvas) return Module.ctx;
        var n, i;
        if (t) {
            var a = {
                antialias: !1,
                alpha: !1,
                majorVersion: 1
            };
            if (o)
                for (var s in o) a[s] = o[s];
            "undefined" != typeof GL && (i = GL.createContext(e, a)) && (n = GL.getContext(i).GLctx)
        } else n = e.getContext("2d");
        return n ? (r && (t || assert("undefined" == typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), Module.ctx = n, t && GL.makeContextCurrent(i), Module.useWebGL = t, Browser.moduleContextCreatedCallbacks.forEach((function (e) {
            e()
        })), Browser.init()), n) : null
    },
    destroyContext: function (e, t, r) {},
    fullscreenHandlersInstalled: !1,
    lockPointer: void 0,
    resizeCanvas: void 0,
    requestFullscreen: function (e, t) {
        Browser.lockPointer = e, Browser.resizeCanvas = t, void 0 === Browser.lockPointer && (Browser.lockPointer = !0), void 0 === Browser.resizeCanvas && (Browser.resizeCanvas = !1);
        var r = Module.canvas;

        function o() {
            Browser.isFullscreen = !1;
            var e = r.parentNode;
            (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e ? (r.exitFullscreen = Browser.exitFullscreen, Browser.lockPointer && r.requestPointerLock(), Browser.isFullscreen = !0, Browser.resizeCanvas ? Browser.setFullscreenCanvasSize() : Browser.updateCanvasDimensions(r)) : (e.parentNode.insertBefore(r, e), e.parentNode.removeChild(e), Browser.resizeCanvas ? Browser.setWindowedCanvasSize() : Browser.updateCanvasDimensions(r)), Module.onFullScreen && Module.onFullScreen(Browser.isFullscreen), Module.onFullscreen && Module.onFullscreen(Browser.isFullscreen)
        }
        Browser.fullscreenHandlersInstalled || (Browser.fullscreenHandlersInstalled = !0, document.addEventListener("fullscreenchange", o, !1), document.addEventListener("mozfullscreenchange", o, !1), document.addEventListener("webkitfullscreenchange", o, !1), document.addEventListener("MSFullscreenChange", o, !1));
        var n = document.createElement("div");
        r.parentNode.insertBefore(n, r), n.appendChild(r), n.requestFullscreen = n.requestFullscreen || n.mozRequestFullScreen || n.msRequestFullscreen || (n.webkitRequestFullscreen ? function () {
            n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        } : null) || (n.webkitRequestFullScreen ? function () {
            n.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
        } : null), n.requestFullscreen()
    },
    requestFullScreen: function () {
        abort("Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)")
    },
    exitFullscreen: function () {
        return !!Browser.isFullscreen && ((document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function () {}).apply(document, []), !0)
    },
    nextRAF: 0,
    fakeRequestAnimationFrame: function (e) {
        var t = Date.now();
        if (0 === Browser.nextRAF) Browser.nextRAF = t + 1e3 / 60;
        else
            for (; t + 2 >= Browser.nextRAF;) Browser.nextRAF += 1e3 / 60;
        var r = Math.max(Browser.nextRAF - t, 0);
        setTimeout(e, r)
    },
    requestAnimationFrame: function (e) {
        "function" != typeof requestAnimationFrame ? (0, Browser.fakeRequestAnimationFrame)(e) : requestAnimationFrame(e)
    },
    safeCallback: function (e) {
        return function () {
            if (!ABORT) return e.apply(null, arguments)
        }
    },
    allowAsyncCallbacks: !0,
    queuedAsyncCallbacks: [],
    pauseAsyncCallbacks: function () {
        Browser.allowAsyncCallbacks = !1
    },
    resumeAsyncCallbacks: function () {
        if (Browser.allowAsyncCallbacks = !0, Browser.queuedAsyncCallbacks.length > 0) {
            var e = Browser.queuedAsyncCallbacks;
            Browser.queuedAsyncCallbacks = [], e.forEach((function (e) {
                e()
            }))
        }
    },
    safeRequestAnimationFrame: function (e) {
        return Browser.requestAnimationFrame((function () {
            ABORT || (Browser.allowAsyncCallbacks ? e() : Browser.queuedAsyncCallbacks.push(e))
        }))
    },
    safeSetTimeout: function (e, t) {
        return noExitRuntime = !0, setTimeout((function () {
            ABORT || (Browser.allowAsyncCallbacks ? e() : Browser.queuedAsyncCallbacks.push(e))
        }), t)
    },
    safeSetInterval: function (e, t) {
        return noExitRuntime = !0, setInterval((function () {
            ABORT || Browser.allowAsyncCallbacks && e()
        }), t)
    },
    getMimetype: function (e) {
        return {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            bmp: "image/bmp",
            ogg: "audio/ogg",
            wav: "audio/wav",
            mp3: "audio/mpeg"
        } [e.substr(e.lastIndexOf(".") + 1)]
    },
    getUserMedia: function (e) {
        window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(e)
    },
    getMovementX: function (e) {
        return e.movementX || e.mozMovementX || e.webkitMovementX || 0
    },
    getMovementY: function (e) {
        return e.movementY || e.mozMovementY || e.webkitMovementY || 0
    },
    getMouseWheelDelta: function (e) {
        var t = 0;
        switch (e.type) {
            case "DOMMouseScroll":
                t = e.detail / 3;
                break;
            case "mousewheel":
                t = e.wheelDelta / 120;
                break;
            case "wheel":
                switch (t = e.deltaY, e.deltaMode) {
                    case 0:
                        t /= 100;
                        break;
                    case 1:
                        t /= 3;
                        break;
                    case 2:
                        t *= 80;
                        break;
                    default:
                        throw "unrecognized mouse wheel delta mode: " + e.deltaMode
                }
                break;
            default:
                throw "unrecognized mouse wheel event: " + e.type
        }
        return t
    },
    mouseX: 0,
    mouseY: 0,
    mouseMovementX: 0,
    mouseMovementY: 0,
    touches: {},
    lastTouches: {},
    calculateMouseEvent: function (e) {
        if (Browser.pointerLock) "mousemove" != e.type && "mozMovementX" in e ? Browser.mouseMovementX = Browser.mouseMovementY = 0 : (Browser.mouseMovementX = Browser.getMovementX(e), Browser.mouseMovementY = Browser.getMovementY(e)), "undefined" != typeof SDL ? (Browser.mouseX = SDL.mouseX + Browser.mouseMovementX, Browser.mouseY = SDL.mouseY + Browser.mouseMovementY) : (Browser.mouseX += Browser.mouseMovementX, Browser.mouseY += Browser.mouseMovementY);
        else {
            var t = Module.canvas.getBoundingClientRect(),
                r = Module.canvas.width,
                o = Module.canvas.height,
                n = void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
                i = void 0 !== window.scrollY ? window.scrollY : window.pageYOffset;
            if (assert(void 0 !== n && void 0 !== i, "Unable to retrieve scroll position, mouse positions likely broken."), "touchstart" === e.type || "touchend" === e.type || "touchmove" === e.type) {
                var a = e.touch;
                if (void 0 === a) return;
                var s = a.pageX - (n + t.left),
                    d = a.pageY - (i + t.top),
                    l = {
                        x: s *= r / t.width,
                        y: d *= o / t.height
                    };
                if ("touchstart" === e.type) Browser.lastTouches[a.identifier] = l, Browser.touches[a.identifier] = l;
                else if ("touchend" === e.type || "touchmove" === e.type) {
                    var c = Browser.touches[a.identifier];
                    c || (c = l), Browser.lastTouches[a.identifier] = c, Browser.touches[a.identifier] = l
                }
                return
            }
            var u = e.pageX - (n + t.left),
                _ = e.pageY - (i + t.top);
            u *= r / t.width, _ *= o / t.height, Browser.mouseMovementX = u - Browser.mouseX, Browser.mouseMovementY = _ - Browser.mouseY, Browser.mouseX = u, Browser.mouseY = _
        }
    },
    asyncLoad: function (e, t, r, o) {
        var n = o ? "" : getUniqueRunDependency("al " + e);
        readAsync(e, (function (r) {
            assert(r, 'Loading data file "' + e + '" failed (no arrayBuffer).'), t(new Uint8Array(r)), n && removeRunDependency(n)
        }), (function (t) {
            if (!r) throw 'Loading data file "' + e + '" failed.';
            r()
        })), n && addRunDependency(n)
    },
    resizeListeners: [],
    updateResizeListeners: function () {
        var e = Module.canvas;
        Browser.resizeListeners.forEach((function (t) {
            t(e.width, e.height)
        }))
    },
    setCanvasSize: function (e, t, r) {
        var o = Module.canvas;
        Browser.updateCanvasDimensions(o, e, t), r || Browser.updateResizeListeners()
    },
    windowedWidth: 0,
    windowedHeight: 0,
    setFullscreenCanvasSize: function () {
        if ("undefined" != typeof SDL) {
            var e = HEAPU32[SDL.screen >> 2];
            e |= 8388608, HEAP32[SDL.screen >> 2] = e
        }
        Browser.updateCanvasDimensions(Module.canvas), Browser.updateResizeListeners()
    },
    setWindowedCanvasSize: function () {
        if ("undefined" != typeof SDL) {
            var e = HEAPU32[SDL.screen >> 2];
            e &= -8388609, HEAP32[SDL.screen >> 2] = e
        }
        Browser.updateCanvasDimensions(Module.canvas), Browser.updateResizeListeners()
    },
    updateCanvasDimensions: function (e, t, r) {
        t && r ? (e.widthNative = t, e.heightNative = r) : (t = e.widthNative, r = e.heightNative);
        var o = t,
            n = r;
        if (Module.forcedAspectRatio && Module.forcedAspectRatio > 0 && (o / n < Module.forcedAspectRatio ? o = Math.round(n * Module.forcedAspectRatio) : n = Math.round(o / Module.forcedAspectRatio)), (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e.parentNode && "undefined" != typeof screen) {
            var i = Math.min(screen.width / o, screen.height / n);
            o = Math.round(o * i), n = Math.round(n * i)
        }
        Browser.resizeCanvas ? (e.width != o && (e.width = o), e.height != n && (e.height = n), void 0 !== e.style && (e.style.removeProperty("width"), e.style.removeProperty("height"))) : (e.width != t && (e.width = t), e.height != r && (e.height = r), void 0 !== e.style && (o != t || n != r ? (e.style.setProperty("width", o + "px", "important"), e.style.setProperty("height", n + "px", "important")) : (e.style.removeProperty("width"), e.style.removeProperty("height"))))
    },
    wgetRequests: {},
    nextWgetRequestHandle: 0,
    getNextWgetRequestHandle: function () {
        var e = Browser.nextWgetRequestHandle;
        return Browser.nextWgetRequestHandle++, e
    }
};

function _emscripten_worker_respond(e, t) {
    if (workerResponded) throw "already responded with final response!";
    workerResponded = !0;
    var r = {
        callbackId: workerCallbackId,
        finalResponse: !0,
        data: e ? new Uint8Array(HEAPU8.subarray(e, e + t)) : 0
    };
    e ? postMessage(r, [r.data.buffer]) : postMessage(r)
}

function _emscripten_worker_respond_provisionally(e, t) {
    if (workerResponded) throw "already responded with final response!";
    var r = {
        callbackId: workerCallbackId,
        finalResponse: !1,
        data: e ? new Uint8Array(HEAPU8.subarray(e, e + t)) : 0
    };
    e ? postMessage(r, [r.data.buffer]) : postMessage(r)
}
Module.Browser = Browser, Module._emscripten_worker_respond = _emscripten_worker_respond, Module._emscripten_worker_respond_provisionally = _emscripten_worker_respond_provisionally;
var ENV = {};

function __getExecutableName() {
    return thisProgram || "./this.program"
}

function getEnvStrings() {
    if (!getEnvStrings.strings) {
        var e = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
            _: __getExecutableName()
        };
        for (var t in ENV) e[t] = ENV[t];
        var r = [];
        for (var t in e) r.push(t + "=" + e[t]);
        getEnvStrings.strings = r
    }
    return getEnvStrings.strings
}

function _environ_get(e, t) {
    var r = 0;
    return getEnvStrings().forEach((function (o, n) {
        var i = t + r;
        HEAP32[e + 4 * n >> 2] = i, writeAsciiToMemory(o, i), r += o.length + 1
    })), 0
}

function _environ_sizes_get(e, t) {
    var r = getEnvStrings();
    HEAP32[e >> 2] = r.length;
    var o = 0;
    return r.forEach((function (e) {
        o += e.length + 1
    })), HEAP32[t >> 2] = o, 0
}

function _fd_close(e) {
    try {
        var t = SYSCALLS.getStreamFromFD(e);
        return FS.close(t), 0
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
    }
}

function _fd_read(e, t, r, o) {
    try {
        var n = SYSCALLS.getStreamFromFD(e),
            i = SYSCALLS.doReadv(n, t, r);
        return HEAP32[o >> 2] = i, 0
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
    }
}

function _fd_seek(e, t, r, o, n) {
    try {
        var i = SYSCALLS.getStreamFromFD(e),
            a = 4294967296 * r + (t >>> 0),
            s = 9007199254740992;
        return a <= -s || a >= s ? -61 : (FS.llseek(i, a, o), tempI64 = [i.position >>> 0, (tempDouble = i.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[n >> 2] = tempI64[0], HEAP32[n + 4 >> 2] = tempI64[1], i.getdents && 0 === a && 0 === o && (i.getdents = null), 0)
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
    }
}

function _fd_write(e, t, r, o) {
    try {
        var n = SYSCALLS.getStreamFromFD(e),
            i = SYSCALLS.doWritev(n, t, r);
        return HEAP32[o >> 2] = i, 0
    } catch (e) {
        return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
    }
}

function _getTempRet0() {
    return 0 | getTempRet0()
}

function _llvm_eh_typeid_for(e) {
    return e
}

function _round(e) {
    return (e = +e) >= 0 ? +Math_floor(e + .5) : +Math_ceil(e - .5)
}

function _roundf(e) {
    return (e = +e) >= 0 ? +Math_floor(e + .5) : +Math_ceil(e - .5)
}

function _setTempRet0(e) {
    setTempRet0(0 | e)
}
Module.ENV = ENV, Module.__getExecutableName = __getExecutableName, Module.getEnvStrings = getEnvStrings, Module._environ_get = _environ_get, Module._environ_sizes_get = _environ_sizes_get, Module._fd_close = _fd_close, Module._fd_read = _fd_read, Module._fd_seek = _fd_seek, Module._fd_write = _fd_write, Module._getTempRet0 = _getTempRet0, Module._llvm_eh_typeid_for = _llvm_eh_typeid_for, Module._round = _round, Module._roundf = _roundf, Module._setTempRet0 = _setTempRet0;
var FSNode = function (e, t, r, o) {
        e || (e = this), this.parent = e, this.mount = e.mount, this.mounted = null, this.id = FS.nextInode++, this.name = t, this.mode = r, this.node_ops = {}, this.stream_ops = {}, this.rdev = o
    },
    readMode = 365,
    writeMode = 146;
Object.defineProperties(FSNode.prototype, {
    read: {
        get: function () {
            return (this.mode & readMode) === readMode
        },
        set: function (e) {
            e ? this.mode |= readMode : this.mode &= ~readMode
        }
    },
    write: {
        get: function () {
            return (this.mode & writeMode) === writeMode
        },
        set: function (e) {
            e ? this.mode |= writeMode : this.mode &= ~writeMode
        }
    },
    isFolder: {
        get: function () {
            return FS.isDir(this.mode)
        }
    },
    isDevice: {
        get: function () {
            return FS.isChrdev(this.mode)
        }
    }
}), FS.FSNode = FSNode, FS.staticInit(), embind_init_charCodes(), BindingError = Module.BindingError = extendError(Error, "BindingError"), InternalError = Module.InternalError = extendError(Error, "InternalError"), init_emval(), UnboundTypeError = Module.UnboundTypeError = extendError(Error, "UnboundTypeError"), Module.requestFullscreen = function (e, t) {
    Browser.requestFullscreen(e, t)
}, Module.requestFullScreen = function () {
    Browser.requestFullScreen()
}, Module.requestAnimationFrame = function (e) {
    Browser.requestAnimationFrame(e)
}, Module.setCanvasSize = function (e, t, r) {
    Browser.setCanvasSize(e, t, r)
}, Module.pauseMainLoop = function () {
    Browser.mainLoop.pause()
}, Module.resumeMainLoop = function () {
    Browser.mainLoop.resume()
}, Module.getUserMedia = function () {
    Browser.getUserMedia()
}, Module.createContext = function (e, t, r, o) {
    return Browser.createContext(e, t, r, o)
};
var ASSERTIONS = !0;

function intArrayFromString(e, t, r) {
    var o = r > 0 ? r : lengthBytesUTF8(e) + 1,
        n = new Array(o),
        i = stringToUTF8Array(e, n, 0, n.length);
    return t && (n.length = i), n
}

function intArrayToString(e) {
    for (var t = [], r = 0; r < e.length; r++) {
        var o = e[r];
        o > 255 && (ASSERTIONS && assert(!1, "Character code " + o + " (" + String.fromCharCode(o) + ")  at offset " + r + " not in 0x00-0xFF."), o &= 255), t.push(String.fromCharCode(o))
    }
    return t.join("")
}
var calledRun, asmGlobalArg = {},
    asmLibraryArg = {
        __assert_fail: ___assert_fail,
        __cxa_allocate_exception: ___cxa_allocate_exception,
        __cxa_atexit: ___cxa_atexit,
        __cxa_begin_catch: ___cxa_begin_catch,
        __cxa_end_catch: ___cxa_end_catch,
        __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
        __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
        __cxa_find_matching_catch_4: ___cxa_find_matching_catch_4,
        __cxa_free_exception: ___cxa_free_exception,
        __cxa_throw: ___cxa_throw,
        __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
        __handle_stack_overflow: ___handle_stack_overflow,
        __resumeException: ___resumeException,
        __sys_fcntl64: ___sys_fcntl64,
        __sys_ioctl: ___sys_ioctl,
        __sys_open: ___sys_open,
        _embind_register_bool: __embind_register_bool,
        _embind_register_emval: __embind_register_emval,
        _embind_register_float: __embind_register_float,
        _embind_register_function: __embind_register_function,
        _embind_register_integer: __embind_register_integer,
        _embind_register_memory_view: __embind_register_memory_view,
        _embind_register_std_string: __embind_register_std_string,
        _embind_register_std_wstring: __embind_register_std_wstring,
        _embind_register_void: __embind_register_void,
        _emval_decref: __emval_decref,
        _emval_incref: __emval_incref,
        _emval_take_value: __emval_take_value,
        abs: _abs,
        call_validate: call_validate,
        clock: _clock,
        emscripten_get_sbrk_ptr: _emscripten_get_sbrk_ptr,
        emscripten_memcpy_big: _emscripten_memcpy_big,
        emscripten_resize_heap: _emscripten_resize_heap,
        emscripten_worker_respond: _emscripten_worker_respond,
        emscripten_worker_respond_provisionally: _emscripten_worker_respond_provisionally,
        environ_get: _environ_get,
        environ_sizes_get: _environ_sizes_get,
        fd_close: _fd_close,
        fd_read: _fd_read,
        fd_seek: _fd_seek,
        fd_write: _fd_write,
        getTempRet0: _getTempRet0,
        invoke_fi: invoke_fi,
        invoke_fifffiii: invoke_fifffiii,
        invoke_fifiif: invoke_fifiif,
        invoke_fii: invoke_fii,
        invoke_fiif: invoke_fiif,
        invoke_fiii: invoke_fiii,
        invoke_fiiif: invoke_fiiif,
        invoke_fiiii: invoke_fiiii,
        invoke_fiiiif: invoke_fiiiif,
        invoke_fiiiiiii: invoke_fiiiiiii,
        invoke_i: invoke_i,
        invoke_id: invoke_id,
        invoke_if: invoke_if,
        invoke_ii: invoke_ii,
        invoke_iid: invoke_iid,
        invoke_iif: invoke_iif,
        invoke_iiffff: invoke_iiffff,
        invoke_iii: invoke_iii,
        invoke_iiif: invoke_iiif,
        invoke_iiiff: invoke_iiiff,
        invoke_iiifi: invoke_iiifi,
        invoke_iiii: invoke_iiii,
        invoke_iiiidi: invoke_iiiidi,
        invoke_iiiii: invoke_iiiii,
        invoke_iiiiiff: invoke_iiiiiff,
        invoke_iiiiifi: invoke_iiiiifi,
        invoke_iiiiii: invoke_iiiiii,
        invoke_iiiiiif: invoke_iiiiiif,
        invoke_iiiiiiffi: invoke_iiiiiiffi,
        invoke_iiiiiii: invoke_iiiiiii,
        invoke_iiiiiiif: invoke_iiiiiiif,
        invoke_iiiiiiii: invoke_iiiiiiii,
        invoke_iiiiiiiiii: invoke_iiiiiiiiii,
        invoke_iiiiiiiiiiiii: invoke_iiiiiiiiiiiii,
        invoke_v: invoke_v,
        invoke_vi: invoke_vi,
        invoke_vidi: invoke_vidi,
        invoke_vif: invoke_vif,
        invoke_vifi: invoke_vifi,
        invoke_vii: invoke_vii,
        invoke_viid: invoke_viid,
        invoke_viididii: invoke_viididii,
        invoke_viif: invoke_viif,
        invoke_viii: invoke_viii,
        invoke_viiifi: invoke_viiifi,
        invoke_viiii: invoke_viiii,
        invoke_viiiii: invoke_viiiii,
        invoke_viiiiiffii: invoke_viiiiiffii,
        invoke_viiiiii: invoke_viiiiii,
        invoke_viiiiiii: invoke_viiiiiii,
        invoke_viiiiiiiii: invoke_viiiiiiiii,
        invoke_viiiiiiiiiii: invoke_viiiiiiiiiii,
        llvm_eh_typeid_for: _llvm_eh_typeid_for,
        memory: wasmMemory,
        round: _round,
        roundf: _roundf,
        setTempRet0: _setTempRet0,
        table: wasmTable
    },
    asm = createWasm(),
    ___wasm_call_ctors = Module.___wasm_call_ctors = createExportWrapper("__wasm_call_ctors"),
    _setWidthCrop = Module._setWidthCrop = createExportWrapper("setWidthCrop"),
    _setHeightCrop = Module._setHeightCrop = createExportWrapper("setHeightCrop"),
    _setWidthDetect = Module._setWidthDetect = createExportWrapper("setWidthDetect"),
    _setHeightDetect = Module._setHeightDetect = createExportWrapper("setHeightDetect"),
    _release = Module._release = createExportWrapper("release"),
    _setToken = Module._setToken = createExportWrapper("setToken"),
    _setOauthToken = Module._setOauthToken = createExportWrapper("setOauthToken"),
    _setEndpoint = Module._setEndpoint = createExportWrapper("setEndpoint"),
    _getToken = Module._getToken = createExportWrapper("getToken"),
    _getOauthToken = Module._getOauthToken = createExportWrapper("getOauthToken"),
    _getEndpoint = Module._getEndpoint = createExportWrapper("getEndpoint"),
    _sdvcvzdsvdsdfff344344514sdf = Module._sdvcvzdsvdsdfff344344514sdf = createExportWrapper("sdvcvzdsvdsdfff344344514sdf"),
    _getBytes = Module._getBytes = createExportWrapper("getBytes"),
    _setIncludeSharpness = Module._setIncludeSharpness = createExportWrapper("setIncludeSharpness"),
    _setIncludeGlare = Module._setIncludeGlare = createExportWrapper("setIncludeGlare"),
    _acuantDetect = Module._acuantDetect = createExportWrapper("acuantDetect"),
    _acuantCrop = Module._acuantCrop = createExportWrapper("acuantCrop"),
    _validateSDK = Module._validateSDK = createExportWrapper("validateSDK"),
    _validateSDKWithToken = Module._validateSDKWithToken = createExportWrapper("validateSDKWithToken"),
    _malloc = Module._malloc = createExportWrapper("malloc"),
    _free = Module._free = createExportWrapper("free"),
    _fflush = Module._fflush = createExportWrapper("fflush"),
    ___getTypeName = Module.___getTypeName = createExportWrapper("__getTypeName"),
    ___embind_register_native_and_builtin_types = Module.___embind_register_native_and_builtin_types = createExportWrapper("__embind_register_native_and_builtin_types"),
    ___errno_location = Module.___errno_location = createExportWrapper("__errno_location"),
    _setThrew = Module._setThrew = createExportWrapper("setThrew"),
    stackSave = Module.stackSave = createExportWrapper("stackSave"),
    stackRestore = Module.stackRestore = createExportWrapper("stackRestore"),
    stackAlloc = Module.stackAlloc = createExportWrapper("stackAlloc"),
    __ZSt18uncaught_exceptionv = Module.__ZSt18uncaught_exceptionv = createExportWrapper("_ZSt18uncaught_exceptionv"),
    ___cxa_can_catch = Module.___cxa_can_catch = createExportWrapper("__cxa_can_catch"),
    ___cxa_is_pointer_type = Module.___cxa_is_pointer_type = createExportWrapper("__cxa_is_pointer_type"),
    dynCall_v = Module.dynCall_v = createExportWrapper("dynCall_v"),
    dynCall_vi = Module.dynCall_vi = createExportWrapper("dynCall_vi"),
    dynCall_vii = Module.dynCall_vii = createExportWrapper("dynCall_vii"),
    dynCall_viii = Module.dynCall_viii = createExportWrapper("dynCall_viii"),
    dynCall_viiii = Module.dynCall_viiii = createExportWrapper("dynCall_viiii"),
    dynCall_viiiii = Module.dynCall_viiiii = createExportWrapper("dynCall_viiiii"),
    dynCall_viiiiii = Module.dynCall_viiiiii = createExportWrapper("dynCall_viiiiii"),
    dynCall_viiiiiii = Module.dynCall_viiiiiii = createExportWrapper("dynCall_viiiiiii"),
    dynCall_viiiiiiiii = Module.dynCall_viiiiiiiii = createExportWrapper("dynCall_viiiiiiiii"),
    dynCall_viiiiiiiiiii = Module.dynCall_viiiiiiiiiii = createExportWrapper("dynCall_viiiiiiiiiii"),
    dynCall_viiiiiffii = Module.dynCall_viiiiiffii = createExportWrapper("dynCall_viiiiiffii"),
    dynCall_viiifi = Module.dynCall_viiifi = createExportWrapper("dynCall_viiifi"),
    dynCall_viif = Module.dynCall_viif = createExportWrapper("dynCall_viif"),
    dynCall_viid = Module.dynCall_viid = createExportWrapper("dynCall_viid"),
    dynCall_viididii = Module.dynCall_viididii = createExportWrapper("dynCall_viididii"),
    dynCall_vif = Module.dynCall_vif = createExportWrapper("dynCall_vif"),
    dynCall_vifi = Module.dynCall_vifi = createExportWrapper("dynCall_vifi"),
    dynCall_vidi = Module.dynCall_vidi = createExportWrapper("dynCall_vidi"),
    dynCall_i = Module.dynCall_i = createExportWrapper("dynCall_i"),
    dynCall_ii = Module.dynCall_ii = createExportWrapper("dynCall_ii"),
    dynCall_iii = Module.dynCall_iii = createExportWrapper("dynCall_iii"),
    dynCall_iiii = Module.dynCall_iiii = createExportWrapper("dynCall_iiii"),
    dynCall_iiiii = Module.dynCall_iiiii = createExportWrapper("dynCall_iiiii"),
    dynCall_iiiiii = Module.dynCall_iiiiii = createExportWrapper("dynCall_iiiiii"),
    dynCall_iiiiiii = Module.dynCall_iiiiiii = createExportWrapper("dynCall_iiiiiii"),
    dynCall_iiiiiiii = Module.dynCall_iiiiiiii = createExportWrapper("dynCall_iiiiiiii"),
    dynCall_iiiiiiiiii = Module.dynCall_iiiiiiiiii = createExportWrapper("dynCall_iiiiiiiiii"),
    dynCall_iiiiiiiiiiiii = Module.dynCall_iiiiiiiiiiiii = createExportWrapper("dynCall_iiiiiiiiiiiii"),
    dynCall_iiiiiiif = Module.dynCall_iiiiiiif = createExportWrapper("dynCall_iiiiiiif"),
    dynCall_iiiiiif = Module.dynCall_iiiiiif = createExportWrapper("dynCall_iiiiiif"),
    dynCall_iiiiiiffi = Module.dynCall_iiiiiiffi = createExportWrapper("dynCall_iiiiiiffi"),
    dynCall_iiiiifi = Module.dynCall_iiiiifi = createExportWrapper("dynCall_iiiiifi"),
    dynCall_iiiiiff = Module.dynCall_iiiiiff = createExportWrapper("dynCall_iiiiiff"),
    dynCall_iiiidi = Module.dynCall_iiiidi = createExportWrapper("dynCall_iiiidi"),
    dynCall_iiif = Module.dynCall_iiif = createExportWrapper("dynCall_iiif"),
    dynCall_iiifi = Module.dynCall_iiifi = createExportWrapper("dynCall_iiifi"),
    dynCall_iiiff = Module.dynCall_iiiff = createExportWrapper("dynCall_iiiff"),
    dynCall_iif = Module.dynCall_iif = createExportWrapper("dynCall_iif"),
    dynCall_iiffff = Module.dynCall_iiffff = createExportWrapper("dynCall_iiffff"),
    dynCall_iid = Module.dynCall_iid = createExportWrapper("dynCall_iid"),
    dynCall_if = Module.dynCall_if = createExportWrapper("dynCall_if"),
    dynCall_id = Module.dynCall_id = createExportWrapper("dynCall_id"),
    dynCall_fi = Module.dynCall_fi = createExportWrapper("dynCall_fi"),
    dynCall_fii = Module.dynCall_fii = createExportWrapper("dynCall_fii"),
    dynCall_fiii = Module.dynCall_fiii = createExportWrapper("dynCall_fiii"),
    dynCall_fiiii = Module.dynCall_fiiii = createExportWrapper("dynCall_fiiii"),
    dynCall_fiiiiiii = Module.dynCall_fiiiiiii = createExportWrapper("dynCall_fiiiiiii"),
    dynCall_fiiiif = Module.dynCall_fiiiif = createExportWrapper("dynCall_fiiiif"),
    dynCall_fiiif = Module.dynCall_fiiif = createExportWrapper("dynCall_fiiif"),
    dynCall_fiif = Module.dynCall_fiif = createExportWrapper("dynCall_fiif"),
    dynCall_fifiif = Module.dynCall_fifiif = createExportWrapper("dynCall_fifiif"),
    dynCall_fifffiii = Module.dynCall_fifffiii = createExportWrapper("dynCall_fifffiii"),
    ___set_stack_limit = Module.___set_stack_limit = createExportWrapper("__set_stack_limit"),
    __growWasmMemory = Module.__growWasmMemory = createExportWrapper("__growWasmMemory"),
    dynCall_di = Module.dynCall_di = createExportWrapper("dynCall_di"),
    dynCall_diii = Module.dynCall_diii = createExportWrapper("dynCall_diii"),
    dynCall_viiiiffi = Module.dynCall_viiiiffi = createExportWrapper("dynCall_viiiiffi"),
    dynCall_jiji = Module.dynCall_jiji = createExportWrapper("dynCall_jiji"),
    dynCall_iidiiii = Module.dynCall_iidiiii = createExportWrapper("dynCall_iidiiii");

function invoke_iiii(e, t, r, o) {
    var n = stackSave();
    try {
        return dynCall_iiii(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iii(e, t, r) {
    var o = stackSave();
    try {
        return dynCall_iii(e, t, r)
    } catch (e) {
        if (stackRestore(o), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_vii(e, t, r) {
    var o = stackSave();
    try {
        dynCall_vii(e, t, r)
    } catch (e) {
        if (stackRestore(o), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_vif(e, t, r) {
    var o = stackSave();
    try {
        dynCall_vif(e, t, r)
    } catch (e) {
        if (stackRestore(o), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_i(e) {
    var t = stackSave();
    try {
        return dynCall_i(e)
    } catch (e) {
        if (stackRestore(t), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_ii(e, t) {
    var r = stackSave();
    try {
        return dynCall_ii(e, t)
    } catch (e) {
        if (stackRestore(r), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_vi(e, t) {
    var r = stackSave();
    try {
        dynCall_vi(e, t)
    } catch (e) {
        if (stackRestore(r), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiii(e, t, r, o, n) {
    var i = stackSave();
    try {
        dynCall_viiii(e, t, r, o, n)
    } catch (e) {
        if (stackRestore(i), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiii(e, t, r, o, n) {
    var i = stackSave();
    try {
        return dynCall_iiiii(e, t, r, o, n)
    } catch (e) {
        if (stackRestore(i), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iid(e, t, r) {
    var o = stackSave();
    try {
        return dynCall_iid(e, t, r)
    } catch (e) {
        if (stackRestore(o), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_if(e, t) {
    var r = stackSave();
    try {
        return dynCall_if(e, t)
    } catch (e) {
        if (stackRestore(r), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiiii(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        dynCall_viiiii(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiii(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        return dynCall_iiiiii(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viii(e, t, r, o) {
    var n = stackSave();
    try {
        dynCall_viii(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiiif(e, t, r, o, n, i, a, s) {
    var d = stackSave();
    try {
        return dynCall_iiiiiiif(e, t, r, o, n, i, a, s)
    } catch (e) {
        if (stackRestore(d), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_v(e) {
    var t = stackSave();
    try {
        dynCall_v(e)
    } catch (e) {
        if (stackRestore(t), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viid(e, t, r, o) {
    var n = stackSave();
    try {
        dynCall_viid(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiii(e, t, r, o, n, i, a) {
    var s = stackSave();
    try {
        return dynCall_iiiiiii(e, t, r, o, n, i, a)
    } catch (e) {
        if (stackRestore(s), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiiii(e, t, r, o, n, i, a, s) {
    var d = stackSave();
    try {
        return dynCall_iiiiiiii(e, t, r, o, n, i, a, s)
    } catch (e) {
        if (stackRestore(d), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_vidi(e, t, r, o) {
    var n = stackSave();
    try {
        dynCall_vidi(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiiiiiiii(e, t, r, o, n, i, a, s, d, l) {
    var c = stackSave();
    try {
        dynCall_viiiiiiiii(e, t, r, o, n, i, a, s, d, l)
    } catch (e) {
        if (stackRestore(c), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiifi(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        dynCall_viiifi(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiiiii(e, t, r, o, n, i, a) {
    var s = stackSave();
    try {
        dynCall_viiiiii(e, t, r, o, n, i, a)
    } catch (e) {
        if (stackRestore(s), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fi(e, t) {
    var r = stackSave();
    try {
        return dynCall_fi(e, t)
    } catch (e) {
        if (stackRestore(r), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiiiiii(e, t, r, o, n, i, a, s) {
    var d = stackSave();
    try {
        dynCall_viiiiiii(e, t, r, o, n, i, a, s)
    } catch (e) {
        if (stackRestore(d), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fiiiiiii(e, t, r, o, n, i, a, s) {
    var d = stackSave();
    try {
        return dynCall_fiiiiiii(e, t, r, o, n, i, a, s)
    } catch (e) {
        if (stackRestore(d), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiiiiii(e, t, r, o, n, i, a, s, d, l) {
    var c = stackSave();
    try {
        return dynCall_iiiiiiiiii(e, t, r, o, n, i, a, s, d, l)
    } catch (e) {
        if (stackRestore(c), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiifi(e, t, r, o, n) {
    var i = stackSave();
    try {
        return dynCall_iiifi(e, t, r, o, n)
    } catch (e) {
        if (stackRestore(i), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiffff(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        return dynCall_iiffff(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiff(e, t, r, o, n, i, a) {
    var s = stackSave();
    try {
        return dynCall_iiiiiff(e, t, r, o, n, i, a)
    } catch (e) {
        if (stackRestore(s), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiif(e, t, r, o, n, i, a) {
    var s = stackSave();
    try {
        return dynCall_iiiiiif(e, t, r, o, n, i, a)
    } catch (e) {
        if (stackRestore(s), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiiiiiiiii(e, t, r, o, n, i, a, s, d, l, c, u, _) {
    var p = stackSave();
    try {
        return dynCall_iiiiiiiiiiiii(e, t, r, o, n, i, a, s, d, l, c, u, _)
    } catch (e) {
        if (stackRestore(p), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiif(e, t, r, o) {
    var n = stackSave();
    try {
        return dynCall_iiif(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fifiif(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        return dynCall_fifiif(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fifffiii(e, t, r, o, n, i, a, s) {
    var d = stackSave();
    try {
        return dynCall_fifffiii(e, t, r, o, n, i, a, s)
    } catch (e) {
        if (stackRestore(d), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fii(e, t, r) {
    var o = stackSave();
    try {
        return dynCall_fii(e, t, r)
    } catch (e) {
        if (stackRestore(o), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iif(e, t, r) {
    var o = stackSave();
    try {
        return dynCall_iif(e, t, r)
    } catch (e) {
        if (stackRestore(o), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiff(e, t, r, o, n) {
    var i = stackSave();
    try {
        return dynCall_iiiff(e, t, r, o, n)
    } catch (e) {
        if (stackRestore(i), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fiii(e, t, r, o) {
    var n = stackSave();
    try {
        return dynCall_fiii(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fiif(e, t, r, o) {
    var n = stackSave();
    try {
        return dynCall_fiif(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fiiii(e, t, r, o, n) {
    var i = stackSave();
    try {
        return dynCall_fiiii(e, t, r, o, n)
    } catch (e) {
        if (stackRestore(i), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fiiif(e, t, r, o, n) {
    var i = stackSave();
    try {
        return dynCall_fiiif(e, t, r, o, n)
    } catch (e) {
        if (stackRestore(i), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiiiffi(e, t, r, o, n, i, a, s, d) {
    var l = stackSave();
    try {
        return dynCall_iiiiiiffi(e, t, r, o, n, i, a, s, d)
    } catch (e) {
        if (stackRestore(l), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiiiiffii(e, t, r, o, n, i, a, s, d, l) {
    var c = stackSave();
    try {
        dynCall_viiiiiffii(e, t, r, o, n, i, a, s, d, l)
    } catch (e) {
        if (stackRestore(c), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiiifi(e, t, r, o, n, i, a) {
    var s = stackSave();
    try {
        return dynCall_iiiiifi(e, t, r, o, n, i, a)
    } catch (e) {
        if (stackRestore(s), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_fiiiif(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        return dynCall_fiiiif(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viif(e, t, r, o) {
    var n = stackSave();
    try {
        dynCall_viif(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_vifi(e, t, r, o) {
    var n = stackSave();
    try {
        dynCall_vifi(e, t, r, o)
    } catch (e) {
        if (stackRestore(n), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_id(e, t) {
    var r = stackSave();
    try {
        return dynCall_id(e, t)
    } catch (e) {
        if (stackRestore(r), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viididii(e, t, r, o, n, i, a, s) {
    var d = stackSave();
    try {
        dynCall_viididii(e, t, r, o, n, i, a, s)
    } catch (e) {
        if (stackRestore(d), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_iiiidi(e, t, r, o, n, i) {
    var a = stackSave();
    try {
        return dynCall_iiiidi(e, t, r, o, n, i)
    } catch (e) {
        if (stackRestore(a), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function invoke_viiiiiiiiiii(e, t, r, o, n, i, a, s, d, l, c, u) {
    var _ = stackSave();
    try {
        dynCall_viiiiiiiiiii(e, t, r, o, n, i, a, s, d, l, c, u)
    } catch (e) {
        if (stackRestore(_), e !== e + 0 && "longjmp" !== e) throw e;
        _setThrew(1, 0)
    }
}

function ExitStatus(e) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
}
Object.getOwnPropertyDescriptor(Module, "intArrayFromString") || (Module.intArrayFromString = function () {
    abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "intArrayToString") || (Module.intArrayToString = function () {
    abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ccall") || (Module.ccall = function () {
    abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "cwrap") || (Module.cwrap = function () {
    abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "setValue") || (Module.setValue = function () {
    abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getValue") || (Module.getValue = function () {
    abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "allocate") || (Module.allocate = function () {
    abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getMemory") || (Module.getMemory = function () {
    abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString") || (Module.UTF8ArrayToString = function () {
    abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "UTF8ToString") || (Module.UTF8ToString = function () {
    abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array") || (Module.stringToUTF8Array = function () {
    abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stringToUTF8") || (Module.stringToUTF8 = function () {
    abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8") || (Module.lengthBytesUTF8 = function () {
    abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stackTrace") || (Module.stackTrace = function () {
    abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addOnPreRun") || (Module.addOnPreRun = function () {
    abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addOnInit") || (Module.addOnInit = function () {
    abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addOnPreMain") || (Module.addOnPreMain = function () {
    abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addOnExit") || (Module.addOnExit = function () {
    abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addOnPostRun") || (Module.addOnPostRun = function () {
    abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeStringToMemory") || (Module.writeStringToMemory = function () {
    abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory") || (Module.writeArrayToMemory = function () {
    abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory") || (Module.writeAsciiToMemory = function () {
    abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addRunDependency") || (Module.addRunDependency = function () {
    abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "removeRunDependency") || (Module.removeRunDependency = function () {
    abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createFolder") || (Module.FS_createFolder = function () {
    abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createPath") || (Module.FS_createPath = function () {
    abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createDataFile") || (Module.FS_createDataFile = function () {
    abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile") || (Module.FS_createPreloadedFile = function () {
    abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile") || (Module.FS_createLazyFile = function () {
    abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createLink") || (Module.FS_createLink = function () {
    abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_createDevice") || (Module.FS_createDevice = function () {
    abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "FS_unlink") || (Module.FS_unlink = function () {
    abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
}), Object.getOwnPropertyDescriptor(Module, "dynamicAlloc") || (Module.dynamicAlloc = function () {
    abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary") || (Module.loadDynamicLibrary = function () {
    abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule") || (Module.loadWebAssemblyModule = function () {
    abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getLEB") || (Module.getLEB = function () {
    abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getFunctionTables") || (Module.getFunctionTables = function () {
    abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "alignFunctionTables") || (Module.alignFunctionTables = function () {
    abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "registerFunctions") || (Module.registerFunctions = function () {
    abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "addFunction") || (Module.addFunction = function () {
    abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "removeFunction") || (Module.removeFunction = function () {
    abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getFuncWrapper") || (Module.getFuncWrapper = function () {
    abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "prettyPrint") || (Module.prettyPrint = function () {
    abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "makeBigInt") || (Module.makeBigInt = function () {
    abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "dynCall") || (Module.dynCall = function () {
    abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getCompilerSetting") || (Module.getCompilerSetting = function () {
    abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "print") || (Module.print = function () {
    abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "printErr") || (Module.printErr = function () {
    abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getTempRet0") || (Module.getTempRet0 = function () {
    abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "setTempRet0") || (Module.setTempRet0 = function () {
    abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "callMain") || (Module.callMain = function () {
    abort("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "abort") || (Module.abort = function () {
    abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8") || (Module.stringToNewUTF8 = function () {
    abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer") || (Module.emscripten_realloc_buffer = function () {
    abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ENV") || (Module.ENV = function () {
    abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES") || (Module.ERRNO_CODES = function () {
    abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES") || (Module.ERRNO_MESSAGES = function () {
    abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "setErrNo") || (Module.setErrNo = function () {
    abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "DNS") || (Module.DNS = function () {
    abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES") || (Module.GAI_ERRNO_MESSAGES = function () {
    abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "Protocols") || (Module.Protocols = function () {
    abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "Sockets") || (Module.Sockets = function () {
    abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE") || (Module.UNWIND_CACHE = function () {
    abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs") || (Module.readAsmConstArgs = function () {
    abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "jstoi_q") || (Module.jstoi_q = function () {
    abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "jstoi_s") || (Module.jstoi_s = function () {
    abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "listenOnce") || (Module.listenOnce = function () {
    abort("'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext") || (Module.autoResumeAudioContext = function () {
    abort("'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "abortStackOverflow") || (Module.abortStackOverflow = function () {
    abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "reallyNegative") || (Module.reallyNegative = function () {
    abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "formatString") || (Module.formatString = function () {
    abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "PATH") || (Module.PATH = function () {
    abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "PATH_FS") || (Module.PATH_FS = function () {
    abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SYSCALLS") || (Module.SYSCALLS = function () {
    abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "syscallMmap2") || (Module.syscallMmap2 = function () {
    abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "syscallMunmap") || (Module.syscallMunmap = function () {
    abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "JSEvents") || (Module.JSEvents = function () {
    abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets") || (Module.specialHTMLTargets = function () {
    abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "demangle") || (Module.demangle = function () {
    abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "demangleAll") || (Module.demangleAll = function () {
    abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "jsStackTrace") || (Module.jsStackTrace = function () {
    abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stackTrace") || (Module.stackTrace = function () {
    abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getEnvStrings") || (Module.getEnvStrings = function () {
    abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "checkWasiClock") || (Module.checkWasiClock = function () {
    abort("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeI53ToI64") || (Module.writeI53ToI64 = function () {
    abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped") || (Module.writeI53ToI64Clamped = function () {
    abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling") || (Module.writeI53ToI64Signaling = function () {
    abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped") || (Module.writeI53ToU64Clamped = function () {
    abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling") || (Module.writeI53ToU64Signaling = function () {
    abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "readI53FromI64") || (Module.readI53FromI64 = function () {
    abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "readI53FromU64") || (Module.readI53FromU64 = function () {
    abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53") || (Module.convertI32PairToI53 = function () {
    abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53") || (Module.convertU32PairToI53 = function () {
    abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "Browser") || (Module.Browser = function () {
    abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "FS") || (Module.FS = function () {
    abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "MEMFS") || (Module.MEMFS = function () {
    abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "TTY") || (Module.TTY = function () {
    abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "PIPEFS") || (Module.PIPEFS = function () {
    abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SOCKFS") || (Module.SOCKFS = function () {
    abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "GL") || (Module.GL = function () {
    abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet") || (Module.emscriptenWebGLGet = function () {
    abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData") || (Module.emscriptenWebGLGetTexPixelData = function () {
    abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform") || (Module.emscriptenWebGLGetUniform = function () {
    abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib") || (Module.emscriptenWebGLGetVertexAttrib = function () {
    abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "writeGLArray") || (Module.writeGLArray = function () {
    abort("'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "AL") || (Module.AL = function () {
    abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SDL_unicode") || (Module.SDL_unicode = function () {
    abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext") || (Module.SDL_ttfContext = function () {
    abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SDL_audio") || (Module.SDL_audio = function () {
    abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SDL") || (Module.SDL = function () {
    abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "SDL_gfx") || (Module.SDL_gfx = function () {
    abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "GLUT") || (Module.GLUT = function () {
    abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "EGL") || (Module.EGL = function () {
    abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "GLFW_Window") || (Module.GLFW_Window = function () {
    abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "GLFW") || (Module.GLFW = function () {
    abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "GLEW") || (Module.GLEW = function () {
    abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "IDBStore") || (Module.IDBStore = function () {
    abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError") || (Module.runAndAbortIfError = function () {
    abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emval_handle_array") || (Module.emval_handle_array = function () {
    abort("'emval_handle_array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emval_free_list") || (Module.emval_free_list = function () {
    abort("'emval_free_list' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emval_symbols") || (Module.emval_symbols = function () {
    abort("'emval_symbols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "init_emval") || (Module.init_emval = function () {
    abort("'init_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "count_emval_handles") || (Module.count_emval_handles = function () {
    abort("'count_emval_handles' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "get_first_emval") || (Module.get_first_emval = function () {
    abort("'get_first_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getStringOrSymbol") || (Module.getStringOrSymbol = function () {
    abort("'getStringOrSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "requireHandle") || (Module.requireHandle = function () {
    abort("'requireHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emval_newers") || (Module.emval_newers = function () {
    abort("'emval_newers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "craftEmvalAllocator") || (Module.craftEmvalAllocator = function () {
    abort("'craftEmvalAllocator' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emval_get_global") || (Module.emval_get_global = function () {
    abort("'emval_get_global' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "emval_methodCallers") || (Module.emval_methodCallers = function () {
    abort("'emval_methodCallers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "InternalError") || (Module.InternalError = function () {
    abort("'InternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "BindingError") || (Module.BindingError = function () {
    abort("'BindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "UnboundTypeError") || (Module.UnboundTypeError = function () {
    abort("'UnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "PureVirtualError") || (Module.PureVirtualError = function () {
    abort("'PureVirtualError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "init_embind") || (Module.init_embind = function () {
    abort("'init_embind' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "throwInternalError") || (Module.throwInternalError = function () {
    abort("'throwInternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "throwBindingError") || (Module.throwBindingError = function () {
    abort("'throwBindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "throwUnboundTypeError") || (Module.throwUnboundTypeError = function () {
    abort("'throwUnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ensureOverloadTable") || (Module.ensureOverloadTable = function () {
    abort("'ensureOverloadTable' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "exposePublicSymbol") || (Module.exposePublicSymbol = function () {
    abort("'exposePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "replacePublicSymbol") || (Module.replacePublicSymbol = function () {
    abort("'replacePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "extendError") || (Module.extendError = function () {
    abort("'extendError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "createNamedFunction") || (Module.createNamedFunction = function () {
    abort("'createNamedFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "registeredInstances") || (Module.registeredInstances = function () {
    abort("'registeredInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getBasestPointer") || (Module.getBasestPointer = function () {
    abort("'getBasestPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "registerInheritedInstance") || (Module.registerInheritedInstance = function () {
    abort("'registerInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "unregisterInheritedInstance") || (Module.unregisterInheritedInstance = function () {
    abort("'unregisterInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getInheritedInstance") || (Module.getInheritedInstance = function () {
    abort("'getInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getInheritedInstanceCount") || (Module.getInheritedInstanceCount = function () {
    abort("'getInheritedInstanceCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getLiveInheritedInstances") || (Module.getLiveInheritedInstances = function () {
    abort("'getLiveInheritedInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "registeredTypes") || (Module.registeredTypes = function () {
    abort("'registeredTypes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "awaitingDependencies") || (Module.awaitingDependencies = function () {
    abort("'awaitingDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "typeDependencies") || (Module.typeDependencies = function () {
    abort("'typeDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "registeredPointers") || (Module.registeredPointers = function () {
    abort("'registeredPointers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "registerType") || (Module.registerType = function () {
    abort("'registerType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "whenDependentTypesAreResolved") || (Module.whenDependentTypesAreResolved = function () {
    abort("'whenDependentTypesAreResolved' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "embind_charCodes") || (Module.embind_charCodes = function () {
    abort("'embind_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "embind_init_charCodes") || (Module.embind_init_charCodes = function () {
    abort("'embind_init_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "readLatin1String") || (Module.readLatin1String = function () {
    abort("'readLatin1String' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getTypeName") || (Module.getTypeName = function () {
    abort("'getTypeName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "heap32VectorToArray") || (Module.heap32VectorToArray = function () {
    abort("'heap32VectorToArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "requireRegisteredType") || (Module.requireRegisteredType = function () {
    abort("'requireRegisteredType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "getShiftFromSize") || (Module.getShiftFromSize = function () {
    abort("'getShiftFromSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "integerReadValueFromPointer") || (Module.integerReadValueFromPointer = function () {
    abort("'integerReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "enumReadValueFromPointer") || (Module.enumReadValueFromPointer = function () {
    abort("'enumReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "floatReadValueFromPointer") || (Module.floatReadValueFromPointer = function () {
    abort("'floatReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "simpleReadValueFromPointer") || (Module.simpleReadValueFromPointer = function () {
    abort("'simpleReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "runDestructors") || (Module.runDestructors = function () {
    abort("'runDestructors' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "new_") || (Module.new_ = function () {
    abort("'new_' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "craftInvokerFunction") || (Module.craftInvokerFunction = function () {
    abort("'craftInvokerFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "embind__requireFunction") || (Module.embind__requireFunction = function () {
    abort("'embind__requireFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "tupleRegistrations") || (Module.tupleRegistrations = function () {
    abort("'tupleRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "structRegistrations") || (Module.structRegistrations = function () {
    abort("'structRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "genericPointerToWireType") || (Module.genericPointerToWireType = function () {
    abort("'genericPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "constNoSmartPtrRawPointerToWireType") || (Module.constNoSmartPtrRawPointerToWireType = function () {
    abort("'constNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "nonConstNoSmartPtrRawPointerToWireType") || (Module.nonConstNoSmartPtrRawPointerToWireType = function () {
    abort("'nonConstNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "init_RegisteredPointer") || (Module.init_RegisteredPointer = function () {
    abort("'init_RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "RegisteredPointer") || (Module.RegisteredPointer = function () {
    abort("'RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_getPointee") || (Module.RegisteredPointer_getPointee = function () {
    abort("'RegisteredPointer_getPointee' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_destructor") || (Module.RegisteredPointer_destructor = function () {
    abort("'RegisteredPointer_destructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_deleteObject") || (Module.RegisteredPointer_deleteObject = function () {
    abort("'RegisteredPointer_deleteObject' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_fromWireType") || (Module.RegisteredPointer_fromWireType = function () {
    abort("'RegisteredPointer_fromWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "runDestructor") || (Module.runDestructor = function () {
    abort("'runDestructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "releaseClassHandle") || (Module.releaseClassHandle = function () {
    abort("'releaseClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "finalizationGroup") || (Module.finalizationGroup = function () {
    abort("'finalizationGroup' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "detachFinalizer_deps") || (Module.detachFinalizer_deps = function () {
    abort("'detachFinalizer_deps' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "detachFinalizer") || (Module.detachFinalizer = function () {
    abort("'detachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "attachFinalizer") || (Module.attachFinalizer = function () {
    abort("'attachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "makeClassHandle") || (Module.makeClassHandle = function () {
    abort("'makeClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "init_ClassHandle") || (Module.init_ClassHandle = function () {
    abort("'init_ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ClassHandle") || (Module.ClassHandle = function () {
    abort("'ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ClassHandle_isAliasOf") || (Module.ClassHandle_isAliasOf = function () {
    abort("'ClassHandle_isAliasOf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "throwInstanceAlreadyDeleted") || (Module.throwInstanceAlreadyDeleted = function () {
    abort("'throwInstanceAlreadyDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ClassHandle_clone") || (Module.ClassHandle_clone = function () {
    abort("'ClassHandle_clone' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ClassHandle_delete") || (Module.ClassHandle_delete = function () {
    abort("'ClassHandle_delete' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "deletionQueue") || (Module.deletionQueue = function () {
    abort("'deletionQueue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ClassHandle_isDeleted") || (Module.ClassHandle_isDeleted = function () {
    abort("'ClassHandle_isDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "ClassHandle_deleteLater") || (Module.ClassHandle_deleteLater = function () {
    abort("'ClassHandle_deleteLater' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "flushPendingDeletes") || (Module.flushPendingDeletes = function () {
    abort("'flushPendingDeletes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "delayFunction") || (Module.delayFunction = function () {
    abort("'delayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "setDelayFunction") || (Module.setDelayFunction = function () {
    abort("'setDelayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "RegisteredClass") || (Module.RegisteredClass = function () {
    abort("'RegisteredClass' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "shallowCopyInternalPointer") || (Module.shallowCopyInternalPointer = function () {
    abort("'shallowCopyInternalPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "downcastPointer") || (Module.downcastPointer = function () {
    abort("'downcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "upcastPointer") || (Module.upcastPointer = function () {
    abort("'upcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "validateThis") || (Module.validateThis = function () {
    abort("'validateThis' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "char_0") || (Module.char_0 = function () {
    abort("'char_0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "char_9") || (Module.char_9 = function () {
    abort("'char_9' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "makeLegalFunctionName") || (Module.makeLegalFunctionName = function () {
    abort("'makeLegalFunctionName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "warnOnce") || (Module.warnOnce = function () {
    abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stackSave") || (Module.stackSave = function () {
    abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stackRestore") || (Module.stackRestore = function () {
    abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stackAlloc") || (Module.stackAlloc = function () {
    abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "AsciiToString") || (Module.AsciiToString = function () {
    abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stringToAscii") || (Module.stringToAscii = function () {
    abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "UTF16ToString") || (Module.UTF16ToString = function () {
    abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stringToUTF16") || (Module.stringToUTF16 = function () {
    abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16") || (Module.lengthBytesUTF16 = function () {
    abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "UTF32ToString") || (Module.UTF32ToString = function () {
    abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "stringToUTF32") || (Module.stringToUTF32 = function () {
    abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32") || (Module.lengthBytesUTF32 = function () {
    abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "allocateUTF8") || (Module.allocateUTF8 = function () {
    abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack") || (Module.allocateUTF8OnStack = function () {
    abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
}), Module.writeStackCookie = writeStackCookie, Module.checkStackCookie = checkStackCookie, Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL") || Object.defineProperty(Module, "ALLOC_NORMAL", {
    configurable: !0,
    get: function () {
        abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
}), Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK") || Object.defineProperty(Module, "ALLOC_STACK", {
    configurable: !0,
    get: function () {
        abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
}), Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC") || Object.defineProperty(Module, "ALLOC_DYNAMIC", {
    configurable: !0,
    get: function () {
        abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
}), Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE") || Object.defineProperty(Module, "ALLOC_NONE", {
    configurable: !0,
    get: function () {
        abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }
});
var calledMain = !1;

function run(e) {
    function t() {
        calledRun || (calledRun = !0, Module.calledRun = !0, ABORT || (initRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), assert(!Module._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), postRun()))
    }
    e = e || arguments_, runDependencies > 0 || (writeStackCookie(), preRun(), runDependencies > 0 || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout((function () {
        setTimeout((function () {
            Module.setStatus("")
        }), 1), t()
    }), 1)) : t(), checkStackCookie()))
}

function checkUnflushedContent() {
    var e = out,
        t = err,
        r = !1;
    out = err = function (e) {
        r = !0
    };
    try {
        var o = Module._fflush;
        o && o(0), ["stdout", "stderr"].forEach((function (e) {
            var t = FS.analyzePath("/dev/" + e);
            if (t) {
                var o = t.object.rdev,
                    n = TTY.ttys[o];
                n && n.output && n.output.length && (r = !0)
            }
        }))
    } catch (e) {}
    out = e, err = t, r && warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.")
}

function exit(e, t) {
    if (checkUnflushedContent(), !t || !noExitRuntime || 0 !== e) {
        if (noExitRuntime) {
            if (!t) err("program exited (with status: " + e + "), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)")
        } else ABORT = !0, EXITSTATUS = e, exitRuntime(), Module.onExit && Module.onExit(e);
        quit_(e, new ExitStatus(e))
    }
}
if (dependenciesFulfilled = function e() {
        calledRun || run(), calledRun || (dependenciesFulfilled = e)
    }, Module.run = run, Module.preInit)
    for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0;) Module.preInit.pop()();
noExitRuntime = !0, run();
var workerResponded = !1,
    workerCallbackId = -1;
! function () {
    var e = null,
        t = 0,
        r = 0;

    function o() {
        if (e && runtimeInitialized) {
            var t = e;
            e = null, t.forEach((function (e) {
                onmessage(e)
            }))
        }
    }

    function n() {
        o(), e && setTimeout(n, 100)
    }
    onmessage = function (i) {
        if (!runtimeInitialized) return e || (e = [], setTimeout(n, 100)), void e.push(i);
        o();
        var a = Module["_" + i.data.funcName];
        if (!a) throw "invalid worker function to call: " + i.data.funcName;
        var s = i.data.data;
        s && (s.byteLength || (s = new Uint8Array(s)), (!t || r < s.length) && (t && _free(t), r = s.length, t = _malloc(s.length)), HEAPU8.set(s, t)), workerResponded = !1, workerCallbackId = i.data.callbackId, s ? a(t, s.length) : a(0, 0)
    }
}();