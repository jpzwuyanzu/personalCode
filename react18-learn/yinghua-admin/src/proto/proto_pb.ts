/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

// var $protobuf = require("protobufjs/minimal");
import $protobuf from 'protobufjs/minimal'

// Common aliases
let $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
let $root: any = $protobuf.roots["default"] || (($protobuf as any).roots["default"] = {});

$root.protocol = (function() {

    /**
     * Namespace protocol.
     * @exports protocol
     * @namespace
     */
    let protocol: any = {};

    protocol.CIMReqProtocol = (function() {

        /**
         * Properties of a CIMReqProtocol.
         * @memberof protocol
         * @interface ICIMReqProtocol
         * @property {string} requestId CIMReqProtocol requestId
         * @property {string} reqMsg CIMReqProtocol reqMsg
         * @property {number} type CIMReqProtocol type
         * @property {string|null} [toUser] CIMReqProtocol toUser
         * @property {number} userType CIMReqProtocol userType
         * @property {number} msgType CIMReqProtocol msgType
         * @property {string} token CIMReqProtocol token
         */

        /**
         * Constructs a new CIMReqProtocol.
         * @memberof protocol
         * @classdesc Represents a CIMReqProtocol.
         * @implements ICIMReqProtocol
         * @constructor
         * @param {protocol.ICIMReqProtocol=} [properties] Properties to set
         */
        function CIMReqProtocol(this: any, properties: any) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CIMReqProtocol requestId.
         * @member {string} requestId
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.requestId = "";

        /**
         * CIMReqProtocol reqMsg.
         * @member {string} reqMsg
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.reqMsg = "";

        /**
         * CIMReqProtocol type.
         * @member {number} type
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.type = 0;

        /**
         * CIMReqProtocol toUser.
         * @member {string} toUser
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.toUser = "";

        /**
         * CIMReqProtocol userType.
         * @member {number} userType
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.userType = 0;

        /**
         * CIMReqProtocol msgType.
         * @member {number} msgType
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.msgType = 0;

        /**
         * CIMReqProtocol token.
         * @member {string} token
         * @memberof protocol.CIMReqProtocol
         * @instance
         */
        CIMReqProtocol.prototype.token = "";

        /**
         * Creates a new CIMReqProtocol instance using the specified properties.
         * @function create
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {protocol.ICIMReqProtocol=} [properties] Properties to set
         * @returns {protocol.CIMReqProtocol} CIMReqProtocol instance
         */
        CIMReqProtocol.create = function create(properties: any) {
            return new CIMReqProtocol(properties);
        };

        /**
         * Encodes the specified CIMReqProtocol message. Does not implicitly {@link protocol.CIMReqProtocol.verify|verify} messages.
         * @function encode
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {protocol.ICIMReqProtocol} message CIMReqProtocol message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CIMReqProtocol.encode = function encode(message: { reqMsg: any; requestId: any; type: any; toUser: null; userType: any; msgType: any; token: any; }, writer: $protobuf.Writer | $protobuf.BufferWriter) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqMsg);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.requestId);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.toUser != null && Object.hasOwnProperty.call(message, "toUser"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.toUser);
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.userType);
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.msgType);
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified CIMReqProtocol message, length delimited. Does not implicitly {@link protocol.CIMReqProtocol.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {protocol.ICIMReqProtocol} message CIMReqProtocol message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CIMReqProtocol.encodeDelimited = function encodeDelimited(message: any, writer: any) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CIMReqProtocol message from the specified reader or buffer.
         * @function decode
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protocol.CIMReqProtocol} CIMReqProtocol
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CIMReqProtocol.decode = function decode(reader: $protobuf.Reader | Uint8Array, length: undefined) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.protocol.CIMReqProtocol();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.requestId = reader.string();
                    break;
                case 1:
                    message.reqMsg = reader.string();
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                case 4:
                    message.toUser = reader.string();
                    break;
                case 5:
                    message.userType = reader.int32();
                    break;
                case 6:
                    message.msgType = reader.int32();
                    break;
                case 7:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("requestId"))
                throw new $util.ProtocolError("missing required 'requestId'", { instance: message });
            if (!message.hasOwnProperty("reqMsg"))
                throw new $util.ProtocolError("missing required 'reqMsg'", { instance: message });
            if (!message.hasOwnProperty("type"))
                throw new $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("userType"))
                throw new $util.ProtocolError("missing required 'userType'", { instance: message });
            if (!message.hasOwnProperty("msgType"))
                throw new $util.ProtocolError("missing required 'msgType'", { instance: message });
            if (!message.hasOwnProperty("token"))
                throw new $util.ProtocolError("missing required 'token'", { instance: message });
            return message;
        };

        /**
         * Decodes a CIMReqProtocol message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protocol.CIMReqProtocol} CIMReqProtocol
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CIMReqProtocol.decodeDelimited = function decodeDelimited(reader: $protobuf.Reader | Uint8Array) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, (reader.uint32() as any));
        };

        /**
         * Verifies a CIMReqProtocol message.
         * @function verify
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CIMReqProtocol.verify = function verify(message: { requestId: any; reqMsg: any; type: any; toUser: null; hasOwnProperty: (arg0: string) => any; userType: any; msgType: any; token: any; } | null) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.requestId))
                return "requestId: string expected";
            if (!$util.isString(message.reqMsg))
                return "reqMsg: string expected";
            if (!$util.isInteger(message.type))
                return "type: integer expected";
            if (message.toUser != null && message.hasOwnProperty("toUser"))
                if (!$util.isString(message.toUser))
                    return "toUser: string expected";
            if (!$util.isInteger(message.userType))
                return "userType: integer expected";
            if (!$util.isInteger(message.msgType))
                return "msgType: integer expected";
            if (!$util.isString(message.token))
                return "token: string expected";
            return null;
        };

        /**
         * Creates a CIMReqProtocol message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protocol.CIMReqProtocol} CIMReqProtocol
         */
        CIMReqProtocol.fromObject = function fromObject(object: { requestId: null; reqMsg: null; type: number | null; toUser: null; userType: number | null; msgType: number | null; token: null; }) {
            if (object instanceof ($root as any).protocol.CIMReqProtocol)
                return object;
            let message = new ($root as any).protocol.CIMReqProtocol();
            if (object.requestId != null)
                message.requestId = String(object.requestId);
            if (object.reqMsg != null)
                message.reqMsg = String(object.reqMsg);
            if (object.type != null)
                message.type = object.type | 0;
            if (object.toUser != null)
                message.toUser = String(object.toUser);
            if (object.userType != null)
                message.userType = object.userType | 0;
            if (object.msgType != null)
                message.msgType = object.msgType | 0;
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a CIMReqProtocol message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protocol.CIMReqProtocol
         * @static
         * @param {protocol.CIMReqProtocol} message CIMReqProtocol
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CIMReqProtocol.toObject = function toObject(message: { reqMsg: null; hasOwnProperty: (arg0: string) => any; requestId: null; type: null; toUser: null; userType: null; msgType: null; token: null; }, options: { defaults?: any; }) {
            if (!options)
                options = {};
            let object: any = {};
            if (options.defaults) {
                object.reqMsg = "";
                object.requestId = "";
                object.type = 0;
                object.toUser = "";
                object.userType = 0;
                object.msgType = 0;
                object.token = "";
            }
            if (message.reqMsg != null && message.hasOwnProperty("reqMsg"))
                object.reqMsg = message.reqMsg;
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                object.requestId = message.requestId;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.toUser != null && message.hasOwnProperty("toUser"))
                object.toUser = message.toUser;
            if (message.userType != null && message.hasOwnProperty("userType"))
                object.userType = message.userType;
            if (message.msgType != null && message.hasOwnProperty("msgType"))
                object.msgType = message.msgType;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this CIMReqProtocol to JSON.
         * @function toJSON
         * @memberof protocol.CIMReqProtocol
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CIMReqProtocol.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CIMReqProtocol;
    })();

    protocol.CIMResProtocol = (function() {

        /**
         * Properties of a CIMResProtocol.
         * @memberof protocol
         * @interface ICIMResProtocol
         * @property {string} responseId CIMResProtocol responseId
         * @property {string} resMsg CIMResProtocol resMsg
         * @property {number} type CIMResProtocol type
         * @property {number|null} [code] CIMResProtocol code
         */

        /**
         * Constructs a new CIMResProtocol.
         * @memberof protocol
         * @classdesc Represents a CIMResProtocol.
         * @implements ICIMResProtocol
         * @constructor
         * @param {protocol.ICIMResProtocol=} [properties] Properties to set
         */
        function CIMResProtocol(this: any, properties: { [x: string]: any; }) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CIMResProtocol responseId.
         * @member {string} responseId
         * @memberof protocol.CIMResProtocol
         * @instance
         */
        CIMResProtocol.prototype.responseId = "";

        /**
         * CIMResProtocol resMsg.
         * @member {string} resMsg
         * @memberof protocol.CIMResProtocol
         * @instance
         */
        CIMResProtocol.prototype.resMsg = "";

        /**
         * CIMResProtocol type.
         * @member {number} type
         * @memberof protocol.CIMResProtocol
         * @instance
         */
        CIMResProtocol.prototype.type = 0;

        /**
         * CIMResProtocol code.
         * @member {number} code
         * @memberof protocol.CIMResProtocol
         * @instance
         */
        CIMResProtocol.prototype.code = 0;

        /**
         * Creates a new CIMResProtocol instance using the specified properties.
         * @function create
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {protocol.ICIMResProtocol=} [properties] Properties to set
         * @returns {protocol.CIMResProtocol} CIMResProtocol instance
         */
        CIMResProtocol.create = function create(properties: any) {
            return new CIMResProtocol(properties);
        };

        /**
         * Encodes the specified CIMResProtocol message. Does not implicitly {@link protocol.CIMResProtocol.verify|verify} messages.
         * @function encode
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {protocol.ICIMResProtocol} message CIMResProtocol message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CIMResProtocol.encode = function encode(message: { resMsg: any; responseId: any; type: any; code: null; }, writer: $protobuf.Writer | $protobuf.BufferWriter) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.resMsg);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.responseId);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.code);
            return writer;
        };

        /**
         * Encodes the specified CIMResProtocol message, length delimited. Does not implicitly {@link protocol.CIMResProtocol.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {protocol.ICIMResProtocol} message CIMResProtocol message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CIMResProtocol.encodeDelimited = function encodeDelimited(message: any, writer: any) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CIMResProtocol message from the specified reader or buffer.
         * @function decode
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protocol.CIMResProtocol} CIMResProtocol
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CIMResProtocol.decode = function decode(reader: $protobuf.Reader | Uint8Array, length: undefined) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.protocol.CIMResProtocol();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    message.responseId = reader.string();
                    break;
                case 1:
                    message.resMsg = reader.string();
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                case 4:
                    message.code = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("responseId"))
                throw new $util.ProtocolError("missing required 'responseId'", { instance: message });
            if (!message.hasOwnProperty("resMsg"))
                throw new $util.ProtocolError("missing required 'resMsg'", { instance: message });
            if (!message.hasOwnProperty("type"))
                throw new $util.ProtocolError("missing required 'type'", { instance: message });
            return message;
        };

        /**
         * Decodes a CIMResProtocol message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protocol.CIMResProtocol} CIMResProtocol
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CIMResProtocol.decodeDelimited = function decodeDelimited(reader: $protobuf.Reader | Uint8Array) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, (reader.uint32() as any));
        };

        /**
         * Verifies a CIMResProtocol message.
         * @function verify
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CIMResProtocol.verify = function verify(message: { responseId: any; resMsg: any; type: any; code: null; hasOwnProperty: (arg0: string) => any; } | null) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.responseId))
                return "responseId: string expected";
            if (!$util.isString(message.resMsg))
                return "resMsg: string expected";
            if (!$util.isInteger(message.type))
                return "type: integer expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            return null;
        };

        /**
         * Creates a CIMResProtocol message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protocol.CIMResProtocol} CIMResProtocol
         */
        CIMResProtocol.fromObject = function fromObject(object: { responseId: null; resMsg: null; type: number | null; code: number | null; }) {
            if (object instanceof ($root as any).protocol.CIMResProtocol)
                return object;
            let message = new ($root as any).protocol.CIMResProtocol();
            if (object.responseId != null)
                message.responseId = String(object.responseId);
            if (object.resMsg != null)
                message.resMsg = String(object.resMsg);
            if (object.type != null)
                message.type = object.type | 0;
            if (object.code != null)
                message.code = object.code | 0;
            return message;
        };

        /**
         * Creates a plain object from a CIMResProtocol message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protocol.CIMResProtocol
         * @static
         * @param {protocol.CIMResProtocol} message CIMResProtocol
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CIMResProtocol.toObject = function toObject(message: { resMsg: null; hasOwnProperty: (arg0: string) => any; responseId: null; type: null; code: null; }, options: { defaults?: any; }) {
            if (!options)
                options = {};
            let object: any = {};
            if (options.defaults) {
                object.resMsg = "";
                object.responseId = "";
                object.type = 0;
                object.code = 0;
            }
            if (message.resMsg != null && message.hasOwnProperty("resMsg"))
                object.resMsg = message.resMsg;
            if (message.responseId != null && message.hasOwnProperty("responseId"))
                object.responseId = message.responseId;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this CIMResProtocol to JSON.
         * @function toJSON
         * @memberof protocol.CIMResProtocol
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CIMResProtocol.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CIMResProtocol;
    })();

    return protocol;
})();

// module.exports = $root;
export default $root
