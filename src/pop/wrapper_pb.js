// source: wrapper.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.wrapper.AuthWrapper', null, global);
goog.exportSymbol('proto.wrapper.AuthWrapper.SignatureScheme', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.wrapper.AuthWrapper = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.wrapper.AuthWrapper, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.wrapper.AuthWrapper.displayName = 'proto.wrapper.AuthWrapper';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.wrapper.AuthWrapper.prototype.toObject = function(opt_includeInstance) {
  return proto.wrapper.AuthWrapper.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.wrapper.AuthWrapper} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wrapper.AuthWrapper.toObject = function(includeInstance, msg) {
  var f, obj = {
    pubKey: msg.getPubKey_asB64(),
    signature: msg.getSignature_asB64(),
    scheme: jspb.Message.getFieldWithDefault(msg, 3, 0),
    serializedPayload: msg.getSerializedPayload_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.wrapper.AuthWrapper}
 */
proto.wrapper.AuthWrapper.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.wrapper.AuthWrapper;
  return proto.wrapper.AuthWrapper.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.wrapper.AuthWrapper} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.wrapper.AuthWrapper}
 */
proto.wrapper.AuthWrapper.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubKey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignature(value);
      break;
    case 3:
      var value = /** @type {!proto.wrapper.AuthWrapper.SignatureScheme} */ (reader.readEnum());
      msg.setScheme(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSerializedPayload(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.wrapper.AuthWrapper.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.wrapper.AuthWrapper.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.wrapper.AuthWrapper} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.wrapper.AuthWrapper.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPubKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getScheme();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getSerializedPayload_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.wrapper.AuthWrapper.SignatureScheme = {
  SCHNORR: 0,
  ECDSA: 1
};

/**
 * optional bytes pub_key = 1;
 * @return {!(string|Uint8Array)}
 */
proto.wrapper.AuthWrapper.prototype.getPubKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes pub_key = 1;
 * This is a type-conversion wrapper around `getPubKey()`
 * @return {string}
 */
proto.wrapper.AuthWrapper.prototype.getPubKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubKey()));
};


/**
 * optional bytes pub_key = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubKey()`
 * @return {!Uint8Array}
 */
proto.wrapper.AuthWrapper.prototype.getPubKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubKey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.wrapper.AuthWrapper} returns this
 */
proto.wrapper.AuthWrapper.prototype.setPubKey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes signature = 2;
 * @return {!(string|Uint8Array)}
 */
proto.wrapper.AuthWrapper.prototype.getSignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes signature = 2;
 * This is a type-conversion wrapper around `getSignature()`
 * @return {string}
 */
proto.wrapper.AuthWrapper.prototype.getSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignature()));
};


/**
 * optional bytes signature = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignature()`
 * @return {!Uint8Array}
 */
proto.wrapper.AuthWrapper.prototype.getSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignature()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.wrapper.AuthWrapper} returns this
 */
proto.wrapper.AuthWrapper.prototype.setSignature = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional SignatureScheme scheme = 3;
 * @return {!proto.wrapper.AuthWrapper.SignatureScheme}
 */
proto.wrapper.AuthWrapper.prototype.getScheme = function() {
  return /** @type {!proto.wrapper.AuthWrapper.SignatureScheme} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.wrapper.AuthWrapper.SignatureScheme} value
 * @return {!proto.wrapper.AuthWrapper} returns this
 */
proto.wrapper.AuthWrapper.prototype.setScheme = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional bytes serialized_payload = 4;
 * @return {!(string|Uint8Array)}
 */
proto.wrapper.AuthWrapper.prototype.getSerializedPayload = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes serialized_payload = 4;
 * This is a type-conversion wrapper around `getSerializedPayload()`
 * @return {string}
 */
proto.wrapper.AuthWrapper.prototype.getSerializedPayload_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSerializedPayload()));
};


/**
 * optional bytes serialized_payload = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSerializedPayload()`
 * @return {!Uint8Array}
 */
proto.wrapper.AuthWrapper.prototype.getSerializedPayload_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSerializedPayload()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.wrapper.AuthWrapper} returns this
 */
proto.wrapper.AuthWrapper.prototype.setSerializedPayload = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


goog.object.extend(exports, proto.wrapper);
